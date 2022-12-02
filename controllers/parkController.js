import User from "../models/User.js";
import Parking from "../models/Parking.js";

export const getReserve = async (req, res) => {
  return;
};

export const postReserve = async (req, res) => {
  return;
};

var i;
export const initPark = async (req, res) => {
  try {
    for (i = 0; i < 36; i++) {
      var save = await Parking.create({
        zone: i,
        type: 0,
        state: 0,
        parker: null,
      });
    }
    return res.status(201).json(save);
  } catch (error) {
    return res.status(400).json({ message: error._message });
  }
};
