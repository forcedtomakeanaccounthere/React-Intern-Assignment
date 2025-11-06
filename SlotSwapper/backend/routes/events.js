import express from "express"
import Event from "../models/Event.js"

const router = express.Router()

// Create a new event (slot)
router.post("/", async (req, res) => {
  try {
    const { title, startTime, endTime, status, recurrence } = req.body
    
    // Validate required fields
    if (!title || !startTime || !endTime) {
      return res.status(400).json({ error: "Title, startTime, and endTime are required" })
    }

    const start = new Date(startTime)
    const end = new Date(endTime)
    const duration = end - start

    // Check for time overlaps with existing events
    const existingEvents = await Event.find({
      userId: req.userId,
      $or: [
        { startTime: { $lt: end, $gte: start } },
        { endTime: { $gt: start, $lte: end } },
        { startTime: { $lte: start }, endTime: { $gte: end } }
      ]
    })

    if (existingEvents.length > 0) {
      return res.status(400).json({ 
        error: "Time conflict detected",
        conflicts: existingEvents.map(e => ({
          title: e.title,
          startTime: e.startTime,
          endTime: e.endTime
        }))
      })
    }

    // Handle recurrence
    const recurrenceType = recurrence?.type || "once"
    const eventsToCreate = []

    if (recurrenceType === "once") {
      // Single event
      eventsToCreate.push({
        userId: req.userId,
        title,
        startTime: start,
        endTime: end,
        status: status || "BUSY",
        recurrence: { type: "once" }
      })
    } else {
      // Recurring events
      const recurrenceEndDate = recurrence.endDate ? new Date(recurrence.endDate) : new Date(start.getTime() + 365 * 24 * 60 * 60 * 1000) // Default 1 year
      let currentDate = new Date(start)

      if (recurrenceType === "daily") {
        while (currentDate <= recurrenceEndDate) {
          const eventStart = new Date(currentDate)
          const eventEnd = new Date(eventStart.getTime() + duration)
          
          eventsToCreate.push({
            userId: req.userId,
            title,
            startTime: eventStart,
            endTime: eventEnd,
            status: status || "BUSY",
            recurrence: { type: "daily", endDate: recurrenceEndDate }
          })
          
          currentDate.setDate(currentDate.getDate() + 1)
        }
      } else if (recurrenceType === "weekly") {
        while (currentDate <= recurrenceEndDate) {
          const eventStart = new Date(currentDate)
          const eventEnd = new Date(eventStart.getTime() + duration)
          
          eventsToCreate.push({
            userId: req.userId,
            title,
            startTime: eventStart,
            endTime: eventEnd,
            status: status || "BUSY",
            recurrence: { type: "weekly", endDate: recurrenceEndDate }
          })
          
          currentDate.setDate(currentDate.getDate() + 7)
        }
      } else if (recurrenceType === "custom" && recurrence.customDays?.length > 0) {
        const customDays = recurrence.customDays
        let currentMonth = new Date(start.getFullYear(), start.getMonth(), 1)
        
        while (currentMonth <= recurrenceEndDate) {
          for (const day of customDays) {
            const eventDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
            if (eventDate >= start && eventDate <= recurrenceEndDate) {
              const eventStart = new Date(eventDate.setHours(start.getHours(), start.getMinutes(), 0, 0))
              const eventEnd = new Date(eventStart.getTime() + duration)
              
              eventsToCreate.push({
                userId: req.userId,
                title,
                startTime: eventStart,
                endTime: eventEnd,
                status: status || "BUSY",
                recurrence: { type: "custom", customDays, endDate: recurrenceEndDate }
              })
            }
          }
          currentMonth.setMonth(currentMonth.getMonth() + 1)
        }
      }
    }

    // Create all events
    const createdEvents = await Event.insertMany(eventsToCreate)
    res.status(201).json(createdEvents)
  } catch (error) {
    console.error("Error creating event:", error)
    res.status(500).json({ error: error.message })
  }
})

// Get all events for the logged-in user
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ userId: req.userId }).sort({ startTime: 1 })
    res.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    res.status(500).json({ error: error.message })
  }
})

// Update an event (e.g., change status from BUSY to SWAPPABLE)
router.put("/:id", async (req, res) => {
  try {
    const { title, startTime, endTime, status } = req.body
    
    // Find event and verify ownership
    const event = await Event.findOne({ _id: req.params.id, userId: req.userId })
    if (!event) {
      return res.status(404).json({ error: "Event not found or you don't have permission" })
    }

    // Update fields
    if (title) event.title = title
    if (startTime) event.startTime = new Date(startTime)
    if (endTime) event.endTime = new Date(endTime)
    if (status && ["BUSY", "SWAPPABLE", "SWAP_PENDING"].includes(status)) {
      event.status = status
    }
    
    await event.save()
    res.json(event)
  } catch (error) {
    console.error("Error updating event:", error)
    res.status(500).json({ error: error.message })
  }
})

// Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, userId: req.userId })
    if (!event) {
      return res.status(404).json({ error: "Event not found or you don't have permission" })
    }
    res.json({ success: true, message: "Event deleted successfully" })
  } catch (error) {
    console.error("Error deleting event:", error)
    res.status(500).json({ error: error.message })
  }
})

export default router
