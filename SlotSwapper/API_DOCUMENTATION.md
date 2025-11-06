# SlotSwapper API Documentation

## Overview
SlotSwapper is a peer-to-peer time-slot scheduling application where users can swap busy calendar slots with each other.

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. Authentication

#### Sign Up
```http
POST /api/auth/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Log In
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 2. Calendar/Event Management

#### Create Event (Slot)
```http
POST /api/events
```

**Request Body:**
```json
{
  "title": "Team Meeting",
  "startTime": "2025-11-10T10:00:00Z",
  "endTime": "2025-11-10T11:00:00Z",
  "status": "BUSY"
}
```

**Status Values:**
- `BUSY` - Default state for a busy slot
- `SWAPPABLE` - Marked as available for swapping
- `SWAP_PENDING` - Currently involved in a pending swap request

**Response:**
```json
{
  "_id": "event_id",
  "userId": "user_id",
  "title": "Team Meeting",
  "startTime": "2025-11-10T10:00:00.000Z",
  "endTime": "2025-11-10T11:00:00.000Z",
  "status": "BUSY",
  "createdAt": "2025-11-06T12:00:00.000Z"
}
```

#### Get All My Events
```http
GET /api/events
```

**Response:**
```json
[
  {
    "_id": "event_id",
    "userId": "user_id",
    "title": "Team Meeting",
    "startTime": "2025-11-10T10:00:00.000Z",
    "endTime": "2025-11-10T11:00:00.000Z",
    "status": "SWAPPABLE",
    "createdAt": "2025-11-06T12:00:00.000Z"
  }
]
```

#### Update Event
```http
PUT /api/events/:id
```

**Request Body (all fields optional):**
```json
{
  "title": "Updated Meeting",
  "startTime": "2025-11-10T11:00:00Z",
  "endTime": "2025-11-10T12:00:00Z",
  "status": "SWAPPABLE"
}
```

**Common Use Case - Mark as Swappable:**
```json
{
  "status": "SWAPPABLE"
}
```

**Response:**
```json
{
  "_id": "event_id",
  "userId": "user_id",
  "title": "Updated Meeting",
  "startTime": "2025-11-10T11:00:00.000Z",
  "endTime": "2025-11-10T12:00:00.000Z",
  "status": "SWAPPABLE",
  "createdAt": "2025-11-06T12:00:00.000Z"
}
```

#### Delete Event
```http
DELETE /api/events/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

---

### 3. Swap Logic (Core Feature)

#### Get All Swappable Slots (Marketplace)
```http
GET /api/swappable-slots
```
or
```http
GET /api/swaps/swappable-slots
```

**Description:** Returns all slots from OTHER users that are marked as `SWAPPABLE`. Does NOT include your own slots.

**Response:**
```json
[
  {
    "_id": "slot_id",
    "userId": {
      "_id": "other_user_id",
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "title": "Focus Block",
    "startTime": "2025-11-12T14:00:00.000Z",
    "endTime": "2025-11-12T15:00:00.000Z",
    "status": "SWAPPABLE",
    "createdAt": "2025-11-06T10:00:00.000Z"
  }
]
```

#### Request a Swap
```http
POST /api/swap-request
```
or
```http
POST /api/swaps/swap-request
```

**Description:** 
- Initiates a swap request between your slot and another user's slot
- Verifies both slots are `SWAPPABLE`
- Creates a `SwapRequest` with `PENDING` status
- Updates both slots to `SWAP_PENDING` to prevent double-booking

**Request Body:**
```json
{
  "mySlotId": "my_event_id",
  "theirSlotId": "their_event_id"
}
```

