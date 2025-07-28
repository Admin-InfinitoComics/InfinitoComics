import express from 'express';
import comicController from '../controller/comic-controller.js';
import upload from '../middleware/multer.js';
import { adminauthenticate } from '../middleware/adminauth.js';
const router = express.Router();

//protected routes - only for admins
router.post('/', upload.single("coverImg"), comicController.createComic);
router.put('/:id', upload.single("coverImg"), comicController.updateComic);
router.delete("/:id", comicController.deleteComic);
// router.post('/', adminauthenticate, upload.single("coverImg"), comicController.createComic);
// router.put('/:id', adminauthenticate, upload.single("coverImg"), comicController.updateComic);
// router.delete("/:id", adminauthenticate, comicController.deleteComic);

//public routes
router.get('/', comicController.getAllComics);
router.get('/:id', comicController.getComicById);

export default router;
