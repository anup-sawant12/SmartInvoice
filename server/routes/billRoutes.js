import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
  getNextNumber,
} from "../controllers/billController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const billRouter = express.Router();

billRouter.post("/", authMiddleware, create);
billRouter.get("/", authMiddleware, getAll);
billRouter.get("/next-number", authMiddleware, getNextNumber);
billRouter.get("/:id", authMiddleware, getById);
billRouter.delete("/:id", authMiddleware, remove);

export default billRouter;
