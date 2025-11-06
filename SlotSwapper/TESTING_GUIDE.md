# 🚀 Quick Testing Guide

## Start the Application

### 1. Start Backend
```bash
cd backend
npm start
```
**Expected**: "Server running on port 5000" + "MongoDB connected"

### 2. Start Frontend
```bash
cd frontend
npm run dev
```
**Expected**: "Local: http://localhost:3000"

---

## Test the Complete Swap Flow

### Step 1: Create Two Users
1. Open http://localhost:3000
2. Click "Sign Up" → Create "Alice" (alice@test.com / password123)
3. Logout → Sign Up again → Create "Bob" (bob@test.com / password123)

### Step 2: Alice Creates a Swappable Event
1. Login as Alice
2. Go to Calendar tab
3. Click "+ New Event"
4. Fill in:
   - Title: "Team Meeting"
   - Start: Tomorrow at 10:00 AM
   - End: Tomorrow at 11:00 AM
   - Status: **"Swappable (Available for Swap)"** ← IMPORTANT
5. Click "Create Event"
6. **Verify**: Event appears in calendar with purple/blue color

### Step 3: Bob Creates a Swappable Event
1. Logout → Login as Bob
2. Go to Calendar tab
3. Create event:
   - Title: "Focus Block"
   - Start: Day after tomorrow at 2:00 PM
   - End: Day after tomorrow at 3:00 PM
   - Status: **"Swappable"**
4. **Verify**: Event appears in calendar

### Step 4: Alice Requests Swap
1. Logout → Login as Alice
2. Go to **Marketplace** tab
3. **Verify**: You see Bob's "Focus Block" event
4. Click "Request Swap"
5. Select your "Team Meeting" from dropdown
6. Click "Confirm Swap"
7. **Verify**: Alert says "Swap request sent successfully!"

### Step 5: Bob Receives and Accepts
1. Logout → Login as Bob
2. Go to **Requests** tab
3. **Under "Incoming Swap Requests"**:
   - **Verify**: You see Alice's request
   - Left box: "Focus Block" (your slot)
   - Right box: "Team Meeting" (Alice's slot)
4. Click **"Accept"**
5. **Verify**: Alert says "Swap accepted! Your calendar has been updated."

### Step 6: Verify the Swap Worked
1. **Still as Bob**, go to Calendar tab
   - **Verify**: You now have "Team Meeting" (tomorrow 10-11 AM)
   - **Verify**: "Focus Block" is GONE (Alice has it now)

2. Logout → Login as Alice → Calendar tab
   - **Verify**: You now have "Focus Block" (day after tomorrow 2-3 PM)
   - **Verify**: "Team Meeting" is GONE (Bob has it now)

**✅ SUCCESS!** The swap worked correctly!

---

## Test Rejection Flow

### Step 1: Create New Swappable Events
- Alice: Create "Lunch Break" (swappable)
- Bob: Create "Gym Time" (swappable)

### Step 2: Bob Requests Swap
1. Login as Bob
2. Marketplace → See Alice's "Lunch Break"
3. Request swap with your "Gym Time"

### Step 3: Alice Rejects
1. Login as Alice
2. Requests tab → See Bob's request
3. Click **"Reject"**
4. **Verify**: Alert says "Swap request rejected"

### Step 4: Verify Events Still Belong to Original Owners
- Alice: Still has "Lunch Break"
- Bob: Still has "Gym Time"

### Step 5: Verify Slots Are Swappable Again
- Alice: Go to Marketplace → Should see Bob's "Gym Time" again
- Bob: Go to Marketplace → Should see Alice's "Lunch Break" again

**✅ SUCCESS!** Rejection properly reset the slots!

---

## Common Issues & Solutions

### Issue: "No available slots" in Marketplace
**Solution**: Make sure:
1. Other user has created events
2. Those events have status = "SWAPPABLE"
3. You're not looking at your own events (they don't show)

