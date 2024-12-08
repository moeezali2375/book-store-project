import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import readerRoutes from "./routes/readerRoutes.js";
import writerRoutes from "./routes/writerRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", authRoutes);
app.use("/api/reader", readerRoutes);
app.use("/api/writer", writerRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/genre", genreRoutes);

app.get("*", (_, res) => {
  res.json({ msg: "Api is up and running." });
});

app.listen(4000, () => {
  console.log("Server is listening on PORT: 4000");
  connectDB();
});
