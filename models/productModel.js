import mongoose from "mongoose";
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
  available: {
    type: Boolean,
    required: true,
  },
  methods: [{
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
  }]
});


const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  delivery: deliverySchema 
});


const Product = mongoose.model('Product', productSchema);

export default Product