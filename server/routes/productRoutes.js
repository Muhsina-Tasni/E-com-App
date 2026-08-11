// // routes/productRoutes.js
import express from "express";
// import router from express.Router();
import {auth} from "../middleware/authMiddleware.js";
// import adminOnly from "../middleware/adminMiddlware.js";
import { createProduct, getProducts ,getProductById,updateProduct,deleteProduct} from "../controllers/productController.js";

const router = express.Router();


router.post("/", auth,  createProduct);
router.get("/", getProducts);
router.get("/:id", auth, getProductById);
router.put("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);

export default router;
