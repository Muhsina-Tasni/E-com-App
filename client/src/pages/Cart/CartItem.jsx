import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function CartItem({ item, updateQuantity, removeItem }) {
  const product = item.product_id || item.product; // supports both structures

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex gap-4">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
        {product?.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <ShoppingCart className="w-8 h-8" />
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {product?.name || "Product Name"}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {product?.description || "No description available"}
        </p>

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-semibold w-8 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Price + Remove */}
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-gray-900">
              ${(product?.price * item.quantity || 0).toFixed(2)}
            </span>
            <button
              onClick={() => removeItem(item._id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
