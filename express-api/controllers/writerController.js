import writerModel from "../models/writerModel.js";
import bookModel from "../models/bookModel.js";

export const getWriterInfo = async (req, res) => {
  try {
    const writer = await writerModel.findOne({ userId: req.user._id });
    res.status(200).send({ writer: writer });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const updateBiography = async (req, res) => {
  try {
    const { biography } = req.body;
    if (!biography) throw new Error("Please provide updated biography.");
    await writerModel.findOneAndUpdate(
      { userId: req.user._id },
      { biography: biography },
    );

    res
      .status(200)
      .send({ msg: { title: "Update Successfull" }, biography: biography });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const getMyBooks = async (req, res) => {
  try {
    const writer = await writerModel.findOne({ userId: req.user._id });
    const myBooks = await bookModel
      .find({ writerId: writer._id })
      .populate("genreId");
    res.status(200).send({ books: myBooks });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, description, content, genreId } = req.body;
    const userId = req.user._id;
    const writer = await writerModel.findOne({ userId: userId });
    if (!writer) {
      return res.status(404).send({ msg: "Writer not found" });
    }
    const newBook = new bookModel({
      title,
      description,
      content,
      genreId,
      writerId: writer._id,
    });
    const dbBook = await newBook.save();
    res.status(200).send({ book: dbBook });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const writer = await writerModel.findOne({ userId: req.user._id });

    const book = await bookModel.findOneAndDelete({
      writerId: writer._id,
      _id: id,
    });

    if (!book) {
      return res
        .status(404)
        .send({ msg: "Book not found or you're not authorized to delete it" });
    }

    res.status(200).send({ msg: "Book deleted successfully" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, genreId } = req.body;
    const writer = await writerModel.findOne({ userId: req.user._id });

    const updatedBook = await bookModel.findOneAndUpdate(
      { _id: id, writerId: writer._id },
      { title, description, content, genreId },
      { new: true, runValidators: true },
    );

    if (!updatedBook) {
      return res
        .status(404)
        .send({ msg: "Book not found or you're not authorized to update it" });
    }

    res.status(200).send({ book: updatedBook });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};
