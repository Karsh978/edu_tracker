const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

// --- 1. Nodemailer Transporter Configuration (Render Friendly) ---
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  connectionTimeout: 10000, 
  greetingTimeout: 5000,
  socketTimeout: 10000,
  tls: {
    rejectUnauthorized: false 
  }
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

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'EduTrack Password Reset OTP',
      text: `Aapka password reset OTP hai: ${otp}. Ye sirf 10 minutes ke liye valid hai.`
    };

    // Nodemailer se email bhejie
    await transporter.sendMail(mailOptions);
    
    console.log("Email sent successfully!");
    res.json({ message: "OTP successfully sent to your email!" });

  } catch (error) {
    console.error("Nodemailer Detail Error:", error.message);
    res.status(500).json({ error: "Server busy. Could not send email: " + error.message });
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