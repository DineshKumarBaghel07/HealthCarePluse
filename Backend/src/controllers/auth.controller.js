import userModel from "../models/user.model.js";
import sendMail from "../services/email.service.js";
import { signToken } from "../middleware/jwt.middleware.js";
import { verifyToken } from "../middleware/jwt.middleware.js";
import dotenv from "dotenv"
dotenv.config();

const requireEmailVerification =
  process.env.REQUIRE_EMAIL_VERIFICATION === "true";


// @ desc Register a new user
// @ route POST /api/auth/register
// @ access Public
export async function registerController(req, res, next) {
    const { username, email, password, phone } = req.body;

    if (!username || !email || !password || !phone) {
        return res.status(400).json({
            message: "Invalid credentials",
            success: false,
            err: "All fields are required"
        })
    }
    const user = await userModel.findOne({
        $or: [{ email }, { username }, { phone }]
    })
    if (user) {
        return res.status(400).json({ message: "user already Exist.", success: false, err: "Please use other Details" })

    }
    const newUser = await userModel.create({
        username,
        email,
        password,
        phone,
        verified: !requireEmailVerification,
    })

    if (requireEmailVerification) {
        const token = await signToken({ email: newUser.email });

        sendMail(
          email,
          "Welcome to our App",
          `<h1>Welcome to our App</h1><p>Thank you for registering with us. We're excited to have you on board!</p> <a href='http://localhost:3000/api/auth/verify-email?token=${token}'>Verify Email</a>`,
          "Welcome to our App, Thank you for registering with us. We're excited to have you on board!"
        );
    }

    res.status(200).json({ message: "User Register Successfully", success: true, user: {
        username: newUser.username,
        email:newUser.email,
        phone:newUser.phone
    } })
}

// @ desc Verify email of user
// @ route GET /api/auth/verify-email
// @ access Public
export async function emailVerifyController(req, res, next) {
    const token = req.query.token;
    if (!token) {
        return res.status(400).json({ message: "Invalid credential", success: false, err: "Token is required" })
    }

    try {

        const decode = await verifyToken(token);
        const user = await userModel.findOne({ email: decode.email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credential", success: false, err: "User not found" })
        }
        user.verified = true;
        await user.save();
        const html = `
       <h1>Email Verified Successfully</h1>
         <p>Your email has been verified successfully. You can now log in to your account and start using our services.</p>
       URL : <a href="http://localhost:3000/login">Login</a>`
        res.send(html)
    } catch (err) {
        return res.status(400).json({ message: "Invalid credential", success: false, err: "Invalid Token" })
    }
}


// @ desc Login user
// @ route POST /api/auth/login
// @ access Public
export async function loginController(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Invalid credentials",
            success: false,
            err: "All fields are required"
        })
    }
    const user = await userModel.findOne({
        email
    }).select("+password")
    if (!user) {
        return res.status(400).json({ message: "user not found.", success: false, err: "Please register first" })
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials", success: false, err: "Incorrect password" })
    }
    if (requireEmailVerification && !user.verified) {
        return res.status(400).json({ message: "Please verify your email first", success: false, err: "Email not verified" })
    }
    const token = await signToken({ email: user.email, username: user.username, id: user._id })
    res.cookie("token", token,{expires:new Date(Date.now() + 24*60*60*1000),httpOnly:true})
    res.status(200).json({ message: "Login Successfully", success: true, user:{
        username: user.username,
        email:user.email,
        phone:user.phone
    } })
}


// @ desc Get user details
// @ route GET /api/auth/me
// @ access Private
export async function getMeContrller(req, res, next) {
  const id = req.user.id;

  if(!id){
    return res.status(400).json({message:"User not found",success:false,err:"User details not found"})
  }
  const user = await userModel.findById(id).select("-password")
  if(!user){
    return res.status(400).json({message:"User not found",success:false,err:"User details not found"})
  }
  res.status(200).json({message:"User details found",success:true,user})
}

// @ desc logout the user
// @ route POST /api/auth/logout
// access Private
export async function logoutController(req,res,next){
    res.clearCookie("token")
    res.status(200).json({message:"Logout Successfully",success:true})
}
