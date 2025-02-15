import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Fetch all products from the database.
 *     responses:
 *       200:
 *         description: A list of products.
 */
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve a specific product by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched product details.
 *       404:
 *         description: Product not found.
 */

const getProductsById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found')
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product by providing product details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               deliveryAvailable:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Product created successfully.
 */

const createProduct = asyncHandler (async (req, res) => { 
    const { name, price, description, deliveryAvailable } = req.body;

    const product = new Product({
      name: name,
      price: price,
      description: description,
      delivery: {
        available: deliveryAvailable,
        method: [ 
            {
              method: "Courier delivery",
              time: "3 days",
              price: 120
            },
            {
              method: "Pickup",
              time: "2 days",
              price: 0
            },
            {
              method: "Nova Poshta delivery",
              time: "2 days",
              price: 80
            }
             
          ]
      }
    });
  
    const createProduct = await product.save();
    res.status(201).json(createProduct);
  
  });

export {getProducts, getProductsById, createProduct}

