import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import personalTaskRoutes from "./routes/personalTaskRoutes.js";


import path from 'path';
dotenv.config({ path: path.resolve('../.env') });

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/tasks", personalTaskRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Clarity Backend Running 🚀');
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
