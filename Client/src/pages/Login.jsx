import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:4000/login", credentials)
            .then((res) => {
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
                setErrorMessage(err?.response?.data?.message);
            });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onChange = (e) => {
        setCredentials((old) => ({ ...old, [e.target.name]: e.target.value }));
    };

    return (
        <div>
            
        <body className="login">
        <div className="app-container">
        <div className="title-container">
    <h1>The Sherpa Company Codes</h1>
    </div>
            <div className="login-container">
                <div className="login-box">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                type="email"
                                id="email"
                                value={credentials.email}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-container">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={credentials.password}
                                    onChange={onChange}
                                />
                                <span className="show-password" onClick={toggleShowPassword}>
                                    {showPassword ? "Hide" : "Show"}
                                </span>
                            </div>
                        </div>
                        {errorMessage && (
                            <div className="error-message">{errorMessage}</div>
                        )}
                        <button type="submit" className="submit-button">
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <div className="trademark-container">
                <p>© The Sherpa Codes 2023</p>
            </div>
        </div>
        </body>
        </div>

    );
}
