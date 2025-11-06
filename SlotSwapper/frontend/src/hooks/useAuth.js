import { useState, useEffect } from "react"

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    const name = localStorage.getItem("name")

    if (token && userId) {
      setUser({ userId, name })
    }
    setLoading(false)
  }, [])

  const login = (token, userId, name) => {
    localStorage.setItem("token", token)
    localStorage.setItem("userId", userId)
    localStorage.setItem("name", name)
    setUser({ userId, name })
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("name")
    setUser(null)
  }

  return { user, loading, login, logout }
}
