import express from "express";
import checkReader from "../middlewares/checkReader.js";
import { getReaderInfo } from "../controllers/readerController.js";
import protect from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(protect);
router.use(checkReader);

router.get("/", getReaderInfo);

export default router;
