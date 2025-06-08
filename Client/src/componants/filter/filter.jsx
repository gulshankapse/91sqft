import "./filter.scss";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Filter() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState({
        type: searchParams.get("type") || "",
        city: searchParams.get("city") || "",
        property: searchParams.get("property") || "",
        minPrice: searchParams.get("minPrice") || 0,
        maxPrice: searchParams.get("maxPrice") || 10000000,
        bedroom: searchParams.get("bedroom") || 1,
    });

    const handleChange = (e) => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value,
        });
    };

    const handleFilter = (e) => {
        setSearchParams(query);
    };

    return (
        <div className="filter">
            {/* <h1>Search result for <b>{searchParams.get("city")}</b></h1> */}
            <div className="filterContainer">
                <div className="top">
                    <div className="item">
                        <label htmlFor="type">Type</label>
                        <select
                            name="type"
                            id="type"
                            onChange={handleChange}
                            defaultValue={query.type}
                        >
                            <option value="">Select</option>
                            <option value="Buy">Buy</option>
                            <option value="Rent">Rent</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="property">Property</label>
                        <select
                            name="property"
                            id="property"
                            onChange={handleChange}
                            defaultValue={query.property}
                        >
                            <option value="">Select</option>
                            <option value="Apartment">Apartment</option>
                            <option value="House">House</option>
                            <option value="Villa"> Villa</option>
                            <option value="Townhouse">Townhouse</option>
                            <option value="Penthouse">Penthouse</option>
                            <option value="Duplex">Duplex</option>
                            <option value="Studio">Studio</option>
                            <option value="land">Bungalow</option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="minPrice">Min Price ₹</label>
                        <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            min={1000}
                            max={10000000}
                            placeholder="1000"
                            onChange={handleChange}
                            defaultValue={query.minPrice}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="maxPrice">Max Price ₹</label>
                        <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            min={1000}
                            max={10000000}
                            placeholder="1000"
                            onChange={handleChange}
                            defaultValue={query.maxPrice}
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="bedroom">Bedroom</label>
                        <input
                            type="text"
                            id="bedroom"
                            name="bedroom"
                            min={0}
                            max={10}
                            placeholder="0"
                            onChange={handleChange}
                            defaultValue={query.bedroom}
                        />
                    </div>
                </div>
                <div className="bottom">
                    <div className="bar">
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder=" City / Location"
                            onChange={handleChange}
                            defaultValue={query.city}
                        />
                        <button onClick={handleFilter}>
                            <img src="/search.png" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;
