const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); // Render/IPv6 Fix

// Transporter global configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 1. REGISTER
exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User Registered" });
  } catch (err) { res.status(400).json({ error: err.message }); }
};

// 2. LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "123", { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } else { res.status(401).json({ message: "Invalid credentials" }); }
};

// 3. FORGOT PASSWORD (FIXED LOGIC)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Forgot password for:", email);

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No account found with this email" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    
    // IMPORTANT: Database mein save karne se pehle frontend ko response bhej dein
    // Taaki SMTP delays ki wajah se CORS Timeout na ho.
    res.status(200).json({ message: "Success! Check your email in 1 minute." });

    await user.save();

    // BACKGROUND MAIL SENDING
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'EduTrack Password Reset',
      text: `Your Reset OTP: ${otp}. Valid for 10 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.error("SMTP Error:", error);
        else console.log("Email Sent Success:", info.response);
    });

  } catch (error) {
    console.error("Critical Server Error:", error.message);
    if (!res.headersSent) res.status(500).json({ message: "Server error" });
  }
};

// 4. VERIFY OTP
exports.verifyOTP = async (req, res) => {
  const user = await User.findOne({ email: req.body.email, resetPasswordOTP: req.body.otp, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });
  res.json({ message: "Verified" });
};

// 5. RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email, resetPasswordOTP: req.body.otp });
  if (!user) return res.status(400).json({ message: "Failed" });
  user.password = req.body.newPassword;
  user.resetPasswordOTP = undefined;
  await user.save();
  res.json({ message: "Updated" });
};

// 6. ME
exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};