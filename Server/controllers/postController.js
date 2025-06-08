import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
    const query = req.query;

    try {
        const posts = await prisma.post.findMany({
            where: {
                type: query.type || undefined,
                city: query.city || undefined,
                property: query.property || undefined,
                bedroom: query.bedroom ? parseInt(query.bedroom) : undefined,
                price: {
                    gte: query.minPrice ? parseInt(query.minPrice) : 0,
                    lte: query.maxPrice ? parseInt(query.maxPrice) : 100000000,
                },
            },
        });
        setTimeout(() => {
            res.status(200).json(posts);
        }, 3000);
        //res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Failed to get Posts" });
    }
};

export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        profilePic: true,
                        email: true,
                    },
                },
            },
        });

        let userId;
        const token = req.cookies?.token;

        if (!token) userId = null;
        else {
            jwt.verify(
                token,
                process.env.JWT_SECRET_KEY,
                async (err, payload) => {
                    if (err) userId = null;
                    else userId = payload.id;
                },
            );
        }

        const saved = await prisma.savedPost.findUnique({
            where: {
                userId_postId: {
                    postId: id,
                    userId,
                },
            },
        });

        res.status(200).json({ ...post, isSaved: saved ? true : false });
    } catch (err) {
        res.status(500).json({ message: "Failed to get Post" });
    }
};

export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.userId;

    try {
        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail,
                },
            },
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json({ message: "Failed to create Post" });
    }
};

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const tokenUserId = req.userId;
    const { ...inputs } = req.body;

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized!" });
        }

        const updatePost = await prisma.post.update({
            where: { id: postId },
            data: {
                ...inputs,
            },
        });

        res.status(200).json(updatePost);
    } catch (err) {
        res.status(500).json({ message: "Failed to update Post" });
    }
};

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (post.userId !== tokenUserId)
            return res
                .status(403)
                .json({ message: "Not Authorized for this Post" });

        await prisma.postDetail.delete({
            where: { postId: id },
        });

        await prisma.post.delete({
            where: { id },
        });
        res.status(200).json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete Post" });
    }
};
