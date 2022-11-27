import express from "express";
import { postJoin } from "../controllers/userController.js";

const rootRouter = express.Router();

rootRouter.route("/join").post(postJoin);

export default rootRouter;
