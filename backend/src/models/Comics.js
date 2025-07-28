import mongoose from "mongoose";

const comicSchema = mongoose.Schema({
    coverImg: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    authors: {
        type: [String],
        required: true,
        validate: [arr => arr.length > 0, 'At least one author is required']
    },
    releasedYear: {
        type: Number,
        required: true
    },
    chapters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
    }]
},
    { timestamps: true }
)

const Comic = mongoose.model("Comic", comicSchema);
export default Comic;