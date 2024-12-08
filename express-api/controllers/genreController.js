import genreModel from "../models/genreModel.js";

export const getGenres = async (req, res) => {
  try {
    const genres = await genreModel.find();
    res.status(200).send({ genres: genres });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};
