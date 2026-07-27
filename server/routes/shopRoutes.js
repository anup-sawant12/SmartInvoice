import express from "express";
import { create, get, update } from "../controllers/shopController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const shopRouter = express.Router();

shopRouter.post("/", authMiddleware, upload.single("logo"), create);
shopRouter.get("/", authMiddleware, get);
shopRouter.put("/", authMiddleware, upload.single("logo"), update);

export default shopRouter;