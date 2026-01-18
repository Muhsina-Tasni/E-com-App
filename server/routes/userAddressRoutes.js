const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddlware");
const { createAddress, getAddresses, getAddressesById, updateAddress, deleteAddress } = require("../controllers/userAddressController");

router.post("/", auth, createAddress);
router.get("/", auth, getAddresses);
router.get("/:id", auth, getAddressesById);
router.put("/:id", auth, updateAddress);
router.delete("/:id", auth, deleteAddress);

module.exports = router;
