import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { errorhandle, successhandle } from "../Errorhandle/toast";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const changehandle = (e) => {
    const { name, value } = e.target;
    setLogin((previous) => ({ ...previous, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/auth/login";

      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(login),
      });
      const result = await response.json();
      const { success, message, token, username } = result;
      if (success) {
        successhandle(message);
        localStorage.setItem("token", token);
        localStorage.setItem("loginuser", username);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        errorhandle(message);
      }
    } catch (err) {
      errorhandle(err.message);
    }
  };

  return (
    <>
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <form onSubmit={handleLogin}>
          <h2 className="card-title text-center mb-4">Login</h2>
          <div className="form-group mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={login.email}
              onChange={changehandle}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={login.password}
              onChange={changehandle}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
        </form>
        <div className="text-center">
          <p>
            <span>New user? </span>
            <button className="btn btn-link p-0" onClick={() => navigate('/signup')}>
              Go to Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
      <ToastContainer />
    </>
  );
};

export default Login;
