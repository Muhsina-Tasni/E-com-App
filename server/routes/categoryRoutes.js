
// routes/categoryRoutes.js
import express from "express";
// import router from express.Router() 
import {auth} from "../middleware/authMiddleware.js"

import { createCategory, getCategories, updateCategory, deleteCategory,getCategoryById } from "../controllers/categoryController.js"

const router = express.Router();

router.post("/", auth, createCategory);
router.get("/", getCategories);
router.put("/:id", auth,  updateCategory);
router.delete("/:id", auth, deleteCategory);
 router.get("/:id", auth, getCategoryById);

export default router;
