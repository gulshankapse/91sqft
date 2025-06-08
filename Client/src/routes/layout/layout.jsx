import "./layout.scss";
import Navbar from "../../componants/navbar/navbar.jsx";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../context/authContext.jsx";

function Layout() {
    return (
        <div className="layout">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

function RequireAuth() {
    const { currentUser } = useContext(authContext);

    return !currentUser ? (
        <Navigate to="/login" />
    ) : (
        <div className="layout">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export { Layout, RequireAuth };
