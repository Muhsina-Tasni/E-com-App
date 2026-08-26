// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// import { getAddresses } from "../../api/addressApi";
// import { createCheckoutSession } from "../../api/paymentApi";

// const Checkout = () => {
//   const navigate = useNavigate();

//   const [cartItems, setCartItems] = useState([]);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [paymentLoading, setPaymentLoading] = useState(false);

//   useEffect(() => {
//     const loadCheckoutData = async () => {
//       try {
//         const items =
//           JSON.parse(localStorage.getItem("cartItems")) || [];

//         if (!items.length) {
//           navigate("/cart");
//           return;
//         }

//         setCartItems(items);

//         const addressData = await getAddresses();

//         setAddresses(addressData || []);

//         if (addressData?.length) {
//           setSelectedAddress(addressData[0]._id);
//         }
//       } catch (error) {
//         console.error("Checkout loading error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadCheckoutData();
//   }, [navigate]);

//   const totalPrice = cartItems.reduce(
//     (sum, item) => {
//       const price =
//         item.product_id?.price ||
//         item.product?.price ||
//         0;

//       return sum + price * item.quantity;
//     },
//     0
//   );

//   const handlePayment = async () => {
//     if (!selectedAddress) {
//       Swal.fire({
//         icon: "warning",
//         title: "Select an address",
//         text: "Please select a delivery address before payment.",
//       });

//       return;
//     }

//     try {
//       setPaymentLoading(true);

//       const selectedAddressData = addresses.find(
//         (address) => address._id === selectedAddress
//       );

//       const items = cartItems.map((item) => ({
//         product_id:
//           item.product_id?._id ||
//           item.product_id ||
//           item.product?._id,

//         name:
//           item.product_id?.name ||
//           item.product?.name ||
//           "Book",

//         price:
//           item.product_id?.price ||
//           item.product?.price ||
//           0,

//         quantity: item.quantity,
//       }));

//       const response = await createCheckoutSession({
//         items,
//         shippingAddress: selectedAddressData,
//       });

//       console.log("Stripe response:", response);

//       if (!response?.url) {
//         throw new Error(
//           "Stripe checkout URL was not returned."
//         );
//       }

//       /*
//        * Stripe hosted checkout
//        */
//       window.location.href = response.url;

//     } catch (error) {
//       console.error("Payment error:", error);

//       Swal.fire({
//         icon: "error",
//         title: "Payment Failed",
//         text:
//           error?.message ||
//           "Unable to start payment.",
//       });

//       setPaymentLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading checkout...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-stone-100 py-10 px-4">

//       <div className="max-w-6xl mx-auto">

//         <h1 className="text-3xl font-bold text-stone-800 mb-8">
//           Checkout
//         </h1>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//           {/* LEFT SIDE */}
//           <div className="bg-white p-6 rounded-lg shadow">

//             <h2 className="text-xl font-semibold mb-5">
//               Delivery Address
//             </h2>

//             {addresses.length === 0 ? (
//               <div className="border rounded p-5">

//                 <p className="text-gray-600 mb-4">
//                   You don't have a saved address.
//                 </p>

//                 <button
//                   onClick={() => navigate("/profile")}
//                   className="bg-amber-600 text-white px-5 py-2 rounded"
//                 >
//                   Add Address
//                 </button>

//               </div>
//             ) : (
//               <div className="space-y-4">

//                 {addresses.map((address) => (
//                   <label
//                     key={address._id}
//                     className={`block border p-4 rounded cursor-pointer ${
//                       selectedAddress === address._id
//                         ? "border-amber-600 bg-amber-50"
//                         : "border-gray-300"
//                     }`}
//                   >

//                     <div className="flex gap-3">

//                       <input
//                         type="radio"
//                         name="address"
//                         value={address._id}
//                         checked={
//                           selectedAddress === address._id
//                         }
//                         onChange={(e) =>
//                           setSelectedAddress(
//                             e.target.value
//                           )
//                         }
//                       />

//                       <div>

//                         <p className="font-semibold">
//                           {address.street}
//                         </p>

//                         <p className="text-gray-600">
//                           {address.city},{" "}
//                           {address.state}
//                         </p>

//                         <p className="text-gray-600">
//                           {address.country} -{" "}
//                           {address.pincode}
//                         </p>

//                       </div>

//                     </div>

//                   </label>
//                 ))}

//               </div>
//             )}

//           </div>

//           {/* RIGHT SIDE */}
//           <div className="bg-white p-6 rounded-lg shadow">

//             <h2 className="text-xl font-semibold mb-5">
//               Order Summary
//             </h2>

//             <div className="space-y-4">

//               {cartItems.map((item) => {

//                 const name =
//                   item.product_id?.name ||
//                   item.product?.name ||
//                   "Book";

//                 const price =
//                   item.product_id?.price ||
//                   item.product?.price ||
//                   0;

//                 return (
//                   <div
//                     key={item._id}
//                     className="flex justify-between border-b pb-3"
//                   >

