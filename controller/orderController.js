import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/ordersModel.js"

// Get all orders
// GET api/orders

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
});

// Get order by id
// GET /api/orders/:id

const getOrderById = asyncHandler (async (req, res) => { 
    const order = await Order.findById(req.params.id);

    if ( order ) {
        res.status(200).json(order)
    } else {
        res.status(404); 
        throw new Error('Order not found')
    }
});

// Create order
// POST /api/orders

const addOrderItems = asyncHandler (async (req, res) => { 
    const { customerName, product, quantity, amount, delivery } = req.body; 

    const order = new Order({
        customerName: customerName,
        product: product,
        quantity: quantity,
        amount: amount,
        delivery:{
            method: delivery.method,
            time: delivery.time,
            price: delivery.price,
          }
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);

});

export { getOrders, getOrderById, addOrderItems }