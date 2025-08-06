import express from 'express';
<<<<<<< HEAD
const paymentrouter = express.Router();




export default paymentrouter;
=======
import {createOrder, webhooksetup, verifyPayment} from '../controller/payment-controller.js'
import { authenticate } from '../middleware/auth.js';

const paymentRoutes = express.Router();

paymentRoutes.post('/create',authenticate, createOrder);
paymentRoutes.get('/webhook', webhooksetup);
paymentRoutes.get('/verify', verifyPayment)

export default paymentRoutes;
>>>>>>> d24d2e26909bb711587eaeb40f9c06bef9bef6cd
