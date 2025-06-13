import UserRepository from "../repository/user-repository.js";

class UserService {
    constructor() {
        this.userrepository = new UserRepository();
    }

    async getAll() {
        try {
            return await this.userrepository.getAll();
        } catch (error) {
            console.log("Error in getAll - UserService");
            throw error;
        }
    }

    async signup(data) {
        try {
            return await this.userrepository.create(data);
        } catch (error) {
            console.log("Error in signup - UserService");
            throw error;
        }
    }

    async login(data) {
        try {
            const user = await this.userrepository.findByEmail(data.email);
            if (!user) {
                throw new Error("Invalid email");
            }
            const isMatch = await user.comparePassword(data.password);
            if (!isMatch) {
                throw new Error("Invalid password");
            }
            return "mock-token";
        } catch (error) {
            console.log("Error in login - UserService");
            throw error;
        }
    }

    async logout(user) {
        try {
            // For token-based auth, blacklist the token or do nothing
            return true;
        } catch (error) {
            console.log("Error in logout - UserService");
            throw error;
        }
    }

    async getById(id) {
        try {
            const details =  await this.userrepository.getById(id);
            return details;
        } catch (error) {
            console.log("Error in getById - UserService");
            throw error;
        }
    }

    async updateUser(id, data) {
        try {
            return await this.userrepository.findByIdandUpdate(id, data);
        } catch (error) {
            console.log("Error in updateUser - UserService");
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            return await this.userrepository.findByIdandDelete(id);
        } catch (error) {
            console.log("Error in deleteUser - UserService");
            throw error;
        }
    }

    async changePassword(id, data) {
        try {
            const user = await this.userrepository.getById(id);
            if (user.password !== data.oldPassword) {
                throw new Error("Old password does not match");
            }
            return await this.userrepository.findByIdandUpdate(id, { password: data.newPassword });
        } catch (error) {
            console.log("Error in changePassword - UserService");
            throw error;
        }
    }

    async getProfile(id) {
        try {
            return await this.userrepository.getProfile(id);
        } catch (error) {
            console.log("Error in getProfile - UserService");
            throw error;
        }
    }
}

export default UserService;
