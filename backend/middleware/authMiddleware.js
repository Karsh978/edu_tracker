const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1];
            // Use the exact secret from your .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "my_super_secret_key_123");
            req.user = decoded;
            next();
        } catch (error) {
            console.error("❌ JWT Error:", error.message);
            res.status(401).json({ message: "Invalid Token" });
        }
    } else {
        res.status(401).json({ message: "No token provided" });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        // Case-insensitive role check
        const userRole = req.user.role.toLowerCase();
        const allowedRoles = roles.map(r => r.toLowerCase());
        
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: `Role ${req.user.role} not authorized` });
        }
        next();
    };
};

module.exports = { protect, authorize };