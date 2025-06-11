import "./navbar.scss";
import { useContext, useState } from "react";
import { authContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
    const [open, setOpen] = useState(false); // For the responsive menu
    const navigate = useNavigate();
    const { currentUser, updateUser } = useContext(authContext);

    return (
        <nav>
            <div className="left">
                <a href="/" className="logo">
                    <img src="/91.png" alt="logo" />
                    <span>sqft.</span>
                </a>
                <a href="/">Home</a>
                <a href="/">About</a>
                <a href="/">Contacts</a>
                <a href="/">Agents</a>
            </div>
            <div className="right">
                {currentUser ? (
                    <>
                        <Link to="/user/update">
                            <div className="user">
                                <img
                                    src={currentUser.profilePic || "/noDP.png"}
                                    alt="User Profile"
                                />
                                <span>{currentUser.username}</span>
                            </div>
                        </Link>
                        <a href="/user" className="profile">
                            Profile
                        </a>
                    </>
                ) : (
                    <>
                        <a href="/login">Sign In</a>
                        <a href="/register" className="signup">
                            Sign up
                        </a>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
