// backend/controllers/personalTaskController.js
import PersonalTask from "../models/PersonalTask.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, repeatDaily } = req.body;
    const task = await PersonalTask.create({
      user: req.user._id,
      title,
      description,
      deadline: deadline ? new Date(deadline) : undefined,
      repeatDaily: !!repeatDaily,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyTasks = async (req, res) => {
  try {
    const tasks = await PersonalTask.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await PersonalTask.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ error: "Task not found" });

    const updates = req.body;
    Object.assign(task, updates);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await PersonalTask.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
