import "./loadingchat.scss";

const LoadingChat = () => {
    return (
        <div className="chat-loading">
            <h1>Messages</h1>
            {[...Array(6)].map((_, index) => (
                <div className="loading-message" key={index}>
                    <div className="loading-avatar"></div>
                    <div className="loading-content">
                        <div className="loading-line name"></div>
                        <div className="loading-line message"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LoadingChat;
