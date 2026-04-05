// const router = require("express").Router();
// const router = express.Router();
import dotenv from "dotenv";
dotenv.config();   // ✅ ADD THIS FIRST

import express from "express";   // 1️⃣ import express
// import  router from  express.Router();      // 2️⃣ create router
import Stripe from "stripe";
import auth from "../middleware/AuthMiddlware.js";
import { createPayment } from "../controllers/paymentController.js";

const router = express.Router();
router.post("/", auth, createPayment);





// const express = require("express");
// const Stripe = require("stripe");



console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

// const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "E-Commerce Order",
            },
            unit_amount: 50000, // ₹500 (amount in paise)
          },
          quantity: 1,
        },
      ],
      success_url: "http://e-com-app-six.vercel.app/success",
      cancel_url: "http://e-com-app-six.vercel.app/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
