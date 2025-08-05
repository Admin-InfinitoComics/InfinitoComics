import ResearchPaperRepository from "../repository/research-paper-repository.js";
import mongoose from 'mongoose';

class ResearchPaperService {
    constructor() {
        this.researchPaperRepository = new ResearchPaperRepository();
    }

    async createPaper(data) {
        try {
            // Validate required fields
            const requiredFields = [
                'title', 'authors', 'abstract', 'introduction',
                'relatedWork', 'methodology', 'experimentalResults',
                'discussion', 'conclusion', 'publicationDate'
            ];
            
            for (const field of requiredFields) {
                if (!data[field]) {
                    throw new Error(`${field} is required`);
                }
            }

            // Validate authors array
            if (!Array.isArray(data.authors) || data.authors.length === 0) {
                throw new Error('At least one author is required');
            }

            // Create the paper
            const paper = await this.researchPaperRepository.createPaper({
                ...data,
                isPublished: data.isPublished || false,
                createdBy: new mongoose.Types.ObjectId(data.createdBy)
            });

            return paper;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async updatePaper(paperId, data, userId) {
        try {
            // Check if paper exists
            const existingPaper = await this.researchPaperRepository.get(paperId);
            if (!existingPaper) {
                throw new Error('Paper not found');
            }

            // Check if user is the creator or admin
            if (existingPaper.createdBy.toString() !== userId) {
                throw new Error('Not authorized to update this paper');
            }

            // Prevent changing certain fields
            const { _id, createdBy, createdAt, ...updateData } = data;
            
            // Update the paper
            const updatedPaper = await this.researchPaperRepository.update(paperId, updateData);
            return updatedPaper;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async deletePaper(paperId, userId) {
        try {
            // Check if paper exists
            const existingPaper = await this.researchPaperRepository.get(paperId);
            if (!existingPaper) {
                throw new Error('Paper not found');
            }

            // Check if user is the creator or admin
            if (existingPaper.createdBy.toString() !== userId) {
                throw new Error('Not authorized to delete this paper');
            }

            const response = await this.researchPaperRepository.destroy(paperId);
            return response;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async getPaper(paperId, incrementView = false) {
        try {
            const paper = await this.researchPaperRepository.get(paperId);
            
            if (!paper) {
                throw new Error('Paper not found');
            }

            // Increment view count if requested
            if (incrementView) {
                await this.researchPaperRepository.incrementViews(paperId);
            }

            return paper;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async getAllPapers(page = 1, limit = 10, filters = {}) {
        try {
            // Only return published papers for non-admin users
            const query = { isPublished: true, ...filters };
            
            const papers = await this.researchPaperRepository.getAll(
                page,
                limit,
                query,
                { publicationDate: -1 }
            );
            
            return papers;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async searchPapers(query, page = 1, limit = 10) {
        try {
            if (!query || query.trim() === '') {
                return await this.getAllPapers(page, limit);
            }
            
            const papers = await this.researchPaperRepository.searchPapers(
                query,
                page,
                limit
            );
            
            return papers;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async getPapersByAuthor(authorId, page = 1, limit = 10) {
        try {
            const papers = await this.researchPaperRepository.getPapersByAuthor(
                authorId,
                page,
                limit
            );
            
            return papers;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }

    async incrementDownloads(paperId) {
        try {
            const paper = await this.researchPaperRepository.incrementDownloads(paperId);
            return paper;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
}

export default ResearchPaperService;
