import "./toplistings.scss";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { useContext } from "react";

function formatPrice(price) {
    return price.toLocaleString("en-IN");
}

function TopListings({ post }) {
    const { currentUser, updateUser } = useContext(authContext);
    const navigate = useNavigate();

    const showDetails = () => {
        const tokenExists = document.cookie
            .split("; ")
            .some((row) => row.startsWith("token="));

        if (!currentUser) {
            updateUser(null);
            navigate("/login");
        } else {
            navigate(`/${post.id}`);
        }
    };

    return (
        <div className="toplist">
            <div className="card">
                <div className="bg">
                    <img src={post.images?.[0]} loading="lazy" alt="..." />
                </div>
                <div className="content">
                    <div className="head">
                        <span>{post.title}</span>
                        {/* <div className="rating">
                            <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                        </div> */}
                    </div>
                    <div className="address">
                        <img src="/pin.png" alt="" />
                        <span>{post.address}</span>
                    </div>
                    <div className="bottom">
                        <span className="price">
                            ₹ {formatPrice(post.price)}
                        </span>

                        <button className="btn" onClick={showDetails}>
                            Details ≫
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopListings;
