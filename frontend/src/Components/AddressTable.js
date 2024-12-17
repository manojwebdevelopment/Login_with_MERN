import React, { useEffect, useState } from "react";
import axios from "axios";

function AddressTable() {
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);

  // Fetch addresses from the backend
  const fetchAddresses = async () => {
    const token = localStorage.getItem("token"); // Retrieve the token
    console.log("Token being sent:", token);

    if (!token) {
      setError("No token found. Please log in again.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/auth/address", {
        headers: {
          Authorization: `Bearer ${token}`, // Add "Bearer" before the token
        },
      });
      console.log("Addresses:", response.data);
      setAddresses(response.data); // Store fetched addresses in state
    } catch (error) {
      console.error("Error fetching addresses:", error.response?.data || error.message);
      setError("Failed to fetch addresses. Please try again later.");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {addresses.length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Address Type</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Postal Code</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address, index) => (
              <tr key={address._id}>
                <td>{index + 1}</td>
                <td>{address.addressType}</td>
                <td>{address.street}</td>
                <td>{address.city}</td>
                <td>{address.state}</td>
                <td>{address.postalCode}</td>
                <td>{address.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No addresses found.</p>
      )}
    </div>
  );
}

export default AddressTable;
