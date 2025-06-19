import BlogRepository from "../repository/blog-repository.js";

class BlogService {
    constructor() {
        this.blogrespository = new BlogRepository();
    }

    async create(data){
        try {
            console.log(data);
            const blogdata = await this.blogrespository.create(data);
            return blogdata;
        } catch (error) {
            console.log("Something wrong at blog-create-service");
            throw error;
        }
    }

    async getAll() {
        try {
            return await this.blogrespository.getAll();
        } catch (error) {
            console.log("Error in getAll - BlogService");
            throw error;
        }
    }

    async getById(id) {
        try {
            const blogdetails =  await this.blogrespository.getById(id);
            return blogdetails;
        } catch (error) {
            console.log("Error in getById - BlogService");
            throw error;
        }
    }

    async updateBlog(id, data) {
        try {
            return await this.blogrespository.findByIdandUpdate(id, data);
        } catch (error) {
            console.log("Error in updateBlog - BlogService");
            throw error;
        }
    }

    async deleteblog(id) {
        try {
            return await this.blogrespository.findByIdandDelete(id);
        } catch (error) {
            console.log("Error in deleteBlog - BlogService");
            throw error;
        }
    }
}

export default BlogService;