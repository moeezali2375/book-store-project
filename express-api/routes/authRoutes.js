import express from "express";
import { registerWriter } from "../controllers/authControllers.js";
const router = express.Router();

router.post("/writer", registerWriter);

export default router;
