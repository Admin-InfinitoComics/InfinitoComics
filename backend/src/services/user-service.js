import UserRepository from "../repository/user-repository.js";
import jwt from "jsonwebtoken";
import config from "../config/server-config.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "../utils/sendEmail.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async signup(data) {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) throw new Error("User is already registered");
    // ⚠️ Password is stored as-is (plain text)
    return await this.userRepository.create(data);
  }

  async login(data) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) throw new Error("Invalid email");

    // ⚠️ Direct string compare
    if (data.password !== user.password) throw new Error("Invalid password");

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, config.JWT_SECRET_KEY, {
      expiresIn: config.JWT_EXPIRY_DATE,
    });

    return { token, user };
  }

  async logout(user) {
    return true;
  }

  async getById(id) {
    return await this.userRepository.getById(id);
  }

  async updateUser(id, data) {
    return await this.userRepository.findByIdandUpdate(id, data);
  }

  async deleteUser(id) {
    return await this.userRepository.findByIdandDelete(id);
  }

  async changePassword(id, data) {
    const user = await this.userRepository.getById(id);
    if (data.oldPassword !== user.password) throw new Error("Old password does not match");
    return await this.userRepository.findByIdandUpdate(id, { password: data.newPassword });
  }

  async getProfile(id) {
    return await this.userRepository.getProfile(id);
  }

  async generateResetToken(email) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const token = uuidv4();
    const expiry = Date.now() + 3600000;
    await this.userRepository.updateResetPasswordToken(user._id, token, expiry);

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    return resetLink;
  }

  async resetPassword(token, password, confirmPassword) {
    const user = await this.userRepository.findByResetToken(token);
    if (!user) throw new Error("Invalid or expired token");
    if (password !== confirmPassword) throw new Error("Passwords do not match");

    // ⚠️ No hashing — save plain text
    await this.userRepository.updatePasswordByResetToken(token, password);
  }

  async forgotPassword(email) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000;

    await this.userRepository.updateOtp(user._id, otp, expiry);
    await sendEmail(email, "Your OTP", `Your OTP is: ${otp}`);
  }

  async verifyOtp(email, otp) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.otp || !user.otpExpiry) throw new Error("No OTP. Request again.");

    if (user.otp !== otp) throw new Error("Invalid OTP");
    if (user.otpExpiry < Date.now()) {
      await this.userRepository.clearOtp(user._id);
      throw new Error("OTP expired");
    }

    await this.userRepository.setOtpVerified(user._id);
  }

  async resetPasswordOtp(email, newPassword, confirmPassword) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");
    if (!user.isOtpVerified) throw new Error("OTP not verified");
    if (newPassword !== confirmPassword) throw new Error("Passwords do not match");

    // ⚠️ No hashing — save plain text
    await this.userRepository.updatePasswordAndClearOtp(user._id, newPassword);
  }
}

export default UserService;
