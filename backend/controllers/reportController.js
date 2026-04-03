const Enrollment = require('../models/Enrollment');
const Grade = require('../models/Grade');

exports.getFullReport = async (req, res) => {
  try {
    //join
    const reports = await Grade.find()
      .populate({
        path: 'enrollment',
        populate: [
          { path: 'student', select: 'name email' },
          { path: 'course', select: 'title courseCode' }
        ]
      });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};