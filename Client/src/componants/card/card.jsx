import "./card.scss";
import { Link } from "react-router-dom";

function formatPrice(price) {
    return price.toLocaleString("en-IN");
}

function Card({ item }) {
    return (
        <div className="card">
            <Link to={`/${item.id}`} className="imagecontainer">
                <img src={item.images[0]} alt="img" />
            </Link>
            <div className="textcontainer">
                <p className="price">₹ {formatPrice(item.price)}</p>
                <h2 className="title">
                    <Link to={`/${item.id}`}>{item.title}</Link>
                </h2>
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
