import "./addpostPage.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "../../componants/uploadwidget/uploadwidget.jsx";

function AddpostPage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);

        try {
            const res = await axios.post(
                `${API_URL}/posts`,
                {
                    postData: {
                        title: inputs.title,
                        price: parseInt(inputs.price),
                        images: images,
                        address: inputs.address,
                        city: inputs.city,
                        bedroom: parseInt(inputs.bedroom),
                        bathroom: parseInt(inputs.bathroom),
                        latitude: parseFloat(inputs.latitude),
                        longitude: parseFloat(inputs.longitude),
                        type: inputs.type,
                        property: inputs.property,
                    },
                    postDetail: {
                        desc: value,
                        size: parseInt(inputs.size),
                        utilities: inputs.utilities,
                        pet: inputs.pet,
                        income: inputs.income,
                        school: parseInt(inputs.school),
                        bus: parseInt(inputs.bus),
                        restaurant: parseInt(inputs.restaurant),
                    },
                },
                { withCredentials: true },
            );
            navigate("/" + res.data.id);
        } catch (err) {
            console.log(err);
            setError(error);
        }
    };

    return (
        <div className="newpost">
            <div className="formContainer">
                <h1>Add New Post</h1>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="mdBox">
                            <label htmlFor="title">Title</label>
                            <input name="title" type="text" id="title" />
                        </div>
                        <div className="smBox">
                            <label htmlFor="price">Price ₹</label>
                            <input
                                name="price"
                                type="number"
                                id="price"
                                min={0}
                            />
                        </div>
                        <div className="description">
                            <label htmlFor="desc">Description</label>
                            <ReactQuill
                                theme="snow"
                                value={value}
                                onChange={setValue}
                            />
                        </div>
                        <div className="lgBox">
                            <label htmlFor="address">Address</label>
                            <input name="address" type="text" id="address" />
                        </div>
                        <div className="smBox">
                            <label htmlFor="city">City</label>
                            <input name="city" type="text" id="city" />
                        </div>
                        <div className="smBox">
                            <label htmlFor="latitude">Latitude</label>
                            <input name="latitude" type="text" id="latitude" />
                        </div>
                        <div className="smBox">
                            <label htmlFor="longitude">Longitude</label>
                            <input
                                name="longitude"
                                type="text"
                                id="longitude"
                            />
                        </div>
                        <div className="smBox">
                            <label htmlFor="size">Total Size (sqft)</label>
                            <input
                                name="size"
                                type="number"
                                id="size"
                                min={0}
                            />
                        </div>
                        <div className="smBox">
                            <label htmlFor="bedroom">No of Bedroom</label>
                            <input
                                name="bedroom"
                                type="number"
                                id="bedroom"
                                min={0}
                            />
                        </div>
                        <div className="smBox">
                            <label htmlFor="bathroom">No of Bathroom</label>
                            <input
                                name="bathroom"
                                type="number"
                                id="bathroom"
                                min={0}
                            />
                        </div>
                        <div className="smBox">
                            <label htmlFor="type">Type</label>
                            <select name="type">
                                <option value="Rent" defaultChecked>
                                    Rent
                                </option>
                                <option value="Buy">Buy</option>
                            </select>
                        </div>
                        <div className="smBox">
                            <label htmlFor="income">Income Policy</label>
                            <input
                                name="income"
                                type="text"
                                id="income"
                                placeholder="income policy"
                            />
                        </div>
                        <div className="smBox">
                            <label htmlFor="type">Property</label>
                            <select name="property">
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Villa"> Villa</option>
                                <option value="Townhouse">Townhouse</option>
                                <option value="Penthouse">Penthouse</option>
                                <option value="Duplex">Duplex</option>
                                <option value="Studio">Studio</option>
                                <option value="Bungalow">Bungalow</option>
                            </select>
                        </div>
                        <div className="smBox">
                            <label htmlFor="utilities">Utilities Policy</label>
                            <select name="utilities">
                                <option value="Owner">
                                    Owner is responsible
                                </option>
                                <option value="Tenant">
                                    Tenant is responsible
                                </option>
                                <option value="Shared">Shared</option>
                            </select>
                        </div>
                        <div className="smBox">
                            <label htmlFor="pet">Pet Policy</label>
                            <select name="pet">
                                <option value="Allowed">Allowed</option>
                                <option value="Not-allowed">Not Allowed</option>
                            </select>
                        </div>
                        <div className="smBox">
                            <label htmlFor="school">School</label>
                            <input
                                name="school"
                                type="number"
                                id="school"
                                min={0}
                            />
                        </div>
                        <div className="smBox">
                            <label htmlFor="bus">Bus</label>
                            <input name="bus" type="number" id="bus" min={0} />
                        </div>
                        <div className="smBox">
                            <label htmlFor="restaurant">Restaurant</label>
                            <input
                                name="restaurant"
                                type="number"
                                id="restaurant"
                                min={0}
                            />
                        </div>
                        <button className="smBox">Update</button>
                        {error && <span>error</span>}
                    </form>
                </div>
            </div>
            <div className="sideContainer">
                {images.map((image, index) => (
                    <img src={image} key={index} alt="" />
                ))}
                <UploadWidget
                    uwConfig={{
                        cloudName: "gulshankapse",
                        uploadPreset: "91sqft",
                        multiple: true,
                        folder: "Posts",
                    }}
                    setState={setImages}
                />
            </div>
        </div>
    );
}

export default AddpostPage;
