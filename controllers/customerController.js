import asyncHandler from '../middleware/asyncHandler.js';
import Customer from '../models/customersModel.js';

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     description: Retrieve a list of all customers.
 *     responses:
 *       200:
 *         description: Successfully fetched the list of customers.
 */

const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({});
  res.status(200).send(customers);
});

/**
* @swagger
* /api/customers:
*   post:
*     summary: Create a new customer
*     description: Create a new customer by providing name, phone, contact person, and address.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               phone:
*                 type: string
*               contactPerson:
*                 type: string
*               address:
*                 type: object
*                 properties:
*                   city:
*                     type: string
*                   street:
*                     type: string
*     responses:
*       201:
*         description: Customer created successfully.
*/
const createCustomer = asyncHandler(async (req, res) => {
  const { name, phone, contactPerson, address } = req.body;

  const customer = new Customer({
      name: name,
      address: {
          city: address.city,
          street: address.street
      },
      phone: phone,
      contactPerson: contactPerson
  });

  const createdCustomer = await customer.save();

  res.status(201).json(createdCustomer);
});

/**
* @swagger
* /api/customers/{id}:
*   get:
*     summary: Get customer by ID
*     description: Retrieve a specific customer by their ID.
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: The ID of the customer.
*         schema:
*           type: string
*     responses:
*       200:
*         description: Successfully fetched customer details.
*       404:
*         description: Customer not found.
*/

const getCustomerById = asyncHandler (async (req, res) => {
    try {
        const customerId = req.params.id;
    
        const customer = await Customer.findById(customerId);
    
        if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
        }
    
        res.status(200).json(customer);
      } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ message: 'Server error' });
      }
})

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update customer details
 *     description: Update the customer information by providing their ID and new data.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the customer.
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
 *               contactPerson:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   street:
 *                     type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated customer details.
 *       404:
 *         description: Customer not found.
 */

const updateCustomer = asyncHandler (async (req, res) => {
    const id = req.params.id;
    const { name, contactPerson, city, street, phone } = req.body
    const newData = {
        name: name,
      address: {
        city: city,
        street: street
      },
      phone: phone,
      contactPerson: contactPerson
    }

    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedCustomer) {
          return res.status(404).send('Client not found');
        }
        res.status(200).json(updatedCustomer);
      } 
    catch (error) {
        res.status(500).send('Error updating client data');
      }
})

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     description: Delete a customer by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the customer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted customer.
 *       404:
 *         description: Customer not found.
 */

const deleteCustomer = asyncHandler (async (req, res) => {
    const customerId = req.params.id;

    try {
      const deletedCustomer = await Customer.findByIdAndDelete(customerId);
  
      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({ message: 'Server error' });
    }
})

export { getCustomers, createCustomer, updateCustomer, getCustomerById, deleteCustomer}
