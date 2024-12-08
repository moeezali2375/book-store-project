import mongoose from "mongoose";

const writerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  biography: {
    type: String,
  },
});

export default mongoose.model("Writer", writerSchema);
