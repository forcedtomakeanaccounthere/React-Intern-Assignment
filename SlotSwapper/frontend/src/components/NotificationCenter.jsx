"use client"

import { useState } from "react"
import useSWR from "swr"
import { eventsAPI, swapsAPI } from "../api/client"
import SwapRequestCard from "./SwapRequestCard"
import MarketplaceSlot from "./MarketplaceSlot"

const NotificationCenter = ({ userId, showRequests = false }) => {
  const [selectedSlot, setSelectedSlot] = useState(null)

  const { data: swappableEvents = [] } = useSWR(!showRequests ? "/events/swappable" : null, () =>
    eventsAPI.getSwappableEvents(),
  )

  const { data: incomingRequests = [], mutate: mutateIncoming } = useSWR(showRequests ? "/swaps/incoming" : null, () =>
    swapsAPI.getIncomingRequests(),
  )

  const { data: outgoingRequests = [], mutate: mutateOutgoing } = useSWR(showRequests ? "/swaps/outgoing" : null, () =>
    swapsAPI.getOutgoingRequests(),
  )

  const handleRequestResponse = async (requestId, status) => {
    try {
      await swapsAPI.respondToSwap(requestId, status)
      mutateIncoming()
    } catch (error) {
      console.error("Failed to respond to swap:", error)
    }
  }

  const handleCancelRequest = async (requestId) => {
    try {
      await swapsAPI.cancelSwap(requestId)
      mutateOutgoing()
    } catch (error) {
      console.error("Failed to cancel swap:", error)
    }
  }

  return (
    <div style={styles.container}>
      {!showRequests ? (
        <div style={styles.grid}>
          {swappableEvents.length === 0 ? (
            <div style={styles.empty}>No available slots at the moment</div>
          ) : (
            swappableEvents.map((slot) => (
              <MarketplaceSlot key={slot._id} slot={slot} onSelect={() => setSelectedSlot(slot)} />
            ))
          )}
        </div>
      ) : (
        <div style={styles.requestsContainer}>
          <div style={styles.requestsSection}>
            <h3 style={styles.sectionTitle}>Incoming Requests</h3>
            <div style={styles.requestsList}>
              {incomingRequests.length === 0 ? (
                <div style={styles.empty}>No incoming requests</div>
              ) : (
                incomingRequests.map((req) => (
                  <SwapRequestCard
                    key={req._id}
                    request={req}
                    type="incoming"
                    onAccept={() => handleRequestResponse(req._id, "accepted")}
                    onReject={() => handleRequestResponse(req._id, "rejected")}
                  />
                ))
              )}
            </div>
          </div>

          <div style={styles.requestsSection}>
            <h3 style={styles.sectionTitle}>Outgoing Requests</h3>
            <div style={styles.requestsList}>
              {outgoingRequests.length === 0 ? (
                <div style={styles.empty}>No outgoing requests</div>
              ) : (
                outgoingRequests.map((req) => (
                  <SwapRequestCard
                    key={req._id}
                    request={req}
                    type="outgoing"
                    onCancel={() => handleCancelRequest(req._id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
  },
  empty: {
    padding: "40px",
    textAlign: "center",
    color: "var(--neutral-400)",
    backgroundColor: "var(--neutral-800)",
    border: `1px solid var(--neutral-700)`,
    gridColumn: "1 / -1",
  },
  requestsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  requestsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "var(--neutral-100)",
  },
  requestsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
}

export default NotificationCenter
