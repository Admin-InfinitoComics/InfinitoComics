import bcrypt from "bcryptjs";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

// ✅ Step 1: Forgot Password - Generate OTP
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
    user.isOtpVerified = false; // custom flag
    await user.save();

    await sendEmail(email, "Password Reset OTP", `Your OTP: ${otp}`);
    res.json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Step 2: Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email & OTP required" });

    const user = await User.findOne({ email });
    if (!user || !user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: "OTP not found. Request again." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
      return res.status(400).json({ message: "OTP expired" });
    }

    // Mark verified
    user.isOtpVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // ✅ Tell frontend: verified, go to reset page.
    res.json({ message: "OTP verified. You may now reset your password." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Step 3: Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Only allow if verified
    if (!user.isOtpVerified) {
      return res.status(403).json({ message: "OTP not verified. Please verify first." });
    }

    // ✅ Update password - use pre-save hook to hash
    user.password = newPassword;
    user.isOtpVerified = false; // clear flag
    await user.save();

    res.json({ message: "Password reset successful." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// import dotenv from 'dotenv';
// import crypto from 'crypto';
// import User from '../models/User'; // Use consistent name: User
// import { isEmpty } from '../utils/object_isEmpty';
// import AppError from '../utils/error';
// import bcrypt from 'bcryptjs';
// import { FORGOT_PASSWORD_MODEL, RESET_PASSWORD_MODEL } from '../routes/index';
// import nodemailer from 'nodemailer';

// dotenv.config(); // Load env vars

// /**
//  * @desc    Forgot Password - Generate & email OTP
//  */
// export const user_forgotPassword = async (req, res, next) => {
//   if (isEmpty(req.body)) return next(new AppError('Form data not found', 400));

//   try {
//     const { error } = FORGOT_PASSWORD_MODEL.validate(req.body);
//     if (error) return next(new AppError(error.details[0].message, 400));

//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return next(new AppError('User does not exist', 400));

//     // Use crypto for better randomness
//     const otp = crypto.randomInt(1000, 9999).toString();
//     const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins expiry

//     user.otp = otp;
//     user.otpExpiry = otpExpiry;
//     await user.save();

//     // Setup mail transport (better to use environment configs)
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Password Reset OTP',
//       text: `Your OTP (valid for 5 minutes): ${otp}`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({ message: 'OTP sent to your email' });
//   } catch (err) {
//     next(new AppError(err.message || 'Server Error', 500));
//   }
// };

// /**
//  * @desc    Reset Password - Validate OTP & update password
//  */
// export const user_resetPassword = async (req, res, next) => {
//   if (isEmpty(req.body)) return next(new AppError('Form data not found', 400));

//   try {
//     const { error } = RESET_PASSWORD_MODEL.validate(req.body);
//     if (error) return next(new AppError(error.details[0].message, 400));

//     const { password, confirmPassword, otp } = req.body;

//     if (password !== confirmPassword) {
//       return next(new AppError('Passwords do not match', 400));
//     }

//     // Find user with valid OTP
//     const user = await User.findOne({
//       otp,
//       otpExpiry: { $gt: new Date() },
//     });

//     if (!user) return next(new AppError('Invalid or expired OTP', 400));

//     // Update password: set raw value — pre-save hook will hash it
//     user.password = password;
//     user.otp = null;
//     user.otpExpiry = null;

//     await user.save();

//     res.json({ message: 'Password reset successful' });
//   } catch (err) {
//     next(new AppError(err.message || 'Server Error', 500));
//   }
// };
