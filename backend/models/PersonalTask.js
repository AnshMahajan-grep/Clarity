// backend/models/PersonalTask.js
import mongoose from "mongoose";

const PersonalTaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  deadline: { type: Date },
  status: { type: String, enum: ["pending", "done"], default: "pending" },
  repeatDaily: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("PersonalTask", PersonalTaskSchema);
