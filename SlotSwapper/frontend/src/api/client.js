import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  signup: (data) => api.post("/auth/signup", data),
  login: (data) => api.post("/auth/login", data),
}

export const eventsAPI = {
  getMyEvents: () => api.get("/events"),
  getSwappableEvents: () => api.get("/swappable-slots"), // Updated to match requirements
  createEvent: (data) => api.post("/events", data),
  updateEvent: (id, data) => api.put(`/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/events/${id}`),
}

export const swapsAPI = {
  // Updated to match exact requirements
  requestSwap: (mySlotId, theirSlotId, durationPreference) => 
    api.post("/swap-request", { mySlotId, theirSlotId, durationPreference }),
  getIncomingRequests: () => api.get("/swaps/incoming"),
  getOutgoingRequests: () => api.get("/swaps/outgoing"),
  respondToSwap: (requestId, acceptance, selectedTitle) => 
    api.post(`/swap-response/${requestId}`, { acceptance, selectedTitle }),
  cancelSwap: (requestId) => api.post(`/swaps/cancel/${requestId}`),
}

export default api
