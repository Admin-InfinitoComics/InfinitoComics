import ResearchPaper from "../models/ResearchPaper.js";
import CrudRepository from "./crud-repository.js";

class ResearchPaperRepository extends CrudRepository {
  constructor() {
    super(ResearchPaper);
  }
}

export default ResearchPaperRepository;
