const mongoose = require('mongoose');
const gradeSchema = new mongoose.Schema({
  enrollment: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', required: true },
  marks: { type: Number, required: true },
  grade: { type: String } // A, B, C, etc.
});
module.exports = mongoose.model('Grade', gradeSchema);