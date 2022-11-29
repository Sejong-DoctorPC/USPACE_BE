import User from "../models/User.js";
import Sample from "../models/Sample.js";

export const getJoin = async (req, res) => {
  User.find({}, function (err, result) {
    if (err) {
      return console.log(err);
    } else {
      return res.json(result);
    }
  });
};
export const postJoin = async (req, res) => {
  const { user, pwd } = req.body;
  const exists = await User.exists({ $or: [{ user }, { pwd }] });
  if (exists) {
    return res
      .status(400)
      .json({ message: "This username/pwd is already taken." });
  }

  try {
    const user = await User.create({
      user,
      pwd,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error._message });
  }
};

export const createSamples = async (req, res) => {
  await Sample.create({
    zone: "A1",
    type: 2,
    state: 1,
  });

  await Sample.create({
    zone: "B2",
    type: 3,
    state: 0,
  });

  await Sample.create({
    zone: "C1",
    type: 1,
    state: 1,
  });

  await Sample.create({
    zone: "D5",
    type: 1,
    state: 0,
  });

  return;
};

export const getParking = async (req, res) => {
  const samples = await Sample.find({});
  return res.send(samples);
};
