import { useState, useCallback } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import { useWebSocket } from "./hooks/useWebSocket"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Dashboard from "./pages/Dashboard"

function AppContent() {
  const { user, loading } = useAuth()
  const [notification, setNotification] = useState(null)

  const handleNotification = useCallback((data) => {
    setNotification(data)
    setTimeout(() => setNotification(null), 5000)
  }, [])

  useWebSocket(user?.userId, handleNotification)

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <Router>
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            padding: "16px",
            backgroundColor: "var(--primary)",
            color: "white",
            zIndex: 9999,
            borderRadius: "8px",
            maxWidth: "400px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {notification.message}
        </div>
      )}

      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
