

//payment page
import { useContext } from "react";
import { createCheckoutSession } from "../../api/paymentApi";
import { AuthContext } from "../../context/AuthContext";

const PaymentPage = () => {
  const { user } = useContext(AuthContext);

  const handleCheckout = async () => {
    try {
      const cartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

      console.log("Cart Items:", cartItems);

      if (!cartItems.length) {
        alert("Cart is empty");
        return;
      }

      // Check user
      if (!user?._id) {
        alert("Please login before payment");
        return;
      }

      const res = await createCheckoutSession({
        userId: user._id,

        items: cartItems.map((item) => ({
          name:
            item.product_id?.name ||
            item.product?.name,

          price:
            item.product_id?.price ||
            item.product?.price,

          quantity: item.quantity,
        })),
      });

      console.log("Checkout Session:", res);

      if (!res.url) {
        throw new Error("Stripe Checkout URL not received");
      }

      // Redirect to Stripe Checkout
      window.location.href = res.url;

    } catch (err) {
      console.error("Stripe error:", err);

      alert(
        err.response?.data?.message ||
        "Payment failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md text-center">

        <h1 className="text-2xl font-bold mb-6">
          Complete Your Payment
        </h1>

        <button
          onClick={handleCheckout}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Pay Now
        </button>

      </div>

    </div>
  );
};

export default PaymentPage;