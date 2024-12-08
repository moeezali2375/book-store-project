import bookModel from "../models/bookModel.js";
import writerModel from "../models/writerModel.js ";

export const getAllBooks = async (_, res) => {
  try {
    const books = await bookModel
      .find()
      .populate({
        path: "writerId",
        populate: {
          path: "userId",
          select: "-password",
        },
      })
      .select("-content -password");
    res.status(200).send({ books: books });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

export const getBookId = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await bookModel.findById(id);
    res.status(200).send({ book: book });
  } catch (error) {
    res.status(400).send({ msg: error.message });
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
