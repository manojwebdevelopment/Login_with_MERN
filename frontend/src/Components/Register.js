import React, { useState } from "react";
import { errorhandle, successhandle } from "../Errorhandle/toast";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const Register = () => {
  const navigate = useNavigate();
  const [signupinfo, setSignupinfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changehandle = (e) => {
    const { name, value } = e.target;
    const copysigninfo = { ...signupinfo };
    copysigninfo[name] = value;
    setSignupinfo(copysigninfo);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = signupinfo;

    if (!username || !email || !password) {
      return errorhandle("All Fields Required!");
    }
    try {
      const url = "http://localhost:5000/api/auth/register";

      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(signupinfo),
      });

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        successhandle(message);
        setTimeout(() => {
          navigate("/login");
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
        <form onSubmit={handleRegister}>
          <h2 className="card-title text-center mb-4">Register</h2>
          <div className="form-group mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={signupinfo.username}
              onChange={changehandle}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={signupinfo.email}
              onChange={changehandle}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={signupinfo.password}
              onChange={changehandle}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <div className="text-center">
          <p>
            <span>Already signed up? </span>
            <button className="btn btn-link p-0" onClick={() => navigate('/login')}>
              Go to Login
            </button>
          </p>
        </div>
        </form>
      </div>
    </div>
      <ToastContainer />
    </>
  );
};

export default Register;
