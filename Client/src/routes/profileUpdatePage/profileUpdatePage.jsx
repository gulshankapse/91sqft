import "./profileUpdatePage.scss";
import axios from "axios";
import { useContext, useState } from "react";
import { authContext } from "../../context/authContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import UploadWidget from "../../componants/uploadwidget/uploadwidget.jsx";

function ProfileUpdatePage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const nevigate = useNavigate();
    const [error, setError] = useState("");
    const { currentUser, updateUser } = useContext(authContext);
    const [profilePic, setProfilePic] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        try {
            const res = await axios.put(
                `${API_URL}/users/${currentUser.id}`,
                { username, email, password, profilePic: profilePic[0] },
                { withCredentials: true },
            );

            updateUser(res.data);
            // nevigate("/user");
            alert("Profile updated successfully!");
        } catch (err) {
            console.log(err);
            setError(err.response.data.message);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                `${API_URL}/logout`,
                {},
                { withCredentials: true },
            );
            updateUser(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="profileUpdate">
            {/* <ProfileBar /> */}
            <div className="profileContainer">
                <div className="userProfile">
                    <div className="cover"></div>
                    <div className="info">
                        <img
                            src={currentUser?.profilePic || "/noDP.png"}
                            alt="Profile"
                            className="avatar"
                        />

                        <span className="text">
                            Username<b>{currentUser?.username}</b>
                        </span>
                        <span className="text">
                            E-mail<b>{currentUser?.email}</b>
                        </span>
                        <span className="text">
                            Joined<b>{currentUser?.createdAt}</b>
                        </span>
                        <div className="buttons">
                            <div className="button">
                                <span>Logout</span>
                                <Link onClick={handleLogout}>
                                    <img
                                        src="/logout.png"
                                        alt=""
                                        className="icon"
                                    />
                                </Link>
                            </div>
                            {/* <div className="button">
                                    <span>Update</span>
                                    <Link to="/user/update">
                                        <img
                                            src="/update.png"
                                            alt=""
                                            className="icon"
                                        />
                                    </Link>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="updateContainer">
                <div className="head">
                    <span>Update Profile</span>
                </div>
                <div className="image">
                    <div className="pic">
                        <span>Profile Picture</span>
                        <img
                            className="avatar"
                            src={
                                profilePic[0] ||
                                currentUser.profilePic ||
                                "/noDP.png"
                            }
                            alt=""
                        />
                    </div>
                    <div className="upload">
                        <UploadWidget
                            uwConfig={{
                                cloudName: "gulshankapse",
                                uploadPreset: "91sqft",
                                multiple: false,
                                maxImageFileSize: 2000000,
                                folder: "Avatars",
                            }}
                            setState={setProfilePic}
                            className="custom-upload-widget"
                        />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="item">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            defaultValue={currentUser.username}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={currentUser.email}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" />
                    </div>
                    <button>Update</button>
                    {error && <span>{error}</span>}
                </form>
            </div>
        </div>
    );
}

export default ProfileUpdatePage;
