import express from "express";
import cors from "cors";

const app = express(); // create an express app

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  }),
);

app.use(express.json());

// routes import
import productRoutes from "./routes/product.route.js";
// route declaration
app.use("/api/products", productRoutes);

// example route: http://localhost:5000/api/products

export default app;
