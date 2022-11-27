import express from "express";
import { postJoin, getJoin } from "../controllers/userController.js";

const rootRouter = express.Router();

rootRouter.route("/").get((req, res) => {
  return res.send([
    {
      name: "아메리카노",
      taste: "쓴 맛",
      type: "아이스",
    },
    {
      name: "라떼",
      taste: "고소한 맛",
      type: ["핫", "아이스"],
    },
    {
      name: "말차라떼",
      taste: "달콤한 맛",
      type: "아이스",
    },
  ]);
});
rootRouter.route("/join").post(postJoin).get(getJoin);

export default rootRouter;
