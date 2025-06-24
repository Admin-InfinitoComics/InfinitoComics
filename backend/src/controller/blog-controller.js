import BlogService from "../services/blog-service.js";
const blogservice = new BlogService();

// Create a new blog
const createBlog = async (req, res) => {
   try {
    const { title, subject, description, status } = req.body;

    const titleStyle = req.body.titleStyle ? JSON.parse(req.body.titleStyle) : {};
    const subjectStyle = req.body.subjectStyle ? JSON.parse(req.body.subjectStyle) : {};
    const descriptionStyle = req.body.descriptionStyle ? JSON.parse(req.body.descriptionStyle) : {};

    // const images = req.files.map(file => file.buffer.toString("base64")); // Example: save images in base64 (better to save to disk or cloud normally)

    // Save to DB via service:
    const blogData = await blogservice.create({
      title,
      subject,
      description,
      status,
      titleStyle,
      subjectStyle,
      descriptionStyle,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully created blog",
      data: blogData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await blogservice.getAll();
    return res.status(200).json({
      success: true,
      message: "Successfully fetched all blogs",
      data: allBlogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await blogservice.getById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Blog found",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update blog by ID
const updateBlog = async (req, res) => {
  try {
    const { title, subject, description, status } = req.body;
    const titleStyle = req.body.titleStyle ? JSON.parse(req.body.titleStyle) : {};
    const subjectStyle = req.body.subjectStyle ? JSON.parse(req.body.subjectStyle) : {};
    const descriptionStyle = req.body.descriptionStyle ? JSON.parse(req.body.descriptionStyle) : {};

    const updatedBlog = await blogservice.update(req.params.id,{
      title,
      subject,
      description,
      status,
      titleStyle,
      subjectStyle,
      descriptionStyle,
    });
    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete blog by ID
const deleteBlog = async (req, res) => {
  try {
    await blogservice.delete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
