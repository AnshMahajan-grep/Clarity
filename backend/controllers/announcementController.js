// backend/controllers/announcementController.js
import Announcement from "../models/Announcement.js";
import User from "../models/user.js";

export const createAnnouncement = async (req, res) => {
  try {
    // only verified users allowed (we auto-approved earlier)
    if (!req.user?.isVerified) {
      return res.status(403).json({ error: "Email not verified" });
    }

    const { title, description, deadline, category, resources, batches } = req.body;

    // validate batches - must be an array of numbers
    if (!batches || !Array.isArray(batches) || batches.length === 0) {
      return res.status(400).json({ error: 'Batches are required (e.g. [2027,2028])' });
    }

    const parsedBatches = batches.map((b) => Number(b)).filter((n) => !Number.isNaN(n));
    if (parsedBatches.length === 0) {
      return res.status(400).json({ error: 'Batches must be numeric years' });
    }

    const ann = await Announcement.create({
      title,
      description,
      deadline: deadline ? new Date(deadline) : undefined,
      category,
      resources: resources || [],
      batches: parsedBatches,
      postedBy: req.user._id,
    });
    await ann.populate("postedBy", "name email");
    res.status(201).json(ann);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const now = new Date();
    const filter = {
    deadline: { $gte: now }
    };

    // If a batch is specified (tab click), filter for it
    if (req.query.batch) {
    filter.batches = Number(req.query.batch);
    }

    const anns = await Announcement.find(filter)
    .populate("postedBy", "name email")
    .sort({ deadline: 1 })
    .lean();

    res.json(anns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAnnouncementById = async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id).populate("postedBy", "name email");
    if (!ann || ann.hidden) return res.status(404).json({ error: "Not found" });
    res.json(ann);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addResource = async (req, res) => {
  try {
    const { link } = req.body;
    const ann = await Announcement.findById(req.params.id);
    if (!ann) return res.status(404).json({ error: "Announcement not found" });

    ann.resources.push({ link, addedBy: req.user._id });
    await ann.save();
    await ann.populate("resources.addedBy", "name email");
    res.json(ann);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const confirmAnnouncement = async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id);
    if (!ann) return res.status(404).json({ error: "Announcement not found" });

    // simple increment — you could prevent duplicates by storing who confirmed
    ann.confirmedCount = (ann.confirmedCount || 0) + 1;
    await ann.save();
    res.json({ confirmedCount: ann.confirmedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const ann = await Announcement.findById(req.params.id);
    if (!ann) return res.status(404).json({ error: 'Announcement not found' });

    // Only the user who posted can delete (or extend to admin check)
    if (!req.user || ann.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this announcement' });
    }

    await Announcement.deleteOne({ _id: req.params.id });
    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
