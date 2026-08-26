

import express from "express";

import {
  createCheckoutSession,
  verifyPayment,
} from "../controllers/paymentController.js";

import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-checkout-session",
  auth,
  createCheckoutSession
);

router.post(
  "/verify-payment",
  auth,
  verifyPayment
);

export default router;