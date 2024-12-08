const checkReader = (req, res, next) => {
  try {
    if (req.user.type === true) {
      next();
    } else {
      throw new Error("Not Authorized");
    }
  } catch (error) {
    res.status(400).json({ msg: "Not Authorized" });
  }
};

export default checkReader;
