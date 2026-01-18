import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/categoryApi";

const Homeadd = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center text-stone-500">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 flex justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="  bg-stone-100">
      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="uppercase tracking-widest text-xs text-stone-500 mb-2">
            Categories
          </p>
          <h2 className="text-4xl font-serif font-bold text-stone-800">
            Explore Genres
          </h2>
          <p className="text-stone-500 mt-3 max-w-xl mx-auto">
            Carefully curated book collections across every genre.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-stone-500">No categories available.</p>
        ) : (
          // <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">



            {categories.map((cat) => (
              <div
                key={cat._id}
                onClick={() => navigate("/products")}
                className="group cursor-pointer"
              >
                <div className="bg-white border border-stone-200 overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300">
                  <div className="h-52 overflow-hidden">
                    <img
                      src={
                        cat.image ||
                        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                      }
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-5 text-center">
                    <h3 className="font-serif text-lg text-stone-800 mb-2">
                      {cat.name}
                    </h3>

                    <span className="text-sm text-amber-600 group-hover:underline">
                      Browse Collection →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      
    </div>
  );
};

export default Homeadd;


