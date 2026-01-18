

import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CartItem from "../../pages/Cart/CartItem";
import {
  getCartItemsByUser,
  updateCartItem,
  removeCartItem,
} from "../../api/cartItemApi";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
const navigate = useNavigate();



  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const items = await getCartItemsByUser(user._id);
        setCartItems(items);
      } catch (err) {
        console.error("Fetch cart failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user]);

  // Update quantity of a cart item
  const changeQty = async (itemId, qty) => {
    if (qty < 1) return;
    try {
      await updateCartItem(itemId, qty);
      setCartItems((prev) =>
        prev.map((i) => (i._id === itemId ? { ...i, quantity: qty } : i))
      );
    } catch (err) {
      console.error("Update qty failed:", err);
    }
  };

  // Remove single item
  const handleRemove = async (id) => {
    try {
      await removeCartItem(id);
      setCartItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  // Clear entire cart
  const handleClearCart = async () => {
    if (!cartItems.length) return;
    setClearing(true);
    try {
      await Promise.all(cartItems.map((i) => removeCartItem(i._id)));
      setCartItems([]);
    } catch (err) {
      console.error("Clear cart failed:", err);
    } finally {
      setClearing(false);
    }
  };

  // Total price of cart
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.product?.price || 0),
    0
  );

  if (loading) return <div className="p-4">Loading cart...</div>;
  if (!user) return <div className="p-4">Please login to view your cart.</div>;
  if (!cartItems.length) return <div className="p-4">Your cart is empty.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Cart Items */}
      {cartItems.map((item) => (
        <CartItem
          key={item._id}
          item={item}
          updateQuantity={changeQty}
          removeItem={handleRemove}
        />
      ))}

      {/* Total and actions */}
      <div className="mt-6 flex flex-col md:flex-row md:justify-between items-center bg-gray-100 p-4 rounded-lg shadow">
        <div className="text-xl font-semibold mb-4 md:mb-0">
          Total: ₹{totalPrice.toFixed(2)}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleClearCart}
            disabled={clearing}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
          >
            {clearing ? "Clearing..." : "Clear Cart"}
          </button>

          {/* <button
            onClick={() => alert("Proceeding to checkout...")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Proceed to Checkout
          </button> */}
<button
  onClick={() => navigate("/checkout")}
  className="px-4 py-2 bg-green-600 text-white rounded"
>
  Proceed to Checkout
</button>



        </div>
      </div>
    </div>
  );
};

export default CartPage;
