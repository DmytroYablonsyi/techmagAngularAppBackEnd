import asyncHandler from '../middleware/asyncHandler.js';
import Customer from '../models/customersModel.js';

// get customers
// GET /api/customers

const getCustomers = asyncHandler (async (req, res) => { 
    const customers = await Customer.find({});
    res.status(200).send(customers);
});

// get customer by id
// GET /api/customers/:id

const getCustomerById = asyncHandler (async (req, res) => { 
    const customer = await Customer.findById(req.params.id)

    if(customer){
        res.status(200).json(customer)
    }else{
        res.status(400);
        throw new Error('customer not found')
    }
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

export { getCustomers, getCustomerById, createCustomer}