**Response:**
```json
{
  "_id": "swap_request_id",
  "initiatorId": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "recipientId": {
    "_id": "other_user_id",
    "name": "Jane Smith",
    "email": "jane@example.com"
  },
  "initiatorSlotId": {
    "_id": "my_event_id",
    "title": "Team Meeting",
    "startTime": "2025-11-10T10:00:00.000Z",
    "endTime": "2025-11-10T11:00:00.000Z",
    "status": "SWAP_PENDING"
  },
  "recipientSlotId": {
    "_id": "their_event_id",
    "title": "Focus Block",
    "startTime": "2025-11-12T14:00:00.000Z",
    "endTime": "2025-11-12T15:00:00.000Z",
    "status": "SWAP_PENDING"
  },
  "status": "PENDING",
  "createdAt": "2025-11-06T12:30:00.000Z"
}
```

**Error Cases:**
- 400: One or both slots are not `SWAPPABLE`
- 400: Trying to swap with your own slot
- 400: A pending swap already exists for these slots
- 404: One or both slots don't exist

#### Respond to a Swap Request
```http
POST /api/swap-response/:requestId
```
or
```http
POST /api/swaps/swap-response/:requestId
```

**Description:**
- Allows the recipient to accept or reject a swap request
- **If Accepted:**
  - SwapRequest status → `ACCEPTED`
  - The owners (userId) of both slots are swapped
  - Both slots' status → `BUSY`
- **If Rejected:**
  - SwapRequest status → `REJECTED`
  - Both slots' status → `SWAPPABLE` (available again)

**Request Body:**
```json
{
  "acceptance": true
}
```
or
```json
{
  "acceptance": false
}
```

**Response (Accepted):**
```json
{
  "_id": "swap_request_id",
  "initiatorId": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "recipientId": {
    "_id": "my_user_id",
    "name": "Jane Smith",
    "email": "jane@example.com"
  },
  "initiatorSlotId": {
    "_id": "slot_1_id",
    "title": "Team Meeting",
    "userId": "my_user_id",  // SWAPPED - now belongs to me
    "status": "BUSY"
  },
  "recipientSlotId": {
    "_id": "slot_2_id",
    "title": "Focus Block",
    "userId": "user_id",  // SWAPPED - now belongs to them
    "status": "BUSY"
  },
  "status": "ACCEPTED",
  "createdAt": "2025-11-06T12:30:00.000Z",
  "respondedAt": "2025-11-06T12:35:00.000Z"
}
```

**Response (Rejected):**
```json
{
  "_id": "swap_request_id",
  "status": "REJECTED",
  "initiatorSlotId": {
    "status": "SWAPPABLE"  // Back to swappable
  },
  "recipientSlotId": {
    "status": "SWAPPABLE"  // Back to swappable
  },
  "respondedAt": "2025-11-06T12:35:00.000Z"
}
```

---

### 4. Swap Request Management

#### Get Incoming Requests
```http
GET /api/swaps/incoming
```

**Description:** Get all swap requests where YOU are the recipient (others want to swap with you).

**Response:**
```json
[
  {
    "_id": "swap_request_id",
    "initiatorId": {
      "_id": "other_user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "recipientId": "my_user_id",
    "initiatorSlotId": {
      "_id": "their_slot_id",
      "title": "Team Meeting",
      "startTime": "2025-11-10T10:00:00.000Z",
      "endTime": "2025-11-10T11:00:00.000Z",
      "status": "SWAP_PENDING"
    },
    "recipientSlotId": {
      "_id": "my_slot_id",
      "title": "Focus Block",
      "startTime": "2025-11-12T14:00:00.000Z",
      "endTime": "2025-11-12T15:00:00.000Z",
      "status": "SWAP_PENDING"
    },
    "status": "PENDING",
    "createdAt": "2025-11-06T12:30:00.000Z"
  }
]
```

#### Get Outgoing Requests
```http
GET /api/swaps/outgoing
```

**Description:** Get all swap requests where YOU are the initiator (you requested swaps from others).

**Response:**
```json
[
  {
    "_id": "swap_request_id",
    "initiatorId": "my_user_id",
    "recipientId": {
      "_id": "other_user_id",
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "initiatorSlotId": {
      "_id": "my_slot_id",
      "title": "Team Meeting",
      "startTime": "2025-11-10T10:00:00.000Z",
      "endTime": "2025-11-10T11:00:00.000Z",
      "status": "SWAP_PENDING"
    },
    "recipientSlotId": {
      "_id": "their_slot_id",
      "title": "Focus Block",
      "startTime": "2025-11-12T14:00:00.000Z",
      "endTime": "2025-11-12T15:00:00.000Z",
      "status": "SWAP_PENDING"
    },
    "status": "PENDING",
    "createdAt": "2025-11-06T12:30:00.000Z"
  }
]
```

