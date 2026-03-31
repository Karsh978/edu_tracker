const Grade = require('../models/Grade');
const Attendance = require('../models/Attendance');

// 1. Student ke apne Grades fetch karna
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

// 2. Student ki apni Attendance fetch karna
exports.getMyAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.user.id })
      .populate('course', 'title courseCode');
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};