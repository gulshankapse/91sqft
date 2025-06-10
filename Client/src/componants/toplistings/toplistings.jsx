import { Link } from "react-router-dom";
import "./toplistings.scss";

function TopListings({ post }) {
    function formatPrice(price) {
        return price.toLocaleString("en-IN");
    }
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
                        <Link to={`/${post.id}`}>
                            <button className="btn">Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopListings;
