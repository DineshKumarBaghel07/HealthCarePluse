import {Router} from "express";
import {sendMessage,getChat,getMessage,deleteChat} from "../controllers/chat.controller.js"
import {authUser} from "../middleware/auth.middleware.js"
const chatRouter = Router();




chatRouter.post("/message",authUser,sendMessage);
chatRouter.get("/",authUser,getChat);
chatRouter.get("/:chatId/message",authUser,getMessage);
chatRouter.delete("/delete/:chatId",authUser,deleteChat);



export default chatRouter;