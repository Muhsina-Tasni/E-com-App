//adminrouter.js
import express from "express";
// import router from express.Router();
import adminOnly from "../middleware/adminMiddlware.js"
import { getAdminStats,getAllOrders } from"../controllers/adminController.js"
import {auth} from"../middleware/authMiddleware.js"; 
const router = express.Router();



router.get("/stats", auth, getAdminStats);

// Admin - get all orders 
//  router.get("/orders", auth, getAllOrders);

router.get("/orders",auth,adminOnly,getAllOrders);

export default router;
