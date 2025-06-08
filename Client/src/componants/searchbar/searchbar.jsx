import "./searchbar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

const types = ["Buy", "Rent"];

function SearchBar() {
    const [query, setQuery] = useState({
        type: "Buy",
        location: "",
        minPrice: 0,
        maxPrice: 0,
    });

    const switchType = (val) => {
        setQuery((prv) => ({ ...prv, type: val }));
    };

    const handleChange = (e) => {
        setQuery((prv) => ({ ...prv, [e.target.name]: e.target.value }));
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
            <form>
                <input
                    onChange={handleChange}
                    type="text"
                    name="city"
                    placeholder="City"
                />
                <input
                    onChange={handleChange}
                    type="number"
                    name="minPrice"
                    min={1000}
                    max={10000000}
                    placeholder="Min Price"
                />
                <input
                    onChange={handleChange}
                    type="number"
                    name="maxPrice"
                    min={1000}
                    max={10000000}
                    placeholder="Max Price"
                />
                <Link
                    to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
                >
                    <button>
                        <img src="/search.png" alt="" />
                    </button>
                </Link>
            </form>
        </div>
    );
}

export default SearchBar;
