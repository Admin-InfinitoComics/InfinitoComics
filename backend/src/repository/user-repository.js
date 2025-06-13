import CrudRepository from "./crud-repository.js";
import User from '../models/User.js'
class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async findByEmail(data){
        try {
            const user = await User.findOne({email:data});
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
export default UserRepository;