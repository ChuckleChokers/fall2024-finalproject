// Import dependencies
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3010;

// Middleware
app.use(cors());
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// User Schema and Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  lastLoggedIn: { type: Date, default: null },
  createdDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// Routes

// Basic route
app.get("/", (req, res) => {
  res.send("Backend server running!");
});

// Authentication route
app.post("/api/auth", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    user.lastLoggedIn = new Date();
    await user.save();

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Weather route
app.get("/api/curweather", async (req, res) => {
  const zip = req.query.zip;
  const apiKey = "bf28e2ec66f8261604d86477ac848673"; // OpenWeatherMap API key

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&units=imperial&appid=${apiKey}`
    );
    const data = await response.json();

    if (data.cod === 200) {
      res.json(data);
    } else {
      res.status(400).json({ error: "Invalid ZIP Code" });
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
