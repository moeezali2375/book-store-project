import writerModel from "../models/writerModel.js";

export const getWriterInfo = async (req, res) => {
  try {
    const writer = await writerModel.findOne({ userId: req.user._id });
    res.status(200).send({ msg: "Hello Writer" });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};
