import express from "express";
import { getGenres } from "../controllers/genreController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect(["reader", "writer"]));

router.get("/", getGenres);

export default router;
