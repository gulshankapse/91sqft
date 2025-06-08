import express from "express";
import {
    deleteUser,
    getUser,
    getUsers,
    myPosts,
    savePost,
    updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);

//router.get("/:id" , verifyToken , getUser);

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

router.post("/save", verifyToken, savePost);

router.get("/posts", verifyToken, myPosts);

export default router;
