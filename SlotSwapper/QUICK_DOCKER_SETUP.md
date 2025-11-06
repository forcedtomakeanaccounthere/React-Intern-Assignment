# 🚀 Quick Docker Setup - SlotSwapper

A complete time slot exchange platform - ready to run in 2 minutes!

## Prerequisites

1. **Install Docker Desktop**
   - Download from: https://www.docker.com/products/docker-desktop
   - Ensure Docker is running (check system tray/menu bar)

2. **Verify Installation**
   ```bash
   docker --version
   docker-compose --version
   ```

## 🎯 One-Command Setup

### Step 1: Clone/Download this project
```bash
git clone <repository-url>
cd SlotSwapper
```

### Step 2: Start the application
```bash
docker-compose up
```

That's it! 🎉

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

## 📝 First Time Use

1. Open http://localhost:3000
2. Click "Sign Up"
3. Create an account
4. Start creating events and swapping time slots!

## 🛑 Stopping the Application

Press `Ctrl+C` in the terminal, then:
```bash
docker-compose down
```

## 🔄 Updating to Latest Version

```bash
# Pull latest images
docker-compose pull

# Restart
docker-compose up
```

## 📊 What's Running?

- **MongoDB**: Database for storing users, events, and swap requests
- **Backend**: Node.js/Express API server
- **Frontend**: React application with Vite

## 🐛 Troubleshooting

### Port Already in Use?
```bash
# Stop all containers
docker-compose down

# Check what's using the port (Windows)
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Check what's using the port (Mac/Linux)
lsof -i :3000
lsof -i :5000
```

### Fresh Start?
```bash
# Remove all data and start fresh
docker-compose down -v
docker-compose up
```

### See Logs?
```bash
# View all logs
docker-compose logs

# View specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

## 🎓 Features

✅ **User Authentication** - Secure signup/login  
✅ **Event Management** - Create, edit, delete time slots  
✅ **Smart Calendar** - Google Calendar-style interface  
✅ **Swap Marketplace** - Browse available slots  
✅ **Swap Requests** - Send and receive swap requests  
✅ **Real-time Notifications** - WebSocket-powered updates  
✅ **Indian Holidays** - Auto-marked on calendar  
✅ **Recurring Events** - Daily, weekly, or custom patterns  
✅ **Overlap Prevention** - Smart conflict detection  
✅ **Duration Preferences** - Keep your duration or use theirs  
✅ **Title Selection** - Choose title when swaps are accepted  

## 💡 Tech Stack

- **Frontend**: React 18, Vite 5, TailwindCSS
- **Backend**: Node.js, Express, Socket.io
- **Database**: MongoDB 7.0
- **Containerization**: Docker, Docker Compose

## 📚 Additional Documentation

- Full Setup Guide: See `README.md`
- Docker Guide: See `DOCKER_GUIDE.md`
- API Documentation: See `README.md` → API Endpoints section

## ⚡ Advanced Options

### Run in Background (Detached Mode)
```bash
docker-compose up -d

# Check status
docker-compose ps

# Stop
docker-compose down
```

### Rebuild Images
```bash
docker-compose up --build
```

### View Resource Usage
```bash
docker stats
```

---

**Need help?** Check the full documentation or open an issue on GitHub.

**Enjoy SwapSwapper!** 🎉
