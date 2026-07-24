// const Payment = require("../models/Payment");

// exports.createPayment = async (req, res) => {
//   try {
//     const { order_id, paymentMethod, amount, transactionId } = req.body;

//  // simple validation
//     if (!order_id || !paymentMethod || !amount || !transactionId) {
//       return res.status(400).json({ message: "All fields are required" });
//     }



//     const payment = await Payment.create({
//       order_id,
//       paymentMethod,
//       amount,
//       status: "success",
//       paymentDate: new Date(),
//       transactionId
//     });

//     res.json(payment);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


/////////////////////////////////////////
// import Payment from "../models/Payment.js";



// export const createPayment = async (req, res) => {
//   try {
//     const { order_id, paymentMethod, amount, transactionId } = req.body;

//     // simple validation
//     if (!order_id || !paymentMethod || !amount || !transactionId) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const payment = await Payment.create({
//       order_id,
//       paymentMethod,
//       amount,
//       status: "success",   // must match schema enum
//       paymentDate: new Date(),
//       transactionId,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Payment created successfully",
//       payment,
//     });

//   } catch (err) {
//     console.error("Payment Error:", err);
//     res.status(500).json({
//       success: false,
//       message: err.message,
//       error: err,
//     });
//   }
// };


// // export default {createPayment}import Stripe from "stripe";

// import Stripe from "stripe";   // ✅ ADD THIS

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { items } = req.body;

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",

//       line_items: items.map((item) => ({
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: item.name,
//           },
//           unit_amount: item.price * 100,
//         },
//         quantity: item.quantity,
//       })),

//       success_url: `${process.env.CLIENT_URL}/success`,
//       cancel_url: `${process.env.CLIENT_URL}/cart`,
//     });

//     res.json({ id: session.id });
//   } catch (err) {
//     console.error("Stripe Error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { items } = req.body;

//     if (!items || !items.length) {
//       return res.status(400).json({ error: "No items provided" });
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",

//       line_items: items.map((item) => ({
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: item.name,
//           },
//           unit_amount: item.price * 100,
//         },
//         quantity: item.quantity,
//       })),

//       success_url: `${process.env.CLIENT_URL}/success`,
//       cancel_url: `${process.env.CLIENT_URL}/cart`,
//     });

//     res.json({ id: session.id });
//   } catch (err) {
//     console.error("Stripe Error:", err);
//     res.status(500).json({ error: err.message });
// //   }
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { items } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items provided" });
//     }

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


// console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    // ✅ Initialize here (after env is loaded)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY); // debug

    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }




try {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const account = await stripe.accounts.retrieve();

  console.log("Connected Stripe Account:", account.id);

  // existing checkout code...
} catch (err) {
  console.error(err);
}


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name || "Product",
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity || 1,
      })),

      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: err.message });
  }
};