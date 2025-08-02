import express from 'express';
import upload from '../middleware/multer.js';
import {
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacter,
    deleteCharacter,
    getCharacterList
} from '../controller/character-controller.js';
import { adminauthenticate } from '../middleware/adminauth.js';

const router = express.Router();

router.get('/getAll', getAllCharacters);
router.get('/get/:id', getCharacterById);

// Route for minimal character info for frontend   
router.get('/list', getCharacterList);       

// Accept multiple images in 'images' field
router.post(
  // '/create', adminauthenticate,
  '/create',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'storylineImage', maxCount: 1 },
    { name: 'originImage', maxCount: 1 }
  ]),
  createCharacter
);
// router.put('/update/:id', adminauthenticate, updateCharacter);
router.patch('/update/:id',  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'storylineImage', maxCount: 1 },
    { name: 'originImage', maxCount: 1 }
  ]), updateCharacter);
// router.delete('/delete/:id', adminauthenticate, deleteCharacter);
router.delete('/delete/:id', deleteCharacter);

export default router;
