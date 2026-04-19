
import { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  normalizeCategoryList,
} from "../../api/categoryApi";

const CategoryManager = ({ onCategoryAdded }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(normalizeCategoryList(data));
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
      await createCategory(form);

      setForm({ name: "", description: "" });
      await fetchCategories();
      onCategoryAdded?.();
    }
    //  catch (err) {
    //   setError("Failed to add category");
    //   console.error(err);
    // }

catch (err) {
  console.error("Backend error:", err.response?.data || err.message);

  setError(
    err.response?.data?.message ||
    err.message ||
    "Failed to add category"
  );
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
        {categories.length === 0 ? (
          <p className="text-stone-500 text-sm">No categories yet.</p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="border p-2 bg-stone-50 text-sm"
            >
              <p className="font-medium text-stone-800">{cat.name}</p>
              <p className="text-stone-500">{cat.description}</p>
            </div> */}
          {/* ))
        )}
      </div> */}
    </div>
  );
};

export default CategoryManager;
