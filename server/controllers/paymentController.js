
// import Stripe from "stripe";

// export const createCheckoutSession = async (req, res) => {
//   try {
//     // ✅ Initialize here (after env is loaded)
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//     console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY); // debug

//     const { items } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items provided" });
//     }


// try {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//   const account = await stripe.accounts.retrieve();

//   console.log("Connected Stripe Account:", account.id);

//   // existing checkout code...
// } catch (err) {
//   console.error(err);
// }


//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",

//       line_items: items.map((item) => ({
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: item.name || "Product",
//           },
//           unit_amount: Math.round(item.price * 100),
//         },
//         quantity: item.quantity || 1,
//       })),

//       success_url: `${process.env.CLIENT_URL}/success`,
//       cancel_url: `${process.env.CLIENT_URL}/cart`,
//     });

//     res.json({ id: session.id });
//   } catch (err) {
//     console.error("Stripe Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

import Stripe from "stripe";
import Cart from "../models/Cart.js";
import CartItem from "../models/CartItems.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    const { items, userId } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({
        message: "No items found",
      });
    }

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",

        product_data: {
          name: item.name,
        },

        unit_amount: Math.round(Number(item.price) * 100),
      },

      quantity: Number(item.quantity),
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items,

      mode: "payment",

      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.CLIENT_URL}/payment`,

      metadata: {
        userId: userId.toString(),
      },
    });

    res.status(200).json({
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// Verify payment and clear cart
export const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        message: "Session ID is required",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    console.log("Stripe session:", session);

    // Make sure payment was successful
    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment was not successful",
      });
    }

    const userId = session.metadata?.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found in payment session",
      });
    }

    // Find user's cart
    const cart = await Cart.findOne({
      user_id: userId,
    });

    if (cart) {
      // Delete all cart items
      await CartItem.deleteMany({
        cart_id: cart._id,
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment successful and cart cleared",
    });

  } catch (error) {
    console.error("Payment verification error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};