//                     <div>

//                       <p className="font-medium">
//                         {name}
//                       </p>

//                       <p className="text-sm text-gray-500">
//                         Quantity: {item.quantity}
//                       </p>

//                     </div>

//                     <p className="font-semibold">
//                       ₹
//                       {(
//                         price * item.quantity
//                       ).toFixed(2)}
//                     </p>

//                   </div>
//                 );
//               })}

//             </div>

//             <div className="flex justify-between mt-6 pt-5 border-t">

//               <span className="text-xl font-bold">
//                 Total
//               </span>

//               <span className="text-xl font-bold">
//                 ₹{totalPrice.toFixed(2)}
//               </span>

//             </div>

//             <button
//               onClick={handlePayment}
//               disabled={
//                 paymentLoading ||
//                 !selectedAddress ||
//                 !addresses.length
//               }
//               className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
//             >
//               {paymentLoading
//                 ? "Redirecting to Payment..."
//                 : "Proceed to Payment"}
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Checkout;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAddresses, createAddress } from "../../api/addressApi";
import { createCheckoutSession } from "../../api/paymentApi";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);


const [showAddressForm, setShowAddressForm] = useState(false);

const [addressForm, setAddressForm] = useState({
  street: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
});

const [addressLoading, setAddressLoading] = useState(false);




const handleAddressChange = (e) => {
  const { name, value } = e.target;

  setAddressForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};


