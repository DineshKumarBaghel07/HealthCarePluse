import { generateResponse, generateTitle } from "../services/ai.service.js"
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js"

// @ desc send a message to the ai and get a response
// @route POST /api/chats/message
// access private
export async function sendMessage(req, res) {
    const { message, chatId } = req.body;

    let title = null;
    let chat = null;
    if (!chatId) {
        title = await generateTitle(message);
        chat = await chatModel.create({
            user: req.user.id,
            title
        })
    }

    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: "user"
    })

    const messages = await messageModel.find({ chat: chatId || chat._id })
    const response = await generateResponse(messages);
    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: response,
        role: "ai"
    })

    res.status(201).json({
        title, chat,
        aiMessage
    })



}

// @ desc get all chats for a user
// @route GET /api/chats
// access private
export async function getChat(req, res) {
    const user = req.user;

    const chats = await chatModel.find({ user: user.id });
    res.status(200).json({
        message: "Chats fetched successfully",
        success: true,
        chats
    })
}

// @ desc get messages for a specific chat
// @route GET /api/chats/:chatId/messages
// access private
export async function getMessage(req, res) {
    const { chatId } = req.params;
    if (!chatId) {
        return res.status(400).json({
            message: "Chat id not Found",
            success: false,
            err: "provide chat Id"
        });
    }

    const messages = await messageModel.find({ chat: chatId });

    res.status(200).json({
        message: "Message fetch successfully",
        success: true,
        messages
    })
}


// @ desc delete a chat and its messages
// @route DELETE /api/chats/delete/:chatId
// access private
export async function deleteChat(req,res){
    const {chatId} = req.params;

    const chat = await chatModel.findOneAndDelete({
        user:req.user.id
    })

    const message = await messageModel.findOneAndDelete({
        chat:chatId
    })

    if(!chat){
        return res.status(404).json({message:"chat not Found",success:false,err:"invalid chat id"})
    }

    res.status(200).json({message:"Chat deleted Successfully",success:true})
}