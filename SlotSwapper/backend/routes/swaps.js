import express from "express"
import SwapRequest from "../models/SwapRequest.js"
import Event from "../models/Event.js"

const router = express.Router()

/**
 * GET /api/swappable-slots
 * Returns all SWAPPABLE slots from OTHER users (not the logged-in user's own slots)
 */
router.get("/swappable-slots", async (req, res) => {
  try {
    const swappableSlots = await Event.find({
      userId: { $ne: req.userId }, // Exclude logged-in user's slots
      status: "SWAPPABLE", // Only slots marked as SWAPPABLE
    })
      .populate("userId", "name email") // Include user info
      .sort({ startTime: 1 })
    
    res.json(swappableSlots)
  } catch (error) {
    console.error("Error fetching swappable slots:", error)
    res.status(500).json({ error: error.message })
  }
})

/**
 * POST /api/swap-request
 * Creates a swap request
 * Body: { mySlotId, theirSlotId }
 * - Verifies both slots exist and are SWAPPABLE
 * - Creates a SwapRequest with PENDING status
 * - Updates both slots to SWAP_PENDING
 */
router.post("/swap-request", async (req, res) => {
  try {
    const { mySlotId, theirSlotId, durationPreference } = req.body

    if (!mySlotId || !theirSlotId) {
      return res.status(400).json({ error: "mySlotId and theirSlotId are required" })
    }

    // Verify my slot exists, belongs to me, and is SWAPPABLE
    const mySlot = await Event.findOne({ 
      _id: mySlotId, 
      userId: req.userId 
    })

    if (!mySlot) {
      return res.status(404).json({ error: "Your slot not found" })
    }

    if (mySlot.status !== "SWAPPABLE") {
      return res.status(400).json({ error: "Your slot must be SWAPPABLE to initiate a swap" })
    }

    // Verify their slot exists, belongs to another user, and is SWAPPABLE
    const theirSlot = await Event.findOne({ 
      _id: theirSlotId,
      userId: { $ne: req.userId } // Must not be my own slot
    })

    if (!theirSlot) {
      return res.status(404).json({ error: "Their slot not found" })
    }

    if (theirSlot.status !== "SWAPPABLE") {
      return res.status(400).json({ error: "Their slot must be SWAPPABLE" })
    }

    // Check for duplicate pending requests
    const existingRequest = await SwapRequest.findOne({
      $or: [
        { initiatorSlotId: mySlotId, recipientSlotId: theirSlotId, status: "PENDING" },
        { initiatorSlotId: theirSlotId, recipientSlotId: mySlotId, status: "PENDING" },
      ],
    })

    if (existingRequest) {
      return res.status(400).json({ error: "A pending swap request already exists for these slots" })
    }

    // Create the swap request
    const swapRequest = new SwapRequest({
      initiatorId: req.userId,
      recipientId: theirSlot.userId,
      initiatorSlotId: mySlotId,
      recipientSlotId: theirSlotId,
      status: "PENDING",
      durationPreference: durationPreference || "keep_mine",
    })

    await swapRequest.save()

    // Update both slots to SWAP_PENDING
    mySlot.status = "SWAP_PENDING"
    await mySlot.save()

    theirSlot.status = "SWAP_PENDING"
    await theirSlot.save()

    // Populate the response
    await swapRequest.populate([
      { path: "initiatorId", select: "name email" },
      { path: "recipientId", select: "name email" },
      { path: "initiatorSlotId" },
      { path: "recipientSlotId" },
    ])

    res.status(201).json(swapRequest)
  } catch (error) {
    console.error("Error creating swap request:", error)
    res.status(500).json({ error: error.message })
  }
})

/**
 * POST /api/swap-response/:requestId
 * Allows a user to respond to a swap request (accept or reject)
 * Body: { acceptance: true/false }
 * - If rejected: SwapRequest -> REJECTED, both slots -> SWAPPABLE
 * - If accepted: SwapRequest -> ACCEPTED, swap the owners, both slots -> BUSY
 */
