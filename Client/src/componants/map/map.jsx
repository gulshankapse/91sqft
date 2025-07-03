import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/pin";
import { MapContainer, TileLayer } from "react-leaflet";

function Map({ items, zoom, show }) {
    return (
        <MapContainer
            className="map"
            center={
                items.length === 1
                    ? [items[0].latitude, items[0].longitude]
                    : [20.5937, 78.9629]
            }
            zoom={zoom}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {items.map((item) => (
                <Pin item={item} key={item.id} show={show} />
            ))}
        </MapContainer>
    );
}

export default Map;
