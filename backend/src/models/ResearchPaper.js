import mongoose from "mongoose";

const ResearchPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  journalName: { type: String, required: true },
  datePublished: { type: Date, required: true },
  authors: [{ type: String, required: true }],
  citationCount: { type: Number, default: 0 },
  downloadCount: { type: Number, default: 0 },
  abstract: { type: String, required: true },
  keywords: [{ type: String }],
  introduction: { type: String },
  doi: { type: String }, // <-- DOI for the research paper itself

  references: [{
    text: { type: String, required: true }, // full citation
    doi: { type: String } // optional DOI for that reference
  }]
}, {
  timestamps: true
});

export default mongoose.model("ResearchPaper", ResearchPaperSchema);
