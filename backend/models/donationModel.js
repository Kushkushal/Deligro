import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donationType: { type: String, required: true },
  formData: {
    groceryItem: { type: String, required: true },
    groceryQuantity: { type: Number, required: true },
    expiryConfirmed: { type: Boolean, required: true },
    groceryNotes: { type: String, required: false }
  },
  userDetails: {   // 👈 Add user details inside donation itself
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: false }
  }
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
