import User from "../models/User.js";
import Sample from "../models/Sample.js";

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

export const getParking = async (req, res) => {
  const samples = await Sample.find({});
  return res.send(samples);
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
  const { mode } = req.body;
  // 몽구스 수정
  if (mode == 0) {
    const updatePark = await Parking.updateMany(
      { zone: { $gte: 0 } },
      { type: 0 }
    );
  } else if (mode == 1) {
    await Parking.updateMany({ zone: { $gte: 0 } }, { type: 1, status: 2 });
    var j = 0;
    for (j; j < 5; j += 2) {
      var p = 0;
      var num = j;
      for (p; p < 5; p++) {
        await Parking.findOneAndUpdate({ zone: num }, { status: 0 });
        num += 5;
      }
    }
  } else if (mode == 2) {
    await Parking.updateMany({ zone: { $gte: 0 } }, { type: 2, status: 2 });
    var j = 0;
    for (j; j < 5; j += 2) {
      var p = 0;
      var num = j;
      for (p; p < 5; p++) {
        await Parking.findOneAndUpdate({ zone: num }, { status: 0 });
        num += 5;
      }
    }
  } else if (mode == 3) {
    await Parking.updateMany({ zone: { $gte: 0 } }, { type: 3, status: 2 });
  }

  return res.status(200).json(updatePark);
};
