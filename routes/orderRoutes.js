import express from "express";
const router = express.Router();
import { getOrders, getOrderById, addOrderItems } from "../controller/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route('/').get(protect ,getOrders).post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)

export default router