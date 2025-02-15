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

// get customer by id
// get /api/customers/:id

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

// update customer
// put /api/customers/:id

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

// delete customer
// delete /api/customers/:id

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
