import readerModel from "../models/readerModel.js";

export const getReaderInfo = async (req, res) => {
  try {
    const reader = await readerModel.findOne({ userId: req.user._id });
    res.status(200).send({ msg: "Hello reader" });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};
