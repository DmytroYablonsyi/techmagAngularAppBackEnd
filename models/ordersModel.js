import mongoose from "mongoose";
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
  method: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const orderSchema = new Schema({
  customerName: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  delivery: {
    type: deliverySchema,
    required: true
  }
},
{
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order
