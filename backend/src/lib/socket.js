import { Server } from "socket.io";
import http from "http";
import express from "express";
import { log } from "console";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://real-time-chat-app-1-y4qc.onrender.com"],
  },
});

function getReceiverSocketId(userId){
  return userSocketMap[userId]
}

// used to store he online user
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user is Connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  //io.emit() is used to send the events to all thr connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

});

export { io, app, server,getReceiverSocketId };
