import "./loadinglist.scss";

function LoadingList() {
    return (
        <div className="loadingstyle">
            {[...Array(4)].map((_, index) => (
                <div className="loading-card" key={index}>
                    <div className="loading-image"></div>
                    <div className="loading-text">
                        <div className="loading-line title"></div>
                        <div className="loading-line address"></div>
                        <div className="loading-line price"></div>
                        <div className="loading-bottom">
                            <div className="loading-line feature">
                                <div className="feature"></div>
                                <div className="feature"></div>
                            </div>
                            <div className="loading-line icons">
                                <div className="icon">
                                    <div className="img"></div>
                                </div>
                                <div className="icon">
                                    <div className="img"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LoadingList;
