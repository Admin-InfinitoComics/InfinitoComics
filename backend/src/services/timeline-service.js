import TimelineRepository from "../repository/timeline-repository.js";


/**
 * TimelineService handles business logic for timeline events.
 * All methods are wrapped in try-catch for robust error handling and logging.
 */
class TimelineService {
  constructor() {
    this.timelineRepository = new TimelineRepository();
  }

  
  async createEvent(data) {
    try {
      // Accepts: { title, eventDate, description, pageContext, imageUrl }
      const eventData = {
      title: data.title,
      eventDate: data.eventDate,
      description: data.description,
      pageContext: data.pageContext,
    };

    if (data.imageUrl) {
      eventData.imageUrl = data.imageUrl;
    }
    return await this.timelineRepository.create(eventData);
    } catch (error) {
      console.error(`[TimelineService] Error in createEvent:`, error);
      throw new Error('Failed to create event. Please try again later.');
    }
  }


  async getAllEvents() {
    try {
      return await this.timelineRepository.getAll();
    } catch (error) {
      console.error(`[TimelineService] Error in getAllEvents:`, error);
      throw new Error('Failed to fetch events. Please try again later.');
    }
  }


  async getEventById(id) {
    try {
      return await this.timelineRepository.getById(id);
    } catch (error) {
      console.error(`[TimelineService] Error in getEventById:`, error);
      throw new Error('Failed to fetch event. Please try again later.');
    }
  }


  async updateEvent(id, data) {
  try {
    const updateData = {
      title: data.title,
      eventDate: data.eventDate,
      description: data.description,
      // pageContext: data.pageContext, 
    };

    if (data.imageUrl) {
      updateData.imageUrl = data.imageUrl; // ✅ only if exists
    }

    return await this.timelineRepository.findByIdandUpdate(id, updateData); 
  } catch (error) {
    console.error(`[TimelineService] Error in updateEvent:`, error);
    throw new Error('Failed to update event. Please try again later.');
  }
}


  async deleteEvent(id) {
    try {
      return await this.timelineRepository.findByIdandDelete(id);
    } catch (error) {
      console.error(`[TimelineService] Error in deleteEvent:`, error);
      throw new Error('Failed to delete event. Please try again later.');
    }
  }
}

export default TimelineService;
