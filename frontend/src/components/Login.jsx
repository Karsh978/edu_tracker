import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import API from '../api'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Backend Login API call
     const res = await API.post('/auth/login', { email, password });
     
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('userName', res.data.user.name);

      alert("Login Success!");
     window.location.href = '/dashboard';  
    }  catch (err) {
  console.log("Full Error Object:", err); // Debugging ke liye
  alert("Login Failed: " + (err.response?.data?.message || "Server is waking up, please wait 30 seconds and try again."));
}
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    }}>

      {/* Decorative blurred circles */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)',
        top: '-150px',
        right: '-100px',
        filter: 'blur(2px)',
      }} />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)',
        bottom: '-100px',
        left: '-80px',
        filter: 'blur(2px)',
      }} />

      {/* Login Card */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        margin: '20px',
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '20px',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        padding: '48px 40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Logo / Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '8px',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 style={{
          color: '#f1f5f9',
          fontSize: '26px',
          fontWeight: '700',
          textAlign: 'center',
          margin: '16px 0 6px',
          letterSpacing: '-0.5px',
        }}>
          EduTrack
        </h2>
        <p style={{
          color: '#64748b',
          fontSize: '14px',
          textAlign: 'center',
          margin: '0 0 36px',
          fontWeight: '400',
        }}>
          Sign in to your account
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Email Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{
              color: '#94a3b8',
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '0.3px',
            }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.15)',
                borderRadius: '12px',
                color: '#f1f5f9',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(148, 163, 184, 0.15)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Password Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{
              color: '#94a3b8',
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '0.3px',
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(148, 163, 184, 0.15)',
                borderRadius: '12px',
                color: '#f1f5f9',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(148, 163, 184, 0.15)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              marginTop: '8px',
              width: '100%',
              padding: '13px',
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              border: 'none',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              letterSpacing: '0.3px',
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.25)';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Sign In
          </button>
         
        </form>

          <Link to="/forgot-password" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '600' ,marginTop:'18px'}}>
            Forgot password?
          </Link>
      <p style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', marginTop: '24px' }}>
          Don't have an account? {' '}
          <Link to="/register" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>
            Create one here
          </Link>
        </p>
     
         


        {/* Footer text */}
        <p style={{
          color: '#475569',
          fontSize: '12px',
          textAlign: 'center',
          marginTop: '28px',
        }}>
          © 2025 EduTrack. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;