import { Server } from "socket.io";
import { generateResponse } from "../services/ai.service.js";
import messageModel from "../models/message.model.js";

let io;

export const initSocketServer = (httpServer) => {

    io = new Server(httpServer, {
        cors: {
            origin: "https://healthcarepluse-2.onrender.com",
            credentials: true
        }
    });

    console.log("Socket server initialized");

    io.on("connection", (socket) => {

        console.log("User connected:", socket.id);

        socket.on("user_message", async ({ chatId }) => {
            console.log(chatId)

            try {

                console.log("Streaming started:", chatId);

                const messages = await messageModel
                    .find({ chat: chatId })
        

                    console.log(messages);

                const response = await generateResponse(
                    messages,
                    io,
                    chatId
                );

                await messageModel.create({
                    chat: chatId,
                    content: response,
                    role: "ai"
                });

            } catch (error) {

                console.error(error);

                socket.emit("ai_error", {
                    message: "AI response failed"
                });

            }

        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });

    });

};

export function getIO() {

    if (!io) {
        throw new Error("Socket.io not initialized");
    }

    return io;
}
