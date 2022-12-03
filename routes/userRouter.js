import express from "express";
import { logout } from "../controllers/userController.js";
import { protectorMiddleware } from "../middlewares.js";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
export default userRouter;
