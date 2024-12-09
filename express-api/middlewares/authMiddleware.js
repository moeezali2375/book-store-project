import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect =
  (roles, isVerified = 1) =>
  async (req, res, next) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(401).send({
          msg: { title: "No token provided! 🧑🏻‍💻" },
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.user._id);
      if (!user) {
        return res.status(404).send({
          msg: { title: "User not found! 🧑🏻‍💻" },
        });
      }

      const now = new Date();
      if (user.verificationTokenExpires < now) {
        return res.status(401).send({
          msg: { title: "Token expired! 🧑🏻‍💻" },
        });
      }

      if (roles && !roles.includes(user.role)) {
        return res.status(403).send({
          msg: { title: "Access denied! 🧑🏻‍💻" },
        });
      }

      if (isVerified && !user.isVerified) {
        return res.status(403).send({
          msg: { title: "User not Verfied! 🧑🏻‍💻" },
        });
      }

      req.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        role: user.role,
      };
      next();
    } catch (error) {
      console.error(error.message);
      res.status(401).send({
        msg: { title: "Authentication Failed! 🧑🏻‍💻" },
      });
    }
  };
