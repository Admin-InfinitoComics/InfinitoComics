import Blog from "../models/Blog.js";
import CrudRepository from "./crud-repository.js";

class BlogRepository extends CrudRepository {
    constructor(){
        super(Blog)
    }

    async getLatest(limit = 5) {
        try {
            return await Blog.find({}).sort({ createdAt: -1 }).limit(limit);
        } catch (error) {
            throw error;
        }
    }

}

export default BlogRepository