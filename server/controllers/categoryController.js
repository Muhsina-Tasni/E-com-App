import Category from"../models/Category.js";
import messages from "../constants/messages.js";
import httpStatus from "../constants/httpStatus.js";

// Create Category
 export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    // res.status(CREATED).json({ message: CATEGORY_CREATED, category });
    res.status(httpStatus.CREATED).json({ message: messages.CATEGORY_CREATED, category });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Get all categories (plain 200/500 avoids bad deploys using bare `OK` / import mismatches)
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    return res.status(200).json(categories);
  } catch (err) {
    console.error("getCategories:", err);
    return res.status(500).json({ message: err.message });
  }
};


// export const getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     console.log("Categories fetched:", categories); // 👈 add this
//     res.status(200).json(categories);
//   } catch (err) {
//     console.error("Category fetch error:", err); // 👈 ADD THIS
//     res.status(500).json({ message: err.message });
//   }
// };




// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(httpStatus.NOT_FOUND).json({ message: messages.CATEGORY_NOT_FOUND });
    res.status(httpStatus.OK).json(category);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Update category
 export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(httpStatus.NOT_FOUND).json({ message: messages.CATEGORY_NOT_FOUND });
    res.status(httpStatus.OK).json(category);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
     if (!category) return res.status(httpStatus.NOT_FOUND).json({ message: messages.CATEGORY_NOT_FOUND });
    res.status(httpStatus.OK).json({ message: messages.CATEGORY_DELETED });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};


