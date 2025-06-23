// ✅ routes/index.js (Full and Fixed)

import express from "express";
import { forgotPassword, verifyOtp, resetPassword } from "../controller/authController.js";
import Usercontroller from "../controller/user-controller.js";
import { submitErrorReport, getAllErrorReports } from "../controller/error-report-controller.js";
import { submitFeedback, getAllFeedbacks } from "../controller/feedback-controller.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// 🔐 Auth Routes
router.post("/signup", Usercontroller.signup);
router.post("/login", Usercontroller.login);
router.post("/logout", Usercontroller.logout);
router.post("/change-password", Usercontroller.changePassword);

// 📋 CRUD Routes for Users
router.get("/getall", Usercontroller.getAll);
router.get("/getById", Usercontroller.getById);
router.put("/update", Usercontroller.updateUser);
router.delete("/delete", Usercontroller.deleteUser);

// 🔄 Forgot/Reset Password Flow
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

// 🐞 Error Reporting (Protected)
router.post("/report", authenticate, submitErrorReport);
router.get("/report", authenticate, getAllErrorReports);

// 💬 Feedback Routes (Protected)
router.post("/feedback", authenticate, submitFeedback);
router.get("/feedback", authenticate, getAllFeedbacks);

export default router;
