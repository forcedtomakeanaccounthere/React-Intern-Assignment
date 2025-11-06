"use client"
import { format } from "date-fns"
import { useState } from "react"

const SwapRequestCard = ({ request, type, onAccept, onReject, onCancel }) => {
  const [showTitleSelect, setShowTitleSelect] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState("")

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case "ACCEPTED":
        return "var(--success)"
      case "REJECTED":
        return "var(--error)"
      case "PENDING":
        return "var(--warning)"
      case "CANCELLED":
        return "var(--neutral-400)"
      default:
        return "var(--neutral-400)"
    }
  }

  const otherUser = type === "incoming" ? request.initiatorId : request.recipientId
  
  const yourTitle = type === "incoming" ? request.recipientSlotId?.title : request.initiatorSlotId?.title
  const theirTitle = type === "incoming" ? request.initiatorSlotId?.title : request.recipientSlotId?.title

  const handleAcceptClick = () => {
    setShowTitleSelect(true)
  }

  const handleConfirmAccept = () => {
    onAccept(selectedTitle || yourTitle)
    setShowTitleSelect(false)
  }

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <p style={styles.userName}>{otherUser?.name}</p>
          <p style={styles.userEmail}>{otherUser?.email}</p>
        </div>
        <span style={{ ...styles.status, backgroundColor: getStatusColor(request.status) }}>{request.status}</span>
      </div>

      <div style={styles.swapInfo}>
        <div style={styles.slot}>
          <p style={styles.label}>Your Slot</p>
          <p style={styles.eventTitle}>{yourTitle}</p>
          <p style={styles.eventTime}>
            {format(
              new Date(type === "incoming" ? request.recipientSlotId?.startTime : request.initiatorSlotId?.startTime),
              "MMM d, h:mm a",
            )}
          </p>
        </div>

        <div style={styles.arrow}>↔</div>

        <div style={styles.slot}>
          <p style={styles.label}>Their Slot</p>
          <p style={styles.eventTitle}>{theirTitle}</p>
          <p style={styles.eventTime}>
            {format(
              new Date(type === "incoming" ? request.initiatorSlotId?.startTime : request.recipientSlotId?.startTime),
              "MMM d, h:mm a",
            )}
          </p>
        </div>
      </div>

      {request.durationPreference && (
        <div style={styles.durationInfo}>
          <span style={styles.durationLabel}>Duration Preference : </span> 
          <span style={styles.durationValue}>
            {request.durationPreference === "keep_mine" 
              ? "Keep initiator's duration" 
              : "Use recipient's duration"}
          </span>
        </div>
      )}

      {request.status === "PENDING" && type === "incoming" && !showTitleSelect && (
        <div style={styles.buttonGroup}>
          <button style={styles.acceptButton} onClick={handleAcceptClick}>
            Accept
          </button>
          <button style={styles.rejectButton} onClick={onReject}>
            Reject
          </button>
        </div>
      )}

      {request.status === "PENDING" && type === "incoming" && showTitleSelect && (
        <div style={styles.titleSelectContainer}>
          <p style={styles.titleSelectLabel}>Choose event title after swap:</p>
          <select 
            value={selectedTitle} 
            onChange={(e) => setSelectedTitle(e.target.value)} 
            style={styles.titleSelect}
          >
            <option value={yourTitle}>Keep your title: "{yourTitle}"</option>
            <option value={theirTitle}>Use their title: "{theirTitle}"</option>
          </select>
          <div style={styles.buttonGroup}>
            <button style={styles.acceptButton} onClick={handleConfirmAccept}>
              Confirm Accept
            </button>
            <button style={styles.rejectButton} onClick={() => setShowTitleSelect(false)}>
              Back
            </button>
          </div>
        </div>
      )}

      {request.status === "PENDING" && type === "outgoing" && (
        <button style={styles.cancelButton} onClick={onCancel}>
          Cancel Request
        </button>
      )}
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: "var(--neutral-800)",
    border: `1px solid var(--neutral-700)`,
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "var(--neutral-100)",
  },
  userEmail: {
    fontSize: "12px",
    color: "var(--neutral-400)",
  },
  status: {
    padding: "4px 8px",
    fontSize: "11px",
    fontWeight: "600",
    color: "white",
  },
  swapInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  slot: {
    flex: 1,
    backgroundColor: "var(--neutral-700)",
    padding: "12px",
    border: `1px solid var(--neutral-600)`,
  },
  label: {
    fontSize: "11px",
    fontWeight: "600",
    color: "var(--neutral-400)",
    textTransform: "uppercase",
    marginBottom: "4px",
  },
  eventTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "var(--neutral-100)",
  },
  eventTime: {
    fontSize: "12px",
    color: "var(--neutral-400)",
  },
  arrow: {
    fontSize: "18px",
    color: "var(--primary)",
    fontWeight: "bold",
  },
  durationInfo: {
    backgroundColor: "var(--neutral-700)",
    padding: "10px",
    border: `1px solid var(--neutral-600)`,
    fontSize: "12px",
    color: "var(--neutral-300)",
  },
  durationLabel: {
    fontWeight: "600",
    color: "var(--neutral-200)",
  },
  durationValue: {
    color: "var(--primary)",
    fontWeight: "500",
  },
  buttonGroup: {
    display: "flex",
    gap: "8px",
  },
  titleSelectContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: "var(--neutral-700)",
    padding: "12px",
    border: `1px solid var(--neutral-600)`,
  },
  titleSelectLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--neutral-200)",
  },
  titleSelect: {
    padding: "8px",
    backgroundColor: "var(--neutral-800)",
    border: `1px solid var(--neutral-600)`,
    color: "var(--neutral-100)",
    fontSize: "13px",
  },
  acceptButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "var(--success)",
    color: "white",
    fontWeight: "600",
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
  },
  rejectButton: {
    flex: 1,
    padding: "10px",
    backgroundColor: "var(--error)",
    color: "white",
    fontWeight: "600",
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
  },
  cancelButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "var(--error)",
    color: "white",
    fontWeight: "600",
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
  },
}

export default SwapRequestCard
