import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null,
    );

    const updateUser = (data) => {
        if (data === null) {
            setCurrentUser(null);
        } else {
            setCurrentUser(data.rest ? data.rest : data);
        }
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <authContext.Provider value={{ currentUser, updateUser }}>
            {children}
        </authContext.Provider>
    );
};

// useEffect(() => {
//         const tokenExists = document.cookie
//             .split("; ")
//             .some((row) => row.startsWith("token="));

//         if (tokenExists) {
//             const storedUser = localStorage.getItem("user");
//             if (storedUser) {
//                 setCurrentUser(JSON.parse(storedUser));
//             }
//         } else {
//             updateUser(null);
//         }
//     }, []);
