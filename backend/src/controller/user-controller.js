import UserService from "../services/user-service.js";

const userservice = new UserService();
const getAll = async(req, res) => {
    try {
        const users = await userservice.getAll();
        return res.status(200).json({
            users,
            success: true
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}



const signup = async(req, res) => {
    try {
        const user = await userservice.signup(req.body);
        return res.status(200).json({
            data: user,
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        })
    }
}

const login = async (req, res) => {
    try {
        const token = await userservice.login(req.body);
        return res.status(200).json({
            token,
            success: true
        });
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            success: false
        });
    }
};

// Logout
const logout = async (req, res) => {
    try {
        await userservice.logout(req.user);
        return res.status(200).json({
            message: "Logout successful",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

// Get user by ID
const getById = async (req, res) => {
    try {
        const user = await userservice.getById(req.query.id);
        return res.status(200).json({
            data: user,
            success: true
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
            success: false
        });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const user = await userservice.updateUser(req.query.id, req.body);
        return res.status(200).json({
            data: user,
            success: true
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        await userservice.deleteUser(req.query.id);
        return res.status(200).json({
            message: "User deleted",
            success: true
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        });
    }
};

// Change password
const changePassword = async (req, res) => {
    try {
        await userservice.changePassword(req.query.id, req.body);
        return res.status(200).json({
            message: "Password updated",
            success: true
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false
        });
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
}

export default Usercontroller;