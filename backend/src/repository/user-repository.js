import CrudRepository from "./crud-repository.js";
import Account from '../models/User.js'
class UserRepository extends CrudRepository{
    constructor(){
        super(Account);
    }

    async findByEmail(data){
        try {
            const user = await Account.findOne({email:data});
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
     async updateResetPasswordToken(userId, token, expiry) {
    return await User.findByIdAndUpdate(userId, {
      resetPasswordToken: token,
      resetPasswordExpires: expiry,
    });
  }

  async findByResetToken(token) {
    return await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }

  async updatePasswordByResetToken(token, hashedPassword) {
    return await User.findOneAndUpdate(
      { resetPasswordToken: token },
      {
        password: hashedPassword,
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined,
      }
    );
  }
}
export default UserRepository;