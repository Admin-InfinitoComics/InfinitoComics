import express from "express";
import upload from "../middleware/multer.js";

import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controller/timeline-controller.js";

const router = express.Router();

// Only admins can use these endpoints (now the endpoints are open to all)
router.post("/create", upload.single("image"), createEvent);
router.get("/getAll",  getAllEvents);
router.get("/:id",  getEventById);
router.put("/update/:id", upload.single("image"), updateEvent);
router.delete("/delete/:id",  deleteEvent);

export default router;