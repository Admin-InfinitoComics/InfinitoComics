import express from "express";
const router = express.Router();
import Usercontroller from "../controller/user-controller.js";
// Create (Register)
router.post('/signup', Usercontroller.signup)
// Read (All users)
router.get('/getall', Usercontroller.getAll);

// Read (Single user by ID)
router.get('/getById', Usercontroller.getById);

// Update (user by ID)
router.put('/update', Usercontroller.updateUser);

// Delete (user by ID)
router.delete('/delete', Usercontroller.deleteUser);

// Login (auth)
router.post('/login', Usercontroller.login);

// Optional: Logout
router.post('/logout', Usercontroller.logout);

// Optional: Change password
router.post('/change-password', Usercontroller.changePassword);

export default router;