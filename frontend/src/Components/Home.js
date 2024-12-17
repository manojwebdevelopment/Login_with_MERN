import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { successhandle } from "../Errorhandle/toast";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import axios from "axios";
import AddAddress from "./AddAddress";
import AddressTable from "./AddressTable";

function Home() {
  const location = useLocation();
  let username = location?.state?.username;
  console.log("username = ", username);

  const navigate = useNavigate();
  const [loginsuccess, setLoginsuccess] = useState("");
  const [userEmail, setUserEmail] = useState("");

  async function getUser() {
    const token = localStorage.getItem("token");
    console.log("token from localstorage=", token);
    await axios
      .post(
        "http://localhost:5000/api/auth/verify",
        {},
        {
          headers: {
            "Content-Type": "application/json", // Specify the content type
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      )
      .then((response) => {
        console.log("response from backend=", response);
        setLoginsuccess(response.data.user_name);
        setUserEmail(response.data.user_email);
      });

    // username = response.data.name;
  }

  useEffect(() => {
    setLoginsuccess(username);
    getUser();
  }, [username]);

  const logouthandle = () => {
    localStorage.removeItem("token");
    successhandle("Logout Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div
          className="card shadow-lg p-4"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <h2 className="card-title text-center mb-4">Dashboard</h2>
          <div className="card-body">
            {loginsuccess ? (
              <>
                <h4 className="text-center mb-4">Welcome, {loginsuccess}!</h4>
                <h5 className="text-center mb-4">
                  Your Jehrili email is {userEmail}!
                </h5>

                {/* AddAddress Component */}
                <div className="mb-4">
                  <h5 className="text-center mb-3">Add New Address</h5>
                  <AddAddress />
                </div>

                {/* AddressTable Component */}
                <div>
                  <h5 className="text-center mb-3">Your Saved Addresses</h5>
                  <AddressTable />
                </div>
              </>
            ) : (
              <h4 className="text-center mb-4">Please log in</h4>
            )}
            <div className="d-flex justify-content-center">
              <button className="btn btn-danger w-50" onClick={logouthandle}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
