import app from "./src/app.js"
import {createServer} from "http";
import {initSocketServer} from "./src/sockets/server.socket.js";
import http from "http"
import Databaseconnection from "./src/config/database.js";


const server = http.createServer(app);
initSocketServer(server);

Databaseconnection();



server.listen(3000,()=>{console.log("server is runing")})