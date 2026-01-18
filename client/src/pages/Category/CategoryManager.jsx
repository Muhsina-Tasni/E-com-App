


import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const CategoryManager = ({ onCategoryAdded }) => {
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

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
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "http://localhost:7000/api/category",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setForm({ name: "", description: "" });
      fetchCategories();
      onCategoryAdded(); // refresh dropdown in AddProduct
    } catch (err) {
      setError("Failed to add category");
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Add Category Form */}
      <form onSubmit={handleAdd} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Category Name"
          className="w-full border border-stone-300 p-2"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Category Description"
          rows="2"
          className="w-full border border-stone-300 p-2"
          required
        />

        <button className="w-full border border-amber-600 text-amber-600 py-3 hover:bg-amber-600 hover:text-white transition">
          Add Category
        </button>
      </form>

      {/* Category List */}
      {/* <div className="border-t pt-3 space-y-2 max-h-48 overflow-y-auto">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="border p-2 bg-stone-50 text-sm"
          >
            <p className="font-medium text-stone-800">{cat.name}</p>
            <p className="text-stone-500">{cat.description}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default CategoryManager;
