import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    story:{
        required: true,
        type: String
    },
    imageUrl:{
        type: [String],
    }
});

const BlogSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    subject: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    status: { 
        type: String, 
        enum: ['draft', 'published'], 
        default: 'draft' 
    },
    titleStyle: { type: Object, default: {} },
    subjectStyle: { type: Object, default: {} },
    descriptionStyle: { type: Object, default: {} },
            // image: {
    //     type: [String],
    // },
}, {
    timestamps: true  // Adds createdAt and updatedAt
});

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;