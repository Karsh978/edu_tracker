const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

// --- 1. Nodemailer Transporter Configuration (Render Friendly) ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  pool: true
});

// --- 2. User Registration ---
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// --- 3. User Login ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || "my_super_secret_key_123",
        { expiresIn: '1d' }
      );
      res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- 4. Forgot Password (OTP Generation & Sending) ---
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Password Reset requested for:", email);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found with this email" });

    // 6-digit OTP Generate karein
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // OTP aur Expiry database mein save karein (10 mins valid)
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    console.log("OTP successfully saved in DB");
    res.status(200).json({ message: "Request received! If user exists, OTP will arrive shortly." });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'EduTrack OTP',
      text: `Your OTP is: ${otp}`
    };

    // Nodemailer se email bhejie
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.error("Email Error (Background):", error);
        else console.log("Email Sent Success (Background):", info.response);
    });

  } catch (error) {
    console.error("General Error:", error);
    if(!res.headersSent) {
        res.status(500).json({ error: "Something went wrong" });
    }
  }
};

// --- 5. Verify OTP ---
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: Date.now() } // Check if not expired
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

    res.json({ message: "OTP Verified! Proceed to reset password." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- 6. Get Current User Data ---
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- 7. Reset Password (Final Step) ---
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Request failed, please try again." });

    // Password Update karein
    user.password = newPassword; 
    // Reset fields ko clear karein
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save(); // User Model ka 'pre-save' hook automatically hash kar dega

    console.log("Password Reset complete for:", email);
    res.json({ message: "Password updated successfully! You can login now." });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};