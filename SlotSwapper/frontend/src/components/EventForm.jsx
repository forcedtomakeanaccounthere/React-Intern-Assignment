"use client"

import { useState, useEffect } from "react"
import { eventsAPI } from "../api/client"
import { format, isPast, startOfDay } from "date-fns"

const EventForm = ({ onEventCreated, selectedDate }) => {
  const [title, setTitle] = useState("")
  const [startTime, setStartTime] = useState(format(selectedDate, "yyyy-MM-dd'T'HH:mm"))
  const [endTime, setEndTime] = useState(format(selectedDate, "yyyy-MM-dd'T'HH:mm"))
  const [status, setStatus] = useState("BUSY")
  const [recurrenceType, setRecurrenceType] = useState("once")
  const [customDays, setCustomDays] = useState("")
  const [endDate, setEndDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [overlapWarning, setOverlapWarning] = useState("")

  // Get minimum datetime (now)
  const minDateTime = format(new Date(), "yyyy-MM-dd'T'HH:mm")

  // Check for overlaps when time changes
  useEffect(() => {
    const checkOverlap = async () => {
      if (!startTime || !endTime) return
      
      const start = new Date(startTime)
      const end = new Date(endTime)
      
      // Skip if invalid dates
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return
      
      // Skip if past date
      if (isPast(startOfDay(start))) {
        setOverlapWarning("Cannot create events in the past")
        return
      }
      
      // Skip if end before start
      if (end <= start) {
        setOverlapWarning("End time must be after start time")
        return
      }

      try {
        // Simple validation - backend will do full check
        setOverlapWarning("")
      } catch (err) {
        console.error("Error checking overlap:", err)
      }
    }

    const debounce = setTimeout(checkOverlap, 500)
    return () => clearTimeout(debounce)
  }, [startTime, endTime])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const eventData = {
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status,
        recurrence: {
          type: recurrenceType,
          customDays: recurrenceType === "custom" ? customDays.split(",").map(d => parseInt(d.trim())).filter(d => !isNaN(d)) : [],
          endDate: endDate ? new Date(endDate) : undefined,
        },
      }

      await eventsAPI.createEvent(eventData)
      onEventCreated()
      setTitle("")
      setStatus("BUSY")
      setRecurrenceType("once")
      setCustomDays("")
      setEndDate("")
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create event")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.formContainer}>
      <h3 style={styles.formTitle}>Create New Event</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.error}>{error}</div>}
        {overlapWarning && <div style={styles.warning}>{overlapWarning}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Event Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
            placeholder="Meeting, Workout, etc."
          />
        </div>

        <div style={styles.timeRow}>
          <div style={styles.timeInputGroup}>
            <label style={styles.label}>Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              min={minDateTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              style={styles.timeInput}
            />
          </div>
          <div style={styles.timeInputGroup}>
            <label style={styles.label}>End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              min={startTime || minDateTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              style={styles.timeInput}
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.input}>
            <option value="BUSY">Busy (Not Swappable)</option>
            <option value="SWAPPABLE">Swappable (Available for Swap)</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Recurrence</label>
          <select value={recurrenceType} onChange={(e) => setRecurrenceType(e.target.value)} style={styles.input}>
            <option value="once">One-time event</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="custom">Custom days of month</option>
          </select>
        </div>

        {recurrenceType === "custom" && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>Days of Month (comma-separated)</label>
            <input
              type="text"
              value={customDays}
              onChange={(e) => setCustomDays(e.target.value)}
              style={styles.input}
              placeholder="e.g., 1, 15, 30"
            />
          </div>
        )}

        {recurrenceType !== "once" && (
          <div style={styles.inputGroup}>
            <label style={styles.label}>Repeat Until</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={styles.input}
            />
          </div>
        )}

        <button type="submit" disabled={loading} style={styles.submitButton}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  )
}

const styles = {
  formContainer: {
    backgroundColor: "var(--neutral-800)",
    border: `1px solid var(--neutral-700)`,
    padding: "20px",
    marginBottom: "20px",
  },
  formTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "var(--neutral-100)",
    marginBottom: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
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
    padding: "10px",
    backgroundColor: "var(--neutral-700)",
    border: `1px solid var(--neutral-600)`,
    color: "var(--neutral-100)",
    fontSize: "14px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  error: {
    padding: "12px",
    backgroundColor: "var(--error)",
    color: "white",
    fontSize: "13px",
    borderRadius: "4px",
  },
  warning: {
    padding: "12px",
    backgroundColor: "#ff9800",
    color: "white",
    fontSize: "13px",
    borderRadius: "4px",
  },
  timeRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    padding: "12px",
    backgroundColor: "var(--neutral-750)",
    border: `1px solid var(--neutral-600)`,
    borderRadius: "6px",
  },
  timeInputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  timeInput: {
    padding: "12px",
    backgroundColor: "var(--neutral-700)",
    border: `1px solid var(--neutral-600)`,
    color: "var(--neutral-100)",
    fontSize: "14px",
    borderRadius: "4px",
  },
  submitButton: {
    padding: "12px",
    backgroundColor: "var(--primary)",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
}

export default EventForm
