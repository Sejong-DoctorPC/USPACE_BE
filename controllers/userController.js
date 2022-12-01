import User from "../models/User.js";
import Sample from "../models/Sample.js";

export const getJoin = async (req, res) => {
  const users = await User.find({});
  return res.send(users);
};
export const postJoin = async (req, res) => {
  const { user, pwd } = req.body;
  console.log(pwd);
  const exists = await User.exists({ $or: [{ user }, { pwd }] });
  if (exists) {
    return res
      .status(400)
      .json({ message: "This username/pwd is already taken." });
  }

  try {
    const newUser = await User.create({
      user: user,
      pwd: pwd,
    });
    console.log("db 저장 완료~!!");
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ message: error._message });
  }
};

export const getParking = async (req, res) => {
  const samples = await Sample.find({});
  return res.send(samples);
};

export const getApply = async (req, res) => {
  return;
};

export const postApply = async (req, res) => {
  return;
};
