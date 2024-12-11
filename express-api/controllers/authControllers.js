import User from "../models/userModel.js";
import {
  generateVerificationToken,
  expiry,
} from "../utils/verificationToken.js";
import { emailVerificationMessage } from "../emails/verificationMessages.js";
import { emailVerificationNotification } from "../emails/notificationMessages.js";
import sendEmail from "../utils/sendEmail.js";
import readerModel from "../models/readerModel.js";
import writerModel from "../models/writerModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const sendEmailNotification = async (to, subject, message) => {
  try {
    await sendEmail(to, subject, message);
  } catch (error) {
    throw error;
  }
};

export const registerWriter = async (req, res) => {
  try {
    const { name, email, password, role, biography } = req.body;

    if (!name || !email || !password  || !biography) {
      throw new Error("Please give all details. 🥸");
    }

    const now = new Date();
    const userExists = await User.findOne({
      email: email,
    });
    if (userExists?.isVerified === true) {
      throw new Error("User already exists. 🙁");
    } else if (userExists?.verificationTokenExpires > now) {
      throw new Error("User already exists. 🙁");
    } else if (userExists?.verificationTokenExpires < now) {
      await User.findByIdAndDelete(userExists._id);
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      email: email,
      password: password,
      role: "writer",
      verificationToken: generateVerificationToken(),
      verificationTokenExpires: expiry(300), //5 min
    });

    const writer = new writerModel({
      userId: user._id,
      biography: biography,
    });
    await user.save();
    await writer.save();
    const message = emailVerificationMessage(user);

    await sendEmailNotification(user.email, message.subject, message.body);
    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
    };
    const token = jwt.sign(
      {
        user: userInfo,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).send({
      msg: {
        title: "You are signed up! 🤟🏻",
        desc: "Please verify your account to continue.",
      },
      user: userInfo,
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const registerReader = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Please give all details. 🥸");
    }

    const now = new Date();
    const userExists = await User.findOne({
      email: email,
    });
    if (userExists?.isVerified === true) {
      throw new Error("User already exists. 🙁");
    } else if (userExists?.verificationTokenExpires > now) {
      throw new Error("User already exists. 🙁");
    } else if (userExists?.verificationTokenExpires < now) {
      await User.findByIdAndDelete(userExists._id);
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: name,
      email: email,
      password: password,
      role: "reader",
      verificationToken: generateVerificationToken(),
      verificationTokenExpires: expiry(300),
    });

    const reader = new readerModel({
      userId: user._id,
    });
    await user.save();
    await reader.save();

    const message = emailVerificationMessage(user);

    await sendEmailNotification(user.email, message.subject, message.body);

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
    };
    const token = jwt.sign(
      {
        user: userInfo,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie("token", token, { httpOnly: true });

    return res.status(200).send({
      msg: {
        title: "You are signed up! 🤟🏻",
        desc: "Please verify your account to continue.",
      },
      user: userInfo,
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const verifyWriterToken = async (req, res) => {
  try {
    if (req.user.isVerified) throw new Error("User already verified. 🤨");
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() },
      role: "writer",
    });

    if (!user) {
      throw new Error("Invalid or expired token. 😣");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    const message = emailVerificationNotification(user);
    sendEmailNotification(user.email, message.subject, message.body);

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
    };

    res.status(200).send({
      msg: {
        title: "Email verified successfully! 🥳",
        desc: "You can now start using the app.",
      },
      user: userInfo,
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const verifyReaderToken = async (req, res) => {
  try {
    if (req.user.isVerified) throw new Error("User already verified. 🤨");
    const user = await User.findOne({
      verificationToken: req.params.token,
      verificationTokenExpires: { $gt: Date.now() },
      role: "reader",
    });

    if (!user) {
      throw new Error("Invalid or expired token. 😣");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    const message = emailVerificationNotification(user);
    sendEmailNotification(user.email, message.subject, message.body);

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
    };

    res.status(200).send({
      msg: {
        title: "Email verified successfully! 🥳",
        desc: "You can now start using the app.",
      },
      user: userInfo,
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const regenerateToken = async (req, res) => {
  try {
    if (req.user.isVerified) throw new Error("User already verified. 🤨");
    const user = await User.findById(req.user._id);
    user.verificationToken = generateVerificationToken();
    await user.save();

    const message = emailVerificationMessage(user);
    await sendEmailNotification(user.email, message.subject, message.body);

    res.status(200).send({
      msg: {
        title: "Verification code sent! 💥",
        desc: "Check your mailbox.",
      },
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("Please give email and password. 👀");
    const user = await User.findOne({ email: email });
    if (user) {
      const hehe = await user.matchPassword(password);

      if (hehe) {
        const userInfo = {
          _id: user._id,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          role: user.role,
        };
        const token = jwt.sign(
          {
            user: userInfo,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" },
        );

        res.cookie("token", token, { httpOnly: true });
        return res.status(200).send({
          msg: {
            title: "Authentication successfull! 🤩",
            desc: "Welcome Back.",
          },
          user: userInfo,
        });
      } else throw new Error("Incorrect password. ✋🏻");
    } else {
      throw new Error("The email you have provided doesn't exist. 🤪");
    }
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).send({
      msg: {
        title: "Logged out successfully! 👋",
      },
    });
  } catch (error) {
    res.status(400).send({ msg: "Error Logging out! ✋🏻" });
  }
};
