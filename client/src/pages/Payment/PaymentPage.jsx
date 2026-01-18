

import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAddresses, addAddress } from "../../api/addressApi";

const stripePromise = loadStripe(
  "pk_test_51SqtwF3EvLOKgfejguOL8p6c9p8xzK3gajHy57JLjgxcmsATzLe6tCgWTzjkf9IRECkvtWeDtTJC90O2ZayBZK7400i5mOzfHR"
);

const PaymentPage = () => {
  const { user } = useContext(AuthContext);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  // Fetch user's addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddresses();
        setAddresses(data.filter((a) => a.user_id?._id === user?._id));
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchAddresses();
  }, [user]);

  // Handle new address input change
  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  // Add new address
  const handleAddAddress = async () => {
    try {
      const saved = await addAddress(newAddress); // backend uses req.user
      setAddresses([...addresses, saved]);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      });
    } catch (err) {
      console.error("Add address failed", err);
      alert("Failed to add address. Make sure you are logged in.");
    }
  };

  // Stripe payment handler
  const handlePayment = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address first.");
      return;
    }

    try {
      const stripe = await stripePromise;

      // Call your backend to create a checkout session
      const response = await fetch("http://localhost:8000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // optional: send cart total or items
          addressId: selectedAddress._id,
        }),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  if (success)
    return (
      <div className="p-10 text-center text-green-600 text-2xl font-bold">
        Order Placed Successfully ✅
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Saved Addresses */}
      <div className="bg-white shadow p-5 rounded">
        <h2 className="text-xl font-bold mb-4">Select Delivery Address</h2>

        {addresses.length === 0 && (
          <p className="text-gray-500">No address found. Add one below.</p>
        )}

        {addresses.map((addr) => (
          <label
            key={addr._id}
            className="block border p-3 rounded mb-3 cursor-pointer"
          >
            <input
              type="radio"
              name="address"
              className="mr-2"
              onChange={() => setSelectedAddress(addr)}
            />
            {addr.street}, {addr.city}, {addr.state}, {addr.country} -{" "}
            {addr.pincode}
          </label>
        ))}
      </div>

      {/* Add New Address */}
      <div className="bg-white shadow p-5 rounded">
        <h2 className="text-xl font-bold mb-4">Add New Address</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            name="street"
            value={newAddress.street}
            onChange={handleChange}
            placeholder="Street"
            className="border p-2 rounded"
          />
          <input
            name="city"
            value={newAddress.city}
            onChange={handleChange}
            placeholder="City"
            className="border p-2 rounded"
          />
          <input
            name="state"
            value={newAddress.state}
            onChange={handleChange}
            placeholder="State"
            className="border p-2 rounded"
          />
          <input
            name="country"
            value={newAddress.country}
            onChange={handleChange}
            placeholder="Country"
            className="border p-2 rounded"
          />
          <input
            name="pincode"
            value={newAddress.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={handleAddAddress}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Address
        </button>
      </div>

      {/* Place Order & Pay */}
      <button
        onClick={handlePayment}
        disabled={!selectedAddress}
        className="w-full bg-green-600 text-white py-3 rounded disabled:bg-gray-400"
      >
        Place Order & Pay
      </button>
    </div>
  );
};

export default PaymentPage;
