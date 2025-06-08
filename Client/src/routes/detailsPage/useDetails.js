import "./detailsPage.scss";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { authContext } from "../../context/authContext.jsx";

export default function useDetails() {
    const postData = useLoaderData();
    const [post, setPost] = useState(postData);
    const { currentUser } = useContext(authContext);
    const navigate = useNavigate();
    const [saved, setSaved] = useState(post.isSaved);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8800/posts/${post.id}`, {
                withCredentials: true,
            });
            navigate("/user");
        } catch (err) {
            console.log(err);
        }
    };

    const addChat = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8800/chats",
                { receiverId: post.user.id },
                { withCredentials: true },
            );
            console.log(res);
            navigate("/user");
        } catch (err) {
            console.log(err);
        }
    };

    const handleSave = async () => {
        setSaved((prev) => !prev);

        if (!currentUser) {
            navigate("/login");
        }

        try {
            await axios.post(
                "http://localhost:8800/users/save",
                { postId: post.id },
                { withCredentials: true },
            );
            console.log(post);
        } catch (err) {
            console.log(err);
            setSaved((prev) => !prev);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { title, price } = Object.fromEntries(formData);

        try {
            const res = await axios.put(
                `http://localhost:8800/posts/${post.id}`,
                { title, price: Number(price) },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                },
            );
            setPost((prev) => ({ ...prev, ...res.data }));
        } catch (err) {
            console.log(err);
        }
    };

    return { handleDelete, handleSave, handleUpdate, addChat };
}
