import { useEffect, useRef } from "react"
import io from "socket.io-client"

export const useWebSocket = (userId, onNotification) => {
  const socketRef = useRef(null)

  useEffect(() => {
    if (!userId) return

    // Get base URL without /api path
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
    const baseUrl = apiUrl.replace("/api", "")

    socketRef.current = io(baseUrl, {
      transports: ["websocket", "polling"], // Try websocket first, fallback to polling
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    socketRef.current.on("connect", () => {
      console.log("WebSocket connected:", socketRef.current.id)
      socketRef.current.emit("join-user", userId)
    })

    socketRef.current.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error.message)
    })

    socketRef.current.on("swap-notification", (data) => {
      console.log("Received swap notification:", data)
      onNotification(data)
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [userId, onNotification])

  return socketRef.current
}
