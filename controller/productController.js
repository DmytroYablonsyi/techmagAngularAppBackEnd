import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// Fetch all products
// GET api/products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Fetch a product
// GET api/products/:id
const getProductsById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found')
  }
});

// Create product
// POST api/products

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
// Delete a product
// DELETE /api/products/:id

const deleteProduct = asyncHandler (async (req, res) => { deleteProduct
    const product = await Product.findById(req.params.id);
  
    if(product) {
     await Product.deleteOne({_id: product._id});
     res.status(200).json({message: 'Product deleted'})
    } else {
      res.status(404);
      throw new Error('Resource not found')
    }
  
  });
export {getProducts, getProductsById, createProduct, deleteProduct}

