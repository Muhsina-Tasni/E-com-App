import express from "express";
// import router from express.Router()
import {auth} from "../middleware/authMiddleware.js";
import { addOrderItem, getOrderItems, getOrderItemById, updateOrderItem, deleteOrderItem } from "../controllers/orderItemController.js";


const router = express.Router();
router.post("/", auth, addOrderItem);
router.get("/", auth, getOrderItems);
router.get("/:id", auth, getOrderItemById);
router.put("/:id", auth, updateOrderItem);
router.delete("/:id", auth, deleteOrderItem);

export default router;
