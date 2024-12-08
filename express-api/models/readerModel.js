import mongoose from "mongoose";

const readerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
});

export default mongoose.model("Reader", readerSchema);
