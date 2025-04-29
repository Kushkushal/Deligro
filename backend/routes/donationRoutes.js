import express from 'express';
import { saveDonation,listDonations  } from '../controllers/donationController.js';

const donationRouter = express.Router();

// Route: Place a new donation
donationRouter.post('/place', saveDonation);

donationRouter.get('/list', listDonations);

export default donationRouter;
