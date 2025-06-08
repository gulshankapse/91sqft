import axios from "axios";
import "./profile.scss";
import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { Link } from "react-router-dom";

function Profile() {
    const { currentUser, updateUser } = useContext(authContext);

    // const handleLogout = async () => {
    //     try {
    //         await axios.post("http://localhost:8800/logout", {}, { withCredentials: true });
    //         updateUser(null);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <div className="userProfile">
            <div className="cover"></div>
            <div className="info">
                <img
                    src={currentUser?.profilePic || "/noDP.png"}
                    alt="Profile"
                    className="avatar"
                />
                <div className="wrapper">
                    <span className="text">
                        Username<b>{currentUser?.username}</b>
                    </span>
                    <span className="text">
                        E-mail<b>{currentUser?.email}</b>
                    </span>
                    {/* <span className="text">Joined<b>{currentUser?.createdAt}</b></span> */}
                    {/* <div className="buttons">
                        <div className="button">
                            <span>Logout</span>
                            <Link onClick={handleLogout}>
                                <img src="/logout.png" alt="" className="icon"/>
                            </Link>
                        </div>
                        <div className="button">
                            <span>Update</span>
                            <Link to="/user/update">
                                <img src="/update.png" alt="" className="icon"/>
                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Profile;