router.post("/swap-response/:requestId", async (req, res) => {
  try {
    const { acceptance, selectedTitle } = req.body
    const { requestId } = req.params

    if (typeof acceptance !== "boolean") {
      return res.status(400).json({ error: "acceptance must be a boolean (true/false)" })
    }

    // Find the swap request and verify the user is the recipient
    const swapRequest = await SwapRequest.findOne({
      _id: requestId,
      recipientId: req.userId,
      status: "PENDING",
    })

    if (!swapRequest) {
      return res.status(404).json({ error: "Swap request not found or you don't have permission" })
    }

    // Get both slots
    const initiatorSlot = await Event.findById(swapRequest.initiatorSlotId)
    const recipientSlot = await Event.findById(swapRequest.recipientSlotId)

    if (!initiatorSlot || !recipientSlot) {
      return res.status(400).json({ error: "One or both slots no longer exist" })
    }

    if (acceptance) {
      // ACCEPTED: Swap the owners and set both to BUSY
      const tempUserId = initiatorSlot.userId
      initiatorSlot.userId = recipientSlot.userId
      recipientSlot.userId = tempUserId

      // Apply duration preference
      if (swapRequest.durationPreference === "keep_mine") {
        // Initiator's duration is preserved
        const initiatorDuration = initiatorSlot.endTime - initiatorSlot.startTime
        recipientSlot.endTime = new Date(recipientSlot.startTime.getTime() + initiatorDuration)
      } else if (swapRequest.durationPreference === "use_theirs") {
        // Recipient's duration is used
        const recipientDuration = recipientSlot.endTime - recipientSlot.startTime
        initiatorSlot.endTime = new Date(initiatorSlot.startTime.getTime() + recipientDuration)
      }

      // Apply selected title to both events if provided
      if (selectedTitle) {
        initiatorSlot.title = selectedTitle
        recipientSlot.title = selectedTitle
      }

      initiatorSlot.status = "BUSY"
      recipientSlot.status = "BUSY"

      swapRequest.status = "ACCEPTED"
    } else {
      // REJECTED: Set both slots back to SWAPPABLE
      initiatorSlot.status = "SWAPPABLE"
      recipientSlot.status = "SWAPPABLE"

      swapRequest.status = "REJECTED"
    }

    // Save all changes
    swapRequest.respondedAt = new Date()
    await swapRequest.save()
    await initiatorSlot.save()
    await recipientSlot.save()

    // Populate and return
    await swapRequest.populate([
      { path: "initiatorId", select: "name email" },
      { path: "recipientId", select: "name email" },
      { path: "initiatorSlotId" },
      { path: "recipientSlotId" },
    ])

    res.json(swapRequest)
  } catch (error) {
    console.error("Error responding to swap:", error)
    res.status(500).json({ error: error.message })
  }
})

/**
 * GET /api/swaps/incoming
 * Get all incoming swap requests for the logged-in user
 */
router.get("/incoming", async (req, res) => {
  try {
    const requests = await SwapRequest.find({ recipientId: req.userId })
      .populate("initiatorId", "name email")
      .populate("initiatorSlotId")
      .populate("recipientSlotId")
      .sort({ createdAt: -1 })
    
    res.json(requests)
  } catch (error) {
    console.error("Error fetching incoming requests:", error)
    res.status(500).json({ error: error.message })
  }
})

/**
 * GET /api/swaps/outgoing
 * Get all outgoing swap requests from the logged-in user
 */
router.get("/outgoing", async (req, res) => {
  try {
    const requests = await SwapRequest.find({ initiatorId: req.userId })
      .populate("recipientId", "name email")
      .populate("initiatorSlotId")
      .populate("recipientSlotId")
      .sort({ createdAt: -1 })
    
    res.json(requests)
  } catch (error) {
    console.error("Error fetching outgoing requests:", error)
    res.status(500).json({ error: error.message })
  }
})

/**
 * POST /api/swaps/cancel/:requestId
 * Cancel an outgoing swap request (only if PENDING)
 */
router.post("/cancel/:requestId", async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findOne({
      _id: req.params.requestId,
      initiatorId: req.userId,
      status: "PENDING",
    })

    if (!swapRequest) {
      return res.status(404).json({ error: "Request not found or cannot be cancelled" })
    }

    // Get both slots and set them back to SWAPPABLE
    const initiatorSlot = await Event.findById(swapRequest.initiatorSlotId)
    const recipientSlot = await Event.findById(swapRequest.recipientSlotId)

    if (initiatorSlot) {
      initiatorSlot.status = "SWAPPABLE"
      await initiatorSlot.save()
    }

    if (recipientSlot) {
      recipientSlot.status = "SWAPPABLE"
      await recipientSlot.save()
    }

    swapRequest.status = "CANCELLED"
    await swapRequest.save()

    res.json(swapRequest)
  } catch (error) {
    console.error("Error cancelling request:", error)
    res.status(500).json({ error: error.message })
  }
})

export default router
