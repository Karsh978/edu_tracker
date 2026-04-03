const Grade = require('../models/Grade');
const Attendance = require('../models/Attendance');
const User = require('../models/User');

// 1. fetch student grade
exports.getMyGrades = async (req, res) => {
  try {
    const grades = await Grade.find().populate({
      path: 'enrollment',
      match: { student: req.user.id }, // Sirf logged-in student ka data
      populate: { path: 'course', select: 'title courseCode' }
    });
    // Filter out null enrollments
    res.json(grades.filter(g => g.enrollment !== null));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2fetch student attendance
exports.getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.user.id })
      .populate('course', 'title courseCode');
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update profile 
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { name, email, mobile }, 
      { new: true } 
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Profile Update API


exports.updateProfile = async (req, res) => {
  try {
    const { name, mobile, gender, dob, bio, department } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, mobile, gender, dob, bio, department },
      { new: true, runValidators: true } 
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User Updated:", updatedUser.name);
    res.json(updatedUser);
  } catch (error) {
    console.error("Backend Update Error:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//profile img //
// --- Inside backend/controllers/studentController.js ---

exports.updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // This creates the relative path: /uploads/12345-timestamp.jpg
    const imageUrl = `/uploads/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imageUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile picture updated successfully!",
      imageUrl: user.profileImage
    });
  } catch (error) {
    console.error("Upload Controller Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};