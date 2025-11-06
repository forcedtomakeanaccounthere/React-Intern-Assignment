# 🚀 Quick Start Guide - SlotSwapper

## First Time Setup (Windows)

### Option 1: Automated Setup (Recommended)
```powershell
# Run the setup script
.\setup.ps1
```

### Option 2: Manual Setup

**Step 1: Backend**
```powershell
cd backend
npm install
cp .env.example .env
# Edit .env with your settings
```

**Step 2: Frontend**
```powershell
cd frontend
npm install
cp .env.example .env
```

---

## Running the Application

### Start Backend (Terminal 1)
```powershell
cd backend
npm start
```
✅ Backend runs on http://localhost:5000

### Start Frontend (Terminal 2)
```powershell
cd frontend
npm run dev
```
✅ Frontend opens at http://localhost:3000

---

## Environment Setup

### Backend `.env` (Required!)
```env
MONGODB_URI=mongodb://localhost:27017/slotswapper
JWT_SECRET=put-a-random-secret-key-here
FRONTEND_URL=http://localhost:3000
PORT=5000
```

### Frontend `.env` (Optional - defaults work)
```env
VITE_API_URL=http://localhost:5000
```

---

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB: `mongod`
3. Use connection string: `mongodb://localhost:27017/slotswapper`

### Option 2: MongoDB Atlas (Cloud - Free)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/slotswapper`)
4. Paste in `MONGODB_URI` in backend `.env`

---

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend opens in browser
- [ ] Can sign up a new user
- [ ] Can login with created user
- [ ] Can create an event
- [ ] Can see events in calendar
- [ ] Can logout and login again

---

## Common Issues

**"Cannot connect to MongoDB"**
- Is MongoDB running? Try: `mongod`
- Check your `MONGODB_URI` in `.env`

**"Port 5000 already in use"**
- Change `PORT=5001` in backend `.env`
- Update `VITE_API_URL=http://localhost:5001` in frontend `.env`

**"Module not found" errors**
- Run `npm install` in both backend and frontend folders

**CORS errors**
- Make sure `FRONTEND_URL` in backend `.env` is `http://localhost:3000`

---

## Project Structure

```
SlotSwapper/
├── backend/           ← Express API + MongoDB
│   ├── .env          ← Your config (create from .env.example)
│   └── server.js     ← Main server file
│
└── frontend/         ← React + Vite app
    ├── .env         ← Your config (create from .env.example)
    └── src/         ← React components
```

---

## Development Commands

### Backend
```powershell
npm start      # Start server
npm run dev    # Start with auto-reload (nodemon)
```

### Frontend
```powershell
npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## Next Steps

1. ✅ Complete setup above
2. 📖 Read the full [README.md](README.md)
3. 🎨 Customize the UI in `frontend/src/components/`
4. 🔧 Add features to `backend/routes/`
5. 🚀 Deploy to production when ready!

---

**Need help?** Check the main [README.md](README.md) for detailed documentation.
