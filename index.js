import categoryRoutes from "./routes/categoryRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import orderRoutes from "./routes/orderRoutes.js";
import path from "path";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Vite's default port
    credentials: true, // Allow cookies to be sent
  })
);
// Routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

// PayPal config route
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Serve static files from the uploads folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
app.listen(port, () => console.log(`Server running on port: ${port}`));
