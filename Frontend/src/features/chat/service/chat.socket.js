import { io } from "socket.io-client";

let socket = null;

export const initializeSocketConnection = () => {

  if (!socket) {

    socket = io("https://healthcarepluse.onrender.com", {
      withCredentials: true
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

  }

  return socket;

};

export const getSocket = () => {

  if (!socket) {
    throw new Error("Socket not initialized");
  }

  return socket;

};
