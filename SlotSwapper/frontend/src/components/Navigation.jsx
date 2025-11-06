import { useTheme } from "../contexts/ThemeContext"
import { useNavigate } from "react-router-dom"

const Navigation = ({ user, onLogout }) => {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogoClick = () => {
    // If user is logged in, go to dashboard calendar tab
    // Otherwise go to landing page
    if (user) {
      navigate("/dashboard?tab=calendar")
    } else {
      navigate("/")
    }
  }

  return (
    <div style={styles.nav}>
      <div style={styles.navContent}>
        <h1 style={styles.logo} onClick={handleLogoClick}>SlotSwapper</h1>
        <div style={styles.userSection}>
          <span style={styles.userName}>Welcome, {user?.name}!</span>
          <button style={styles.themeButton} onClick={toggleTheme} title="Toggle theme">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button style={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  nav: {
    backgroundColor: "var(--bg-secondary)",
    borderBottom: "1px solid var(--border-color)",
    padding: "16px 24px",
    boxShadow: "0 1px 3px var(--shadow)",
  },
  navContent: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "var(--primary)",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--text-primary)",
  },
  themeButton: {
    padding: "8px 12px",
    backgroundColor: "var(--bg-tertiary)",
    border: "1px solid var(--border-color)",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  logoutButton: {
    padding: "8px 16px",
    backgroundColor: "var(--primary)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s",
  },
}

export default Navigation
