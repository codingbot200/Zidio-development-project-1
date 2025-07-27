const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const multer = require("multer")
const path = require("path")

// Import routes
const authRoutes = require("./routes/auth")
const fileRoutes = require("./routes/files")
const analyticsRoutes = require("./routes/analytics")
const adminRoutes = require("./routes/admin")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5040;

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb+srv://greeshmasri1216:mern@cluster1.brizbuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/files", fileRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/admin", adminRoutes)

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({ message: "Something went wrong!" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})