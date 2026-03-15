// const router = require("express").Router();
// const router = express.Router();
const express = require("express");   // 1️⃣ import express
const router = express.Router();      // 2️⃣ create router

const auth = require("../middleware/AuthMiddlware");
const { createPayment } = require("../controllers/paymentController");

router.post("/", auth, createPayment);

module.exports = router;



// const express = require("express");
const Stripe = require("stripe");

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

module.exports = router;
