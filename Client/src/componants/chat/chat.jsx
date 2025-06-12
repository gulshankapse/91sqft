import "./chat.scss";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../../context/authContext";
import { SocketContext } from "../../context/socketContext";
import { format } from "timeago.js";

function Chat({ chats, setChats }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const [chat, setChat] = useState(null);
    const { currentUser } = useContext(authContext);
    const { socket } = useContext(SocketContext);
    const messageEndRef = useRef();

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    useEffect(() => {
        if (!socket) return;

        const read = async (chatId) => {
            try {
                await axios.put(
                    `${API_URL}/chats/read/${chatId}`,
                    {},
                    { withCredentials: true },
                );

                setChats((prev) =>
                    prev.map((c) =>
                        c.id === chatId
                            ? { ...c, seenBy: [...c.seenBy, currentUser.id] }
                            : c,
                    ),
                );
            } catch (err) {
                console.error("Error marking as read:", err);
            }
        };

        const handleIncomingMessage = (data) => {
            setChats((prev) =>
                prev.map((c) =>
                    c.id === data.chatId
                        ? {
                              ...c,
                              lastMessage: data.text,
                              seenBy:
                                  chat && chat.id === data.chatId
                                      ? [...c.seenBy, currentUser.id] // Mark as read if chat is open
                                      : c.seenBy.filter(
                                            (id) => id !== currentUser.id,
                                        ), // Mark as unread
                          }
                        : c,
                ),
            );

            if (chat && chat.id === data.chatId) {
                setChat((prev) => ({
                    ...prev,
                    message: [...(prev.message || []), data],
                }));
                read(data.chatId);
            }
        };

        socket.on("getMessage", handleIncomingMessage);

        return () => {
            socket.off("getMessage", handleIncomingMessage);
        };
    }, [socket, chat, currentUser, setChats]);

    const handleOpenChat = async (id, receiver) => {
        try {
            // Mark as read immediately
            setChats((prev) =>
                prev.map((c) =>
                    c.id === id
                        ? { ...c, seenBy: [...c.seenBy, currentUser.id] }
                        : c,
                ),
            );

            const res = await axios.get(`${API_URL}/chats/${id}`, {
                withCredentials: true,
            });

            setChat({ ...res.data, receiver });
        } catch (err) {
            console.error("Error opening chat:", err);
        }
    };

    const handleCloseChat = () => {
        setChat(null);
    };

    const handleDeleteChat = async (chatId, e) => {
        e.stopPropagation();
        try {
            await axios.delete(`${API_URL}/chats/delete/${chatId}`, {
                withCredentials: true,
            });

            setChats((prev) => prev.filter((c) => c.id !== chatId));
            if (chat?.id === chatId) setChat(null);
        } catch (err) {
            console.error("Error deleting chat:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.text.value.trim();
        if (!text || !chat) return;

        try {
            const res = await axios.post(
                `${API_URL}/messages/${chat.id}`,
                { text },
                { withCredentials: true },
            );

            // Update active chat
            setChat((prev) => ({
                ...prev,
                message: [...(prev.message || []), res.data],
            }));

            // Update chat list preview
            setChats((prev) =>
                prev.map((c) =>
                    c.id === chat.id
                        ? { ...c, lastMessage: text, seenBy: [currentUser.id] }
                        : c,
                ),
            );

            e.target.reset();
            socket.emit("sendMessage", {
                receiverId: chat.receiver.id,
                data: res.data,
            });
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    return (
        <div className="chat">
            <h1>Messages</h1>
            <div className="messages">
                {chats?.map((c) => (
                    <div
                        className="message"
                        key={c.id}
                        style={{
                            backgroundColor: c.seenBy.includes(currentUser.id)
                                ? "white"
                                : "#fecd5170",
                            // border: c.seenBy.includes(currentUser.id)
                            //     ? "1px solid #bbb"
                            //     : "none",
                        }}
                        onClick={() => handleOpenChat(c.id, c.receiver)}
                    >
                        <div className="info">
                            <img
                                src={c.receiver.profilePic || "/noDP.png"}
                                alt=""
                            />
                            <span>{c.receiver.username}</span>
                            <p>{c.lastMessage || "New chat"}</p>
                        </div>
                        <div
                            onClick={(e) => handleDeleteChat(c.id, e)}
                            className="delete"
                        >
                            <img src="trash.png" alt="" />
                        </div>
                    </div>
                ))}
            </div>

            {chat && (
                <div className="chatbox">
                    <div className="top">
                        <div className="user">
                            <img
                                src={chat.receiver.profilePic || "/noDP.png"}
                                alt=""
                            />
                            {chat.receiver.username}
                        </div>
                        <span onClick={handleCloseChat} className="close">
                            X
                        </span>
                    </div>

                    <div className="center">
                        {chat?.message?.map((msg) => (
                            <div
                                className="chatmsg"
                                key={msg.id}
                                style={{
                                    alignSelf:
                                        msg.userId === currentUser.id
                                            ? "flex-end"
                                            : "flex-start",
                                    textAlign:
                                        msg.userId === currentUser.id
                                            ? "right"
                                            : "left",
                                }}
                            >
                                <p>{msg.text}</p>
                                <span>{format(msg.createdAt)}</span>
                            </div>
                        ))}
                        <div ref={messageEndRef}></div>
                    </div>

                    <form onSubmit={handleSubmit} className="bottom">
                        <textarea name="text" placeholder="Message..." />
                        <button type="submit">
                            <img src="/send.png" alt="" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Chat;
