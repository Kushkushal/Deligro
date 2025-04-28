import express from 'express';
import { saveDonation } from '../controllers/donationController.js';

const donationRouter = express.Router();

// Route: Place a new donation
donationRouter.post('/place', saveDonation);

export default donationRouter;
