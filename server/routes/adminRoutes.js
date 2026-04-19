//adminrouter.js
import express from "express";
// import router from express.Router();

import { getAdminStats }  from"../controllers/adminController.js"
import {auth} from"../middleware/authMiddleware.js"; 
const router = express.Router();



router.get("/stats", auth, getAdminStats);

export default router;
