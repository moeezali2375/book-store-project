import readerModel from "../models/readerModel.js";
import bookModel from "../models/bookModel.js";

export const getReaderInfo = async (req, res) => {
  try {
    const reader = await readerModel
      .findOne({ userId: req.user._id })
      .populate({
        path: "favoriteBooks",
        populate: [
          { path: "genreId" },
          {
            path: "writerId",
            populate: {
              path: "userId",
              select: "name email",
            },
          },
        ],
        select: "-content",
      });
    res.status(200).send({ reader: reader });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const getAllBooks = async (_, res) => {
  try {
    const books = await bookModel
      .find()
      .populate([
        {
          path: "writerId",
          populate: {
            path: "userId",
            select: "name email",
          },
        },
        { path: "genreId" },
      ])
      .select("-content");
    res.status(200).send({ books: books });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

export const getBookId = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await bookModel
      .findById(id)
      .populate({ path: "genreId" })
      .populate({
        path: "writerId",
        populate: { path: "userId", select: "name email" },
      });
    res.status(200).send({ book: book });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

export const addBookToFavorites = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(404).send({ msg: "Book not found" });
    }

    const reader = await readerModel.findOneAndUpdate(
      { userId: req.user._id },
      { $addToSet: { favoriteBooks: bookId } },
      { new: true },
    );

    if (!reader) {
      return res.status(404).send({ msg: "Reader not found" });
    }

    res.status(200).send({ msg: "Book added to favorites", reader });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

export const removeBookFromFavorites = async (req, res) => {
  try {
    const { bookId } = req.body;

    const reader = await readerModel.findOneAndUpdate(
      { userId: req.user._id },
      { $pull: { favoriteBooks: bookId } },
      { new: true },
    );

    if (!reader) {
      return res.status(404).send({ msg: "Reader not found" });
    }

    res.status(200).send({ msg: "Book removed from favorites", reader });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};
