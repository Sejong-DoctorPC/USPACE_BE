import User from "../models/User.js";
import Sample from "../models/Sample.js";
import ShortUser from "../models/shortUser.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "ashdvli()haeiuhgfouq2h9834y!@#^ADFBw45hb";

export const getJoin = async (req, res) => {
  const users = await User.find({});
  return res.send(users);
};
export const postJoin = async (req, res) => {
  const { user, pwd } = req.body;
  const exists = await User.exists({ $or: [{ user }] });
  if (exists) {
    return res.status(400).json({ message: "This username is already taken." });
  }

  try {
    const save = await User.create({
      user: user,
      pwd: pwd,
    });
    return res.status(201).json(save);
  } catch (error) {
    return res.status(400).json({ message: error._message });
  }
};

export const getParking = async (req, res) => {
  const samples = await Sample.find({});
  return res.send(samples);
};

export const getLogin = async (req, res) => {};

export const postLogin = async (req, res) => {
  const { user, pwd } = req.body;

  const exists = await User.findOne({ user });
  if (!exists) {
    return res.json({ error: "User Not Found" });
  }

  if (await bcrypt.compare(pwd, exists.pwd)) {
    const token = jwt.sign({}, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }

  res.json({ status: "error", error: "Invaild Password" });
};
