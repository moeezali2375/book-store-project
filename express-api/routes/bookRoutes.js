import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookId,
  updateBook,
} from "../controllers/bookControllers.js";
import checkWriter from "../middlewares/checkWriter.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getAllBooks);

router.get("/:id", getBookId);

router.post("/", checkWriter, createBook);

router.delete("/:id", checkWriter, deleteBook);

router.put("/:id", checkWriter, updateBook);

export default router;
