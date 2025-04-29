import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donationType: { type: String, required: true },
  formData: {
    // Grocery fields (optional)
    groceryItem: { type: String, required: false },
    groceryQuantity: {
      type: [Number],
      required: false,
      default: [] // optional: makes it an empty array by default
    },
    
    expiryConfirmed: { type: Boolean, required: false },
    groceryNotes: { type: String, required: false },

    // Food fields (optional)
    selectedTime: { type: String, required: false },
    locationType: { type: String, required: false },
    quantityRange: { type: String, required: false },
    totalItems: { type: Number, required: false },

    // Clothes fields (optional)
    gender: { type: String, required: false }, // Male / Female / Both
    ageDifference: [{ type: String, required: false }],         // Array of age groups: ['0-10', '10-20', etc.]
    sizes: [{ type: String, required: false }],                  // Array of sizes: ['S', 'M', 'L', 'XL']
    clothingNotes: { type: String, required: false },
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
