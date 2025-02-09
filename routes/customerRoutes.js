import express from "express";
const router = express.Router();
import { createCustomer, getCustomers } from "../controller/customerController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getCustomers).post(protect, createCustomer);

export default router