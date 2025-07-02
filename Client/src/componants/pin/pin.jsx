import "./pin.scss";
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { useContext } from "react";

function formatPrice(price) {
    return price.toLocaleString("en-IN");
}

const customIcon = new L.Icon({
    iconUrl: "/marker.png",
    iconSize: [32, 32], // adjust to your icon size
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
});

function Pin({ item }) {
    const { currentUser } = useContext(authContext);
    const navigate = useNavigate();

    const showDetails = () => {
        if (!currentUser) navigate("/login");
        else navigate(`/${item.id}`);
    };

    return (
        <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
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
