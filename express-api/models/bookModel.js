import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
  },
  writerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Writer",
  },
});

export default mongoose.model("Book", bookSchema);
