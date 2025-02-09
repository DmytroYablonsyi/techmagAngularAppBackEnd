import express from "express";
import dotenv from 'dotenv'
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
import cors from "cors"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("server ran");
  });

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/adminUsers", adminRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port: ${port}`));