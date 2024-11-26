export default isVerified = (req, res, next) => {
  try {
    if (req.user.isVerified === true) next();
    else throw new Error();
  } catch (error) {
    res.status(400).json({ msg: "Not Authorized" });
  }
};
