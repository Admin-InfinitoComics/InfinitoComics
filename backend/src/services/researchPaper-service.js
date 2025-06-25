import ResearchPaperRepository from "../repository/researchPaper-repository.js";

class ResearchPaperService {
  constructor() {
    this.researchPaperRepository = new ResearchPaperRepository();
  }

  async create(data) {
    try {
      const formattedReferences = data.references?.map(ref => ({
        text: ref.text?.trim(),
        doi: ref.doi?.trim() || ""
      })) || [];

      const paperData = {
        ...data,
        references: formattedReferences
      };

      return await this.researchPaperRepository.create(paperData);
    } catch (error) {
      console.log("Error in create - ResearchPaperService");
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.researchPaperRepository.getAll();
    } catch (error) {
      console.log("Error in getAll - ResearchPaperService");
      throw error;
    }
  }

  async getById(id) {
    try {
      return await this.researchPaperRepository.getById(id);
    } catch (error) {
      console.log("Error in getById - ResearchPaperService");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const formattedReferences = data.references?.map(ref => ({
        text: ref.text?.trim(),
        doi: ref.doi?.trim() || ""
      })) || [];

      const updateData = {
        ...data,
        references: formattedReferences
      };

      return await this.researchPaperRepository.findByIdandUpdate(id, updateData);
    } catch (error) {
      console.log("Error in update - ResearchPaperService");
      throw error;
    }
  }

  async delete(id) {
    try {
      return await this.researchPaperRepository.findByIdandDelete(id);
    } catch (error) {
      console.log("Error in delete - ResearchPaperService");
      throw error;
    }
  }
}

export default ResearchPaperService;
