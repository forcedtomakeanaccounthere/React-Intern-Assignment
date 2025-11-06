# 🐳 Docker Guide - SlotSwapper

## Complete Step-by-Step Docker Tutorial for Beginners

This guide will help you:
1. Build Docker images
2. Run containers locally
3. Push images to Docker Hub
4. Share with others to quickly setup your project

---

## 📋 Prerequisites

### 1. Install Docker Desktop
- **Windows/Mac**: Download from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
- **Linux**: Follow [official guide](https://docs.docker.com/engine/install/)

### 2. Create Docker Hub Account
- Go to [https://hub.docker.com](https://hub.docker.com)
- Sign up for a free account
- Remember your username (you'll need it!)

### 3. Verify Installation
```powershell
# Check Docker is installed
docker --version

# Check Docker Compose is installed
docker-compose --version
```

---

## 🚀 Part 1: Building Docker Images Locally

### Step 1: Login to Docker Hub
```powershell
docker login
```
- Enter your Docker Hub username
- Enter your Docker Hub password

### Step 2: Build the Images

**Replace `YOUR_DOCKERHUB_USERNAME` with your actual Docker Hub username!**

```powershell
# Navigate to project root
cd "c:\Users\Abhishek\OneDrive\Desktop\VS Code\frontend\intern assignment\React-Intern-Assignment\SlotSwapper"

# Build Backend Image
docker build -t YOUR_DOCKERHUB_USERNAME/slotswapper-backend:latest ./backend

# Build Frontend Image
docker build -t YOUR_DOCKERHUB_USERNAME/slotswapper-frontend:latest ./frontend
```

**Example** (if your username is `abhishek123`):
```powershell
docker build -t abhishek123/slotswapper-backend:latest ./backend
docker build -t abhishek123/slotswapper-frontend:latest ./frontend
```

### Step 3: Verify Images are Built
```powershell
docker images
```
You should see your two images listed!

---

## 📤 Part 2: Pushing Images to Docker Hub

### Push Backend Image
```powershell
docker push YOUR_DOCKERHUB_USERNAME/slotswapper-backend:latest
```

### Push Frontend Image
```powershell
docker push YOUR_DOCKERHUB_USERNAME/slotswapper-frontend:latest
```

**Wait for upload to complete** - This may take 5-10 minutes depending on your internet speed.

### Verify on Docker Hub
1. Go to [https://hub.docker.com](https://hub.docker.com)
2. Login and check your repositories
3. You should see `slotswapper-backend` and `slotswapper-frontend`

---

## 🎯 Part 3: Running Containers Locally (Testing)

### Option A: Run with Docker Compose (Recommended)

**Before running, update `docker-compose.yml` with your Docker Hub images!**

Then run:
```powershell
# Start all services (MongoDB + Backend + Frontend)
docker-compose up

# Or run in background (detached mode)
docker-compose up -d

# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

### Option B: Run Individual Containers

```powershell
# 1. Run MongoDB
docker run -d --name mongodb -p 27017:27017 mongo:7.0

# 2. Run Backend
docker run -d --name backend -p 5000:5000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/slotswapper \
  -e JWT_SECRET=your_secret_key \
  -e FRONTEND_URL=http://localhost:3000 \
  YOUR_DOCKERHUB_USERNAME/slotswapper-backend:latest

# 3. Run Frontend
docker run -d --name frontend -p 3000:80 \
  -e VITE_API_URL=http://localhost:5000 \
  YOUR_DOCKERHUB_USERNAME/slotswapper-frontend:latest
```

### Access Your Application
- **Frontend**: Open browser → [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:5000](http://localhost:5000)

---

## 📦 Part 4: Sharing with Others

### Create a Simple Setup Guide for Others

Create a file called `QUICK_DOCKER_SETUP.md`:

```markdown
# Quick Docker Setup - SlotSwapper

## Prerequisites
1. Install Docker Desktop
2. Ensure Docker is running

## Setup Steps

1. **Pull the images**
   ```bash
   docker pull YOUR_DOCKERHUB_USERNAME/slotswapper-backend:latest
   docker pull YOUR_DOCKERHUB_USERNAME/slotswapper-frontend:latest
   ```

2. **Run using Docker Compose**
   ```bash
   docker-compose up
   ```

3. **Access the app**
   - Open: http://localhost:3000
   - Signup and start using!

That's it! 🎉
```

### What to Share with Others:
1. ✅ Your `docker-compose.yml` file (updated with your image names)
2. ✅ The `QUICK_DOCKER_SETUP.md` guide
3. ✅ Your Docker Hub repository links

---

## 🛠️ Useful Docker Commands

### Managing Images
```powershell
# List all images
docker images

# Remove an image
docker rmi IMAGE_ID

# Remove all unused images
docker image prune -a
```

### Managing Containers
```powershell
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop CONTAINER_ID

# Remove a container
docker rm CONTAINER_ID

# Remove all stopped containers
docker container prune

# View container logs
docker logs CONTAINER_NAME

# View real-time logs
docker logs -f CONTAINER_NAME
```

### Docker Compose Commands
```powershell
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs backend
```

---

## 🔧 Troubleshooting

### Issue: "Port already in use"
```powershell
# Find what's using the port
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID_NUMBER> /F
```

### Issue: "Cannot connect to MongoDB"
```powershell
# Ensure MongoDB container is running
docker ps | findstr mongodb

# Check MongoDB logs
docker logs mongodb
```

### Issue: "Image build failed"
```powershell
# Clean Docker cache and rebuild
docker builder prune -a
docker build --no-cache -t YOUR_IMAGE_NAME .
```

### Issue: "Changes not reflecting"
```powershell
# Rebuild without cache
docker-compose up --build --force-recreate
```

---

## 📊 Understanding Docker Concepts

### Images vs Containers
- **Image**: A blueprint/template (like a recipe)
- **Container**: A running instance of an image (like the actual dish)

### How it Works
```
Dockerfile → Build → Image → Run → Container
```

1. **Dockerfile**: Instructions to create an image
2. **Build**: `docker build` creates the image
3. **Image**: Stored blueprint ready to run
4. **Run**: `docker run` creates a container from image
5. **Container**: Your app running in isolation

---

## 🎓 Advanced: Multi-Architecture Support

To support both Intel and ARM processors (M1/M2 Macs):

```powershell
# Create and use buildx builder
docker buildx create --name mybuilder --use
docker buildx inspect --bootstrap

# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 \
  -t YOUR_DOCKERHUB_USERNAME/slotswapper-backend:latest \
  --push ./backend

docker buildx build --platform linux/amd64,linux/arm64 \
  -t YOUR_DOCKERHUB_USERNAME/slotswapper-frontend:latest \
  --push ./frontend
```

---

## 📝 Complete Workflow Example

Let's say your Docker Hub username is `john123`:

```powershell
# 1. Login
docker login

# 2. Build images
docker build -t john123/slotswapper-backend:latest ./backend
docker build -t john123/slotswapper-frontend:latest ./frontend

# 3. Test locally
docker-compose up

# 4. Push to Docker Hub
docker push john123/slotswapper-backend:latest
docker push john123/slotswapper-frontend:latest

# 5. Share with friend
# Send them:
# - docker-compose.yml (with john123/slotswapper-* images)
# - QUICK_DOCKER_SETUP.md

# 6. Friend runs:
docker-compose up
# Done! App is running on their machine
```

---

## ✅ Checklist Before Sharing

- [ ] Docker images built successfully
- [ ] Images pushed to Docker Hub
- [ ] Tested `docker-compose up` locally
- [ ] Updated `docker-compose.yml` with your Docker Hub username
- [ ] Created `QUICK_DOCKER_SETUP.md` with your username
- [ ] Set repository visibility on Docker Hub (Public)
- [ ] Tested pulling images on another machine (if possible)

---

## 🌟 Benefits of Docker

1. **One-Command Setup**: Anyone can run your entire app with `docker-compose up`
2. **No Dependency Conflicts**: Everything is isolated
3. **Works Everywhere**: Same environment on Windows/Mac/Linux
4. **Version Control**: Tag images with versions (v1.0, v2.0, etc.)
5. **Easy Updates**: Just pull new image and restart

---

## 🔗 Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

---

**Need Help?** Check the troubleshooting section or Docker's official documentation.

**Ready to Share?** Your project is now containerized and shareable! 🚀
