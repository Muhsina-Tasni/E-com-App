import express from "express";
// import router from express.Router();
import{ auth} from "../middleware/authMiddleware.js"
import  { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from "../controllers/orderController.js";



const router = express.Router();
router.post("/", auth, createOrder);
router.get("/", auth, getOrders);
router.get("/:id", auth, getOrderById);
router.put("/:id", auth, updateOrder);
router.delete("/:id", auth, deleteOrder);

export default router;
