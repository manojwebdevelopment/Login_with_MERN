const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userdata = require("../models/user");
const address = require("../models/address");
const authMiddleware=require("../routes/authMiddleware");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log('Request Body:', req.body);
    const newUser = new userdata({ username, email, password });
    // console.log(newUser);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully!", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log('Request body:', req.body); // Debugging

    const user = await userdata.findOne({ email });
    // console.log('User found:', user); // Debugging

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found!", success: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({
      token,
      username: user.username,
      email,
      message: "login Successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error:", error); // Debugging
    res
      .status(500)
      .json({ message: "Internal server problem", success: false });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"]; // Get the Authorization header
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token (remove "Bearer")
    if (!token) {
      return res.status(401).json({ message: "Malformed token" });
    }
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    console.log("response from jwt verify=",userId);
    const user_id = userId.id;
    const name = await userdata.findById(user_id);
    res.status(200).json({ user_name: name.username, user_email: name.email });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/address", authMiddleware, async (req, res) => {
  try {
    const { addressType, street, city, state, postalCode, country } = req.body;

    const newAddress = new address({
      userId: req.userdata.id, // Retrieved from authMiddleware
      addressType,
      street,
      city,
      state,
      postalCode,
      country,
    });

    await newAddress.save();
    res.status(201).json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({ message: "Error saving address", error });
  }
});


router.get('/address', authMiddleware, async (req, res) => {
  try {
    console.log("User ID from middleware:", req.userdata.id); // Debugging
    const addresses = await address.find({ userId: req.userdata.id });
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error); // Debugging
    res.status(500).json({ message: 'Error fetching addresses', error });
  }
});


module.exports = router;
