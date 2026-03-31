require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authController = require('./controllers/authController');
const courseController = require('./controllers/courseController');
const { protect, authorize } = require('./middleware/authMiddleware');
const enrollmentController = require('./controllers/enrollmentController');
const gradeController =require('./controllers/gradeController');
const attendanceController = require('./controllers/attendanceController');
const reportController = require('./controllers/reportController');
const studentController =require('./controllers/studentController');

const app = express();
connectDB(); // Database call

app.use(cors());
app.use(express.json());

//see only logged user //
app.get('/api/courses', protect, courseController.getAllCourses);
// only admin can create course //
app.post('/api/courses', protect, authorize('Admin'), courseController.createCourse);
// 1. Admin/Faculty can enroll a student
app.post('/api/enroll', protect, authorize('Admin', 'Faculty'), enrollmentController.enrollStudent);
// 2. View all enrollments
app.get('/api/enroll', protect, enrollmentController.getEnrollments);

//only admin and faculty insert the marks
app.post('/api/grades',protect,authorize('Admin','faculty'),
  gradeController.addGrade
);

//see marks the student
app.get('/api/grades/my', protect, gradeController.getMyGrades);

//attendance routes
 app.post('/api/attendance',protect,authorize('Admin','faculty'),
 attendanceController.markAttendance
);

app.get('/api/attendance/:studentId',protect,attendanceController.getAttendanceReport);

//report all data
app.get('/api/reports/all', protect, authorize('Admin'), reportController.getFullReport);

//student view data //
app.get('/api/student/my-grades',protect,studentController.getMyGrades);
app.get('/api/student/my-attendance',protect,studentController.getMyAttendance);

// Auth Routes
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));