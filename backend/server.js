// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/database.js';
// import productRoutes from './routes/product.route.js';

// dotenv.config();

// app.on("error", (error) => {
//     console.error("Server error:", error);
//     throw error;
//   });

// const app = express();
// console.log(1)

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Home route
// app.get('/', (req, res) => {
//     res.send('E-commerce backend is running');
// });

// // Product routes
// app.use('/api/products', productRoutes);


// // example route: http://localhost:4000/api/products
// // Connect to database
// connectDB();
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

dotenv.config();

const startServer = async () => {
  const isDbConnected = await connectDB();

  if (!isDbConnected) {
    console.warn(
      "Server started without a database connection. Update MONGODB_URI or allow your Atlas IP in Network Access.",
    );
  }

  app.on("error", (error) => {
    console.error("Server error:", error);
    throw error;
  });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
};
startServer();
