import express from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const productRouter = express.Router();

productRouter.post("/", authMiddleware, create);
productRouter.get("/", authMiddleware, getAll);
productRouter.get("/:id", authMiddleware, getById);
productRouter.put("/:id", authMiddleware, update);
productRouter.delete("/:id", authMiddleware, remove);

export default productRouter;