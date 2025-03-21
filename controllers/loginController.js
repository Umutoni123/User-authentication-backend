const  User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log("🔹 Logged In User:", user);
        console.log("🔹 Generated Token:", token);

        res.json({ token });

    } catch (error) {
        console.error("🔹 Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
