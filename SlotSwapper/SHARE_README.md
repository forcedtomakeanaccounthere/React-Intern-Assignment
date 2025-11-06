# 🚀 SlotSwapper - Quick Docker Setup

**A complete time slot exchange platform - ready to run in 2 minutes!**

## ✅ What You Need

1. **Docker Desktop** installed and running
   - Download: https://www.docker.com/products/docker-desktop
   - Start Docker Desktop before continuing

## 🎯 Quick Start (2 Commands!)

### Step 1: Download this file
Download `docker-compose-hub.yml` to your computer

### Step 2: Run the app
Open terminal/PowerShell in the same folder and run:

```bash
docker-compose -f docker-compose-hub.yml up
```

**That's it!** 🎉

The app will:
- ✅ Automatically download all images (first time only, ~5 minutes)
- ✅ Start MongoDB database
- ✅ Start backend API
- ✅ Start frontend website
- ✅ Be ready to use!

## 🌐 Access the App

Open your browser:
- **SlotSwapper Website**: http://localhost:3000
- **API Backend**: http://localhost:5000

## 📝 First Time Use

1. Go to http://localhost:3000
2. Click **"Sign Up"**
3. Create your account
4. Start creating events and swapping time slots!

## 🛑 Stopping the App

Press `Ctrl+C` in the terminal, then:
```bash
docker-compose -f docker-compose-hub.yml down
```

## 🔄 Starting Again

```bash
docker-compose -f docker-compose-hub.yml up
```

Your data is saved! No need to signup again.

## 🧹 Fresh Start (Delete All Data)

```bash
docker-compose -f docker-compose-hub.yml down -v
```

This removes all data including user accounts and events.

## 🎓 Features

✅ User authentication with JWT  
✅ Google Calendar-style interface  
✅ Create/edit/delete time slots  
✅ Browse swappable slots marketplace  
✅ Send swap requests  
✅ Accept/reject swaps  
✅ Real-time notifications via WebSocket  
✅ Indian holidays auto-marked  
✅ Recurring events support  
✅ Smart overlap detection  
✅ Duration preferences  
✅ Title selection on swap acceptance  

## 💡 What's Running?

When you run `docker-compose up`, you get:
- **MongoDB** (Database) - Port 27017
- **Backend** (Node.js/Express API) - Port 5000
- **Frontend** (React App) - Port 3000

All running in isolated Docker containers!

## 🐛 Troubleshooting

### "Port already in use"
Something else is using port 3000 or 5000.

**Windows:**
```powershell
netstat -ano | findstr :3000
netstat -ano | findstr :5000
# Kill the process using the PID shown
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -i :3000
lsof -i :5000
# Kill the process
kill -9 <PID>
```

### "Cannot connect to Docker"
Make sure Docker Desktop is running. Check your system tray (Windows) or menu bar (Mac).

### "Images won't download"
Check your internet connection. The first download is ~200MB.

### "App not loading"
Wait 30 seconds after `docker-compose up` for everything to start.

## 📦 What Gets Installed?

No local installation needed! Everything runs in Docker:
- ✅ MongoDB 7.0
- ✅ Node.js 18
- ✅ All dependencies
- ✅ Complete application

Your computer stays clean!

## 🔗 Docker Hub Links

The images are publicly available:
- Backend: https://hub.docker.com/r/abhishekanandvii/slotswapper-backend
- Frontend: https://hub.docker.com/r/abhishekanandvii/slotswapper-frontend

## 💻 Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS
- **Backend**: Node.js, Express, Socket.io
- **Database**: MongoDB 7.0
- **Containerization**: Docker

## 📚 Full Documentation

For development setup, API docs, and more:
- See the full repository for complete documentation
- Backend API endpoints documentation available
- Testing guide included
- Deployment instructions available

## 🆘 Need Help?

1. Make sure Docker Desktop is running
2. Check you're in the correct folder with `docker-compose-hub.yml`
3. Try a fresh start: `docker-compose -f docker-compose-hub.yml down -v` then `up` again
4. Check Docker Desktop logs for errors

---

**Made with ❤️ for easy deployment**

Enjoy SlotSwapper! 🎉
