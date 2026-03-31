const Enrollment = require('../models/Enrollment');

exports.enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // Check if already enrolled
    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) return res.status(400).json({ message: "Already enrolled in this course" });

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId
    });

    res.status(201).json({ message: "Student enrolled successfully", enrollment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all enrollments (For Admin/Faculty)
exports.getEnrollments = async (req, res) => {
    try {
        const data = await Enrollment.find()
            .populate('student', 'name email')
            .populate('course', 'title courseCode');
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};