import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { authContext } from "./authContext";
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [socket, setSocket] = useState(null);
    const { currentUser } = useContext(authContext);

    useEffect(() => {
        setSocket(io(`${API_URL}`));
    }, []);

    useEffect(() => {
        if (currentUser && socket) {
            console.log("Emitting newUser event:", socket);
            socket.emit("newUser", currentUser.id);
        }
    }, [currentUser, socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
