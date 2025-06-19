import express from "express";
const router = express.Router();
import blogController from "../controller/blog-controller.js";

router.post('/createBlog', blogController.createBlog);

router.get('/getallblog', blogController.getAllBlog)

router.get('/getById', blogController.getById);

export default router;