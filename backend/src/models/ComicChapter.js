import mongoose from "mongoose";

const comicChapSchema = mongoose.Schema({
    comicId:{
        type:String,
        required:true
    },
    chapNum:{
        type: String,
        required: true
    },
    chapImage:{
        type:String, 
        required:true
    },
    title:{
        type: String,
        required:true
    },
    releaseDate:{
        type: Date,
        required: true
    }
},
    { timestamps: true }
)

const ComicChap = mongoose.model("ComicChapters", comicChapSchema);
export default ComicChap;