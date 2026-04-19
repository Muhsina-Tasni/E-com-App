
// // routes/categoryRoutes.js
// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/AuthMiddlware");
// const adminOnly = require("../middleware/adminMiddlware");
// const { createCategory, getCategories, updateCategory, deleteCategory,getCategoryById } = require("../controllers/categoryController");

// router.post("/", auth, adminOnly, createCategory);
// router.get("/", getCategories);
// router.put("/:id", auth, adminOnly, updateCategory);
// router.delete("/:id", auth, adminOnly, deleteCategory);
//  router.get("/:id", auth, getCategoryById);

// module.exports = router;

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
