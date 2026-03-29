import jwt from "jsonwebtoken"
import {verifyToken} from "./jwt.middleware.js"

export const authUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(404).json({ message: "Unauthorized", success: false, err: "token not found" })
    }
    try {
        const decode = await verifyToken(token);

        req.user = decode
        next()
    } catch (err) {
        return res.status(400).json({ message: "somthing wrong", success: false, err: err })
    }




}