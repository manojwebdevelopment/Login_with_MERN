import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
            setMessage(res.data.message);
            console.log("res=",res);
            
        } catch (error) {
            setMessage(error.response.data.error || 'Something went wrong');
        }
    };

   async function handleclick(){
        const help = await axios.get('http://localhost:5000/health');
            console.log(help);
            
    };

    return (
        <>
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
        <button onClick={handleclick}>Click Here</button>
        </>
    );
};

export default Register;
