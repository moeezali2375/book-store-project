import User from "../models/userModel.js";
import {
  generateVerificationToken,
  expiry,
} from "../utils/verificationToken.js";
import generateToken from "../utils/generateToken.js";
import { emailVerificationMessage } from "../emails/verificationMessages.js";
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
