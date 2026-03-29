import {io} from "socket.io-client"


export function initializeSocketConnection () {
    const socket = io("http://localhost:3000",{
        withCredentials:true
    })

    console.log("socket  is initialize....")

    socket.on("connect",(socket)=>{
        console.log("socket is connected")
    })
    
}