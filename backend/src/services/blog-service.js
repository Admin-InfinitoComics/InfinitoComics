import BlogRepository from "../repository/blog-repository.js";

class BlogService {
  constructor() {
    this.blogRepository = new BlogRepository();
  }

  async create(data) {
    try {
      console.log(data);
      const blogData = await this.blogRepository.create(data);
      return blogData;
    } catch (error) {
      console.log("Error in create - BlogService");
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.blogRepository.getAll();
    } catch (error) {
      console.log("Error in getAll - BlogService");
      throw error;
    }
  }

  async getById(id) {
    try {
      return await this.blogRepository.getById(id);
    } catch (error) {
      console.log("Error in getById - BlogService");
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await this.blogRepository.findByIdandUpdate(id, data);
    } catch (error) {
      console.log("Error in update - BlogService");
      throw error;
    }
  }

  async delete(id) {
    try {
      return await this.blogRepository.findByIdandDelete(id);
    } catch (error) {
      console.log("Error in delete - BlogService");
      throw error;
    }
  }
}

export default BlogService;
