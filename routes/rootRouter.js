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
  currentParking,
  getGetOut,
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
// 예약(입차)
rootRouter.route("/reserve").get(getReserve);
// 현재 주차 현황 확인
rootRouter.route("/current").get(currentParking);
// 출차
rootRouter.route("/getout").get(getGetOut);

// admin 관리
rootRouter.route("/setmode").get(setMode);
rootRouter.get("/init", initPark);
rootRouter.get("/newinit", async (req, res) => {
  try {
    var save = await Parking.create({});
    return res.status(201).json(save);
  } catch (error) {
    return res.status(400).json({ message: error._message });
  }
});

export default rootRouter;
