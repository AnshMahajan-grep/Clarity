// backend/routes/announcementRoutes.js
import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  addResource,
  confirmAnnouncement,
} from "../controllers/announcementController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getAnnouncements); // list
router.post("/", protect, createAnnouncement); // create
router.get("/:id", protect, getAnnouncementById);
router.post("/:id/resources", protect, addResource);
router.post("/:id/confirm", protect, confirmAnnouncement);

export default router;
