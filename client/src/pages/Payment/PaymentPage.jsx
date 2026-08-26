
// import { loadStripe } from "@stripe/stripe-js";
// import { createCheckoutSession } from "../../api/paymentApi";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// console.log(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


// const PaymentPage = () => {
//   const handleCheckout = async () => {
//     try {
//       const stripe = await stripePromise;

//       const cartItems =
//         JSON.parse(localStorage.getItem("cartItems")) || [];

//         console.log(cartItems);

//       if (!cartItems.length) {
//         alert("Cart is empty");
//         return;
//       }

//       const res = await createCheckoutSession({
//         items: cartItems.map((item) => ({
//           name: item.product_id?.name || item.product?.name,
//           price: item.product_id?.price || item.product?.price,
//           quantity: item.quantity,
//         })),
//       });


// console.log(res);


//       // await stripe.redirectToCheckout({
//       //   sessionId: res.id,
//       // });
// const result = await stripe.redirectToCheckout({
//   sessionId: res.id,
// });

// console.log(result);





//     } catch (err) {
//       console.error("Stripe error:", err);
//       alert("Payment failed");
//     }
//   };

//   return (
//     <div className="p-6">
//       <button
//         onClick={handleCheckout}
//         className="bg-green-600 text-white px-6 py-3 rounded"
//       >
//         Pay Now
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCheckoutSession } from "../../api/paymentApi";

const PaymentPage = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const items =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    setCartItems(items);
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.quantity *
        (item.product_id?.price || item.product?.price || 0),
    0
  );

  const handleCheckout = async () => {
    if (!cartItems.length) {
      alert("Your cart is empty");
      navigate("/cart");
      return;
    }

    try {
      setLoading(true);

      const items = cartItems.map((item) => ({
        name:
          item.product_id?.name ||
          item.product?.name ||
          "Book",

        price:
          item.product_id?.price ||
          item.product?.price ||
          0,

        quantity: item.quantity,
      }));

      console.log("Sending items to Stripe:", items);

      const response = await createCheckoutSession({
        items,
      });

      console.log("Checkout session:", response);

      if (!response?.url) {
        throw new Error("Stripe checkout URL was not returned");
      }

      // Redirect to Stripe Checkout
      window.location.href = response.url;

    } catch (error) {
      console.error("Payment error:", error);

      alert(
        error?.message ||
        error?.error ||
        "Unable to start payment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Payment
        </h1>

        {/* Cart items */}
        <div className="space-y-4 mb-6">

          {cartItems.map((item) => {

            const name =
              item.product_id?.name ||
              item.product?.name ||
              "Book";

            const price =
              item.product_id?.price ||
              item.product?.price ||
              0;

            return (
              <div
                key={item._id}
                className="flex justify-between border-b pb-3"
              >

                <div>
                  <p className="font-semibold">
                    {name}
                  </p>

                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  ₹{(price * item.quantity).toFixed(2)}
                </p>

              </div>
            );
          })}

        </div>

        {/* Total */}
        <div className="flex justify-between text-xl font-bold mb-6">
          <span>Total</span>

          <span>
            ₹{totalPrice.toFixed(2)}
          </span>
        </div>

        {/* Pay button */}
        <button
          onClick={handleCheckout}
          disabled={loading || !cartItems.length}
          className="w-full bg-green-600 hover:bg-green-700
                     text-white py-3 rounded-lg font-semibold
                     disabled:opacity-50"
        >
          {loading ? "Redirecting to Payment..." : "Pay Now"}
        </button>

      </div>

    </div>
  );
};

export default PaymentPage;