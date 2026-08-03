import express from "express";
import {
  create,
  getAll,
  getById,
  remove,
} from "../controllers/billController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const billRouter = express.Router();

billRouter.post("/", authMiddleware, create);
billRouter.get("/", authMiddleware, getAll);
billRouter.get("/:id", authMiddleware, getById);
billRouter.delete("/:id", authMiddleware, remove);

export default billRouter;
