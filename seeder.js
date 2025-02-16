import mongoose from "mongoose";
import  dotenv  from "dotenv";
import { customers } from "./data/customers.js";
import { orders } from "./data/orders.js";
import { products } from "./data/products.js";
import Customer from "./models/customersModel.js";
import Order from "./models/ordersModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";
import { adminUser } from "./data/adminUsers.js";
import User from "./models/adminUser.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await Customer.deleteMany();
        await User.deleteMany();

        await Customer.insertMany(customers);
        await Order.insertMany(orders);
        await Product.insertMany(products);
        await User.insertMany(adminUser)

        console.log('Data Imported');

        process.exit()

    } catch (error) {
        console.log(`$error`)
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await Customer.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed');

        process.exit()

    } catch (error) {
        console.log(`$error`)
        process.exit(1);
    }
} 

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData()
}