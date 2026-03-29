import jwt from "jsonwebtoken";


export const signToken = async(playload) =>{
    return jwt.sign(playload,process.env.JWT_SCECRET_KEY,{expiresIn:"1d"})
}

export const verifyToken = async(token) =>{
    return jwt.verify(token,process.env.JWT_SCECRET_KEY)
}