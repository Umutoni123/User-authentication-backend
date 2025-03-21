const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    console.log("🔹 Received Token:", token); // Debugging log

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔹 Decoded Token:", decoded); // Debugging log

        if (!decoded.userId) {
            return res.status(401).json({ message: "Invalid token: No user ID in payload" });
        }

        req.user = decoded; // Attach user to request
        next();
    } catch (error) {
        console.error("🔹 Token verification error:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
