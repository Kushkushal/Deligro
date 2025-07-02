// routes/powerBIRoute.js
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

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
          itemTotal: item.price * item.quantity
        });
      }
    }

    res.json(flatData);
  } catch (error) {
    console.error("Error fetching order data for Power BI", error);
    res.status(500).json({ error: "Failed to fetch order data" });
  }
});

export default router;
