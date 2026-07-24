import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRouter);

// test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SmartInvoice API is running",
  });
});

export default app;