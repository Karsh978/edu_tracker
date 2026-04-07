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
const upload = require('./middleware/uploadMiddleware');
const http = require('http');
const { Server } = require('socket.io');
const paymentController = require('./controllers/paymentController');




const app = express();
connectDB(); // Database call

// backend/app.js

app.use(cors({
  origin: "https://edu-tracker-rho.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));


//payment gatway

// backend/app.js mein ye path rakhein
app.post('/api/payment/create-order', protect, paymentController.createOrder);
app.post('/api/payment/verify', protect, paymentController.verifyPayment);
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

//forgot - reset -verify//
app.post('/api/auth/forgot-password', authController.forgotPassword);
app.post('/api/auth/verify-otp', authController.verifyOTP);
app.post('/api/auth/reset-password', authController.resetPassword);
app.get('/api/auth/me', protect, authController.getMe);
app.put('/api/student/profile', protect, studentController.updateProfile);
//profile 
app.put('/api/student/profile-picture', protect, upload.single('profileImage'), studentController.updateProfilePicture);
app.get('/api/auth/test', (req, res) => {
    res.send("Auth path is working!");
});


// email notification 
// ... existing imports ...
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
     origin: "https://edu-tracker-rho.vercel.app",
     }
});
app.set('socketio', io);

io.on('connection', (socket) => {
    console.log('✅ Socket Connected:', socket.id);
    socket.on('join_room', (userId) => {
        socket.join(userId);
        console.log(`👤 User joined room: ${userId}`);
    });
});

// Static folder and other routes...
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
// APP.LISTEN KO BADAL KAR SERVER.LISTEN KAREIN
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));