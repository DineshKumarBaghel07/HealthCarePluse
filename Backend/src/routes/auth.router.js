import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import{
loginController
,getMeContrller,
registerController,
emailVerifyController,
logoutController} from "../controllers/auth.controller.js"
import authValidation from "../validation/auth.validation.js";

const authRouter = Router();
// @ desc Register a new user
// @ route POST /api/auth/register
// access Public
authRouter.post("/register",authValidation,registerController);

// @ desc Login user
// @ route POST /api/auth/login
// access Public
authRouter.post("/login",loginController);

// @ desc Get user details
// @ route GET /api/auth/get-me
// access Private
authRouter.get("/get-me",authUser,getMeContrller)

// @desc verify email
// @route GET /api/auth/verify-email
// access Public
authRouter.get("/verify-email",emailVerifyController)

// @ desc logout user
// @ route POST /api/auth/logout
// access Private
authRouter.post("/logout",authUser,logoutController)



export default authRouter;