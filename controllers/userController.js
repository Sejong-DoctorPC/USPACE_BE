import User from "../models/User.js";

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