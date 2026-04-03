// backend/utils/emailService.js
const nodemailer = require('nodemailer');

exports.sendGradeEmail = async (studentEmail, studentName, marks) => {
  console.log("🛠 Nodemailer is starting...");

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Check karo ye 16-digit App Password hi hai na?
    },
  });

  const mailOptions = {
    from: `"EduTrack Support" <${process.env.EMAIL_USER}>`,
    to: studentEmail,
    subject: 'EduTrack: New Marks Notification',
    text: `Hello ${studentName}, your marks have been updated to ${marks}.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully! Message ID:", info.messageId);
  } catch (err) {
    console.error("❌ Nodemailer Error Detail:", err.message);
  }
};