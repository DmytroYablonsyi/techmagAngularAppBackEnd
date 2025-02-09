import express from "express";
const router = express.Router();
import { createCustomer, getCustomerById, getCustomers } from "../controller/customerController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getCustomers).post(protect, createCustomer);
router.route("/:id").get(protect, getCustomerById);
// router.route("/:customerName/orders").get(getCustomerOrders);

export default router