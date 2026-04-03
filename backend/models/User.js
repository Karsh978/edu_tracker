const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, default: "" },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  dob: { type: String, default: "" },
  profileImage: { type: String, default: "" },
  
  department: { type: String, default: "General" },
  bio: { type: String, default: "Hey there! I am using EduTrack." },
  profilePic: { type: String, default: "https://via.placeholder.com/150" },
    resetPasswordOTP: String,
  resetPasswordExpires: Date,
  role: { 
    type: String, 
    enum: ['Admin', 'Faculty', 'Student'], 
    default: 'Student' 
  }
}, { timestamps: true });
userSchema.index({ email: 1, role: 1 }); 





// models/User.js


userSchema.pre('save', async function () {
  
  if (!this.isModified('password')) {
    return; 
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error; 
  }
});
module.exports = mongoose.model('User', userSchema);