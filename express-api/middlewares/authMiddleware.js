import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new Error();
    }

    const now = new Date();
    const decoded = jwt.verify(token, process.env.TOKEN);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error();
    }

    if (user.verificationTokenExpires < now) {
      throw new Error();
    }

    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      type: user.type,
    };

    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).send({
      msg: {
        title: "Authentication Failed! 🧑🏻‍💻",
      },
    });
  }
};
export default protect;
