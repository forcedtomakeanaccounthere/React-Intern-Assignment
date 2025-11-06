import mongoose from "mongoose"

const swapRequestSchema = new mongoose.Schema({
  initiatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  initiatorSlotId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  recipientSlotId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  status: { type: String, enum: ["PENDING", "ACCEPTED", "REJECTED", "CANCELLED"], default: "PENDING" },
  durationPreference: { type: String, enum: ["keep_mine", "use_theirs"], default: "keep_mine" },
  createdAt: { type: Date, default: Date.now },
  respondedAt: { type: Date },
})

swapRequestSchema.index({ recipientId: 1, status: 1 })
swapRequestSchema.index({ initiatorId: 1, status: 1 })

export default mongoose.model("SwapRequest", swapRequestSchema)
