const Grade = require('../models/Grade');

exports.addGrade = async (req, res) => {
  try {
    const { enrollmentId, marks } = req.body;

    // Logic: Marks se Grade nikaalne ke liye
    let gradeLetter = 'F';
    if (marks >= 90) gradeLetter = 'A+';
    else if (marks >= 80) gradeLetter = 'A';
    else if (marks >= 70) gradeLetter = 'B';
    else if (marks >= 60) gradeLetter = 'C';
    else if (marks >= 50) gradeLetter = 'D';

    // Check if grade already exists for this enrollment
    let gradeEntry = await Grade.findOne({ enrollment: enrollmentId });

    if (gradeEntry) {
      // Update existing grade
      gradeEntry.marks = marks;
      gradeEntry.grade = gradeLetter;
      await gradeEntry.save();
    } else {
      // Create new grade entry
      gradeEntry = await Grade.create({
        enrollment: enrollmentId,
        marks,
        grade: gradeLetter
      });
    }

    res.status(201).json({ message: "Grade saved successfully", gradeEntry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Student ke apne grades dekhne ke liye
exports.getMyGrades = async (req, res) => {
    try {
        // Hum enrollment ke through student ke grades nikaal sakte hain
        const grades = await Grade.find().populate({
            path: 'enrollment',
            match: { student: req.user.id }, // Sirf logged in student ke grades
            populate: { path: 'course', select: 'title courseCode' }
        });
        res.json(grades.filter(g => g.enrollment !== null));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};