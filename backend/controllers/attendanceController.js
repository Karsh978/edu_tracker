const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  try {
    const { studentId, courseId, status } = req.body; // status: 'Present' or 'Absent'

    const attendance = await Attendance.create({
      student: studentId,
      course: courseId,
      status,
      date: new Date()
    });

    res.status(201).json({ message: "Attendance Marked!", attendance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// total student attendance report
exports.getAttendanceReport = async (req, res) => {
  try {
    const report = await Attendance.find({ student: req.params.studentId })
      .populate('course', 'title');
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};