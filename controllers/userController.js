import User from "../models/User.js";

import bcrypt from "bcrypt";
import Parking from "../models/Parking.js";

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

export const getLogin = async (req, res) => {};

export const postLogin = async (req, res) => {
  const { user, pwd } = req.body;

  const username = await User.findOne({ user });
  if (!username) {
    return res.status(400).json({ error: "User Not Found" });
  }

  const ok = await bcrypt.compare(pwd, username.pwd);
  if (!ok) {
    return res.status(400).json({ error: "Wrong password" });
  }

  try {
    req.session.loggedIn = true;
    req.seesion.user = username;
    return res.status(200).json({ data: username, loginSuccess: true });
  } catch (error) {
    return res.json({ message: error._message });
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.json({ data: null, loginSuccess: false });
};

// Admin 관리

export const setMode = async (req, res) => {
  const { mode } = req.query;
  console.log(mode);
  // 몽구스 수정
  if (mode == 0) {
    await Parking.updateMany(
      { zone: { $gte: 0 } },
      { type: 0, state: 0, parker: null }
    );
  } else if (mode == 1) {
    await Parking.updateMany(
      { zone: { $gte: 0 } },
      { type: 1, state: 0, parker: null }
    );
    var st = 2;
    for (st; st <= 6; st += 2) {
      var low = st;
      for (low; low <= st + 30; low += 6) {
        await Parking.findOneAndUpdate({ zone: low }, { state: 2 });
      }
    }
  } else if (mode == 2) {
    await Parking.updateMany(
      { zone: { $gte: 0 } },
      { type: 1, state: 0, parker: null }
    );
    var st = 2;
    for (st; st <= 6; st += 2) {
      var low = st;
      for (low; low <= st + 30; low += 6) {
        await Parking.findOneAndUpdate({ zone: low }, { state: 2 });
      }
    }
  } else if (mode == 3) {
    await Parking.updateMany({ zone: { $gte: 0 } }, { type: 3, state: 2 });
  }

  return res.status(200).send("good");
};
