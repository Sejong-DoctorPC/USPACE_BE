import express from "express";
import {
  postJoin,
  getJoin,
  getLogin,
  postLogin,
  setMode,
} from "../controllers/userController.js";
import {
  getReserve,
  initPark,
  postReserve,
  currentParking,
} from "../controllers/parkController.js";
import { protectorMiddleware } from "../middlewares.js";

import Parking from "../models/Time.js";

const rootRouter = express.Router();

rootRouter.route("/").get((req, res) => {
  return res.send([
    {
      name: "아메리카노",
      taste: "쓴 맛",
      type: "아이스",
    },
  ]);
});

rootRouter.route("/join").post(postJoin).get(getJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/reserve").get(getReserve).post(postReserve);
rootRouter.route("/current").get(currentParking);
rootRouter.get("/init", initPark);
rootRouter.get("/newinit", async (req, res) => {
  try {
    var save = await Parking.create({});
    return res.status(201).json(save);
  } catch (error) {
    return res.status(400).json({ message: error._message });
  }
});

// admin 관리
rootRouter.route("/setmode").get(setMode);
export default rootRouter;
