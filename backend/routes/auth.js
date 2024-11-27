const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const manoj = require('../models/user');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new manoj({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!,manoj was here' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
