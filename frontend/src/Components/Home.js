import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { successhandle } from '../Errorhandle/toast';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function Home() {
  const navigate = useNavigate();
  const [loginsuccess, setLoginsuccess] = useState('');

  useEffect(() => {
    const loginuser = localStorage.getItem('loginuser');
    setLoginsuccess(loginuser);
  }, []);

  const logouthandle = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginuser'); // Properly remove the item
    successhandle("Logout Successfully");
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <>
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Dashboard</h2>
        <div className="card-body">
          {loginsuccess ? (
            <h4 className="text-center mb-4">Welcome, {loginsuccess}!</h4>
          ) : (
            <h4 className="text-center mb-4">Please log in</h4>
          )}
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger w-50"
              onClick={logouthandle}
            >
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
