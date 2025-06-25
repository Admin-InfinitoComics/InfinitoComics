import express from "express";
import controller from "../controller/researchPaper-controller.js";

const router = express.Router();

router.post("/", controller.createResearchPaper);
router.get("/", controller.getAllResearchPapers);
router.get("/:id", controller.getResearchPaperById);
router.delete("/:id", controller.deleteResearchPaper);
router.put("/:id", controller.updateResearchPaper);

export default router;
