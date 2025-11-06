import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { authAPI } from "../api/client"
import { useAuth } from "../contexts/AuthContext"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { data } = await authAPI.login({ email, password })
      login(data.token, data.userId, data.name)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.error || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>SlotSwapper</h1>
        <p style={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              placeholder="you@example.com"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "var(--neutral-900)",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    backgroundColor: "var(--neutral-800)",
    border: `1px solid var(--neutral-700)`,
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "var(--primary)",
  },
  subtitle: {
    fontSize: "14px",
    color: "var(--neutral-400)",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--neutral-200)",
    textTransform: "uppercase",
  },
  input: {
    padding: "10px 12px",
    backgroundColor: "var(--neutral-700)",
    border: `1px solid var(--neutral-600)`,
    color: "var(--neutral-100)",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    backgroundColor: "var(--primary)",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    marginTop: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  error: {
    padding: "12px",
    backgroundColor: "var(--error)",
    color: "white",
    fontSize: "13px",
    marginBottom: "8px",
  },
  footer: {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "13px",
    color: "var(--neutral-400)",
  },
  link: {
    color: "var(--primary)",
    textDecoration: "none",
    fontWeight: "600",
  },
}

export default LoginPage
