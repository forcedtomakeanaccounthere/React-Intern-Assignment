"use client"

import { useState } from "react"
import { format } from "date-fns"
import { eventsAPI, swapsAPI } from "../api/client"
import useSWR from "swr"

const MarketplaceSlot = ({ event, onSwapRequested }) => {
  const [showSwapForm, setShowSwapForm] = useState(false)
  const [selectedMySlot, setSelectedMySlot] = useState("")
  const [durationPreference, setDurationPreference] = useState("keep_mine")
  const [loading, setLoading] = useState(false)

  const { data: myEvents = [] } = useSWR(showSwapForm ? "/events" : null, () =>
    eventsAPI.getMyEvents().then((res) => res.data || []),
  )

  const selectedMyEvent = myEvents.find(e => e._id === selectedMySlot)
  const myDuration = selectedMyEvent ? (new Date(selectedMyEvent.endTime) - new Date(selectedMyEvent.startTime)) / (1000 * 60) : 0
  const theirDuration = (new Date(event.endTime) - new Date(event.startTime)) / (1000 * 60)

  const handleRequestSwap = async () => {
    if (!selectedMySlot) return
    setLoading(true)

    try {
      // Updated to match new API requirements: requestSwap(mySlotId, theirSlotId, durationPreference)
      await swapsAPI.requestSwap(selectedMySlot, event._id, durationPreference)
      setShowSwapForm(false)
      setSelectedMySlot("")
      setDurationPreference("keep_mine")
      if (onSwapRequested) onSwapRequested()
      alert("Swap request sent successfully!")
    } catch (error) {
      console.error("Failed to request swap:", error)
      alert(error.response?.data?.error || "Failed to send swap request")
    } finally {
      setLoading(false)
    }
  }

  if (!event) return null

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{event.title}</h3>
        <span
          style={{
            ...styles.status,
            backgroundColor: event.status === "SWAPPABLE" ? "var(--success)" : event.status === "SWAP_PENDING" ? "var(--warning)" : "var(--neutral-400)",
          }}
        >
          {event.status}
        </span>
      </div>

      <div style={styles.info}>
        <p style={styles.infoText}>
          <strong>Provider:</strong> {event.userId?.name}
        </p>
        <p style={styles.infoText}>
          <strong>Start:</strong> {format(new Date(event.startTime), "MMM d, h:mm a")}
        </p>
        <p style={styles.infoText}>
          <strong>End:</strong> {format(new Date(event.endTime), "MMM d, h:mm a")}
        </p>
      </div>

      {!showSwapForm ? (
        <button style={styles.button} onClick={() => setShowSwapForm(true)}>
          Request Swap
        </button>
      ) : (
        <div style={styles.swapForm}>
          <label style={styles.label}>Select your slot to swap:</label>
          <select value={selectedMySlot} onChange={(e) => setSelectedMySlot(e.target.value)} style={styles.select}>
            <option value="">Choose a slot...</option>
            {myEvents
              .filter((event) => event.status === "SWAPPABLE")
              .map((event) => (
                <option key={event._id} value={event._id}>
                  {event.title} - {format(new Date(event.startTime), "MMM d, h:mm a")}
                </option>
              ))}
          </select>
          
          {selectedMySlot && (
            <div style={styles.durationSection}>
              <label style={styles.label}>Duration Preference : </label>
              <div style={styles.radioGroup}>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    value="keep_mine"
                    checked={durationPreference === "keep_mine"}
                    onChange={(e) => setDurationPreference(e.target.value)}
                    style={styles.radio}
                  />
                  Keep my duration ({myDuration} min)
                </label>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    value="use_theirs"
                    checked={durationPreference === "use_theirs"}
                    onChange={(e) => setDurationPreference(e.target.value)}
                    style={styles.radio}
                  />
                  Use their duration ({theirDuration} min)
                </label>
              </div>
            </div>
          )}

          <div style={styles.buttonGroup}>
            <button style={styles.confirmButton} onClick={handleRequestSwap} disabled={loading || !selectedMySlot}>
              {loading ? "Requesting..." : "Confirm Swap"}
            </button>
            <button style={styles.cancelButton} onClick={() => setShowSwapForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: "var(--neutral-800)",
    border: `1px solid var(--neutral-700)`,
    padding: "16px",
    transition: "all 0.2s ease",
    transform: "translateY(0)",
    animation: "fadeIn 0.3s ease-out",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    marginBottom: "12px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "var(--neutral-100)",
  },
  status: {
    padding: "4px 8px",
    fontSize: "11px",
    fontWeight: "600",
    color: "white",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "12px",
  },
  infoText: {
    fontSize: "13px",
    color: "var(--neutral-300)",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "var(--primary)",
    color: "white",
    fontWeight: "600",
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  swapForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    animation: "fadeIn 0.3s ease-out",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--neutral-200)",
  },
  select: {
    padding: "10px",
    backgroundColor: "var(--neutral-700)",
    border: `1px solid var(--neutral-600)`,
    color: "var(--neutral-100)",
    fontSize: "13px",
  },
  durationSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: "var(--neutral-700)",
    padding: "12px",
    border: `1px solid var(--neutral-600)`,
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "var(--neutral-200)",
    cursor: "pointer",
  },
  radio: {
    cursor: "pointer",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
  },
  confirmButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "var(--primary)",
    color: "white",
    fontWeight: "600",
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
  },
  cancelButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "var(--neutral-700)",
    color: "var(--neutral-200)",
    fontWeight: "600",
    fontSize: "13px",
    border: `1px solid var(--neutral-600)`,
    cursor: "pointer",
  },
}

export default MarketplaceSlot
