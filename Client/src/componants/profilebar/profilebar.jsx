import axios from "axios";
import "./profilebar.scss";
import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { Link } from "react-router-dom";

function ProfileBar() {
    const { currentUser, updateUser } = useContext(authContext);

    const handleLogout = async () => {
        try {
            await axios.post(
                "http://localhost:8800/logout",
                {},
                { withCredentials: true },
            );
            updateUser(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="userProfilebar">
            <img
                src={currentUser?.profilePic || "/noDP.png"}
                alt="Profile"
                className="avatar"
            />
            <span className="text">
                <b>{currentUser?.username}</b>
            </span>
            <div className="online">
                <span>Online</span>
            </div>
            <div className="buttons">
                <div className="button">
                    <Link to="/user/update">
                        <span>View Profile</span>
                    </Link>
                </div>
                <div className="button">
                    <Link onClick={handleLogout}>
                        <img src="/power.png" alt="" className="icon" />
                    </Link>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
}

export default ProfileBar;
