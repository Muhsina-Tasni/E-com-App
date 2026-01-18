
const Address = require("../models/UserAddress");

// CREATE
const createAddress = async (req, res) => {
  try {
    const { street, city, state, country, pincode } = req.body;

    if (!street || !city || !state || !country || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const address = new Address({
      user_id: req.user.id,
      street,
      city,
      state,
      country,
      pincode,
    });

    await address.save();
    res.status(201).json(address);
  } catch (err) {
    console.error("Create address error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET all addresses for logged in user
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user_id: req.user.id });
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by user id
const getAddressesById = async (req, res) => {
  try {
    const addresses = await Address.find({ user_id: req.params.id });
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
const updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.status(200).json(address);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createAddress,
  getAddresses,
  getAddressesById,
  updateAddress,
  deleteAddress,
};
