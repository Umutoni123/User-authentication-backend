
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")



exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id.toString() }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("🔹 Registered User:", newUser);
        console.log("🔹 Generated Token:", token);

        res.status(201).json({ message: "User successfully registered", token });

    } catch (error) {
        console.error("🔹 Registration Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords for security
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
  };