import "./pin.scss";
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { useContext } from "react";

function formatPrice(price) {
    return price.toLocaleString("en-IN");
}

function Pin({ item }) {
    const { currentUser } = useContext(authContext);
    const navigate = useNavigate();

    const showDetails = () => {
        if (!currentUser) navigate("/login");
        else navigate(`/${item.id}`);
    };

    return (
        <Marker position={[item.latitude, item.longitude]}>
            <Popup>
                <div className="popupContainer">
                    <img src={item.images[0]} alt="" />
                    <div className="textcontainer">
                        <div onClick={() => showDetails()}>{item.title}</div>
                        <b>₹ {formatPrice(item.price)}</b>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
}

export default Pin;
