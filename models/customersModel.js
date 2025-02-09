import mongoose from "mongoose";

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  city: { 
    type: String, 
    required: true 
},
  street: { 
    type: String, 
    required: true 
}
});

const customerSchema = new Schema({
      name: { 
        type: String, 
        required: true 
    },
      address: { 
        type: addressSchema, 
        required: true 
    },
      phone: { 
        type: String, 
        required: true 
    },

      contactPerson: { 
        type: String, 
        required: true 
    }
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer