import TimelineRepository from "../repository/timeline-repository.js";


/**
 * TimelineService handles business logic for timeline events.
 * All methods are wrapped in try-catch for robust error handling and logging.
 */
class TimelineService {
  constructor() {
    this.timelineRepository = new TimelineRepository();
  }

  /**
   * Create a new timeline event.
   * @param {Object} data - Event data
   * @returns {Promise<Object>} Created event
   */
  async createEvent(data) {
    try {
      // Accepts: { title, eventDate, description, imageUrl }
      return await this.timelineRepository.create({
        title: data.title,
        eventDate: data.eventDate,
        description: data.description,
        imageUrl: data.imageUrl
      });
    } catch (error) {
      console.error(`[TimelineService] Error in createEvent:`, error);
      throw new Error('Failed to create event. Please try again later.');
    }
  }

  /**
   * Get all timeline events.
   * @returns {Promise<Array>} List of events
   */
  async getAllEvents() {
    try {
      return await this.timelineRepository.getAll();
    } catch (error) {
      console.error(`[TimelineService] Error in getAllEvents:`, error);
      throw new Error('Failed to fetch events. Please try again later.');
    }
  }

  /**
   * Get a single event by ID.
   * @param {string} id - Event ID
   * @returns {Promise<Object>} Event object
   */
  async getEventById(id) {
    try {
      return await this.timelineRepository.getById(id);
    } catch (error) {
      console.error(`[TimelineService] Error in getEventById:`, error);
      throw new Error('Failed to fetch event. Please try again later.');
    }
  }

  /**
   * Update an event by ID.
   * @param {string} id - Event ID
   * @param {Object} data - Updated event data
   * @returns {Promise<Object>} Updated event
   */
  async updateEvent(id, data) {
    try {
      // Accepts: { title, eventDate, description, imageUrl }
      return await this.timelineRepository.findByIdandUpdate(id, {
        title: data.title,
        eventDate: data.eventDate,
        description: data.description,
        imageUrl: data.imageUrl
      });
    } catch (error) {
      console.error(`[TimelineService] Error in updateEvent:`, error);
      throw new Error('Failed to update event. Please try again later.');
    }
  }

  /**
   * Delete an event by ID.
   * @param {string} id - Event ID
   * @returns {Promise<Object>} Deleted event
   */
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
