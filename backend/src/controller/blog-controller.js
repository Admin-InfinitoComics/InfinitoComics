import BlogService from "../services/blog-service.js";
const blogservice = new BlogService();

const createBlog = async (req, res) => {
    try {
        console.log(req.body);
        const blogdata = await blogservice.create(req.body);
        return res.status(200).json({
            blogdata,
            success: true,
            message: "Successfully updated blog"
        })
    } catch (error) {
        return res.status(400).status({
            success: false,
            message : error.message
        })
    }
}

const getAllBlog = async (req, res) => {
    try {
        const allblogs = await blogservice.getAll();
        return res.status(200).json({
            allblogs,
            success: true,
            message: "Successfully fetched all blogs"
        })
    } catch (error) {
        return res.status(400).json({
            message : error.message,
            success : false
        })
    }
}

// Get blog by ID
const getById = async (req, res) => {
    try {
        const blog = await blogservice.getById(req.query.id);
        return res.status(200).json({
            blog,
            success: true
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
            success: false
        });
    }
};



export default { 
    createBlog,
    getAllBlog,
    getById
}