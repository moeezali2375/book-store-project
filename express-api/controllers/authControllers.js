import User from "../models/userModel.js";
import {
  generateVerificationToken,
  expiry,
} from "../utils/verificationToken.js";
import generateToken from "../utils/generateToken.js";
import { emailVerificationMessage } from "../emails/verificationMessages.js";
import { emailVerificationNotification } from "../emails/notificationMessages.js";
import sendEmail from "../utils/sendEmail.js";

const sendEmailNotification = async (to, subject, message) => {
  try {
    await sendEmail(to, subject, message);
  } catch (error) {
    throw error;
  }
};

export const registerWriter = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Please give name, email and password. 🥸");
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
      name: name,
      email: email,
      password: password,
      type: false,
      verificationToken: generateVerificationToken(),
      verificationTokenExpires: expiry(300), //5 min
    });

    await user.save();
    const message = emailVerificationMessage(user);
    await sendEmailNotification(user.email, message.subject, message.body);

    return res.status(200).send({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        token: generateToken(user._id),
      },
      msg: {
        title: "You are signed up! 🤟🏻",
        desc: "Please verify your account to continue.",
      },
    });
  } catch (error) {
    res.status(400).send({ msg: { title: error.message } });
  }
};

export const registerReader = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("Please give name, email and password. 🥸");
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
      name: name,
      email: email,
      password: password,
      type: true,
      verificationToken: generateVerificationToken(),
      verificationTokenExpires: expiry(300), //5 min
    });

    await user.save();
    const message = emailVerificationMessage(user);
    await sendEmailNotification(user.email, message.subject, message.body);

    return res.status(200).send({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        token: generateToken(user._id),
      },
      msg: {
        title: "You are signed up! 🤟🏻",
        desc: "Please verify your account to continue.",
      },
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
      type: false,
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

    res.status(200).send({
      msg: {
        title: "Email verified successfully! 🥳",
        desc: "You can now start using the app.",
      },
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
      type: true,
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

    res.status(200).send({
      msg: {
        title: "Email verified successfully! 🥳",
        desc: "You can now start using the app.",
      },
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
