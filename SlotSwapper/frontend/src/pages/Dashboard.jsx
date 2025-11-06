import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate, useSearchParams } from "react-router-dom"
import useSWR from "swr"
import { eventsAPI, swapsAPI } from "../api/client"
import Calendar from "../components/Calendar"
import EventForm from "../components/EventForm"
import Navigation from "../components/Navigation"
import MarketplaceSlot from "../components/MarketplaceSlot"
import SwapRequestCard from "../components/SwapRequestCard"

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState("calendar")
  const [showEventForm, setShowEventForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [hasViewedRequests, setHasViewedRequests] = useState(false)
  const [holidays, setHolidays] = useState([])

  // Fetch Indian holidays from Google Calendar API
  useEffect(() => {
    const fetchIndianHolidays = async () => {
      try {
        const currentYear = new Date().getFullYear()
        const API_KEY = "AIzaSyDxKXt7XCIE7HrmsVqgPdS5xLI6kLJl2ac" // Using a generic API key
        const calendarId = "en.indian%23holiday%40group.v.calendar.google.com"
        const timeMin = `${currentYear}-01-01T00:00:00Z`
        const timeMax = `${currentYear}-12-31T23:59:59Z`
        
        const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`
        
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch holidays')
        }
        
        const data = await response.json()
        const holidayList = data.items?.map(item => ({
          name: item.summary,
          date: item.start.date || item.start.dateTime,
        })) || []
        
        setHolidays(holidayList)
      } catch (error) {
        console.error("Failed to fetch holidays:", error)
        // Silently fail - don't break the site
        setHolidays([])
      }
    }
    
    fetchIndianHolidays()
  }, [])

  // Initialize tab from URL params
  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam && ["calendar", "marketplace", "requests"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  // Update URL when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchParams({ tab })
    if (tab === "requests") {
      setHasViewedRequests(true)
    }
  }

  const { data: myEvents = [], mutate: mutateEvents } = useSWR(
    user?.userId ? "/events" : null,
    () => eventsAPI.getMyEvents().then((res) => res.data)
  )

  const { data: swappableEvents = [], mutate: mutateSwappable } = useSWR(
    user?.userId && activeTab === "marketplace" ? "/events/swappable" : null,
    () => eventsAPI.getSwappableEvents().then((res) => res.data)
  )

  // Always fetch incoming requests to show badge
  const { data: incomingRequests = [], mutate: mutateIncoming } = useSWR(
    user?.userId ? "/swaps/incoming" : null,
    () => swapsAPI.getIncomingRequests().then((res) => res.data)
  )

  const { data: outgoingRequests = [], mutate: mutateOutgoing } = useSWR(
    user?.userId && activeTab === "requests" ? "/swaps/outgoing" : null,
    () => swapsAPI.getOutgoingRequests().then((res) => res.data)
  )

  // Calculate pending incoming requests for badge
  const pendingIncomingCount = incomingRequests.filter(req => req.status === "PENDING").length
  const showBadge = pendingIncomingCount > 0 && !hasViewedRequests && activeTab !== "requests"

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleEventCreated = () => {
    mutateEvents()
    setShowEventForm(false)
  }

  const handleAcceptSwap = async (requestId, selectedTitle) => {
    try {
      await swapsAPI.respondToSwap(requestId, true, selectedTitle)
      mutateIncoming()
      mutateEvents() // Refresh calendar to show swapped events
      alert("Swap accepted! Your calendar has been updated.")
    } catch (error) {
      console.error("Failed to accept swap:", error)
      alert(error.response?.data?.error || "Failed to accept swap")
    }
  }

  const handleRejectSwap = async (requestId) => {
    try {
      await swapsAPI.respondToSwap(requestId, false)
      mutateIncoming()
      alert("Swap request rejected.")
    } catch (error) {
      console.error("Failed to reject swap:", error)
      alert(error.response?.data?.error || "Failed to reject swap")
    }
  }

  const handleCancelSwap = async (requestId) => {
    try {
      await swapsAPI.cancelSwap(requestId)
      mutateIncoming()
      mutateOutgoing()
      alert("Swap request cancelled.")
    } catch (error) {
      console.error("Failed to cancel swap:", error)
      alert(error.response?.data?.error || "Failed to cancel swap")
    }
  }

  return (
    <div style={styles.container}>
      <Navigation user={user} onLogout={handleLogout} />
      <div style={styles.content}>
        <div style={styles.tabs}>
          <button
            style={{ ...styles.tabButton, ...(activeTab === "calendar" ? styles.activeTab : {}) }}
            onClick={() => handleTabChange("calendar")}
          >
            Calendar
          </button>
          <button
            style={{ ...styles.tabButton, ...(activeTab === "marketplace" ? styles.activeTab : {}) }}
            onClick={() => handleTabChange("marketplace")}
          >
            Marketplace
          </button>
          <button
            style={{ ...styles.tabButton, ...(activeTab === "requests" ? styles.activeTab : {}) }}
            onClick={() => handleTabChange("requests")}
          >
            Requests
            {showBadge && (
              <span style={styles.badge}>{pendingIncomingCount}</span>
            )}
          </button>
        </div>

        {activeTab === "calendar" && (
          <div style={styles.section}>
            <div style={styles.header}>
              <h2 style={styles.sectionTitle}>Your Calendar</h2>
              <button style={styles.primaryButton} onClick={() => setShowEventForm(!showEventForm)}>
                {showEventForm ? "Cancel" : "+ New Event"}
              </button>
            </div>

            {showEventForm && <EventForm onEventCreated={handleEventCreated} selectedDate={selectedDate} />}

            <Calendar events={myEvents} onDateSelect={setSelectedDate} holidays={holidays} />
          </div>
        )}

        {activeTab === "marketplace" && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Available Slots from Others</h2>
            {swappableEvents.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}> No available slots at the moment</p>
                <p style={styles.emptySubtext}>Check back later for swappable events from other users</p>
              </div>
            ) : (
              <div style={styles.grid}>
                {swappableEvents.map((event) => (
                  <MarketplaceSlot key={event._id} event={event} onSwapRequested={mutateSwappable} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "requests" && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              Incoming Swap Requests
              {pendingIncomingCount > 0 && (
                <span style={styles.sectionBadge}>{pendingIncomingCount}</span>
              )}
            </h2>
            {incomingRequests.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}> No incoming requests</p>
                <p style={styles.emptySubtext}>Swap requests from other users will appear here</p>
              </div>
            ) : (
              <div style={styles.grid}>
                {incomingRequests.map((request) => (
                  <SwapRequestCard
                    key={request._id}
                    request={request}
                    type="incoming"
                    onAccept={(selectedTitle) => handleAcceptSwap(request._id, selectedTitle)}
                    onReject={() => handleRejectSwap(request._id)}
                    onCancel={() => handleCancelSwap(request._id)}
                  />
                ))}
              </div>
            )}

            <h2 style={{ ...styles.sectionTitle, marginTop: "40px" }}>Outgoing Swap Requests</h2>
            {outgoingRequests.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}>No outgoing requests</p>
                <p style={styles.emptySubtext}>Swap requests you send will appear here</p>
              </div>
            ) : (
              <div style={styles.grid}>
                {outgoingRequests.map((request) => (
                  <SwapRequestCard
                    key={request._id}
                    request={request}
                    type="outgoing"
                    onAccept={(selectedTitle) => handleAcceptSwap(request._id, selectedTitle)}
                    onReject={() => handleRejectSwap(request._id)}
                    onCancel={() => handleCancelSwap(request._id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "var(--bg-primary)",
  },
  content: {
    flex: 1,
    padding: "24px",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
  },
  tabs: {
    display: "flex",
    gap: "8px",
    marginBottom: "24px",
    borderBottom: "2px solid var(--border-color)",
  },
  tabButton: {
    padding: "12px 20px",
    backgroundColor: "transparent",
    color: "var(--text-secondary)",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    borderBottom: "3px solid transparent",
    transition: "all 0.2s",
    marginBottom: "-2px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  badge: {
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "12px",
    padding: "2px 8px",
    fontSize: "12px",
    fontWeight: "700",
    minWidth: "20px",
    textAlign: "center",
  },
  activeTab: {
    color: "var(--primary)",
    borderBottomColor: "var(--primary)",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  sectionBadge: {
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "16px",
    padding: "4px 12px",
    fontSize: "16px",
    fontWeight: "700",
  },
  primaryButton: {
    padding: "10px 20px",
    backgroundColor: "var(--primary)",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "var(--bg-secondary)",
    borderRadius: "8px",
    border: "2px dashed var(--border-color)",
  },
  emptyText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "var(--text-primary)",
    marginBottom: "8px",
  },
  emptySubtext: {
    fontSize: "14px",
    color: "var(--text-secondary)",
  },
}

export default Dashboard
