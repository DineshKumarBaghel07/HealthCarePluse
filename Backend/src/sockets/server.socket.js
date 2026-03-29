import {Server} from "socket.io";



let io;


export const initSocketServer =(httpServer) =>{
    io  = new Server(httpServer,{
        cors:{
            origin:"http://localhost:5173",
            credentials:true
        }
    })

    console.log("Socket server is Initilized")

    io.on("connection",(socket)=>{
        console.log("A user connected",socket.id)
    })
}




export function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized")
    }

    return io
}