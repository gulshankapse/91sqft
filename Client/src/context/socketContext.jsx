import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { authContext } from "./authContext";
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { currentUser } = useContext(authContext);

    useEffect(() => {
        setSocket(io("http://localhost:8800"));
    }, []);

    // useEffect(()=>{
    //   currentUser && socket?.emit("newUser" , currentUser.id)
    // } , [currentUser , socket]);
    useEffect(() => {
        if (currentUser && socket) {
            console.log("Emitting newUser event:", currentUser.id); // Debug log
            socket.emit("newUser", currentUser.id);
        }
    }, [currentUser, socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
