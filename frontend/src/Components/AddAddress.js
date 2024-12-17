import React, { useState } from 'react';
import axios from 'axios';

const AddAddress = () => {
  const [formData, setFormData] = useState({
    addressType: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token
      await axios.post('http://localhost:5000/api/auth/address', formData, {
        headers: { Authorization: `Bearer ${token}` }, // Add Bearer prefix
      });
      alert('Address added successfully');
    } catch (error) {
      console.error('Error adding address:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Address Type:</label>
      <input name="addressType" placeholder="Type" onChange={handleChange} required />
      <input name="street" placeholder="Street" onChange={handleChange} required />
      <input name="city" placeholder="City" onChange={handleChange} required />
      <input name="state" placeholder="State" onChange={handleChange} required />
      <input name="postalCode" placeholder="Postal Code" onChange={handleChange} required />
      <input name="country" placeholder="Country" onChange={handleChange} required />
      <button type="submit">Add Address</button>
    </form>
  );
};

export default AddAddress;
