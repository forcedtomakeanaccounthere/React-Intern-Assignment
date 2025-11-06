import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <h1 style={styles.logo}>SlotSwapper</h1>
          <div style={styles.navButtons}>
            <Link to="/login" style={styles.loginButton}>
              Sign In
            </Link>
            <Link to="/signup" style={styles.signupButton}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main style={styles.main}>
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>
            Swap Your Schedule,
            <br />
            <span style={styles.heroAccent}>Not Your Life</span>
          </h1>
          <p style={styles.heroSubtitle}>
            The easiest way to exchange time slots with others. Create events, browse available slots, and swap
            schedules in real-time.
          </p>
          <Link to="/signup" style={styles.ctaButton}>
            Start Swapping Free
          </Link>
        </section>

        <section style={styles.features}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📅</div>
            <h3 style={styles.featureTitle}>Smart Calendar</h3>
            <p style={styles.featureDesc}>Manage your schedule with an intuitive calendar interface</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🔄</div>
            <h3 style={styles.featureTitle}>Easy Swapping</h3>
            <p style={styles.featureDesc}>Request and accept slot swaps with just a few clicks</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>Real-time Updates</h3>
            <p style={styles.featureDesc}>Get instant notifications when someone requests a swap</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🌐</div>
            <h3 style={styles.featureTitle}>Marketplace</h3>
            <p style={styles.featureDesc}>Browse available slots from other users in the marketplace</p>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerText}>© ServiceHive Assignment - Abhishek Anand |  SlotSwapper</p>
      </footer>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--bg-primary)",
  },
  nav: {
    borderBottom: "1px solid var(--border-color)",
    backgroundColor: "var(--bg-secondary)",
    padding: "16px 0",
  },
  navContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "var(--primary)",
  },
  navButtons: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  loginButton: {
    padding: "8px 20px",
    color: "var(--text-primary)",
    textDecoration: "none",
    fontWeight: "500",
    borderRadius: "6px",
    transition: "background-color 0.2s",
  },
  signupButton: {
    padding: "8px 20px",
    backgroundColor: "var(--primary)",
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    borderRadius: "6px",
    transition: "background-color 0.2s",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 24px",
  },
  hero: {
    maxWidth: "800px",
    textAlign: "center",
    marginBottom: "80px",
    marginTop: "60px",
  },
  heroTitle: {
    fontSize: "56px",
    fontWeight: "800",
    color: "var(--text-primary)",
    marginBottom: "24px",
    lineHeight: "1.2",
  },
  heroAccent: {
    color: "var(--primary)",
  },
  heroSubtitle: {
    fontSize: "20px",
    color: "var(--text-secondary)",
    marginBottom: "40px",
    lineHeight: "1.6",
  },
  ctaButton: {
    display: "inline-block",
    padding: "16px 40px",
    backgroundColor: "var(--primary)",
    color: "white",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "18px",
    borderRadius: "8px",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 14px rgba(212, 70, 47, 0.3)",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "32px",
    maxWidth: "1200px",
    width: "100%",
  },
  feature: {
    padding: "32px",
    backgroundColor: "var(--bg-secondary)",
    borderRadius: "12px",
    border: "1px solid var(--border-color)",
    textAlign: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  featureIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  featureTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "var(--text-primary)",
    marginBottom: "12px",
  },
  featureDesc: {
    fontSize: "15px",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },
  footer: {
    borderTop: "1px solid var(--border-color)",
    padding: "24px",
    textAlign: "center",
    backgroundColor: "var(--bg-secondary)",
  },
  footerText: {
    color: "var(--text-secondary)",
    fontSize: "14px",
  },
}

export default LandingPage
