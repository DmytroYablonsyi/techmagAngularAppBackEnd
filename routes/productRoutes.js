import express from "express";
const router = express.Router();
import { createProduct, getProducts, getProductsById } from "../controller/productController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route('/').get(protect, getProducts).post(protect, createProduct);
router.route('/:id').get(protect, getProductsById);

export default router