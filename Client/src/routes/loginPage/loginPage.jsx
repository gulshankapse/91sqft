import { Link, useNavigate } from "react-router-dom";
import "./loginPage.scss";
import axios from "axios";
import { useContext, useState } from "react";
import { authContext } from "../../context/authContext";

function LoginPage() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { updateUser } = useContext(authContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.target);

        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const res = await axios.post(
                "http://localhost:8800/login",
                { username, password },
                { withCredentials: true },
            );
            updateUser(res.data);
            setError("");
            navigate("/");
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="login">
            <div className="wrapper">
                <div className="left">
                    <h1>
                        Welcome
                        <br />
                        Back
                    </h1>
                    <p>
                        To stay connected with us,
                        <br />
                        please enter your personal <br />
                        details and log in
                    </p>
                </div>
                <div className="right">
                    <form onSubmit={handleSubmit}>
                        <div className="inputclass">
                            <img src="/user.png" alt="" />
                            <input
                                name="username"
                                required
                                minLength={5}
                                maxLength={15}
                                type="text"
                                placeholder="Username"
                            />
                        </div>
                        <div className="inputclass">
                            <img src="/password.png" alt="" />
                            <input
                                name="password"
                                required
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <button disabled={isLoading}>Login</button>
                        {error && <span>{error}</span>}
                        <Link to="/register">
                            {"Don't"} you have an account?
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
