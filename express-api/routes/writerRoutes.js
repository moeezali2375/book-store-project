import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createBook,
  deleteBook,
  getMyBook,
  getMyBooks,
  getWriterInfo,
  updateBiography,
  updateBook,
} from "../controllers/writerController.js";

const router = express.Router();

router.use(protect(["writer"]));

router.get("/", getWriterInfo);

router.put("/", updateBiography);

router.get("/book", getMyBooks);

router.get("/book/:bookId", getMyBook);

router.post("/book", createBook);

router.put("/book/:id", updateBook);

router.delete("/book/:id", deleteBook);

export default router;
