import express from "express";
import { signup } from "../controllers/user/Signup";
import { signupAdmin } from "../controllers/user/SignupAdmin";
import { login } from "../controllers/user/Login";
import { signupBand } from "../controllers/user/SignupBand";

export const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/signupadmin", signupAdmin);

userRouter.post("/signupband", signupBand);

userRouter.post("/login", login);
