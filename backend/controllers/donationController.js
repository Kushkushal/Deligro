import Donation from '../models/donationModel.js';

export const saveDonation = async (req, res) => {
  try {
    const { donationType, formData, userDetails } = req.body;

    // Fix groceryQuantity if it's a string
    if (formData?.groceryQuantity) {
      if (typeof formData.groceryQuantity === "string") {
        formData.groceryQuantity = formData.groceryQuantity
          .split(",")
          .map(num => Number(num.trim()))
          .filter(num => !isNaN(num)); // Remove invalid numbers
      }
    }

    const donation = new Donation({ donationType, formData, userDetails });
    await donation.save();

    res.status(201).json({ success: true, message: 'Donation saved successfully!' });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const listDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: donations });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
