
import Stripe from "stripe";

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