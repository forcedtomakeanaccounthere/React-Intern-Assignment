import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ["BUSY", "SWAPPABLE", "SWAP_PENDING"], default: "BUSY" },
  recurrence: {
    type: { type: String, enum: ["once", "daily", "weekly", "custom"], default: "once" },
    customDays: [Number], // For custom: [15, 20, 25] means repeat on these days of month
    endDate: Date, // When to stop recurring (optional)
  },
  parentEventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" }, // For recurring instances
  createdAt: { type: Date, default: Date.now },
})

eventSchema.index({ userId: 1, startTime: 1 })
eventSchema.index({ status: 1 })

export default mongoose.model("Event", eventSchema)
