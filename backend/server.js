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
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: process.env.CLIENT_URL }));
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

// // Serve frontend in production (simple static serve of Vite build)
// if (process.env.NODE_ENV === 'production') {
//   const distPath = path.resolve('../frontend/dist');
//   app.use(express.static(distPath));

//   // Serve index.html for non-API routes. Use a middleware instead of a string wildcard route
//   // to avoid path-to-regexp errors with patterns like '*'.
//   app.use((req, res, next) => {
//     if (req.path.startsWith('/api')) return next();
//     res.sendFile(path.join(distPath, 'index.html'));
//   });
// }
