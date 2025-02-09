import express from "express";
const router = express.Router();
import { createProduct, deleteProduct, getProducts, getProductsById } from "../controller/productController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route('/').get(protect, getProducts).post(protect, createProduct);
router.route('/:id').get(protect, getProductsById).delete(deleteProduct);

export default router