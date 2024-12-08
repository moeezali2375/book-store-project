import express from "express";
import protect from "../middlewares/authMiddleware.js";
import checkWriter from "../middlewares/checkWriter.js";
import { getWriterInfo } from "../controllers/writerController.js";

const router = express.Router();

router.use(protect);
router.use(checkWriter);

router.get("/", getWriterInfo );

export default router;
