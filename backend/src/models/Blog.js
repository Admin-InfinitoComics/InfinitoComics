import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String 
    },
    subject : {
        required: true,
        type: String
    },
    description : {
        required: true,
        type: String
    },
})

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;