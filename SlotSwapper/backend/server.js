import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io"
import authRoutes from "./routes/auth.js"
import eventRoutes from "./routes/events.js"
import swapRoutes from "./routes/swaps.js"
import authMiddleware from "./middleware/auth.js"

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { 
    origin: process.env.FRONTEND_URL || "http://localhost:3000", 
    credentials: true,
    methods: ["GET", "POST"]
  },
  transports: ["websocket", "polling"],
  allowEIO3: true
})

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }))
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/slotswapper")
  .then(() => {
    console.log("MongoDB connected")
    // Check if we're connected to a replica set (supports transactions)
    const isReplicaSet = mongoose.connection.client.topology?.description?.type === 'ReplicaSetWithPrimary'
    global.supportsTransactions = isReplicaSet
    console.log(`Transactions support: ${isReplicaSet ? 'YES (Replica Set)' : 'NO (Standalone)'}`)
  })
  .catch((err) => console.log("MongoDB error:", err))

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    env: {
      hasJwtSecret: !!process.env.JWT_SECRET,
      hasMongoDB: !!process.env.MONGODB_URI,
      port: process.env.PORT
    }
  })
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/events", authMiddleware, eventRoutes)
app.use("/api/swaps", authMiddleware, swapRoutes)

// Alias for /api/swappable-slots -> /api/swaps/swappable-slots
app.use("/api/swappable-slots", authMiddleware, (req, res, next) => {
  req.url = "/swappable-slots"
  swapRoutes(req, res, next)
})

// Alias for /api/swap-request -> /api/swaps/swap-request
app.use("/api/swap-request", authMiddleware, (req, res, next) => {
  req.url = "/swap-request"
  swapRoutes(req, res, next)
})

// Alias for /api/swap-response -> /api/swaps/swap-response
app.use("/api/swap-response", authMiddleware, (req, res, next) => {
  const requestId = req.url.split('/')[1]
  req.url = `/swap-response/${requestId}`
  swapRoutes(req, res, next)
})

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id)

  socket.on("join-user", (userId) => {
    socket.join(`user-${userId}`)
    console.log(`👤 User ${userId} joined their room`)
  })

  socket.on("swap-requested", (data) => {
    console.log(`📨 Swap requested from ${data.initiatorId} to ${data.recipientId}`)
    io.to(`user-${data.recipientId}`).emit("swap-notification", {
      type: "swap-request",
      from: data.initiatorId,
      message: `${data.initiatorName} sent a swap request`,
    })
  })

  socket.on("swap-responded", (data) => {
    console.log(`📬 Swap response: ${data.status} from ${data.responderId} to ${data.initiatorId}`)
    io.to(`user-${data.initiatorId}`).emit("swap-notification", {
      type: "swap-response",
      from: data.responderId,
      status: data.status,
      message: `${data.responderName} ${data.status} your swap request`,
    })
  })

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id)
  })

  socket.on("error", (error) => {
    console.error("WebSocket error:", error)
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📡 API available at http://localhost:${PORT}/api`)
  console.log(`🔌 WebSocket available at http://localhost:${PORT}`)
})