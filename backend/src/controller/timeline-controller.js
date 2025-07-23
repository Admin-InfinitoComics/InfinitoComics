import TimelineService from "../services/timeline-service.js";
import { uploadToS3 } from "../utils/aws.js";

const timelineService = new TimelineService();

export const createEvent = async (req, res) => {
  try {
    console.log("PageContext received:", req.body.pageContext);

    const { title, eventDate, description, pageContext} = req.body;
    if (!title || !eventDate || !description || !pageContext) {
      return res.status(400).json({ message: "All fields are required. hui hui" });
    }
    if (pageContext === 'support' && !req.file) {
      return res.status(400).json({ message: "An image is required." });
    }
    
    // Upload the single image to S3 and get the URL
    let imageUrl;
    if(req.file){
      const uploadResult = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
      imageUrl = uploadResult.Location;
    }
    
    const eventObj = {
      title,
      eventDate,
      description,
      pageContext
    }
    
    if(imageUrl){
      eventObj.imageUrl = imageUrl;
    }
    
    
    console.log("************************************* hui hui ******************");
    const event = await timelineService.createEvent(eventObj);
    console.log(event);
    res.status(201).json({ data: event, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await timelineService.getAllEvents();
    res.status(200).json({ data: events, success: true, message: "All timelines fetched successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await timelineService.getEventById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found", success: false });
    res.status(200).json({ data: event, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { title, eventDate, description} = req.body;
    let imageUrl;

    //extracting pageContext value
    const existingEvent = await timelineService.getEventById(req.params.id);
    if (!existingEvent) {
      return res.status(404).json({ message: "Event not found", success: false });
    }

    const pageContext = existingEvent.pageContext;

    // If a new file is uploaded, upload it to S3
    if (req.file) {
      const uploadResult = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
      imageUrl = uploadResult.Location;
    } else if (req.body.imageUrl) {
      // If no new file, use existing imageUrl from body (for partial update)
      imageUrl = req.body.imageUrl;
    }

    if (pageContext === 'support' && !req.file && !req.body.imageUrl) {
      return res.status(400).json({ message: "Support events must have an image.", success: false });
    }

    const update = { title, eventDate, description, imageUrl };
    const event = await timelineService.updateEvent(req.params.id, update);
    if (!event) return res.status(404).json({ message: "Event not found", success: false });
    res.status(200).json({ data: event, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await timelineService.deleteEvent(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found", success: false });
    res.status(200).json({ message: "Event deleted", success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
