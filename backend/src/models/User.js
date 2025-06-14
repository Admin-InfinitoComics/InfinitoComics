import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: true, 
    unique: true
  },
  password : {
    type: String,
    required: true
  },                                      
}, {timestamps: true});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const saltRounds = 10;
        const hashed = await bcrypt.hash(this.password, saltRounds);
        this.password = hashed;
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', UserSchema);
export default User;