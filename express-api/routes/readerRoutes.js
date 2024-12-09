import express from "express";
import {
  addBookToFavorites,
  getAllBooks,
  getBookId,
  getReaderInfo,
  removeBookFromFavorites,
} from "../controllers/readerController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(protect(["reader"]));

router.get("/", getReaderInfo);

router.get("/book", getAllBooks);

router.get("/book/:id", getBookId);

router.post("/book", addBookToFavorites);

router.delete("/book", removeBookFromFavorites);

export default router;
