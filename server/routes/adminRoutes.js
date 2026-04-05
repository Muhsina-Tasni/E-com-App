//adminrouter.js
import express from "express";
// import router from express.Router();

import { getAdminStats }  from"../controllers/adminController.js"
import authMiddleware from"../middleware/AuthMiddlware.js"; 
const router = express.Router();



router.get("/stats", authMiddleware, getAdminStats);

export default router;
