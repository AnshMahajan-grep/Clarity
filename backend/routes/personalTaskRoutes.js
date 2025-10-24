// backend/routes/personalTaskRoutes.js
import express from "express";
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
} from "../controllers/personalTaskController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getMyTasks);
router.post("/", protect, createTask);
router.patch("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;