#### Cancel Outgoing Request
```http
POST /api/swaps/cancel/:requestId
```

**Description:** Cancel a pending swap request that you initiated. Sets both slots back to `SWAPPABLE`.

**Response:**
```json
{
  "_id": "swap_request_id",
  "status": "CANCELLED",
  "initiatorSlotId": "slot_id_1",
  "recipientSlotId": "slot_id_2"
}
```

---

## WebSocket Events

### Connect to WebSocket
```javascript
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

// Join your user room
socket.emit('join-user', userId)
```

### Events to Emit

#### When Swap Requested
```javascript
socket.emit('swap-requested', {
  recipientId: 'recipient_user_id',
  initiatorId: 'your_user_id',
  initiatorName: 'Your Name'
})
```

#### When Swap Responded
```javascript
socket.emit('swap-responded', {
  initiatorId: 'initiator_user_id',
  responderId: 'your_user_id',
  responderName: 'Your Name',
  status: 'accepted' // or 'rejected'
})
```

### Events to Listen

#### Swap Notification
```javascript
socket.on('swap-notification', (data) => {
  console.log(data)
  // {
  //   type: 'swap-request' or 'swap-response',
  //   from: 'user_id',
  //   message: 'John Doe sent a swap request',
  //   status: 'accepted' (only for swap-response)
  // }
})
```

---

## Complete Swap Flow Example

### Scenario
- **User A** has "Team Meeting" on Tuesday 10-11 AM (marked as SWAPPABLE)
- **User B** has "Focus Block" on Wednesday 2-3 PM (marked as SWAPPABLE)
- **User A** wants to swap with **User B**

### Steps

1. **User A creates their event:**
```http
POST /api/events
{
  "title": "Team Meeting",
  "startTime": "2025-11-12T10:00:00Z",
  "endTime": "2025-11-12T11:00:00Z",
  "status": "BUSY"
}
```

2. **User A marks it as swappable:**
```http
PUT /api/events/{eventId}
{
  "status": "SWAPPABLE"
}
```

3. **User B creates and marks their event as swappable** (same steps)

4. **User A views marketplace:**
```http
GET /api/swappable-slots
```
Response shows User B's "Focus Block"

5. **User A requests the swap:**
```http
POST /api/swap-request
{
  "mySlotId": "userA_event_id",
  "theirSlotId": "userB_event_id"
}
```
- Both events now have `status: "SWAP_PENDING"`
- SwapRequest created with `status: "PENDING"`

6. **User B receives notification** (via WebSocket)

7. **User B views incoming requests:**
```http
GET /api/swaps/incoming
```

8. **User B accepts the swap:**
```http
POST /api/swap-response/{requestId}
{
  "acceptance": true
}
```

**Result:**
- User A now owns "Focus Block" (Wed 2-3 PM)
- User B now owns "Team Meeting" (Tue 10-11 AM)
- Both events have `status: "BUSY"`
- SwapRequest has `status: "ACCEPTED"`

9. **User A receives acceptance notification** (via WebSocket)

10. **Both users refresh their calendars:**
```http
GET /api/events
```
Both see their updated calendars with swapped events.

---

## Status Enums Reference

### Event Status
- `BUSY` - Normal busy slot (not available for swap)
- `SWAPPABLE` - Available for others to request a swap
- `SWAP_PENDING` - Currently locked in a pending swap request

### SwapRequest Status
- `PENDING` - Awaiting recipient's response
- `ACCEPTED` - Swap completed successfully
- `REJECTED` - Swap declined by recipient
- `CANCELLED` - Swap cancelled by initiator

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "error": "Error message description"
}
```
