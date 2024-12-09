import mongoose from "mongoose";

const readerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  favoriteBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

export default mongoose.model("Reader", readerSchema);
