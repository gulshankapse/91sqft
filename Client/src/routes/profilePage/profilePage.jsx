import { Await, Link, useLoaderData } from "react-router-dom";
import List from "../../componants/list/list";
import "./profilePage.scss";
import { Suspense, useContext, useEffect, useState } from "react";
import LoadingList from "../../componants/loadinglist/loadinglist.jsx";
import Chat from "../../componants/chat/chat.jsx";
import Profile from "../../componants/profile/profile.jsx";
import { authContext } from "../../context/authContext.jsx";
import ProfileBar from "../../componants/profilebar/profilebar.jsx";
import LoadingChat from "../../componants/loadingchat/loadingchat.jsx";
import Card from "../../componants/card/card.jsx";

function ProfilePage() {
    const data = useLoaderData();
    const [list, setList] = useState([]);
    const [view, setView] = useState("myList"); // Default view is "My List"
    const [activeButton, setActiveButton] = useState("myList");
    const [chats, setChats] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        if (data?.postResponse) {
            data.postResponse.then((response) => {
                setUserPosts(response.data.userPosts);
                setSavedPosts(response.data.savedPosts);
                setList(response.data.userPosts); // default
            });
        }
    }, [data]);

    useEffect(() => {
        if (data?.postResponse) {
            data.postResponse.then((response) => {
                setList(response.data.userPosts);
            });
        }
    }, [data]);

    useEffect(() => {
        if (data?.chatResponse) {
            data.chatResponse.then((response) => {
                setChats(response.data);
            });
        }
    }, [data?.chatResponse]);

    const handleViewChange = (newView, postResponse) => {
        setView(newView);
        if (newView === "myList") {
            setList(postResponse.data.userPosts);
            setActiveButton("myList");
        } else if (newView === "savedList") {
            setList(postResponse.data.savedPosts);
            setActiveButton("savedList");
        }
    };

    return (
        <div className="profilePage">
            {/* <div className="userinfo">
                <ProfileBar />
            </div> */}
            <div className="container">
                <div className="details">
                    <div className="heading">
                        <div className="option">
                            <button
                                onClick={async () => {
                                    const resolved = await data.postResponse;
                                    handleViewChange("myList", resolved);
                                }}
                                className={
                                    activeButton === "myList" ? "active" : ""
                                }
                            >
                                <p>My List</p>
                            </button>
                            <button
                                onClick={async () => {
                                    const resolved = await data.postResponse;
                                    handleViewChange("savedList", resolved);
                                }}
                                className={
                                    activeButton === "savedList" ? "active" : ""
                                }
                            >
                                <p>Saved List</p>
                            </button>
                        </div>
                        <div className="createContainer">
                            <span className="createText">Add</span>
                            <Link to="/add">
                                <img
                                    src="/add.png"
                                    alt="Create"
                                    className="createImage"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="wrapper">
                        <div className="list">
                            <Suspense fallback={<LoadingList />}>
                                <Await
                                    resolve={data.postResponse}
                                    errorElement={<p></p>}
                                >
                                    {list.map((item) => (
                                        <Card key={item.id} item={item} />
                                    ))}
                                </Await>
                            </Suspense>
                        </div>
                    </div>
                </div>

                <div className="chatContainer">
                    <div className="wrapper">
                        <Suspense fallback={<LoadingChat />}>
                            <Await
                                resolve={data.chatResponse}
                                errorElement={<p></p>}
                            >
                                {(chatResponse) => {
                                    // Initialize chats state only once with loaded data
                                    if (chats === null) {
                                        setChats(chatResponse.data);
                                    }
                                    return (
                                        <Chat
                                            chats={chats || chatResponse.data} // Fallback to loaded data
                                            setChats={setChats}
                                        />
                                    );
                                }}
                            </Await>
                        </Suspense>
                    </div>
                </div>
                {/* <div className="chatIconContainer" onClick={() => setIsChatOpen(!isChatOpen)}>
                <img src="/add.png" alt="Create" className="createImage" />
            </div>
            {isChatOpen && (
                <div className="chatPopup">
                    <Chat />
                </div>
            )} */}
            </div>
        </div>
    );
}

export default ProfilePage;
