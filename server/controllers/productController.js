const Product = require("../models/Product");
const httpStatus = require("../constants/httpStatus");
const messages = require("../constants/messages");



const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category_id, image } = req.body;
    const product = new Product({ name, description, price, stock, category_id, image });
    await product.save();
    res.status(httpStatus.CREATED).json({ message: messages.PRODUCT_CREATED, product });
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category_id", "name");
    res.status(httpStatus.OK).json(products);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};



const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(httpStatus.NOT_FOUND).json({ message: messages.PRODUCT_NOT_FOUND });
    res.status(httpStatus.OK).json(product);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(httpStatus.NOT_FOUND).json({ message: messages.PRODUCT_NOT_FOUND });
    res.status(httpStatus.OK).json(product);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(httpStatus.NOT_FOUND).json({ message: messages.PRODUCT_NOT_FOUND });
    res.status(httpStatus.OK).json({ message: messages.PRODUCT_DELETED });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
