import io from "socket.io-client";
import { BASE_URL } from "./url";

export const createSocketConnection = () => {
    return io(BASE_URL);
}

// socket.js - backend
const socket = require("socket.io")

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:1234",
        },
    });

    io.on("connection", (socket) => {
        socket.on("joinChat", ( firstName, userId, targetUserId ) => {
            const roomId = [userId, targetUserId].sort.join("$");
            socket.join(roomId);
        })

        socket.on("sendMessage", (name, userId, targetUserId, text) => {
            const roomId = [userId, targetUserId].sort.join("$");
            console.log(name + " " + text);
            
            io.to(roomId).emit("receivedMessage", {name, text});
        })
    })
}

module.exports = {initializeSocket}