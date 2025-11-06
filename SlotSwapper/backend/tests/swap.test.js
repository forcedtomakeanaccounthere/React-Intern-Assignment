import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import swapRoutes from '../routes/swaps.js';
import authMiddleware from '../middleware/auth.js';
import Event from '../models/Event.js';
import SwapRequest from '../models/SwapRequest.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Setup Express app for testing
const app = express();
app.use(express.json());
app.use('/api/swaps', authMiddleware, swapRoutes);

let token1, token2, userId1, userId2;

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGODB_TEST_URI || 'mongodb://localhost/slotswapper_test');
  
  // Create test users
  const user1 = await User.create({ name: 'Test User 1', email: 'test1@example.com', password: 'hashedpass1' });
  const user2 = await User.create({ name: 'Test User 2', email: 'test2@example.com', password: 'hashedpass2' });
  
  userId1 = user1._id;
  userId2 = user2._id;
  
  // Generate tokens
  token1 = jwt.sign({ userId: userId1 }, process.env.JWT_SECRET || 'test_secret');
  token2 = jwt.sign({ userId: userId2 }, process.env.JWT_SECRET || 'test_secret');
});

afterAll(async () => {
  // Cleanup
  await User.deleteMany({});
  await Event.deleteMany({});
  await SwapRequest.deleteMany({});
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Clear events and swap requests before each test
  await Event.deleteMany({});
  await SwapRequest.deleteMany({});
});

