
import Stripe from "stripe";

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


// import Stripe from "stripe";

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//     const { items } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         message: "No items provided",
//       });
//     }

//     const lineItems = items.map((item) => ({
//       price_data: {
//         currency: "inr",

//         product_data: {
//           name: item.name || "Book",
//         },

//         unit_amount: Math.round(
//           Number(item.price) * 100
//         ),
//       },

//       quantity: Number(item.quantity) || 1,
//     }));

//     const session =
//       await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],

//         mode: "payment",

//         line_items: lineItems,

//         success_url:
//           `${process.env.CLIENT_URL}/success`,

//         cancel_url:
//           `${process.env.CLIENT_URL}/cart`,
//       });

//     console.log(
//       "Stripe Checkout Session:",
//       session.id
//     );

//     // IMPORTANT:
//     // Return Stripe checkout URL
//     res.status(200).json({
//       id: session.id,
//       url: session.url,
//     });

//   } catch (error) {

//     console.error(
//       "Stripe Checkout Error:",
//       error
//     );

//     res.status(500).json({
//       message: "Unable to create checkout session",
//       error: error.message,
//     });
//   }
// };

// import Stripe from "stripe";
// import Order from "../models/Order.js";
// import OrderItem from "../models/OrderItems.js";
// import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItems.js";
import Payment from "../models/Payment.js";
import Cart from "../models/Cart.js";
import CartItem from "../models/CartItems.js";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

export const createCheckoutSession = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No items provided",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        message: "Shipping address is required",
      });
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "inr",

        product_data: {
          name: item.name || "Book",
        },

        unit_amount: Math.round(
          Number(item.price) * 100
        ),
      },

      quantity: Number(item.quantity) || 1,
    }));

    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        mode: "payment",

        line_items: lineItems,

        metadata: {
          user_id: String(req.user.id),

          shippingAddress:
            JSON.stringify(shippingAddress),

          items: JSON.stringify(
            items.map((item) => ({
              product_id: item.product_id,
              quantity: item.quantity,
              price: item.price,
            }))
          ),
        },

        success_url:
          `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${process.env.CLIENT_URL}/checkout`,
      });

    console.log(
      "Stripe session created:",
      session.id
    );

    res.status(200).json({
      id: session.id,
      url: session.url,
    });

  } catch (error) {

    console.error(
      "Stripe Checkout Error:",
      error
    );

    res.status(500).json({
      message: "Unable to create checkout session",
      error: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        message: "Session ID is required",
      });
    }

    // 1. Retrieve Stripe Checkout Session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.status(404).json({
        message: "Stripe session not found",
      });
    }

    // 2. Make sure payment was actually completed
    if (session.payment_status !== "paid") {
      return res.status(400).json({
        message: "Payment was not successful",
      });
    }

    // 3. Get payment intent
    const paymentIntentId = session.payment_intent;

    if (!paymentIntentId) {
      return res.status(400).json({
        message: "Payment intent not found",
      });
    }

    const paymentIntent =
      await stripe.paymentIntents.retrieve(paymentIntentId);

    const transactionId = paymentIntent.id;

    // 4. Check whether this payment was already processed
    const existingPayment = await Payment.findOne({
      transactionId,
    });

    if (existingPayment) {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
        payment: existingPayment,
      });
    }

    // 5. Get information stored in Stripe metadata
    const items = JSON.parse(session.metadata.items);

    const shippingAddress = JSON.parse(
      session.metadata.shippingAddress
    );

    const userId = session.metadata.user_id;

    const totalAmount = session.amount_total / 100;

    // 6. Create Order
    const order = await Order.create({
      user_id: userId,

      shippingAddress,

      orderDate: new Date(),

      status: "processing",

      totalAmount,
    });

    // 7. Create Order Items
    const orderItems = items.map((item) => ({
      order_id: order._id,

      product_id: item.product_id,

      quantity: item.quantity,

      price: item.price,
    }));

    await OrderItem.insertMany(orderItems);

    // 8. Create Payment record
    const payment = await Payment.create({
      order_id: order._id,

      paymentMethod: "card",

      status: "success",

      amount: totalAmount,

      transactionId,
    });

    // 9. IMPORTANT:
    // Clear cart from MongoDB
    const cart = await Cart.findOne({
      user_id: userId,
    });

    if (cart) {
      await CartItem.deleteMany({
        cart_id: cart._id,
      });

      console.log(
        "Cart cleared successfully for user:",
        userId
      );
    }

    // 10. Send response
    return res.status(200).json({
      success: true,

      message:
        "Payment verified, order created and cart cleared",

      order,

      payment,
    });

  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    return res.status(500).json({
      message: "Payment verification failed",

      error: error.message,
    });
  }
};