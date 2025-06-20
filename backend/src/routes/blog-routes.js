import express from "express";
const router = express.Router();
import blogController from "../controller/blog-controller.js";

router.post('/createBlog', blogController.createBlog);

router.get('/getallblog', blogController.getAllBlogs)
// Get a blog by Id
router.get('/getById/:id', blogController.getBlogById);

// Update a blog by ID
router.patch('/updateblog/:id', blogController.updateBlog);

// Delete a blog by ID
router.delete('/deleteblog/:id', blogController.deleteBlog);

export default router;