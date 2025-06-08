import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const chats = await prisma.chat.findMany({
            where: {
                userIds: {
                    hasSome: [tokenUserId],
                },
            },
        });

        for (const chat of chats) {
            const receiverId = chat.userIds.find((id) => id !== tokenUserId);

            const receiver = await prisma.user.findUnique({
                where: {
                    id: receiverId,
                },
                select: {
                    id: true,
                    username: true,
                    profilePic: true,
                },
            });
            chat.receiver = receiver;
        }

        chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({ message: "Failed to get Chats!" });
    }
};

export const getChat = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
                userIds: {
                    hasSome: [tokenUserId],
                },
            },
            include: {
                message: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });

        await prisma.chat.update({
            where: {
                id: req.params.id,
            },
            data: {
                seenBy: {
                    push: [tokenUserId],
                },
            },
        });
        res.status(200).json(chat);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get Chat!" });
    }
};

export const addChat = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const existingChat = await prisma.chat.findFirst({
            where: {
                userIds: {
                    equals: [tokenUserId, req.body.receiverId], // Ensures both users exist in the chat
                },
            },
        });

        if (existingChat) {
            return res.status(200).json(existingChat);
        }

        const newChat = await prisma.chat.create({
            data: {
                userIds: [tokenUserId, req.body.receiverId],
            },
        });
        res.status(200).json(newChat);
    } catch (err) {
        res.status(500).json({ message: "Failed to add Chat!" });
    }
};

export const readChat = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        // First get the chat to ensure it exists
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
                userIds: {
                    hasSome: [tokenUserId],
                },
            },
        });

        if (!chat) {
            return res.status(404).json({ message: "Chat not found!" });
        }

        // Only update if user hasn't seen it
        if (!chat.seenBy.includes(tokenUserId)) {
            const updatedChat = await prisma.chat.update({
                where: { id: req.params.id },
                data: {
                    seenBy: {
                        push: [tokenUserId],
                    },
                },
            });
            return res.status(200).json(updatedChat);
        }

        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json({ message: "Failed to read Chat!" });
    }
};

export const deleteChat = async (req, res) => {
    const tokenUserId = req.userId;

    try {
        const chat = await prisma.chat.findUnique({
            where: {
                id: req.params.id,
                userIds: {
                    hasSome: [tokenUserId],
                },
            },
        });

        if (!chat) {
            return res
                .status(404)
                .json({ message: "Chat not found or access denied!" });
        }

        await prisma.message.deleteMany({
            where: {
                chatId: req.params.id,
            },
        });

        await prisma.chat.delete({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: "Chat deleted successfully!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete chat!" });
    }
};
