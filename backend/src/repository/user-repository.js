import CrudRepository from "./crud-repository.js";
import User from "../models/User.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    try {
      return await User.findOne({ email: email });
    } catch (error) {
      console.log("Error in findByEmail:", error);
      throw error;
    }
  }

  async updateResetPasswordToken(userId, token, expiry) {
    try {
      return await User.findByIdAndUpdate(userId, {
        resetPasswordToken: token,
        resetPasswordExpires: expiry,
      });
    } catch (error) {
      console.log("Error in updateResetPasswordToken:", error);
      throw error;
    }
  }

  async findByResetToken(token) {
    try {
      return await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
    } catch (error) {
      console.log("Error in findByResetToken:", error);
      throw error;
    }
  }

  async updatePasswordByResetToken(token, hashedPassword) {
    try {
      return await User.findOneAndUpdate(
        { resetPasswordToken: token },
        {
          password: hashedPassword,
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined,
        }
      );
    } catch (error) {
      console.log("Error in updatePasswordByResetToken:", error);
      throw error;
    }
  }

  async updateOtp(userId, otp, expiry) {
    try {
      return await User.findByIdAndUpdate(userId, {
        otp: otp,
        otpExpiry: expiry,
        isOtpVerified: false,
      });
    } catch (error) {
      console.log("Error in updateOtp:", error);
      throw error;
    }
  }

  async clearOtp(userId) {
    try {
      return await User.findByIdAndUpdate(userId, {
        otp: undefined,
        otpExpiry: undefined,
        isOtpVerified: false,
      });
    } catch (error) {
      console.log("Error in clearOtp:", error);
      throw error;
    }
  }

  async setOtpVerified(userId) {
    try {
      return await User.findByIdAndUpdate(userId, {
        isOtpVerified: true,
        otp: undefined,
        otpExpiry: undefined,
      });
    } catch (error) {
      console.log("Error in setOtpVerified:", error);
      throw error;
    }
  }

  async updatePasswordAndClearOtp(userId, hashedPassword) {
    try {
      return await User.findByIdAndUpdate(userId, {
        password: hashedPassword,
        isOtpVerified: false,
        otp: undefined,
        otpExpiry: undefined,
      });
    } catch (error) {
      console.log("Error in updatePasswordAndClearOtp:", error);
      throw error;
    }
  }
}

export default UserRepository;
