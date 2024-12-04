const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userdata = require('../models/user');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // console.log('Request Body:', req.body);
        const newUser = new userdata({ username, email, password });
        console.log(newUser);
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!',success: true });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error',success: false });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Request body:', req.body); // Debugging

        const user = await userdata.findOne({email});
        console.log('User found:', user); // Debugging

        if (!user) return res.status(404).json({ message: 'User not found!', success: false });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials', success: false });

        const token = jwt.sign({ id: user._id ,email:user.email}, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ token, username: user.username,email ,message:"login Successfully",success:true});
    } catch (error) {
        console.error('Error:', error); // Debugging
        res.status(500).json({ message: 'Internal server problem', success: false });
    }
});


module.exports = router;
