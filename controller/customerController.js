import asyncHandler from '../middleware/asyncHandler.js';
import Customer from '../models/customersModel.js';

// get customers
// GET /api/customers

const getCustomers = asyncHandler (async (req, res) => { 
    const customers = await Customer.find({});
    res.status(200).send(customers);
});

// Create customer
// POST /api/customers

const createCustomer = asyncHandler (async (req, res) => { 
    const { name, phone, contactPerson, address } = req.body; 

    const customer = new Customer({
        name: name ,
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

export { getCustomers, createCustomer}
