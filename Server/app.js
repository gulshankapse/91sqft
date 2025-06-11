import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import postRoute from "./routes/postRoute.js";
import authRoute from "./routes/authRoute.js";
import testRoute from "./routes/testRoute.js";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { addUser, getUser, removeUser } from "./socket.js";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    },
});

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRoute);
app.use("/test", testRoute);
app.use("/posts", postRoute);
app.use("/users", userRoute);
app.use("/chats", chatRoute);
app.use("/messages", messageRoute);

io.on("connection", (socket) => {
    socket.on("newUser", (userId) => {
        addUser(userId, socket.id);
    });

    socket.on("sendMessage", ({ receiverId, data }) => {
        const receiver = getUser(receiverId);
        if (receiver && receiver.socketId) {
            io.to(receiver.socketId).emit("getMessage", data);
        } else {
            console.log("Receiver not found or not online:", receiverId);
        }
    });

    socket.on("disconnect", () => {
        removeUser(socket.id);
    });
});

const PORT = process.env.PORT || 8800;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
