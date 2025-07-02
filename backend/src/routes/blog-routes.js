import express from "express";
const router = express.Router();
import blogController from "../controller/blog-controller.js";
import upload from '../middleware/multer.js';
import { checkRole } from "../middleware/roleCheck.js";
router.post("/createblog", checkRole('News and blog'), upload.any(),blogController.createBlog); // done

router.get('/getallblog', blogController.getAllBlogs) //done
// Get a blog by Id
router.get('/getById/:id', blogController.getBlogById);

// Update a blog by ID
router.put('/updateblog/:id', upload.any(), blogController.updateBlog); //done

// Delete a blog by ID
router.delete('/deleteblog/:id', blogController.deleteBlog); // done

router.get('/latestblog', blogController.getLatestBlogs);


export default router;