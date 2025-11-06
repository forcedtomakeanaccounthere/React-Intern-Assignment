# SlotSwapper - Time Slot Exchange Platform# SlotSwapper - Schedule Slot Swapping Platform# SlotSwapper - Schedule Slot Swapping Platform



A full-stack web application that enables users to exchange time slots/events with others. Built with React (frontend) and Node.js/Express (backend), featuring real-time notifications via WebSocket.



## 🎯 Project OverviewA full-stack web application that allows users to create, manage, and swap time slots with other users. Built with **React + Vite**, **Express**, **MongoDB**, and **WebSocket** for real-time notifications.A full-stack application that allows users to create, manage, and swap time slots with other users. Built with React, Express, MongoDB, and real-time WebSocket notifications.



SlotSwapper allows users to:

- Create and manage personal events/time slots

- Mark events as "swappable" to make them available for exchange---## Project Structure

- Browse available slots from other users in a marketplace

- Request to swap time slots with other users

- Accept/reject incoming swap requests

- View swap history and manage pending requests## 🚀 Quick Start\`\`\`



### Key Design Choicesslotswapper/



1. **Event Status System**: Events have three states (BUSY, SWAPPABLE, SWAP_PENDING) to manage availability and prevent conflicts### Prerequisites├── backend/                 # Express.js API server

2. **No Transactions on Standalone MongoDB**: Removed MongoDB transactions to support both local development (standalone) and production (replica set)

3. **Real-time Updates**: WebSocket integration for instant swap request/response notifications- **Node.js** v16 or higher│   ├── server.js           # Main server entry point

4. **Duration Flexibility**: Users can choose whose event duration to keep when swapping

5. **Title Selection**: Recipients can choose which event title to keep after accepting a swap- **MongoDB** (local installation or MongoDB Atlas)│   ├── models/             # MongoDB schemas



---- **npm** or **yarn**│   ├── routes/             # API route handlers



## 📋 Table of Contents│   ├── middleware/         # Authentication & other middleware



