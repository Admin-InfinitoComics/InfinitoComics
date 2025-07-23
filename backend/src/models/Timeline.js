import mongoose from 'mongoose';

const TimelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  eventDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 3000,
    trim: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  pageContext: {
    type: String,
    enum: ["about", "support"],
    required: true
  }
});

export default mongoose.model('Timeline', TimelineSchema);
