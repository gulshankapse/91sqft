import "./detailsPage.scss";
import axios from "axios";
import Slider from "../../componants/slider/slider";
import Map from "../../componants/map/map.jsx";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { authContext } from "../../context/authContext.jsx";

function formatPrice(price) {
    return price.toLocaleString("en-IN");
}

function DetailsPage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const postData = useLoaderData();
    const [post, setPost] = useState(postData);
    const { currentUser } = useContext(authContext);
    const navigate = useNavigate();
    const [saved, setSaved] = useState(post.isSaved);

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/${post.id}`, {
                withCredentials: true,
            });
            navigate("/user");
        } catch (err) {
            console.log(err);
        }
    };

    const addChat = async () => {
        try {
            const res = await axios.post(
                `${API_URL}/chats`,
                { receiverId: post.user.id },
                { withCredentials: true },
            );
            console.log(res);
            navigate("/user");
        } catch (err) {
            console.log(err);
        }
    };

    const handleSave = async () => {
        setSaved((prev) => !prev);

        if (!currentUser) {
            navigate("/login");
        }

        try {
            await axios.post(
                `${API_URL}/users/save`,
                { postId: post.id },
                { withCredentials: true },
            );
            console.log(post);
        } catch (err) {
            console.log(err);
            setSaved((prev) => !prev);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { title, price } = Object.fromEntries(formData);

        try {
            const res = await axios.put(
                `${API_URL}/posts/${post.id}`,
                { title, price: Number(price) },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                },
            );
            setPost((prev) => ({ ...prev, ...res.data }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="detailsPage">
            <div className="container">
                <div className="details">
                    <div className="wrapper">
                        <div className="info">
                            <div className="top">
                                <div className="title">
                                    <h1>{post.title}</h1>
                                    <div className="address">
                                        <img src="/pin.png" alt="" />
                                        <span>{post.address}</span>
                                    </div>
                                </div>
                                <div className="price">
                                    <h1>₹ {formatPrice(post.price)}</h1>
                                </div>
                            </div>
                            <Slider images={post.images} />
                            <p className="title">Posted By</p>
                            <div className="owner">
                                <div className="left">
                                    <img
                                        className="dp"
                                        src={
                                            post.user.profilePic || "/noDP.png"
                                        }
                                        alt=""
                                    />
                                    <span>{post.user.username}</span>
                                    <div className="postinfo">
                                        <img src="/mail.png" alt="" />
                                        <span>{post.user.email}</span>
                                    </div>
                                </div>
                                <div className="right">
                                    {currentUser.id === post.user.id ? (
                                        <>
                                            <form onSubmit={handleUpdate}>
                                                <div className="item">
                                                    <label htmlFor="title">
                                                        Title
                                                    </label>
                                                    <input
                                                        id="title"
                                                        name="title"
                                                        type="text"
                                                        defaultValue={
                                                            post.title
                                                        }
                                                    />
                                                </div>
                                                <div className="item">
                                                    <label htmlFor="price">
                                                        Price
                                                    </label>
                                                    <input
                                                        id="price"
                                                        name="price"
                                                        type="number"
                                                        defaultValue={
                                                            post.price
                                                        }
                                                    />
                                                </div>
                                                <button>Update</button>
                                            </form>
                                        </>
                                    ) : (
                                        <>
                                            <span>{post.type} it Now!</span>
                                            <button className="call">
                                                <img src="/call.png" alt="" />
                                                <span>Call</span>
                                            </button>
                                            <button
                                                onClick={addChat}
                                                className="msg"
                                            >
                                                <img src="/chat.png" alt="" />
                                                <span>Message</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="features">
                    <div className="buttons">
                        <div>
                            Post Property
                            <a href="/add">
                                <img src="/add.png" alt="" />
                            </a>
                        </div>
                        {currentUser.id === post.user.id ? (
                            <div>
                                Delete
                                <a onClick={handleDelete}>
                                    <img src="/trash.png" alt="" />
                                </a>
                            </div>
                        ) : (
                            <div>
                                {saved ? "Saved" : "Save"}
                                <a onClick={handleSave}>
                                    <img
                                        src={saved ? "/saved.png" : "/save.png"}
                                        alt=""
                                    />
                                </a>
                            </div>
                        )}
                    </div>
                    <div className="wrapper">
                        <div className="list">
                            <p className="title">Property Overview</p>
                            <div className="listvertical">
                                <div className="feature">
                                    <img src="/tools.png" alt="" />
                                    <div className="featureText">
                                        <span>Utilities</span>
                                        <p>{post.postDetail.utilities}</p>
                                    </div>
                                </div>
                                <div className="feature">
                                    <img src="/cat.png" alt="" />
                                    <div className="featureText">
                                        <span>Pet Policy</span>
                                        <p>{post.postDetail.pet}</p>
                                    </div>
                                </div>
                                <div className="feature">
                                    <img src="/fees.png" alt="" />
                                    <div className="featureText">
                                        <span>Property Fees</span>
                                        <p>{post.postDetail.income}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="sizes">
                                <div className="size">
                                    <img src="/maximize.png" alt="" />
                                    <span>{post.postDetail.size}sqft</span>
                                </div>
                                <div className="size">
                                    <img src="/dbed.png" alt="" />
                                    <span>{post.bedroom} Bed</span>
                                </div>
                                <div className="size">
                                    <img src="/bathtub.png" alt="" />
                                    <span>{post.bathroom}Bathroom</span>
                                </div>
                            </div>
                            <p className="title">Location</p>
                            <div className="mapContainer">
                                <Map items={[post]} zoom={15} />
                            </div>
                            <p className="title">Nearby Places</p>
                            <div className="listhorizontal">
                                <div className="feature">
                                    <img src="/schooll.png" alt="" />
                                    <div className="featureText">
                                        <span>School</span>
                                        <p>{post.postDetail.school}m away</p>
                                    </div>
                                </div>
                                <div className="feature">
                                    <img src="/buss.png" alt="" />
                                    <div className="featureText">
                                        <span>Bus Stop</span>
                                        <p>{post.postDetail.bus}m away</p>
                                    </div>
                                </div>
                                <div className="feature">
                                    <img src="/utensils.png" alt="" />
                                    <div className="featureText">
                                        <span>Restaurant</span>
                                        <p>
                                            {post.postDetail.restaurant}m away
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="title">Description</p>
                            <div
                                className="bottom"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        post.postDetail.desc,
                                    ),
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
