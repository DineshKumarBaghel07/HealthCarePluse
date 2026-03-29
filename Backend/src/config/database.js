import mongoose from "mongoose";

const Databaseconnection = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully");
    }
    catch(err){
        console.log("Database Connection Failed"+err);
    }
}


export default Databaseconnection;