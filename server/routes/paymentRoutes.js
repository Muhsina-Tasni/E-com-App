
// export default router;
import express from "express";
import { createCheckoutSession,verifyPayment } from "../controllers/paymentController.js";
import  {auth } from "../middleware/authMiddleware.js"; // if you use auth

const router = express.Router();

// ✅ Protected route (recommended)
router.post("/create-checkout-session", auth, createCheckoutSession);


// Verify successful payment
router.get("/verify/:sessionId", verifyPayment);


export default router;