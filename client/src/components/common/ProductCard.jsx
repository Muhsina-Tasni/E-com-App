
// src/components/common/ProductCard.jsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createCart } from "../../api/cartApi";
import { addToCart } from "../../api/cartItemApi";

const ProductCard = ({ product }) => {
  const [likedItems, setLikedItems] = useState({});
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const changeColor = (id) => {
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  
// const handleAddToCart = async () => {
//   if (!user) {
//     alert("Please login first");
//     return;
//   }

//   try {
//     const cartRes = await createCart({ user_id: user._id });

//     // ✅ Support both possible backend responses
//     const cart = cartRes.cart || cartRes;

//     if (!cart?._id) {
//       console.error("Cart not created properly:", cartRes);
//       alert("Cart error. Check backend response.");
//       return;
//     }

//     await addToCart({
//       cart_id: cart._id,
//       product_id: product._id,
//       quantity: 1,
//     });

//     alert("Added to cart successfully");
//   } catch (err) {
//     console.error("Add to cart failed:", err);
//     alert("Add to cart failed");
//   }
// };

const handleAddToCart = async () => {
  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    await addToCart({
      user_id: user._id,
      product_id: product._id,
      quantity: 1,
    });

    alert("Added to cart successfully ✅");
  } catch (err) {
    console.error("Add to cart failed:", err);
    alert("Add to cart failed");
  }
};


  const { _id, image, name, description, price, stock } = product;

  return (
    <div className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      
      {/* ❤️ Like button */}
      <button
        onClick={() => changeColor(_id)}
        className="absolute top-2 right-2 cursor-pointer"
      >
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: likedItems[_id] ? "red" : "gray" }}
        />
      </button>

      {/* Image */}
      <div className="h-40 w-full overflow-hidden flex items-center justify-center bg-gray-100 rounded">
        {image ? (
          <img src={image} alt={name} className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

      {/* Info */}
      <h2 className="text-lg font-semibold mt-3">{name}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
      <p className="text-green-600 font-bold mt-2">₹{price}</p>
      <p className="text-gray-500 text-sm">Stock: {stock}</p>

      {/* ✅ ONLY NORMAL USER CAN BUY */}
      {user?.role === "user" && (
        // <button
        //   onClick={handleAddToCart}
        //   disabled={loading}
        //   className="mt-3 w-full bg-amber-600 text-white py-2 rounded disabled:opacity-50"
        // >
        //   {loading ? "Adding..." : "Add to Cart"}
        // </button>
        <button className="mt-3 w-full bg-amber-600 text-white py-2 rounded disabled:opacity-50"
        onClick={handleAddToCart}>
  Add to Cart
</button>

      )}

      
    </div>
  );
};

export default ProductCard;
