const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        // MUST match process.env.JWT_SECRET
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET || "my_super_secret_key_123", 
            { expiresIn: '1d' }
        );
        res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } else {
        res.status(401).json({ message: "Invalid Credentials" });
    }
};

// 1. FORGOT PASSWORD (OTP Bhejna)
// controllers/authController.js ke andar change karein:

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Forgot Password Request for:", email);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    console.log("OTP Generated and Saved:", otp);



const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  }
});

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}`
    };

    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log("Nodemailer Error:", error);
          return res.status(500).json({ message: "Mail sending failed", error: error.message });
      } else {
          console.log("Email sent: " + info.response);
          res.json({ message: "OTP sent to your email!" });
      }
    });

  } catch (error) {
    console.error("General Error:", error);
    res.status(500).json({ error: error.message });
  }
};
// 2. VERIFY OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ 
    email, 
    resetPasswordOTP: otp, 
    resetPasswordExpires: { $gt: Date.now() } 
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

  res.json({ message: "OTP Verified! You can now reset your password." });
};


// controllers/authController.js ke andar
// controllers/authController.js ke andar niche ye add karein:

// controllers/authController.js ke andar:
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. RESET PASSWORD (New Password Save)
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ 
    email, 
    resetPasswordOTP: otp, 
    resetPasswordExpires: { $gt: Date.now() } 
  });

  if (!user) return res.status(400).json({ message: "Request failed, try again." });

  // Naya password hash karke save karein
  user.password = newPassword; // Pre-save hook apne aap hash kar dega
  user.resetPasswordOTP = undefined; // OTP clear kar dein
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Password updated successfully!" });
};