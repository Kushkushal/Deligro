import Donation from '../models/donationModel.js';

export const saveDonation = async (req, res) => {
  try {
    const { donationType, formData, userDetails } = req.body;

    const donation = new Donation({ donationType, formData, userDetails });
    await donation.save();

    res.status(201).json({ success: true, message: 'Donation saved successfully!' });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
