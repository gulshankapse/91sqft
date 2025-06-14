import "./card.scss";
import { useContext } from "react";
import { authContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

function formatPrice(price) {
    return price.toLocaleString("en-IN");
}

function Card({ item }) {
    const { currentUser } = useContext(authContext);
    const navigate = useNavigate();

    const showDetails = () => {
        if (!currentUser) navigate("/login");
        else navigate(`/${item.id}`);
    };
    return (
        <div onClick={() => showDetails()} className="card">
            <div className="imagecontainer">
                <img src={item.images[0]} alt="img" />
            </div>
            <div className="textcontainer">
                <p className="price">₹ {formatPrice(item.price)}</p>
                <h2 className="title">{item.title}</h2>
                <p className="address">
                    <img src="/pin.png" alt="" />
                    <span>{item.address}</span>
                </p>

                {/* <div className="bottom">
                 <div className="features">
                    <div className="feature">
                        <img src="/bed.png" alt="" />
                        <span>{item.bedroom} Bedroom</span>
                    </div>
                    <div className="feature">
                        <img src="/bath.png" alt="" />
                        <span>{item.bathroom} Bathroom</span>
                    </div>
                 </div>
                 <div className="icons">
                    <div className="icon">
                        <img src="/save.png" alt="" />
                    </div>
                    <div className="icon">
                        <img src="/chat.png" alt="" />
                    </div>
                 </div>
              </div> */}
            </div>
        </div>
    );
}

export default Card;