- [Tech Stack](#-tech-stack)### Installation Steps│   ├── .env.example        # Environment variables template

- [Prerequisites](#-prerequisites)

- [Local Setup](#-local-setup)│   └── package.json        # Backend dependencies

- [Running with Docker](#-running-with-docker)

- [API Endpoints](#-api-endpoints)#### 1️⃣ Clone and Navigate└── frontend/               # React web application

- [Testing](#-testing)

- [Deployment](#-deployment)```bash    ├── public/             # Static files

- [Project Structure](#-project-structure)

- [Challenges & Assumptions](#-challenges--assumptions)cd SlotSwapper    ├── src/



---```    │   ├── pages/          # Page components



## 🛠 Tech Stack    │   ├── components/     # Reusable components



**Frontend:**#### 2️⃣ Setup Backend    │   ├── hooks/          # Custom React hooks

- React 18.2

- Vite 5.0 (build tool)```bash    │   ├── api/            # API client setup

- React Router 6 (routing)

- SWR (data fetching)cd backend    │   └── index.css       # Global styles

- date-fns (date manipulation)

- Socket.io-client (WebSocket)npm install    └── package.json        # Frontend dependencies



**Backend:**\`\`\`

- Node.js / Express

- MongoDB / Mongoose# Copy environment file

- JWT (authentication)

- Socket.io (real-time)cp .env.example .env## Features

- bcryptjs (password hashing)



---

# Edit .env and add your MongoDB URI and JWT secret- **User Authentication**: JWT-based signup and login

## ✅ Prerequisites

# MONGODB_URI=mongodb://localhost:27017/slotswapper- **Event Management**: Create, view, update, and delete personal time slots

- Node.js (v18 or higher)

- MongoDB (v7.0 or higher) - for local development# JWT_SECRET=your-secret-key-here- **Marketplace**: Browse available slots from other users

- npm or yarn package manager

- Git# FRONTEND_URL=http://localhost:3000- **Swap Requests**: Request and respond to slot swap proposals



---# PORT=5000- **Real-time Notifications**: WebSocket-based instant notifications



## 🚀 Local Setup- **Calendar View**: Month/week grid view of your schedule



### Step 1: Clone the Repository# Start backend server- **Responsive Design**: Works on desktop and mobile



```bashnpm start

git clone <repository-url>

cd SlotSwapper```## Technology Stack

```



### Step 2: Backend Setup

The backend will run on **http://localhost:5000****Backend:**

```bash

# Navigate to backend directory- Node.js with Express.js

cd backend

#### 3️⃣ Setup Frontend (in a new terminal)- MongoDB for data persistence

# Install dependencies

npm install```bash- JWT for authentication



# Create .env file (copy from .env.example)cd frontend- Socket.io for real-time communication

cp .env.example .env

npm install- bcryptjs for password hashing

# Edit .env file with your configuration

# MONGODB_URI=mongodb://localhost:27017/slotswapper

# JWT_SECRET=your_secret_key_here

# FRONTEND_URL=http://localhost:3000# Copy environment file**Frontend:**

# PORT=5000

cp .env.example .env- React 18

# Start backend server

npm start- React Router for navigation



# Or for development with auto-reload# Edit .env if needed (default should work)- SWR for data fetching and caching

npm run dev

```# VITE_API_URL=http://localhost:5000- Socket.io client for real-time updates



Backend will run on `http://localhost:5000`- date-fns for date manipulation



### Step 3: Frontend Setup# Start frontend dev server



```bashnpm run dev## Getting Started

# Navigate to frontend directory (from root)

cd frontend```



# Install dependencies### Prerequisites

npm install

The frontend will open at **http://localhost:3000**

# Create .env file

echo "VITE_API_URL=http://localhost:5000" > .env- Node.js (v16 or higher)



# Start frontend development server---- MongoDB (local or Atlas)

npm run dev

```- npm or yarn



Frontend will run on `http://localhost:3000`## 📁 Project Structure



### Step 4: Access the Application### Backend Setup



1. Open browser and navigate to `http://localhost:3000````

2. Sign up for a new account

3. Create events and mark them as "swappable"SlotSwapper/1. Navigate to the backend directory:

4. Open another browser/incognito window to create a second user

5. Request swaps between the two users├── backend/                 # Node.js + Express API   \`\`\`bash



---│   ├── server.js           # Main server entry point   cd backend



## 🐳 Running with Docker│   ├── models/             # MongoDB schemas (User, Event, SwapRequest)   \`\`\`



### Quick Start│   ├── routes/             # API routes (auth, events, swaps)



```bash│   ├── middleware/         # Authentication middleware2. Install dependencies:

# From project root

docker-compose up -d│   ├── .env.example        # Environment variables template   \`\`\`bash



# View logs│   └── package.json        # Backend dependencies   npm install

docker-compose logs -f

│   \`\`\`

# Stop containers

docker-compose down└── frontend/               # React + Vite application

```

    ├── index.html          # HTML entry point3. Create a `.env` file from `.env.example`:

This will start:

- MongoDB on port 27017    ├── vite.config.js      # Vite configuration   \`\`\`bash

- Backend on port 5000

- Frontend on port 3000    ├── src/   cp .env.example .env



---    │   ├── main.jsx        # React app entry point   \`\`\`



## 📡 API Endpoints    │   ├── App.jsx         # Main app component with routing



### Authentication    │   ├── index.css       # Global styles4. Update `.env` with your configuration:



| Method | Endpoint | Description | Auth Required |    │   ├── pages/          # Page components (Login, Signup, Dashboard)   \`\`\`

|--------|----------|-------------|---------------|

| POST | `/api/auth/signup` | Register new user | No |    │   ├── components/     # Reusable UI components   MONGODB_URI=mongodb://localhost/slotswapper

| POST | `/api/auth/login` | Login user | No |

    │   ├── hooks/          # Custom React hooks (useAuth, useWebSocket)   JWT_SECRET=your_super_secret_jwt_key_here

**Request Body (Signup):**

```json    │   └── api/            # API client setup   FRONTEND_URL=http://localhost:3000

{

  "name": "John Doe",    ├── .env.example        # Environment variables template   PORT=5000

  "email": "john@example.com",

  "password": "securePassword123"    └── package.json        # Frontend dependencies   \`\`\`

}

``````



**Request Body (Login):**5. Start MongoDB (if running locally):

```json

{---   \`\`\`bash

  "email": "john@example.com",

  "password": "securePassword123"   mongod

}

```## ✨ Features   \`\`\`



**Response:**

```json

{- ✅ **User Authentication** - JWT-based signup and login6. Start the backend server:

  "token": "jwt_token_here",

  "userId": "user_id_here",- ✅ **Event Management** - Create, view, update, and delete time slots   \`\`\`bash

  "name": "John Doe",

  "email": "john@example.com"- ✅ **Marketplace** - Browse available slots from other users   npm start

}

```- ✅ **Swap Requests** - Request and respond to slot swaps   # or for development with auto-reload:



---- ✅ **Real-time Notifications** - WebSocket-based instant alerts   npm run dev



### Events- ✅ **Calendar View** - Visual month/week view of your schedule   \`\`\`



| Method | Endpoint | Description | Auth Required |- ✅ **Responsive Design** - Works on desktop and mobile

|--------|----------|-------------|---------------|

| GET | `/api/events` | Get all user's events | Yes |The backend server will run on `http://localhost:5000`

| POST | `/api/events` | Create new event | Yes |

| PUT | `/api/events/:id` | Update event | Yes |---

| DELETE | `/api/events/:id` | Delete event | Yes |

### Frontend Setup

**Create Event Request:**

```json## 🛠 Technology Stack

{

  "title": "Team Meeting",1. Navigate to the frontend directory:

  "startTime": "2025-11-10T10:00:00Z",

  "endTime": "2025-11-10T11:00:00Z",### Backend   \`\`\`bash

  "status": "SWAPPABLE",

  "recurrence": {- **Node.js** + **Express.js** - REST API server   cd frontend

    "type": "once",

    "customDays": [],- **MongoDB** + **Mongoose** - Database and ODM   \`\`\`

    "endDate": null

  }- **JWT** - Authentication

}

```- **bcryptjs** - Password hashing2. Install dependencies:



**Event Status Values:**- **Socket.io** - Real-time WebSocket communication   \`\`\`bash

- `BUSY` - Not available for swap

- `SWAPPABLE` - Available in marketplace   npm install

- `SWAP_PENDING` - Swap request in progress

### Frontend   \`\`\`

---

- **React 18** - UI library

### Swaps

- **Vite** - Fast development server and build tool3. Create a `.env` file:

| Method | Endpoint | Description | Auth Required |

|--------|----------|-------------|---------------|- **React Router** - Client-side routing   \`\`\`

| GET | `/api/swappable-slots` | Get all swappable events from other users | Yes |

| POST | `/api/swap-request` | Create swap request | Yes |- **SWR** - Data fetching and caching   REACT_APP_API_URL=http://localhost:5000/api

| POST | `/api/swap-response/:requestId` | Accept/reject swap request | Yes |

| GET | `/api/swaps/incoming` | Get incoming swap requests | Yes |- **Socket.io Client** - Real-time updates   \`\`\`

| GET | `/api/swaps/outgoing` | Get outgoing swap requests | Yes |

| POST | `/api/swaps/cancel/:requestId` | Cancel pending request | Yes |- **Axios** - HTTP client



**Create Swap Request:**- **date-fns** - Date manipulation4. Start the development server:

```json

{- **Framer Motion** - Animations   \`\`\`bash

  "mySlotId": "event_id_1",

  "theirSlotId": "event_id_2",   npm start

  "durationPreference": "keep_mine"

}---   \`\`\`

```



**Respond to Swap Request:**

```json## 🔧 Environment VariablesThe frontend will open at `http://localhost:3000`

{

  "acceptance": true,

  "selectedTitle": "Merged Meeting Title"

}### Backend (`backend/.env`)## API Documentation

```

```env

**Swap Request Status Values:**

- `PENDING` - Awaiting responseMONGODB_URI=mongodb://localhost:27017/slotswapper### Authentication Endpoints

- `ACCEPTED` - Swap completed

- `REJECTED` - Swap deniedJWT_SECRET=your-super-secret-jwt-key-change-this

- `CANCELLED` - Initiator cancelled

FRONTEND_URL=http://localhost:3000- `POST /api/auth/signup` - Create a new user account

---

PORT=5000- `POST /api/auth/login` - Login with email and password

## 🧪 Testing

```

### Run Backend Tests

### Event Endpoints

```bash

cd backend### Frontend (`frontend/.env`)



# Install test dependencies```env- `GET /api/events` - Get all user's events

npm install --save-dev jest supertest cross-env

VITE_API_URL=http://localhost:5000- `GET /api/events/swappable` - Get swappable events from other users

# Run tests

npm test```- `POST /api/events` - Create a new event



# Run tests in watch mode- `PUT /api/events/:id` - Update an event

npm run test:watch

```---- `DELETE /api/events/:id` - Delete an event



### Test Coverage



Tests include:## 📡 API Endpoints### Swap Endpoints

- ✅ Swap request creation

- ✅ Swap acceptance with ownership exchange

- ✅ Swap rejection and status reset

- ✅ Duration preference application### Authentication- `POST /api/swaps/request` - Request a swap with another user

- ✅ Title selection on acceptance

- ✅ Duplicate request prevention- `POST /api/auth/signup` - Create new user account- `GET /api/swaps/incoming` - Get incoming swap requests

- ✅ Status validation

- `POST /api/auth/login` - Login with email and password- `GET /api/swaps/outgoing` - Get outgoing swap requests

---

- `POST /api/swaps/respond/:requestId` - Accept or reject a swap

## 🌐 Deployment

### Events- `POST /api/swaps/cancel/:requestId` - Cancel an outgoing request

### Production Environment Variables

- `GET /api/events` - Get all user's events

**Backend (.env.production):**

```env- `GET /api/events/swappable` - Get swappable events from other users## WebSocket Events

NODE_ENV=production

PORT=5000- `POST /api/events` - Create a new event

MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/slotswapper

JWT_SECRET=strong_random_secret_key_here- `PUT /api/events/:id` - Update an event**Emit:**

FRONTEND_URL=https://your-frontend-domain.com

```- `DELETE /api/events/:id` - Delete an event- `join-user` - Join user's notification room



**Frontend (.env.production):**- `swap-requested` - Notify when a swap is requested

```env

VITE_API_URL=https://your-backend-domain.com### Swaps- `swap-responded` - Notify response to swap request

```

- `POST /api/swaps/request` - Request a swap

### Deploy to Render/Heroku/Railway

- `GET /api/swaps/incoming` - Get incoming swap requests**Listen:**

1. Push code to GitHub

2. Create new Web Service- `GET /api/swaps/outgoing` - Get outgoing swap requests- `swap-notification` - Receive real-time notifications

3. Connect repository

4. Set environment variables- `POST /api/swaps/respond/:requestId` - Accept or reject a swap

5. Deploy

- `POST /api/swaps/cancel/:requestId` - Cancel an outgoing request## Database Schema

### MongoDB Atlas Setup



1. Create cluster at mongodb.com/cloud/atlas

2. Create database user---### User

3. Whitelist IP (0.0.0.0/0 for all)

4. Copy connection string\`\`\`javascript

5. Update MONGODB_URI in backend .env

## 🧪 Testing the Application{

---

  name: String,

## 📁 Project Structure

1. Open **http://localhost:3000**  email: String (unique),

```

SlotSwapper/2. Sign up with a new account (e.g., alice@example.com)  password: String (hashed),

├── backend/

│   ├── models/3. Create an event (e.g., "Meeting" from 2PM-3PM)  createdAt: Date

│   │   ├── User.js          # User schema

│   │   ├── Event.js         # Event/slot schema4. Open another browser window in **incognito mode**}

│   │   └── SwapRequest.js   # Swap request schema

│   ├── routes/5. Sign up with another account (e.g., bob@example.com)\`\`\`

│   │   ├── auth.js          # Authentication routes

│   │   ├── events.js        # Event CRUD routes6. Create a different event (e.g., "Workout" from 3PM-4PM)

│   │   └── swaps.js         # Swap logic routes

│   ├── middleware/7. Go to **Marketplace** and find Alice's meeting### Event

│   │   └── auth.js          # JWT verification

│   ├── tests/8. Click **Request Swap** and select your workout slot\`\`\`javascript

│   │   └── swap.test.js     # Integration tests

│   ├── server.js            # Express + Socket.io server9. Switch back to Alice's account{

│   ├── Dockerfile

│   └── package.json10. Go to **Requests** tab and approve Bob's swap request  userId: ObjectId (ref: User),

│

├── frontend/11. Both calendars are updated with swapped slots!  title: String,

│   ├── src/

│   │   ├── components/  startTime: Date,

│   │   │   ├── Calendar.jsx        # Calendar view

│   │   │   ├── EventForm.jsx       # Create event form---  endTime: Date,

│   │   │   ├── MarketplaceSlot.jsx # Swappable slot card

│   │   │   ├── SwapRequestCard.jsx # Swap request UI  status: String (available, booked, tentative),

│   │   │   └── Navigation.jsx      # Top navigation

│   │   ├── pages/## 🐛 Troubleshooting  isSwappable: Boolean,

│   │   │   ├── LandingPage.jsx

│   │   │   ├── LoginPage.jsx  createdAt: Date

│   │   │   ├── SignupPage.jsx

│   │   │   └── Dashboard.jsx       # Main app interface| Problem | Solution |}

│   │   ├── contexts/

│   │   │   ├── AuthContext.jsx     # User authentication|---------|----------|\`\`\`

│   │   │   └── ThemeContext.jsx    # Light/dark theme

│   │   ├── hooks/| **MongoDB connection error** | Ensure MongoDB is running: `mongod` or check your Atlas connection string |

│   │   │   └── useWebSocket.js     # Socket.io hook

│   │   ├── api/| **Backend won't start** | Check if port 5000 is available, verify `.env` file exists |### SwapRequest

│   │   │   └── client.js           # API client

│   │   └── App.jsx| **Frontend can't connect to API** | Ensure backend is running on port 5000, check `VITE_API_URL` in `.env` |\`\`\`javascript

│   ├── Dockerfile

│   ├── nginx.conf| **WebSocket errors** | Verify `FRONTEND_URL` in backend `.env` matches your frontend URL |{

│   └── package.json

│| **CORS errors** | Check `FRONTEND_URL` is set correctly in backend `.env` |  initiatorId: ObjectId (ref: User),

├── docker-compose.yml

└── README.md| **"Module not found" errors** | Run `npm install` in both frontend and backend directories |  recipientId: ObjectId (ref: User),

```

  initiatorSlotId: ObjectId (ref: Event),

---

---  recipientSlotId: ObjectId (ref: Event),

## 🎯 Key Features Implemented

  status: String (pending, accepted, rejected, cancelled),

1. **Authentication**: JWT-based with bcrypt password hashing

2. **Event Management**: Full CRUD with status tracking## 📦 Database Schema  createdAt: Date,

3. **Recurring Events**: Daily, weekly, custom days

4. **Time Validation**: Prevent overlapping events  respondedAt: Date

5. **Swap Marketplace**: Browse others' swappable slots

6. **Real-time Notifications**: WebSocket for instant updates### User}

7. **Duration Preference**: Choose whose duration to keep

8. **Title Selection**: Choose event title after swap```javascript\`\`\`

9. **Notification Badges**: Visual indicators for pending requests

10. **Theme Support**: Light/dark mode{

11. **Indian Holidays**: Google Calendar API integration

  name: String,## Deployment

---

  email: String (unique),

## 🚧 Challenges & Assumptions

  password: String (hashed),### Deploy Backend

### Challenges Faced

  createdAt: Date

1. **MongoDB Transactions**: 

   - **Problem**: Transactions require MongoDB replica set, not available locally}**Option 1: Heroku**

   - **Solution**: Removed transactions, rely on atomic operations and careful ordering

```\`\`\`bash

2. **WebSocket Connection**: 

   - **Problem**: Initial connection failures due to URL path issuescd backend

   - **Solution**: Fixed URL parsing and added transport configuration

### Eventheroku create slotswapper-api

3. **Event Overlap Detection**:

   - **Problem**: Complex time range comparison logic```javascriptgit push heroku main

   - **Solution**: MongoDB query with $or conditions for overlap detection

{\`\`\`

4. **Recurring Events**:

   - **Problem**: Generating multiple event instances efficiently  userId: ObjectId (ref: User),

   - **Solution**: Bulk insert with insertMany() after calculating all dates

  title: String,**Option 2: Railway/Render**

### Assumptions Made

  startTime: Date,- Connect your GitHub repo

1. **Single Timezone**: All times stored in UTC, no timezone conversion

2. **Event Duration**: Minimum 15 minutes, no validation for maximum  endTime: Date,- Set environment variables in the dashboard

3. **Concurrent Swaps**: Only one pending swap per event at a time

4. **User Trust**: No moderation system for inappropriate event titles  status: String (available, booked, tentative),- Deploy automatically from main branch

5. **Swap Atomicity**: Operations are sequential, not truly atomic (acceptable for MVP)

6. **Scaling**: Single server instance, no load balancing considerations  isSwappable: Boolean,

7. **Data Persistence**: No soft delete, events are permanently deleted

  createdAt: Date### Deploy Frontend

---

}

## 📝 License

```**Option 1: Vercel**

This project is created for assignment purposes.

\`\`\`bash

---

### SwapRequestnpm install -g vercel

## 👤 Author

```javascriptcd frontend

**Abhishek Anand**

- GitHub: @forcedtomakeanaccounthere{vercel --prod



---  initiatorId: ObjectId (ref: User),\`\`\`



## 🤝 Support  recipientId: ObjectId (ref: User),



For issues or questions, please create an issue in the repository.  initiatorSlotId: ObjectId (ref: Event),**Option 2: Netlify**


  recipientSlotId: ObjectId (ref: Event),- Connect your GitHub repo to Netlify

  status: String (pending, accepted, rejected, cancelled),- Set `REACT_APP_API_URL` environment variable

  createdAt: Date,- Deploy automatically from main branch

  respondedAt: Date

}### MongoDB Atlas

```

1. Create a cluster at https://www.mongodb.com/cloud/atlas

---2. Get your connection string

3. Update `MONGODB_URI` in backend `.env`

## 🚢 Deployment

## Troubleshooting

### Backend Deployment (Render/Railway)

1. Push your code to GitHub**MongoDB Connection Error**

2. Connect your repository to Render/Railway- Ensure MongoDB is running

3. Set environment variables in the dashboard- Check `MONGODB_URI` is correct

4. Deploy automatically from main branch- Verify network access in MongoDB Atlas



### Frontend Deployment (Vercel/Netlify)**WebSocket Connection Failed**

1. Push your code to GitHub- Ensure backend is running

2. Connect repository to Vercel/Netlify- Check `REACT_APP_API_URL` points to correct backend

3. Set `VITE_API_URL` to your deployed backend URL- Check CORS settings in backend

4. Deploy automatically

**Authentication Issues**

### MongoDB Atlas- Verify JWT_SECRET is set in backend

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)- Check token is saved in localStorage

2. Get your connection string- Clear localStorage and re-login if issues persist

3. Update `MONGODB_URI` in backend `.env`

## Future Enhancements

---

- Email notifications for swap requests

## 📝 Development Scripts- User profiles and reputation system

- Recurring event support

### Backend- Calendar integration (Google Calendar, Outlook)

```bash- Advanced filtering and search

npm start      # Start production server- Payment system for premium features

npm run dev    # Start with nodemon (auto-reload)- Mobile app (React Native)

```

## License

### Frontend

```bashMIT License - feel free to use this project for personal or commercial purposes.

npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🎯 Future Enhancements

- [ ] Email notifications for swap requests
- [ ] User profiles and reputation system
- [ ] Recurring event support
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Advanced filtering and search
- [ ] Mobile app (React Native)

---

## 📄 License

MIT License - Free to use for personal or commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📞 Support

For questions or issues, please check:
- This README
- The `QUICK_START.md` guide
- API documentation above

Happy Swapping! 🎉
