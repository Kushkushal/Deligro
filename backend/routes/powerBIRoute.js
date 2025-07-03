import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Orders API for Power BI
router.get("/orders", async (req, res) => {
  try {
    const orders = await mongoose.connection.db
      .collection("orders")
      .find({})
      .toArray();

    const flatData = [];

    for (const order of orders) {
      const orderId = order._id.toString();
      const sharedFields = {
        orderId,
        userId: order.userId,
        firstName: order.address?.firstName,
        lastName: order.address?.lastName,
        address: order.address?.address,
        room: order.address?.room,
        city: order.address?.city,
        state: order.address?.state,
        country: order.address?.country,
        phone: order.address?.phone,
        status: order.status,
        payment: order.payment,
        orderAmount: order.amount,
        date: order.date,
      };

      for (const item of order.items) {
        flatData.push({
          ...sharedFields,
          itemId: item._id,
          itemName: item.name,
          itemCategory: item.category,
          itemPrice: item.price,
          quantity: item.quantity,
          itemTotal: item.price * item.quantity,
        });
      }
    }

    res.json(flatData);
  } catch (error) {
    console.error("Error fetching order data for Power BI", error);
    res.status(500).json({ error: "Failed to fetch order data" });
  }
});

// Users API for Power BI
router.get("/users", async (req, res) => {
  try {
    const users = await mongoose.connection.db
      .collection("users")
      .find({}, { projection: { password: 0, cartData: 0, __v: 0 } }) // hide sensitive fields
      .toArray();

    const formattedUsers = users.map(user => ({
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
    }));

    res.json(formattedUsers);
  } catch (error) {
    console.error("Error fetching user data for Power BI:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});


// Donations API for Power BI
router.get("/donations", async (req, res) => {
  try {
    const donations = await mongoose.connection.db
      .collection("donations")
      .find({})
      .toArray();

    const flatDonations = donations.map(donation => {
      const base = {
        donationId: donation._id.toString(),
        donationType: donation.donationType,
        firstName: donation.userDetails?.firstName || '',
        lastName: donation.userDetails?.lastName || '',
        address: donation.userDetails?.address || '',
        city: donation.userDetails?.city || '',
        state: donation.userDetails?.state || '',
        phone: donation.userDetails?.phone || '',
        description: donation.userDetails?.description || '',
        createdAt: donation.createdAt,
      };

      const form = donation.formData || {};

      if (donation.donationType === "Groceries") {
        return {
          ...base,
          groceryItems: form.groceryItem || '',
          groceryQuantities: (form.groceryQuantity || []).join(", "),
          expiryConfirmed: form.expiryConfirmed || false,
          groceryNotes: form.groceryNotes || '',
        };
      }

      if (donation.donationType === "Food") {
        return {
          ...base,
          selectedTime: form.selectedTime || '',
          locationType: form.locationType || '',
          quantityRange: form.quantityRange || '',
          totalItems: form.totalItems || 0,
        };
      }

      if (donation.donationType === "Clothes") {
        return {
          ...base,
          ageDifference: (form.ageDifference || []).join(", "),
          sizes: (form.sizes || []).join(", "),
          clothingNotes: form.clothingNotes || '',
        };
      }

      return base;
    });

    res.json(flatDonations);
  } catch (err) {
    console.error("Error fetching donations for Power BI:", err);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});


export default router;
