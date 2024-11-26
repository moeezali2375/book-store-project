import express from "express";
import {
  regenerateToken,
  registerReader,
  registerWriter,
  verifyReaderToken,
  verifyWriterToken,
} from "../controllers/authControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/writer", registerWriter);

router.post("/reader", registerReader);

router.get("/writer/:token", protect, verifyWriterToken);

router.get("/reader/:token", protect, verifyReaderToken);
 
router.get("/token", protect, regenerateToken);
 
export default router;
