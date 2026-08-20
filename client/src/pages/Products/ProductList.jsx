import { useState, useEffect } from "react";
import { getProducts } from "../../api/productApi";
import ProductCard from "../../components/common/ProductCard";
import AIRecommendation from "../../components/AIRecommendation";
import { useNavigate, NavLink } from "react-router-dom";



const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (

<>
  
    <div className="min-h-screen  bg-stone-100 p-8 ">


{/* ai recommentation */}
<NavLink
  to="/ai-recommendations"
  className="fixed right-6 top-24 z-50"
>
  <div
    className="flex items-center justify-center
               w-10 h-10 md:w-15 md:h-15 
               rounded-full
               bg-gray-900
               text-2xl md:text-3xl
               cursor-pointer
               transition-all duration-300
               hover:scale-110
               hover:shadow-2xl
               hover:bg-amber-600"
  >
    🤖
  </div>
</NavLink> 



      <h2 className="text-2xl font-bold mb-6 text-center pt-15">Products</h2>
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
    </>
  );
};

export default ProductList;
