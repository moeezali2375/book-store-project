import express from "express";
import {
  login,
  logout,
  regenerateToken,
  registerReader,
  registerWriter,
  verifyReaderToken,
  verifyWriterToken,
} from "../controllers/authControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/writer", registerWriter);

router.post("/reader", registerReader);

router.get("/writer/verify/:token", protect(["writer"], 0), verifyWriterToken);

router.get("/reader/verify/:token", protect(["reader"], 0), verifyReaderToken);

router.get("/token", protect(["reader", "writer"], 0), regenerateToken);

router.post("/login", login);

router.post("/logout", protect(["reader", "writer"]), logout);

export default router;
