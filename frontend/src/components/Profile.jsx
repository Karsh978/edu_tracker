import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '', mobile: '', gender: 'Male', dob: '', bio: '', department: '', profileImage: ''
  });
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');

  // 1. Page load par data fetch karein
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const userData = res.data;
        if (userData.dob) {
          userData.dob = new Date(userData.dob).toISOString().split('T')[0];
        }
        setFormData(prev => ({ ...prev, ...userData })); 
      } catch (err) {
        console.error("Load Error:", err.response?.data);
      }
    }; 
    fetchProfile();
  }, [token]);

  // 2. Photo Upload Function
  const uploadPhoto = async () => {
    if (!file) return alert("Pehle file select karein!");

    const data = new FormData();
    data.append('profileImage', file);

    try {
      const res = await axios.put('http://localhost:5000/api/student/profile-picture', data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` 
        }
      });
      setFormData(prev => ({ ...prev, profileImage: res.data.imageUrl }));
      alert("Photo Updated! 📸");
    } catch (err) {
      console.error("Upload Error:", err.response?.data);
      alert("Upload Failed!");
    }
  };

  // 3. Profile Details Update (Name, DOB, etc.)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/student/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Profile Info Updated Successfully! 🎉");
      localStorage.setItem('userName', res.data.name);
    } catch (err) {
      console.error("Update Error:", err.response?.data);
      alert("Update Failed!");
    }
  };

  return (
    <div style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
      <h2 style={{ borderBottom: '2px solid #f4f4f4', paddingBottom: '10px', marginBottom: '20px' }}>Personal Information</h2>
      
      {/* --- IMAGE SECTION --- */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ marginBottom: '15px' }}>
          <img 
            src={formData.profileImage ? `http://localhost:5000${formData.profileImage}` : 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
            alt="Profile"
            style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #1a73e8' }} 
            onError={(e) => { e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'; }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{fontSize: '12px'}} />
          <button onClick={uploadPhoto} type="button" style={{ background: '#10B981', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
            Upload Photo
          </button>
        </div>
      </div>

      {/* --- DETAILS FORM --- */}
      <form onSubmit={handleUpdate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={labelStyle}>Full Name</label>
          <input type="text" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} style={inputStyle} required />
        </div>
        
        <div>
          <label style={labelStyle}>Mobile Number</label>
          <input type="text" value={formData.mobile} onChange={(e)=>setFormData({...formData, mobile:e.target.value})} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Gender</label>
          <select value={formData.gender} onChange={(e)=>setFormData({...formData, gender:e.target.value})} style={inputStyle}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Date of Birth</label>
          <input type="date" value={formData.dob} onChange={(e)=>setFormData({...formData, dob:e.target.value})} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Department</label>
          <input type="text" value={formData.department} onChange={(e)=>setFormData({...formData, department:e.target.value})} style={inputStyle} />
        </div>

        <div style={{ gridColumn: '1 / 3' }}>
          <label style={labelStyle}>Bio / About Me</label>
          <textarea value={formData.bio} onChange={(e)=>setFormData({...formData, bio:e.target.value})} style={{...inputStyle, height: '80px'}}></textarea>
        </div>

        <button type="submit" style={{ gridColumn: '1 / 3', background: '#1a73e8', color: '#fff', padding: '14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}>
          Update My Profile
        </button>
      </form>
    </div>
  );
};

const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333', fontSize: '14px' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' };

export default Profile;