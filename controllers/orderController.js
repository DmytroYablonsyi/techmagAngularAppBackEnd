import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/ordersModel.js"

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Fetch all orders from the database.
 *     responses:
 *       200:
 *         description: A list of orders.
 */

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.json(orders);
});

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieve a specific order by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the order.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched order details.
 *       404:
 *         description: Order not found.
 */

const getOrderById = asyncHandler (async (req, res) => { 
    const order = await Order.findById(req.params.id);

    if ( order ) {
        res.status(200).json(order)
    } else {
        res.status(404); 
        throw new Error('Order not found')
    }
});

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with order details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               product:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               amount:
 *                 type: number
 *               delivery:
 *                 type: object
 *                 properties:
 *                   method:
 *                     type: string
 *                   time:
 *                     type: string
 *                   price:
 *                     type: number
 *     responses:
 *       201:
 *         description: Order created successfully.
 */

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