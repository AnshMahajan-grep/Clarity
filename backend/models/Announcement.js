// backend/models/Announcement.js
import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema({
  link: { type: String },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  addedAt: { type: Date, default: Date.now },
});

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  batches: {type: [Number],required: true},
  description: { type: String, default: "" },
  deadline: {type: Date,required: true,  },
  category: { type: String, default: "General" },
  resources: { type: [ResourceSchema], default: [] },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  confirmedCount: { type: Number, default: 0 },
  hidden: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Announcement", AnnouncementSchema);
