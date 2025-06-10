import { Link, useNavigate } from "react-router-dom";
import "./registerPage.scss";
import axios from "axios";
import { useState } from "react";

function RegisterPage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.target);

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        console.log(username, email, password);

        try {
            const res = await axios.post(
                `${API_URL}/register`,
                { username, email, password },
                { withCredentials: true },
            );
            if (res.status === 200) {
                console.log("Navigation triggered"); // Debugging log
                navigate("/login");
            }
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="register">
            <div className="wrapper">
                <div className="left">
                    <h1>
                        Create an
                        <br />
                        Account
                    </h1>
                    <p>
                        Enter your personal details <br />
                        and start your journey with us!"
                    </p>
                </div>
                <div className="right">
                    <form onSubmit={handleSubmit}>
                        <div className="inputclass">
                            <img src="/user.png" alt="" />
                            <input
                                name="username"
                                type="text"
                                placeholder="Username"
                            />
                        </div>
                        <div className="inputclass">
                            <img src="/email.png" alt="" />
                            <input
                                name="email"
                                type="text"
                                placeholder="Email"
                            />
                        </div>
                        <div className="inputclass">
                            <img src="/password.png" alt="" />
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <button disabled={isLoading} type="submit">
                            Register
                        </button>
                        {error && <span>{error}</span>}
                        <Link to="/login">Do you have an account?</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
