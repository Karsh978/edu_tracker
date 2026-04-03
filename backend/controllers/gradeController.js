const Grade = require('../models/Grade');
const User = require('../models/User');
const { sendGradeEmail } = require('../utils/emailService');

exports.addGrade = async (req, res) => {
    try {
        const studentId = req.body.studentId || req.body.student; 
        const { enrollmentId, marks } = req.body;
        console.log("📩 Received Student ID:", studentId);
        
        
        let gradeLetter = marks >= 90 ? 'A+' : marks >= 80 ? 'A' : marks >= 70 ? 'B' : marks >= 60 ? 'C' : 'F';

        const gradeEntry = await Grade.findOneAndUpdate(
            { enrollment: enrollmentId },
            { marks, grade: gradeLetter, student: studentId },
            { new: true, upsert: true }
        );

        // Real-time Notification
        const io = req.app.get('socketio');
        if (io) {
            io.to(studentId).emit('new_marks', { marks, grade: gradeLetter });
        }
        if (!studentId) {
            return res.status(400).json({ error: "Student ID missing from request" });
        }

        // Email Notification
       const student = await User.findById(studentId);
        if (!student) {
            console.log("❌ Error: Student not found in Database");
        } else {
            console.log("📧 Student Email found:", student.email);
            // Email bhejte waqt await lagana zaroori hai
            await sendGradeEmail(student.email, student.name, marks);
            console.log("🚀 sendGradeEmail function called!");
        }

    res.status(201).json({ message: "Grade Updated" });
    } catch (error) {
        console.error("❌ Controller Error:", error.message);
        res.status(400).json({ error: error.message });
    }
};

exports.getMyGrades = async (req, res) => {
  try {
    const grades = await Grade.find().populate({
      path: 'enrollment',
      match: { student: req.user.id },
      populate: { path: 'course', select: 'title courseCode' }
    });
    res.json(grades.filter(g => g.enrollment !== null));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};