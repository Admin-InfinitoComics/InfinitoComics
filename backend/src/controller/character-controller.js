import CharacterService from "../services/character-service.js";

const characterService = new CharacterService();

export const createCharacter = async (req, res) => {
  try {
    // Import AWS upload utility
    const { uploadToS3 } = await import('../utils/aws.js');

    // Handle main image upload
    let mainImageUrl = null;
    if (req.files && req.files.mainImage && req.files.mainImage[0]) {
      const mainImageFile = req.files.mainImage[0];
      const result = await uploadToS3(mainImageFile.buffer, mainImageFile.originalname, mainImageFile.mimetype);
      mainImageUrl = result.Location;
    }

    // Merge image URLs into request body
    // Parse storyLine and origin as objects if sent as JSON strings
    let storyLine = {
      text : req.body.storylineText,
      image : ""

    }
    let origin = {
      text : req.body.originText,
      image : ""

    }

    let originImageUrl = null;
    if (req.files && req.files.originImage && req.files.originImage[0]) {
      const file = req.files.originImage[0];
      const result = await uploadToS3(file.buffer, file.originalname, file.mimetype);
      originImageUrl = result.Location;
    }
    if (origin) origin.image = originImageUrl || origin.image;

    let storyLineImageUrl = null;
    if (req.files && req.files.storylineImage && req.files.storylineImage[0]) {
      const file = req.files.storylineImage[0];
      const result = await uploadToS3(file.buffer, file.originalname, file.mimetype);
      storyLineImageUrl = result.Location;
    }
    if (storyLine) storyLine.image = storyLineImageUrl || storyLine.image;

    const characterData = {
      ...req.body,
      storyLine,
      origin,
      mainImageUrl
    };
    const character = await characterService.createCharacter(characterData);
    res.status(201).json({ success: true, data: character });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllCharacters = async (req, res) => {
  try {
    const characters = await characterService.getAllCharacters();
    res.status(200).json({ success: true, data: characters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCharacterById = async (req, res) => {
  try {
    const character = await characterService.getCharacterById(req.params.id);
    if (!character) {
      return res.status(404).json({ success: false, message: "Character not found" });
    }
    res.status(200).json({ success: true, data: character });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCharacter = async (req, res) => {
  try {
    console.log(req.body);
    const character = await characterService.updateCharacter(req.params.id, req.body);
    res.status(200).json({ success: true, data: character });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCharacter = async (req, res) => {
  try {
    await characterService.deleteCharacter(req.params.id);
    res.status(200).json({ success: true, message: "Character deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getCharacterList = async (req, res) => {
  try {
    const characters = await characterService.getCharacterList();
    res.status(200).json({ success: true, data: characters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
