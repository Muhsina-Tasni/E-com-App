import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createProduct } from "../../api/productApi";
import axios from "axios";
import ProductList from "./ProductList";
import AdminStats from "./ProductStats";
import CategoryManager from "../Category/CategoryManager";

const AddProduct = () => {
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/category", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const result = await createProduct(form, token);
      setSuccess(result.message);

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        image: "",
      });
    } catch (err) {
      setError(err.message || "Product add failed");
    }
  };

  return (
    <>
      {/* Admin Top Section */}
      <section className="bg-stone-100 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left - Add Product */}
          <div className="bg-white border border-stone-200 shadow-xl p-8 lg:col-span-2">
            <h2 className="text-3xl font-serif mb-2">Admin Panel</h2>
            <p className="text-stone-500 mb-6">Add new books</p>

            {error && <p className="text-red-500 mb-3">{error}</p>}
            {success && <p className="text-green-600 mb-3">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Book Title"
                className="w-full border p-3" required />

              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Description" rows="3" className="w-full border p-3" required />

              <div className="grid grid-cols-2 gap-4">
                <input type="number" name="price" value={form.price} onChange={handleChange}
                  placeholder="Price" className="border p-3" required />

                <input type="number" name="stock" value={form.stock} onChange={handleChange}
                  placeholder="Stock" className="border p-3" required />
              </div>

              <select name="category_id" value={form.category_id} onChange={handleChange}
                className="w-full border p-3" required>
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>

              <input name="image" value={form.image} onChange={handleChange}
                placeholder="Image URL" className="w-full border p-3" />

              <button className="w-full border border-amber-600 text-amber-600 py-3 hover:bg-amber-600 hover:text-white transition">
                Add Product
              </button>
            </form>
          </div>

          {/* Right - Stats + Category Manager */}
          <div className="space-y-6">
            <div className="bg-white border shadow-xl p-6">
              <h3 className="text-xl font-serif mb-4">Store Overview</h3>
              <AdminStats />
            </div>

            <div className="bg-white border shadow-xl p-6">
              <h3 className="text-xl font-serif mb-4">Category Manager</h3>
              <CategoryManager onCategoryAdded={fetchCategories} />
            </div>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="bg-stone-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-serif mb-6">All Products</h3>
          <ProductList />
        </div>
      </section>
    </>
  );
};

export default AddProduct;