### Issue: Can't request swap
**Solution**: 
1. Make sure YOU have at least one SWAPPABLE event
2. The dropdown only shows your SWAPPABLE events
3. If dropdown is empty, create a new event with status "Swappable"

### Issue: "Swap request already pending"
**Solution**: 
1. You already requested this swap
2. Go to Requests tab → Outgoing section → Cancel it
3. Then try again

### Issue: Calendar doesn't update after swap
**Solution**: 
1. Refresh the page (Ctrl+Shift+R)
2. Or switch tabs (Calendar → Marketplace → Calendar)
3. SWR should auto-refresh

---

## API Testing with Postman/Thunder Client

### 1. Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "alice@test.com",
  "password": "password123"
}
```
**Copy the `token` from response**

### 2. Get My Events
```http
GET http://localhost:5000/api/events
Authorization: Bearer YOUR_TOKEN_HERE
```

### 3. Get Swappable Slots
```http
GET http://localhost:5000/api/swappable-slots
Authorization: Bearer YOUR_TOKEN_HERE
```

### 4. Create Event
```http
POST http://localhost:5000/api/events
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Test Event",
  "startTime": "2025-11-15T10:00:00Z",
  "endTime": "2025-11-15T11:00:00Z",
  "status": "SWAPPABLE"
}
```

### 5. Request Swap
```http
POST http://localhost:5000/api/swap-request
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "mySlotId": "YOUR_EVENT_ID",
  "theirSlotId": "OTHER_USER_EVENT_ID"
}
```

### 6. Accept Swap
```http
POST http://localhost:5000/api/swap-response/SWAP_REQUEST_ID
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "acceptance": true
}
```

---

## Expected Database State

### After Successful Swap

**Events Collection**:
```javascript
// Alice's original event - NOW BELONGS TO BOB
{
  _id: "event1",
  userId: "bob_id",  // ← CHANGED from alice_id
  title: "Team Meeting",
  status: "BUSY"  // ← Changed from SWAP_PENDING
}

// Bob's original event - NOW BELONGS TO ALICE
{
  _id: "event2",
  userId: "alice_id",  // ← CHANGED from bob_id
  title: "Focus Block",
  status: "BUSY"  // ← Changed from SWAP_PENDING
}
```

**SwapRequests Collection**:
```javascript
{
  _id: "swap1",
  initiatorId: "alice_id",
  recipientId: "bob_id",
  initiatorSlotId: "event1",
  recipientSlotId: "event2",
  status: "ACCEPTED",  // ← Changed from PENDING
  respondedAt: "2025-11-06T..."  // ← Set when accepted
}
```

---

## WebSocket Testing

### In Browser Console (F12)
```javascript
// Listen for notifications
const socket = io('http://localhost:5000')
socket.emit('join-user', 'YOUR_USER_ID')
socket.on('swap-notification', (data) => {
  console.log('Notification received:', data)
})
```

### Expected Notifications
1. **When swap requested**: Recipient gets notification
2. **When swap accepted**: Initiator gets notification

---

## Checklist Before Saying "It Works!"

- [ ] Two users can sign up and login
- [ ] Can create events with BUSY status
- [ ] Can update event status to SWAPPABLE
- [ ] SWAPPABLE events appear in Marketplace (for other users)
- [ ] Can request swap from Marketplace
- [ ] Requested swap appears in recipient's Incoming Requests
- [ ] Requested swap appears in initiator's Outgoing Requests
- [ ] Can accept swap → calendars update → owners swapped
- [ ] Can reject swap → slots go back to SWAPPABLE
- [ ] Can cancel outgoing request
- [ ] WebSocket notifications work (optional)
- [ ] No errors in browser console
- [ ] No errors in backend console

---

## 🎉 Success Criteria

If you can complete the full flow above without errors, your SlotSwapper is **fully functional** and meets all requirements!

**Next**: Deploy to production or add additional features!
