import express from "express";
import {
    addChat,
    deleteChat,
    getChat,
    getChats,
    readChat,
} from "../controllers/chatController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getChats);

router.get("/:id", verifyToken, getChat);

router.post("/", verifyToken, addChat);

router.put("/read/:id", verifyToken, readChat);

router.delete("/delete/:id", verifyToken, deleteChat);

export default router;
