const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    console.log("🔹 Incoming Headers:", req.headers); // Check if Authorization header exists

    const authHeader = req.header('Authorization');
    if (!authHeader) {
        console.log("🔹 No Authorization Header Found");
        return res.status(401).json({ message: "Access Denied. No token provided" });
    }

    const token = authHeader.split(' ')[1];
    console.log("🔹 Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔹 Decoded Token:", decoded);

        if (!decoded.userId) {
            return res.status(401).json({ message: "Invalid token: No user ID in payload" });
        }

        req.user = decoded; 
        console.log("🔹 Attached User to Request:", req.user);
        next();

    } catch (error) {
        console.error("🔹 Token Verification Error:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