describe('Swap Request API', () => {
  describe('POST /api/swaps/swap-request', () => {
    it('should create a swap request successfully', async () => {
      // Create two swappable events
      const event1 = await Event.create({
        userId: userId1,
        title: 'Meeting A',
        startTime: new Date('2025-11-10T10:00:00'),
        endTime: new Date('2025-11-10T11:00:00'),
        status: 'SWAPPABLE'
      });
      
      const event2 = await Event.create({
        userId: userId2,
        title: 'Meeting B',
        startTime: new Date('2025-11-10T14:00:00'),
        endTime: new Date('2025-11-10T15:00:00'),
        status: 'SWAPPABLE'
      });
      
      const response = await request(app)
        .post('/api/swaps/swap-request')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          mySlotId: event1._id,
          theirSlotId: event2._id,
          durationPreference: 'keep_mine'
        });
      
      expect(response.status).toBe(201);
      expect(response.body.status).toBe('PENDING');
      expect(response.body.initiatorSlotId).toBe(event1._id.toString());
      
      // Verify both events are now SWAP_PENDING
      const updatedEvent1 = await Event.findById(event1._id);
      const updatedEvent2 = await Event.findById(event2._id);
      expect(updatedEvent1.status).toBe('SWAP_PENDING');
      expect(updatedEvent2.status).toBe('SWAP_PENDING');
    });
    
    it('should reject swap request if slot is not SWAPPABLE', async () => {
      const event1 = await Event.create({
        userId: userId1,
        title: 'Meeting A',
        startTime: new Date('2025-11-10T10:00:00'),
        endTime: new Date('2025-11-10T11:00:00'),
        status: 'BUSY'
      });
      
      const event2 = await Event.create({
        userId: userId2,
        title: 'Meeting B',
        startTime: new Date('2025-11-10T14:00:00'),
        endTime: new Date('2025-11-10T15:00:00'),
        status: 'SWAPPABLE'
      });
      
      const response = await request(app)
        .post('/api/swaps/swap-request')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          mySlotId: event1._id,
          theirSlotId: event2._id
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('SWAPPABLE');
    });
    
    it('should prevent duplicate pending requests', async () => {
      const event1 = await Event.create({
        userId: userId1,
        title: 'Meeting A',
        startTime: new Date('2025-11-10T10:00:00'),
        endTime: new Date('2025-11-10T11:00:00'),
        status: 'SWAPPABLE'
      });
      
      const event2 = await Event.create({
        userId: userId2,
        title: 'Meeting B',
        startTime: new Date('2025-11-10T14:00:00'),
        endTime: new Date('2025-11-10T15:00:00'),
        status: 'SWAPPABLE'
      });
      
      // First request
      await request(app)
        .post('/api/swaps/swap-request')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          mySlotId: event1._id,
          theirSlotId: event2._id
        });
      
      // Duplicate request
      const response = await request(app)
        .post('/api/swaps/swap-request')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          mySlotId: event1._id,
          theirSlotId: event2._id
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('pending');
    });
  });
  
  describe('POST /api/swaps/swap-response/:requestId', () => {
    it('should accept swap and exchange ownership', async () => {
      const event1 = await Event.create({
        userId: userId1,
        title: 'Meeting A',
        startTime: new Date('2025-11-10T10:00:00'),
        endTime: new Date('2025-11-10T11:00:00'),
        status: 'SWAP_PENDING'
      });
      
      const event2 = await Event.create({
        userId: userId2,
        title: 'Meeting B',
        startTime: new Date('2025-11-10T14:00:00'),
        endTime: new Date('2025-11-10T15:00:00'),
        status: 'SWAP_PENDING'
      });
      
      const swapRequest = await SwapRequest.create({
        initiatorId: userId1,
        recipientId: userId2,
        initiatorSlotId: event1._id,
        recipientSlotId: event2._id,
        status: 'PENDING',
        durationPreference: 'keep_mine'
      });
      
      const response = await request(app)
        .post(`/api/swaps/swap-response/${swapRequest._id}`)
        .set('Authorization', `Bearer ${token2}`)
        .send({
          acceptance: true,
          selectedTitle: 'Merged Meeting'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ACCEPTED');
      
      // Verify ownership swap
      const updatedEvent1 = await Event.findById(event1._id);
      const updatedEvent2 = await Event.findById(event2._id);
      
      expect(updatedEvent1.userId.toString()).toBe(userId2.toString());
      expect(updatedEvent2.userId.toString()).toBe(userId1.toString());
      expect(updatedEvent1.status).toBe('BUSY');
      expect(updatedEvent2.status).toBe('BUSY');
      expect(updatedEvent1.title).toBe('Merged Meeting');
      expect(updatedEvent2.title).toBe('Merged Meeting');
    });
    
    it('should reject swap and reset slots to SWAPPABLE', async () => {
      const event1 = await Event.create({
        userId: userId1,
        title: 'Meeting A',
        startTime: new Date('2025-11-10T10:00:00'),
        endTime: new Date('2025-11-10T11:00:00'),
        status: 'SWAP_PENDING'
      });
      
      const event2 = await Event.create({
        userId: userId2,
        title: 'Meeting B',
        startTime: new Date('2025-11-10T14:00:00'),
        endTime: new Date('2025-11-10T15:00:00'),
        status: 'SWAP_PENDING'
      });
      
      const swapRequest = await SwapRequest.create({
        initiatorId: userId1,
        recipientId: userId2,
        initiatorSlotId: event1._id,
        recipientSlotId: event2._id,
        status: 'PENDING'
      });
      
      const response = await request(app)
        .post(`/api/swaps/swap-response/${swapRequest._id}`)
        .set('Authorization', `Bearer ${token2}`)
        .send({ acceptance: false });
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('REJECTED');
      
      // Verify both slots are SWAPPABLE again
      const updatedEvent1 = await Event.findById(event1._id);
      const updatedEvent2 = await Event.findById(event2._id);
      
      expect(updatedEvent1.status).toBe('SWAPPABLE');
      expect(updatedEvent2.status).toBe('SWAPPABLE');
    });
    
    it('should apply duration preference correctly', async () => {
      const event1 = await Event.create({
        userId: userId1,
        title: 'Meeting A',
        startTime: new Date('2025-11-10T10:00:00'),
        endTime: new Date('2025-11-10T11:00:00'), // 60 min
        status: 'SWAP_PENDING'
      });
      
      const event2 = await Event.create({
        userId: userId2,
        title: 'Meeting B',
        startTime: new Date('2025-11-10T14:00:00'),
        endTime: new Date('2025-11-10T15:30:00'), // 90 min
        status: 'SWAP_PENDING'
      });
      
      const swapRequest = await SwapRequest.create({
        initiatorId: userId1,
        recipientId: userId2,
        initiatorSlotId: event1._id,
        recipientSlotId: event2._id,
        status: 'PENDING',
        durationPreference: 'keep_mine' // Keep initiator's 60 min
      });
      
      await request(app)
        .post(`/api/swaps/swap-response/${swapRequest._id}`)
        .set('Authorization', `Bearer ${token2}`)
        .send({ acceptance: true });
      
      const updatedEvent2 = await Event.findById(event2._id);
      const duration = updatedEvent2.endTime - updatedEvent2.startTime;
      
      expect(duration).toBe(60 * 60 * 1000); // 60 minutes in milliseconds
    });
  });
});
