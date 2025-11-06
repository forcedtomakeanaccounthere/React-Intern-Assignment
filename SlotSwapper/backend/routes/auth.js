import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body
    
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" })
    }
    
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ error: "Email already exists" })

    const user = new User({ name, email, password })
    await user.save()

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables")
      return res.status(500).json({ error: "Server configuration error" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.json({ token, userId: user._id, name: user.name })
  } catch (error) {
    console.error("Signup error:", error)
    res.status(500).json({ error: error.message })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }
    
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: "Invalid email or password" })

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" })

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables")
      return res.status(500).json({ error: "Server configuration error" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.json({ token, userId: user._id, name: user.name })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: error.message })
  }
})

export default router