const handleAddAddress = async (e) => {
  e.preventDefault();

  if (
    !addressForm.street ||
    !addressForm.city ||
    !addressForm.state ||
    !addressForm.country ||
    !addressForm.pincode
  ) {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Address",
      text: "Please fill in all address fields.",
    });

    return;
  }

  try {
    setAddressLoading(true);

    const response = await createAddress(addressForm);

    console.log("New address:", response);

    /*
     * Depending on your backend response,
     * response may be the address directly
     * or response.address.
     */

    const newAddress =
      response?.address || response;

    setAddresses((prev) => [
      ...prev,
      newAddress,
    ]);

    // Automatically select the new address
    setSelectedAddress(newAddress._id);

    // Hide form
    setShowAddressForm(false);

    // Clear form
    setAddressForm({
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    });

    Swal.fire({
      icon: "success",
      title: "Address Added",
      text: "Your delivery address has been added successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

  } catch (error) {
    console.error(
      "Add address error:",
      error
    );

    Swal.fire({
      icon: "error",
      title: "Failed",
      text:
        error?.response?.data?.message ||
        error?.message ||
        "Unable to add address.",
    });

  } finally {
    setAddressLoading(false);
  }
};



  useEffect(() => {
    const loadCheckout = async () => {
      try {
        const items =
          JSON.parse(localStorage.getItem("cartItems")) || [];

        if (!items.length) {
          navigate("/cart");
          return;
        }

        setCartItems(items);

        const addressData = await getAddresses();

        setAddresses(addressData || []);

        if (addressData?.length > 0) {
          setSelectedAddress(addressData[0]._id);
        }
      } catch (error) {
        console.error("Checkout loading error:", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Unable to load checkout information.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCheckout();
  }, [navigate]);

  const totalPrice = cartItems.reduce(
    (sum, item) => {
      const price =
        item.product_id?.price ||
        item.product?.price ||
        0;

      return sum + item.quantity * price;
    },
    0
  );

  const handlePayment = async () => {
    if (!selectedAddress) {
      Swal.fire({
        icon: "warning",
        title: "Select Address",
        text: "Please select a delivery address.",
      });

      return;
    }

    try {
      setPaymentLoading(true);

      const address = addresses.find(
        (item) => item._id === selectedAddress
      );

      if (!address) {
        throw new Error("Selected address not found");
      }

      const items = cartItems.map((item) => ({
        product_id:
          item.product_id?._id ||
          item.product?._id,

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
      console.log("Shipping address:", address);

      const response = await createCheckoutSession({
        items,
        shippingAddress: {
          street: address.street,
          city: address.city,
          state: address.state,
          country: address.country,
          pincode: address.pincode,
        },
      });

      console.log("Stripe response:", response);

      if (!response?.url) {
        throw new Error(
          "Stripe checkout URL was not returned."
        );
      }

      // Redirect directly to Stripe Checkout
      window.location.href = response.url;

    } catch (error) {
      console.error("Payment error:", error);

      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text:
          error?.message ||
          "Unable to start payment.",
      });

      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading checkout...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* DELIVERY ADDRESS */}

          <div className="bg-white rounded-lg shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Delivery Address
            </h2>

            {/* {addresses.length === 0 ? (

              <div className="border rounded-lg p-5">

                <p className="text-gray-600 mb-4">
                  You don't have a saved delivery address.
                </p>

                <button
                  onClick={() => navigate("/profile")}
                  className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                  Add Address
                </button>

              </div>

            ) : ( */}

{addresses.length === 0 && !showAddressForm && (

  <div className="border rounded-lg p-5">

    <p className="text-gray-600 mb-4">
      You don't have a saved delivery address.
    </p>

    <button
      onClick={() => setShowAddressForm(true)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
    >
      + Add New Address
    </button>

  </div>

)}

{showAddressForm && (

  <form
    onSubmit={handleAddAddress}
    className="border rounded-lg p-5 mt-4"
  >

    <h3 className="text-lg font-semibold mb-4">
      Add New Address
    </h3>

    <div className="space-y-4">

      {/* Street */}

      <div>
        <label className="block mb-1 font-medium">
          Street
        </label>

        <input
          type="text"
          name="street"
          value={addressForm.street}
          onChange={handleAddressChange}
          placeholder="Enter street"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>


      {/* City */}

      <div>
        <label className="block mb-1 font-medium">
          City
        </label>

        <input
          type="text"
          name="city"
          value={addressForm.city}
          onChange={handleAddressChange}
          placeholder="Enter city"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>


      {/* State */}

      <div>
        <label className="block mb-1 font-medium">
          State
        </label>

        <input
          type="text"
          name="state"
          value={addressForm.state}
          onChange={handleAddressChange}
          placeholder="Enter state"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>


      {/* Country */}

      <div>
        <label className="block mb-1 font-medium">
          Country
        </label>

        <input
          type="text"
          name="country"
          value={addressForm.country}
          onChange={handleAddressChange}
          placeholder="Enter country"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>


      {/* Pincode */}

      <div>
        <label className="block mb-1 font-medium">
          Pincode
        </label>

        <input
          type="text"
          name="pincode"
          value={addressForm.pincode}
          onChange={handleAddressChange}
          placeholder="Enter pincode"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>


      {/* Buttons */}

      <div className="flex gap-3 pt-2">

        <button
          type="submit"
          disabled={addressLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
        >
          {addressLoading
            ? "Saving..."
            : "Save Address"}
        </button>

        <button
          type="button"
          onClick={() => setShowAddressForm(false)}
          className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </div>

  </form>

)}

{addresses.length > 0 && (

  <div className="space-y-4">

    <div className="flex justify-between items-center">

      <h3 className="font-semibold">
        Select Delivery Address
      </h3>

      <button
        onClick={() => setShowAddressForm(true)}
        className="text-blue-600 hover:underline"
      >
        + Add New
      </button>

    </div>

    {addresses.map((address) => (

      <label
        key={address._id}
        className={`block border rounded-lg p-4 cursor-pointer ${
          selectedAddress === address._id
            ? "border-green-600 bg-green-50"
            : "border-gray-300"
        }`}
      >

        <div className="flex gap-3">

          <input
            type="radio"
            name="address"
            value={address._id}
            checked={
              selectedAddress === address._id
            }
            onChange={(e) =>
              setSelectedAddress(
                e.target.value
              )
            }
          />

          <div>

            <p className="font-semibold">
              {address.street}
            </p>

            <p className="text-gray-600">
              {address.city}, {address.state}
            </p>

            <p className="text-gray-600">
              {address.country} -{" "}
              {address.pincode}
            </p>

          </div>

        </div>

      </label>

    ))}

  </div>

)}



              <div className="space-y-4">

                {addresses.map((address) => (

                  <label
                    key={address._id}
                    className={`block border rounded-lg p-4 cursor-pointer ${
                      selectedAddress === address._id
                        ? "border-green-600 bg-green-50"
                        : "border-gray-300"
                    }`}
                  >

                    <div className="flex gap-3">

                      <input
                        type="radio"
                        name="address"
                        value={address._id}
                        checked={
                          selectedAddress === address._id
                        }
                        onChange={(e) =>
                          setSelectedAddress(
                            e.target.value
                          )
                        }
                      />

                      <div>

                        <p className="font-semibold">
                          {address.street}
                        </p>

                        <p className="text-gray-600">
                          {address.city}, {address.state}
                        </p>

                        <p className="text-gray-600">
                          {address.country} -{" "}
                          {address.pincode}
                        </p>

                      </div>

                    </div>

                  </label>

                ))}

              </div>

            {/* )} */}

          </div>


          {/* ORDER SUMMARY */}

          <div className="bg-white rounded-lg shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Order Summary
            </h2>

            <div className="space-y-4">

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

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹
                      {(price * item.quantity).toFixed(2)}
                    </p>

                  </div>
                );
              })}

            </div>

            <div className="flex justify-between border-t mt-6 pt-5">

              <span className="text-xl font-bold">
                Total
              </span>

              <span className="text-xl font-bold">
                ₹{totalPrice.toFixed(2)}
              </span>

            </div>

            <button
              onClick={handlePayment}
              disabled={
                paymentLoading ||
                !selectedAddress ||
                !addresses.length
              }
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {paymentLoading
                ? "Redirecting..."
                : "Proceed to Payment"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;