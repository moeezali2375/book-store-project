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
  reviews: [
    {
      star: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      description: {
        type: String,
        required: true,
      },
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reader",
        required: true,
      },
    },
  ],
});

export default mongoose.model("Book", bookSchema);
