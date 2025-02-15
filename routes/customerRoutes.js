import express from "express";
const router = express.Router();
import { createCustomer, deleteCustomer, getCustomerById, getCustomers, updateCustomer } from "../controller/customerController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getCustomers).post(protect, createCustomer);
router.route("/:id").put(protect, updateCustomer).get(protect, getCustomerById).delete(protect, deleteCustomer)

export default router