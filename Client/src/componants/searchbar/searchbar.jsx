import "./searchbar.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const types = ["Buy", "Rent"];

function SearchBar() {
    const navigate = useNavigate();
    const [query, setQuery] = useState({
        type: "Buy",
        location: "",
        minPrice: "",
        maxPrice: "",
    });

    const switchType = (val) => {
        setQuery((prv) => ({ ...prv, type: val }));
    };

    const handleChange = (e) => {
        setQuery((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.city || !query.minPrice || !query.maxPrice) {
            alert("Please fill in all fields.");
            return;
        }

        navigate(
            `/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}&bedrooms=any`,
        );
    };

    return (
        <div className="searchBar">
            <div className="type">
                {types.map((type) => (
                    <button
                        key={type}
                        onClick={() => switchType(type)}
                        className={query.type === type ? "active" : ""}
                    >
                        {type}
                    </button>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                />
                <input
                    onChange={handleChange}
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    required
                />
                <input
                    onChange={handleChange}
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    required
                />
                <div className="btn">
                    <button>
                        <img src="search.png" alt="" />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;
