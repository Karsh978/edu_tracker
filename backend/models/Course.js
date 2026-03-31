const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseCode: { type: String, required: true, unique: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Faculty assigned to this course
  credits: { type: Number, default: 3 }
});
module.exports = mongoose.model('Course', courseSchema);