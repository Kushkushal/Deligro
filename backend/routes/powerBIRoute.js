// routes/powerBIRoute.js
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/orders", async (req, res) => {
  try {
    const orders = await mongoose.connection
      .db
      .collection("orders") // use your real collection name
      .find({}, { projection: { _id: 0 } }) // exclude _id for clean output
      .toArray();

    res.json(orders); // return raw JSON
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;
