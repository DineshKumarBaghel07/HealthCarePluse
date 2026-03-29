import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();


const transporter = new nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:"OAuth2",
        user:process.env.GOOGLE_USER,
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken:process.env.GOOGLE_REFREASH_TOKEN

    }
})

transporter.verify((error,success)=>{
    if(error){
        console.error("Error connecting to Email server"+error)
    }else{
        console.log("Email server is ready to send Messages")
    }
})




const sendMail = async(to ,subject,html,text) =>{
    const mailOpation ={
        from:`Dinesh<${process.env.GOOGLE_USER}>`,
        to,
        subject,
        text,
        html
    }

    try{
        const response = await transporter.sendMail(mailOpation)
         console.log(response)
    //   return ("send to the mail this"+to)
    }catch(err){
        console.log(err)
    }

    
   
}


export default  sendMail;