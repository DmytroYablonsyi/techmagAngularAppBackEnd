import express from "express";
const router = express.Router();
import { getProducts, getProductsById, updateProduct } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route('/').get(protect, getProducts);
router.route('/:id').get(protect, getProductsById).put(protect, updateProduct);

export default router