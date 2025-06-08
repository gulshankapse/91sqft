import "./pin.scss";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function formatPrice(price) {
    return price.toLocaleString("en-IN");
}

function Pin({ item }) {
    return (
        <Marker position={[item.latitude, item.longitude]}>
            <Popup>
                <div className="popupContainer">
                    <img src={item.images[0]} alt="" />
                    <div className="textcontainer">
                        <Link to={`/${item.id}`}>{item.title}</Link>
                        <b>₹ {formatPrice(item.price)}</b>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export default Pin;
