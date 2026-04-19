import express from "express";
// import router from express.Router();
import {auth }from "../middleware/authMiddleware.js";
import { createAddress, getAddresses, getAddressesById, updateAddress, deleteAddress } from "../controllers/userAddressController.js";


const router = express.Router();

router.post("/", auth, createAddress);
router.get("/", auth, getAddresses);
router.get("/:id", auth, getAddressesById);
router.put("/:id", auth, updateAddress);
router.delete("/:id", auth, deleteAddress);

export default router;
