import "./toplistings.scss";

function TopListings() {
    return (
        <div className="toplist">
            <div className="card">
                <div className="bg">
                    <img src="new.jpg" alt="" />
                </div>
                <div className="content">
                    <div className="head">
                        <span>Marina Heights</span>
                        <div className="rating">
                            <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                        </div>
                    </div>
                    <div className="address">
                        <span>Dubai Marina</span>
                    </div>
                    <div className="bottom">
                        <span className="price">1100$</span>
                        <button className="btn">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopListings;
