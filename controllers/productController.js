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
 * /api/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: Update the details of an existing product by providing its ID and new data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID to update.
 *         schema:
 *           type: string
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
 *               deliveryMethods:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     method:
 *                       type: string
 *                     time:
 *                       type: string
 *                     price:
 *                       type: number
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *                 deliveryAvailable:
 *                   type: boolean
 *                 deliveryMethods:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       method:
 *                         type: string
 *                       time:
 *                         type: string
 *                       price:
 *                         type: number
 *       400:
 *         description: Invalid data provided.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Server error occurred while updating product.
 */


const updateProduct = asyncHandler (async (req, res) => {
  const id = req.params.id;
  const { name, description, price, deliveryAvailable, deliveryMethods } = req.body
  const newData = {
      name: name,
      description,
      price,
      delivery: {
        available: deliveryAvailable,
        methods: [ 
          ...deliveryMethods
        ],
      }
  }
console.log(req.body)
  try {
      const updatedProduct = await Product.findByIdAndUpdate(id, newData, { new: true });
      if (!updatedProduct) {
        return res.status(404).send('Product not found');
      }
      res.status(200).json(updatedProduct);
    } 
  catch (error) {
      res.status(500).send('Error updating product data');
    }
  });

export {getProducts, getProductsById, updateProduct}

