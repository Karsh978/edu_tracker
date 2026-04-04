import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

/* ── 1. Helper Styles & Animations ── */
const injectStyles = () => {
  if (document.getElementById('rp-styles')) return;
  const s = document.createElement('style');
  s.id = 'rp-styles';
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
    @keyframes rpShake {
      0%,100%{transform:translateX(0)} 20%{transform:translateX(-7px)}
      40%{transform:translateX(7px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)}
    }
    @keyframes rpFadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes rpScaleIn { from{transform:scale(0.6);opacity:0} to{transform:scale(1);opacity:1} }
    @keyframes rpDraw { from { stroke-dashoffset: 60; } to { stroke-dashoffset: 0; } }
    @keyframes rpSpin { to { transform: rotate(360deg); } }
    .rp-shake { animation: rpShake 0.4s ease; }
    .rp-fadein { animation: rpFadeIn 0.35s ease forwards; }
  `;
  document.head.appendChild(s);
};

/* ── 2. Logic Constants ── */
const navy = {
  900: '#0d1f3c', 800: '#0f2850', 700: '#1a3a6b',
  600: '#1f4b8e', 500: '#2563c0', 200: '#b5ccf0',
  100: '#dce8fb', 50:  '#f0f5ff',
};

const getStrength = (pwd) => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 1) return { label: 'Weak', color: '#e53e3e', pct: 25 };
  if (score === 2) return { label: 'Fair', color: '#dd6b20', pct: 50 };
  if (score === 3) return { label: 'Good', color: '#d69e2e', pct: 75 };
  return { label: 'Strong', color: '#1a7a4a', pct: 100 };
};

const requirements = [
  { id: 'len', label: 'At least 8 characters', test: p => p.length >= 8 },
  { id: 'up',  label: 'One uppercase letter (A–Z)', test: p => /[A-Z]/.test(p) },
  { id: 'num', label: 'One number (0–9)', test: p => /[0-9]/.test(p) },
  { id: 'sym', label: 'One special character (!@#…)', test: p => /[^A-Za-z0-9]/.test(p) },
];

/* ── 3. Icons ── */
const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
);

/* ── 4. Component ── */
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ msg: '', type: '' });
  const [success, setSuccess] = useState(false);

  const newRef = useRef(null);
  const confirmRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => { injectStyles(); }, []);

  const strength = getStrength(newPassword);
  const reqs = requirements.map(r => ({ ...r, met: r.test(newPassword) }));
  const allReqsMet = reqs.every(r => r.met);
  const isMatch = newPassword && confirmPassword && newPassword === confirmPassword;
  const canSubmit = allReqsMet && isMatch && !loading;

  const shake = (ref) => {
    if (!ref.current) return;
    ref.current.classList.add('rp-shake');
    setTimeout(() => ref.current?.classList.remove('rp-shake'), 420);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!allReqsMet) { setStatus({ msg: 'Requirements not met', type: 'error' }); return; }
    if (!isMatch) { shake(confirmRef); setStatus({ msg: 'Passwords mismatch', type: 'error' }); return; }

    const email = localStorage.getItem('resetEmail');
    const otp = localStorage.getItem('resetOTP');

    setLoading(true);
    try {
       const res = await API.post('/auth/reset-password', { email, otp, newPassword });
      setSuccess(true);
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetOTP');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setStatus({ msg: err.response?.data?.message || 'Reset failed', type: 'error' });
      shake(newRef);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: navy[900], display: 'flex', 
      alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'DM Sans', sans-serif"
    }}>
      <div style={{
        background: '#fff', borderRadius: 20, padding: '40px', width: '100%', 
        maxWidth: 400, position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ textAlign: 'center', color: navy[900], marginBottom: '10px' }}>New Password</h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginBottom: '25px' }}>Ensure your account is secure.</p>

        <form onSubmit={handleReset}>
          {/* New Password */}
          <div ref={newRef} style={{ marginBottom: '15px', position: 'relative' }}>
            <input
              type={showNew ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${navy[200]}`, outline: 'none' }}
            />
            <button type="button" onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: '10px', top: '12px', border: 'none', background: 'none', cursor: 'pointer' }}>
              <EyeIcon open={showNew} />
            </button>
          </div>

          {/* Strength Meter */}
          {newPassword && (
            <div className="rp-fadein" style={{ marginBottom: '15px' }}>
              <div style={{ height: '4px', background: '#eee', borderRadius: '2px' }}>
                <div style={{ height: '100%', width: `${strength.pct}%`, background: strength.color, transition: '0.3s' }} />
              </div>
              <span style={{ fontSize: '12px', color: strength.color }}>{strength.label}</span>
            </div>
          )}

          {/* Confirm Password */}
          <div ref={confirmRef} style={{ marginBottom: '20px', position: 'relative' }}>
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${isMatch ? '#1a7a4a' : navy[200]}`, outline: 'none' }}
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: '10px', top: '12px', border: 'none', background: 'none', cursor: 'pointer' }}>
              <EyeIcon open={showConfirm} />
            </button>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              width: '100%', padding: '14px', borderRadius: '8px', border: 'none', 
              background: canSubmit ? navy[700] : '#ccc', color: 'white', fontWeight: '600', cursor: canSubmit ? 'pointer' : 'not-allowed'
            }}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        {status.msg && <p style={{ color: '#e53e3e', fontSize: '13px', textAlign: 'center', marginTop: '10px' }}>{status.msg}</p>}

        {/* Success Overlay */}
        {success && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.95)', 
            borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10
          }}>
            <div style={{ width: '60px', height: '60px', background: '#1a7a4a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style={{ color: navy[900] }}>Success!</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;