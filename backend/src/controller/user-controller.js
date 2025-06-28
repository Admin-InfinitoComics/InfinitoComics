import UserService from "../services/user-service.js";

const userservice = new UserService();

const getAll = async (req, res) => {
  try {
    const users = await userservice.getAll();
    res.status(200).json({ users, success: true });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signup = async (req, res) => {
  try {
    const user = await userservice.signup(req.body);
    res.status(200).json({ data: user, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const token = await userservice.login(req.body);
    res.status(200).json({ token, success: true });
  } catch (error) {
    res.status(401).json({ message: error.message, success: false });
  }
};

const logout = async (req, res) => {
  try {
    await userservice.logout(req.user);
    res.status(200).json({ message: "Logout successful", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getById = async (req, res) => {
  try {
    const user = await userservice.getById(req.query.id);
    res.status(200).json({ data: user, success: true });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userservice.updateUser(req.query.id, req.body);
    res.status(200).json({ data: user, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userservice.deleteUser(req.query.id);
    res.status(200).json({ message: "User deleted", success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const changePassword = async (req, res) => {
  try {
    await userservice.changePassword(req.query.id, req.body);
    res.status(200).json({ message: "Password updated", success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

// ✅ OTP-based forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await userservice.forgotPassword(email);
    res.status(200).json({ message: "OTP sent to email", success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

// ✅ OTP verify
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    await userservice.verifyOtp(email, otp);
    res.status(200).json({ message: "OTP verified", success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

// ✅ Reset password using verified OTP
const resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  try {
    await userservice.resetPasswordOtp(email, newPassword, confirmPassword);
    res.status(200).json({ message: "Password has been reset successfully", success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

const Usercontroller = {
  signup,
  login,
  logout,
  getAll,
  getById,
  updateUser,
  deleteUser,
  changePassword,
  forgotPassword,
  verifyOtp,
  resetPassword,
};

export default Usercontroller;
