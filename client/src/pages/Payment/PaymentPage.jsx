
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "../../api/paymentApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

console.log(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


const PaymentPage = () => {
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const cartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

        console.log(cartItems);

      if (!cartItems.length) {
        alert("Cart is empty");
        return;
      }

      const res = await createCheckoutSession({
        items: cartItems.map((item) => ({
          name: item.product_id?.name || item.product?.name,
          price: item.product_id?.price || item.product?.price,
          quantity: item.quantity,
        })),
      });


console.log(res);


      // await stripe.redirectToCheckout({
      //   sessionId: res.id,
      // });
const result = await stripe.redirectToCheckout({
  sessionId: res.id,
});

console.log(result);





    } catch (err) {
      console.error("Stripe error:", err);
      alert("Payment failed");
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={handleCheckout}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;