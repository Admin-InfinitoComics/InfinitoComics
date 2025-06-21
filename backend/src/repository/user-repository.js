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
}
export default UserRepository;