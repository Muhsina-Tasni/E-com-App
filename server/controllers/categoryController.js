const Category = require("../models/Category");
const httpStatus = require("../constants/httpStatus");
const messages = require("../constants/messages");

// Create Category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(httpStatus.CREATED).json({ message: messages.CATEGORY_CREATED, category });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(httpStatus.OK).json(categories);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(httpStatus.NOT_FOUND).json({ message: messages.CATEGORY_NOT_FOUND });
    res.status(httpStatus.OK).json(category);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(httpStatus.NOT_FOUND).json({ message: messages.CATEGORY_NOT_FOUND });
    res.status(httpStatus.OK).json(category);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(httpStatus.NOT_FOUND).json({ message: messages.CATEGORY_NOT_FOUND });
    res.status(httpStatus.OK).json({ message: messages.CATEGORY_DELETED });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
