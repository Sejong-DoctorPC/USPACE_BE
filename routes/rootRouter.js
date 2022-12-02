import express from "express";
import {
  postJoin,
  getJoin,
  getParking,
  getLogin,
  postLogin,
} from "../controllers/userController.js";
import { getReserve, postReserve } from "../controllers/parkController.js";
import { protectorMiddleware } from "../middlewares.js";

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
rootRouter.route("/parking").get(getParking);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter
  .route("/reserve")
  .all(protectorMiddleware)
  .get(getReserve)
  .post(postReserve);

export default rootRouter;
