import mongoose from "mongoose";
import bcrypt, { compare } from "bcryptjs";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username must be requried and unique"],
        unique:[true,"username shoudle be unique"],
        match:/^[a-zA-Z0-9_]{3,20}$/,
        trim:true
    },
    password:{
        type:String,
        required:[true,"password be must required please provide it"],
        trim:true,
        select:false
    },
    phone:{
        type:String,
        requried:[true,"phone number must be required"],
        match:/^\d{10}$/,
        unique:[true,"phone number should be unique"]
    },
    email:{
      type:String,
      required:[true,"email must be required"],
      unique:[true,"Email shoulde be unique"],
      match:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      trim:true
    },
    verified:{
        type:Boolean,
        default:false,
    }
},
{
    timestamps:true
}
)

userSchema.pre('save', async function (){
    if(!this.isModified('password'))return;
    this.password = await bcrypt.hash(this.password,10)
})



userSchema.methods.comparePassword = function(canditatepassword){
    return compare(canditatepassword,this.password)
}

const userModel = mongoose.model("users",userSchema)



export default userModel