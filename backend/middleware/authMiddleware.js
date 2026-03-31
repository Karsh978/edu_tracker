
console.log("LOG: Middleware is being hit!"); // <--- Ye line add karein
const jwt = require('jsonwebtoken');

// Token verify karne ke liye
const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1];const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  // DEBUG: Check if Secret is loading
  console.log("JWT Secret from Env:", process.env.JWT_SECRET); 

  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1];
      
      // DEBUG: Check the token being received
   // Change this line (Temporary)
console.log("LOG: Middleware check shuru..."); // Ye log terminal mein aana chahiye
const decoded = jwt.verify(token, "JIVAN123"); // <-- Direct string likhein
      req.user = decoded;
      next();
    } catch (error) {
      // YE LINE ZAROORI HAI: Terminal mein check karein kya error hai
      console.error("JWT Verification Error:", error.message); 
      res.status(401).json({ message: "Not authorized, token failed", detail: error.message });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};
      const decoded = jwt.verify(token, "MY_SECRET_KEY_123"); 
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

// Role check karne ke liye (Admin/Faculty/Student)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role ${req.user.role} is not allowed to access this` });
    }
    next();
  };
};


module.exports = { protect, authorize };