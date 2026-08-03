import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import shopRouter from "./routes/shopRoutes.js";
import productRouter from "./routes/productRoutes.js";
import billRouter from "./routes/billRoutes.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/shop', shopRouter);
app.use("/api/products", productRouter);
app.use("/api/bills", billRouter);

// test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SmartInvoice API is running",
  });
});

export default app;