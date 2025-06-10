//DB Operations

import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
            },
        });
        res.status(200).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to register user!" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        //check if the user exist
        const user = await prisma.user.findUnique({
            where: { username: username },
        });
        if (!user)
            return res.status(401).json({ message: "Invalid Credentials!" });

        //check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(401).json({ message: "Invalid Credentials!" });

        //generate cookie token and send the user
        const age = 1000 * 60 * 60 * 24 * 7;
        //const secretKey = 'T3@4R7!5kLzP0iWvDqN1*GhSz#X2';

        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: true,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age },
        );

        const { password: userPassword, ...userInfo } = user;

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: age,
        })
            .status(200)
            .json(userInfo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to login" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "logout successful" });
};
