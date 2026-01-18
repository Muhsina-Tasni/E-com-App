
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import ProductCard from "../../components/common/ProductCard"

const ProductList = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/product", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, [token]);

  return (
    <div className="min-h-screen  bg-stone-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;



















// import { useContext, useEffect, useState } from "react";
// import { getProducts } from "../../api/productApi";
// import Button from "../../components/common/Button";
// import { addToCart } from "../../api/cartApi";
// import { AuthContext } from "../../context/AuthContext";

// const ProductList = () => {
//     const { user } = useContext(AuthContext);  
//   const [products, setProducts] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await getProducts();
        
//         setProducts(response.data || []);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleAddToCart = async (productId) => {
//   try {
//     const res = await addToCart(user._id,productId, 1);
//     console.log(res,'cart');
    
//     if (res.data) {
//       setMessage(res.data);
//     } else {
//       setMessage("Item added to cart");
//     }
//   } catch (error) {
//     setMessage(error.message || "Failed to add item");
//   }
// };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Product List</h2>
//      {message && <p className="mb-4 text-green-600">{String(message)}</p>}
//       <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {products?.map((product) => (
//           <li key={product._id} className="border p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold">{product.name}</h3>
//             <p>{product.description}</p>
//             <p className="font-bold">₹ {product.price}</p>
//             <Button
//               className="mt-2 px-4 py-2 rounded"
//               onClick={() => handleAddToCart(product._id)}
//             >Add to cart</Button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;








// to listing products

// import products from "../Data/data.json";
// import ProductCard from "../../components/common/ProductCard"

// const ProductList = () => {
//   // filter the products to womens products
//   const womensProducts = products.filter((item) => {
//     return item.category === "women's clothing";
//   });
//   return (
//     <section className="grid grid-cols-12 gap-4">
//       <div
//         id="img-girl"
//         className="flex justify-center snap-center col-span-12 lg:col-span-5 bg-gray-200"
//       >
//         <img src="./images/img1.png" />
//       </div>

//       <div className="col-span-12 lg:col-span-7 p-4">
//         <h1 className="text-3xl font-bold mb-6">For Her</h1>

//         <div className="border-4 p-3" style={{ borderColor: "gold" }}>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-2xl">
//             {womensProducts.map((product, index) => {
//               //  imported the card cumponent
//               return <ProductCard key={index} product={product} />;
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductList;
