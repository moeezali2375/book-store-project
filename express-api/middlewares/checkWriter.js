export default checkWriter = (req, res, next) => {
  try {
    if (req.user.type === false) next();
    else throw new Error();
  } catch (error) {
    res.status(400).json({ msg: "Not Authorized" });
  }
};
