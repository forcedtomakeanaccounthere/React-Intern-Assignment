#!/bin/bash

# SlotSwapper - Docker Hub Push Script
# This script builds and pushes your Docker images to Docker Hub

echo "========================================"
echo "  SlotSwapper - Docker Build & Push"
echo "========================================"
echo ""

# Get Docker Hub username
read -p "Enter your Docker Hub username: " dockerUsername

if [ -z "$dockerUsername" ]; then
    echo "Error: Docker Hub username is required!"
    exit 1
fi

echo ""
echo "Using Docker Hub username: $dockerUsername"
echo ""

# Confirm
read -p "This will build and push images. Continue? (y/n): " confirm
if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "Step 1: Logging into Docker Hub..."
docker login
if [ $? -ne 0 ]; then
    echo "Error: Docker login failed!"
    exit 1
fi

echo ""
echo "Step 2: Building Backend Image..."
docker build -t "${dockerUsername}/slotswapper-backend:latest" ./backend
if [ $? -ne 0 ]; then
    echo "Error: Backend build failed!"
    exit 1
fi
echo "✓ Backend image built successfully!"

echo ""
echo "Step 3: Building Frontend Image..."
docker build -t "${dockerUsername}/slotswapper-frontend:latest" ./frontend
if [ $? -ne 0 ]; then
    echo "Error: Frontend build failed!"
    exit 1
fi
echo "✓ Frontend image built successfully!"

echo ""
echo "Step 4: Pushing Backend Image to Docker Hub..."
docker push "${dockerUsername}/slotswapper-backend:latest"
if [ $? -ne 0 ]; then
    echo "Error: Backend push failed!"
    exit 1
fi
echo "✓ Backend image pushed successfully!"

echo ""
echo "Step 5: Pushing Frontend Image to Docker Hub..."
docker push "${dockerUsername}/slotswapper-frontend:latest"
if [ $? -ne 0 ]; then
    echo "Error: Frontend push failed!"
    exit 1
fi
echo "✓ Frontend image pushed successfully!"

echo ""
echo "========================================"
echo "  ✓ All images pushed successfully!"
echo "========================================"
echo ""
echo "Your images are now available at:"
echo "  - https://hub.docker.com/r/$dockerUsername/slotswapper-backend"
echo "  - https://hub.docker.com/r/$dockerUsername/slotswapper-frontend"
echo ""
echo "Next Steps:"
echo "  1. Update docker-compose.yml with your username:"
echo "     image: $dockerUsername/slotswapper-backend:latest"
echo "     image: $dockerUsername/slotswapper-frontend:latest"
echo ""
echo "  2. Share these files with others:"
echo "     - docker-compose.yml"
echo "     - QUICK_DOCKER_SETUP.md"
echo ""
echo "  3. They can run: docker-compose up"
echo ""
echo "Done! 🚀"
