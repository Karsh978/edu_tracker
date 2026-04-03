import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .edu-register-root {
    min-height: 100vh;
    background: #0a0a0f;
    display: flex;
    align-items: stretch;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    position: relative;
  }

  /* Animated background grid */
  .edu-bg-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridShift 20s linear infinite;
    z-index: 0;
  }
  @keyframes gridShift {
    0%   { transform: translate(0,0); }
    100% { transform: translate(60px,60px); }
  }

  /* Floating orbs */
  .edu-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.18;
    animation: orbFloat var(--dur,12s) ease-in-out infinite alternate;
    z-index: 0;
    pointer-events: none;
  }
  .edu-orb-1 { width:420px; height:420px; background:#6366f1; top:-100px; left:-100px; --dur:14s; }
  .edu-orb-2 { width:320px; height:320px; background:#06b6d4; bottom:-80px; right:10%; --dur:11s; }
  .edu-orb-3 { width:200px; height:200px; background:#8b5cf6; top:40%; left:55%; --dur:9s; }
  @keyframes orbFloat {
    0%   { transform: translate(0,0) scale(1); }
    100% { transform: translate(30px,40px) scale(1.08); }
  }

  /* LEFT PANEL */
  .edu-left {
    flex: 0 0 42%;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px 52px;
    border-right: 1px solid rgba(255,255,255,0.05);
  }

  .edu-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 64px;
    animation: fadeSlideDown 0.7s ease both;
  }
  .edu-brand-icon {
    width: 42px; height: 42px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    box-shadow: 0 0 24px rgba(99,102,241,0.4);
  }
  .edu-brand-name {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    color: #fff;
    letter-spacing: -0.02em;
  }
  .edu-brand-name span { color: #818cf8; }

  .edu-tagline {
    animation: fadeSlideDown 0.7s 0.1s ease both;
  }
  .edu-tagline h1 {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 3.2vw, 2.8rem);
    color: #fff;
    line-height: 1.12;
    letter-spacing: -0.03em;
    margin-bottom: 18px;
  }
  .edu-tagline h1 em {
    font-style: normal;
    background: linear-gradient(90deg, #818cf8, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .edu-tagline p {
    color: rgba(255,255,255,0.45);
    font-size: 0.95rem;
    line-height: 1.65;
    max-width: 320px;
  }

  /* Feature pills */
  .edu-features {
    margin-top: 52px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .edu-feature-item {
    display: flex;
    align-items: center;
    gap: 14px;
    animation: fadeSlideUp 0.6s ease both;
  }
  .edu-feature-item:nth-child(1) { animation-delay: 0.3s; }
  .edu-feature-item:nth-child(2) { animation-delay: 0.45s; }
  .edu-feature-item:nth-child(3) { animation-delay: 0.6s; }
  .edu-feature-dot {
    width: 36px; height: 36px; flex-shrink: 0;
    border-radius: 10px;
    background: rgba(99,102,241,0.15);
    border: 1px solid rgba(99,102,241,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .edu-feature-text strong {
    display: block;
    color: rgba(255,255,255,0.85);
    font-size: 0.88rem;
    font-weight: 500;
  }
  .edu-feature-text span {
    color: rgba(255,255,255,0.35);
    font-size: 0.8rem;
  }

  /* RIGHT PANEL */
  .edu-right {
    flex: 1;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 32px;
  }

  .edu-card {
    width: 100%;
    max-width: 440px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    padding: 44px 40px 40px;
    backdrop-filter: blur(20px);
    box-shadow: 0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.08);
    animation: cardReveal 0.8s cubic-bezier(0.22,1,0.36,1) both;
    position: relative;
    overflow: hidden;
  }
  .edu-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent);
  }
  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(30px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .edu-card-header {
    margin-bottom: 32px;
    animation: fadeSlideDown 0.6s 0.2s ease both;
  }
  .edu-step-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 0.72rem;
    font-weight: 500;
    color: #818cf8;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .edu-step-badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #818cf8;
    animation: pulse 1.8s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.7); }
  }
  .edu-card-header h2 {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1.65rem;
    color: #fff;
    letter-spacing: -0.02em;
    margin-bottom: 6px;
  }
  .edu-card-header p {
    color: rgba(255,255,255,0.4);
    font-size: 0.85rem;
  }

  /* Role selector tabs */
  .edu-role-tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 26px;
    animation: fadeSlideUp 0.5s 0.35s ease both;
  }
  .edu-role-tab {
    padding: 9px 6px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    color: rgba(255,255,255,0.4);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.22s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .edu-role-tab:hover {
    border-color: rgba(99,102,241,0.35);
    color: rgba(255,255,255,0.7);
    background: rgba(99,102,241,0.08);
  }
  .edu-role-tab.active {
    border-color: #6366f1;
    background: rgba(99,102,241,0.18);
    color: #a5b4fc;
    box-shadow: 0 0 16px rgba(99,102,241,0.2);
  }
  .edu-role-tab .role-icon { font-size: 18px; }

  /* Form fields */
  .edu-field {
    margin-bottom: 18px;
    animation: fadeSlideUp 0.5s ease both;
  }
  .edu-field:nth-child(1) { animation-delay: 0.4s; }
  .edu-field:nth-child(2) { animation-delay: 0.48s; }
  .edu-field:nth-child(3) { animation-delay: 0.56s; }

  .edu-field label {
    display: block;
    font-size: 0.78rem;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 7px;
  }
  .edu-input-wrap {
    position: relative;
  }
  .edu-input-icon {
    position: absolute;
    left: 14px; top: 50%; transform: translateY(-50%);
    color: rgba(255,255,255,0.25);
    font-size: 16px;
    pointer-events: none;
    transition: color 0.2s;
  }
  .edu-input-wrap:focus-within .edu-input-icon {
    color: #818cf8;
  }
  .edu-input {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 12px 14px 12px 42px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    color: #fff;
    outline: none;
    transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
    -webkit-appearance: none;
  }
  .edu-input::placeholder { color: rgba(255,255,255,0.2); }
  .edu-input:focus {
    border-color: rgba(99,102,241,0.6);
    background: rgba(99,102,241,0.07);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
  }
  .edu-input.error {
    border-color: rgba(239,68,68,0.5);
    box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
  }

  /* Password strength bar */
  .edu-strength-bar {
    margin-top: 8px;
    height: 3px;
    background: rgba(255,255,255,0.07);
    border-radius: 99px;
    overflow: hidden;
  }
  .edu-strength-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 0.4s ease, background 0.4s ease;
  }
  .edu-strength-label {
    font-size: 0.7rem;
    color: rgba(255,255,255,0.3);
    margin-top: 4px;
    text-align: right;
  }

  /* Submit button */
  .edu-submit {
    width: 100%;
    margin-top: 6px;
    padding: 14px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: 0.01em;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
    box-shadow: 0 8px 24px rgba(99,102,241,0.35);
    animation: fadeSlideUp 0.5s 0.7s ease both;
  }
  .edu-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(99,102,241,0.45);
  }
  .edu-submit:active:not(:disabled) { transform: translateY(0); }
  .edu-submit:disabled { opacity: 0.6; cursor: not-allowed; }
  .edu-submit::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .edu-submit:hover::after { opacity: 1; }

  /* Spinner */
  .edu-spinner {
    display: inline-block;
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 8px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .edu-login-link {
    text-align: center;
    margin-top: 22px;
    font-size: 0.84rem;
    color: rgba(255,255,255,0.35);
    animation: fadeSlideUp 0.5s 0.8s ease both;
  }
  .edu-login-link a {
    color: #818cf8;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
  }
  .edu-login-link a:hover { color: #a5b4fc; }

  /* Toast notification */
  .edu-toast {
    position: fixed;
    top: 28px; right: 28px;
    padding: 14px 20px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;
    z-index: 999;
    display: flex; align-items: center; gap: 10px;
    animation: toastIn 0.35s cubic-bezier(0.22,1,0.36,1) both;
    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    max-width: 320px;
  }
  .edu-toast.success {
    background: rgba(16,185,129,0.15);
    border: 1px solid rgba(16,185,129,0.35);
    color: #6ee7b7;
  }
  .edu-toast.error {
    background: rgba(239,68,68,0.12);
    border: 1px solid rgba(239,68,68,0.3);
    color: #fca5a5;
  }
  .edu-toast.hide { animation: toastOut 0.3s ease forwards; }
  @keyframes toastIn  { from { opacity:0; transform: translateX(40px); } to { opacity:1; transform: translateX(0); } }
  @keyframes toastOut { from { opacity:1; transform: translateX(0); } to { opacity:0; transform: translateX(40px); } }

  /* Shared keyframes */
  @keyframes fadeSlideDown {
    from { opacity:0; transform: translateY(-18px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes fadeSlideUp {
    from { opacity:0; transform: translateY(18px); }
    to   { opacity:1; transform: translateY(0); }
  }

  /* Divider */
  .edu-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 22px 0 20px;
    animation: fadeSlideUp 0.5s 0.65s ease both;
  }
  .edu-divider-line { flex:1; height:1px; background: rgba(255,255,255,0.07); }
  .edu-divider span { font-size: 0.75rem; color: rgba(255,255,255,0.2); white-space: nowrap; }

  /* Progress dots */
  .edu-progress {
    display: flex; gap: 6px; justify-content: center; margin-bottom: 28px;
    animation: fadeSlideDown 0.5s 0.25s ease both;
  }
  .edu-prog-dot {
    width: 6px; height: 6px; border-radius: 99px;
    background: rgba(255,255,255,0.12);
    transition: all 0.3s ease;
  }
  .edu-prog-dot.active { width: 22px; background: #6366f1; }

  @media (max-width: 768px) {
    .edu-left { display: none; }
    .edu-right { padding: 24px 16px; }
    .edu-card { padding: 32px 24px 28px; }
  }
`;

const ROLES = [
  { value: 'Student', icon: '🎓', label: 'Student' },
  { value: 'Faculty', icon: '🏫', label: 'Faculty' },
  { value: 'Admin',   icon: '⚙️',  label: 'Admin'   },
];

const getStrength = (pw) => {
  if (!pw) return { w: 0, color: 'transparent', label: '' };
  let s = 0;
  if (pw.length >= 6)  s++;
  if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map = [
    null,
    { w: '20%', color: '#ef4444', label: 'Very weak' },
    { w: '40%', color: '#f97316', label: 'Weak' },
    { w: '60%', color: '#eab308', label: 'Fair' },
    { w: '80%', color: '#22c55e', label: 'Strong' },
    { w: '100%', color: '#10b981', label: 'Very strong' },
  ];
  return map[s] || { w: '20%', color: '#ef4444', label: 'Very weak' };
};

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Student' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(t => t ? { ...t, hide: true } : null), 2800);
    setTimeout(() => setToast(null), 3200);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      showToast('Registration successful! Redirecting…', 'success');
      setTimeout(() => navigate('/login'), 1600);
    } catch (err) {
      showToast('Registration failed: ' + (err.response?.data?.error || 'Error'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const strength = getStrength(formData.password);
  const activeStep = formData.name && formData.email && formData.password ? 2 : formData.name ? 1 : 0;

  return (
    <>
      <style>{styles}</style>
      <div className="edu-register-root">
        <div className="edu-bg-grid" />
        <div className="edu-orb edu-orb-1" />
        <div className="edu-orb edu-orb-2" />
        <div className="edu-orb edu-orb-3" />

        {/* LEFT PANEL */}
        <div className="edu-left">
          <div className="edu-brand">
            <div className="edu-brand-icon">📚</div>
            <span className="edu-brand-name">Edu<span>Track</span></span>
          </div>
          <div className="edu-tagline">
            <h1>Learn, Grow,<br /><em>Achieve More.</em></h1>
            <p>Join thousands of students, educators, and administrators managing academic excellence in one place.</p>
          </div>
          <div className="edu-features">
            {[
              { icon: '📊', title: 'Live Progress Tracking', sub: 'Real-time insights on performance' },
              { icon: '🔔', title: 'Smart Notifications', sub: 'Never miss a deadline again' },
              { icon: '🤝', title: 'Collaborative Tools', sub: 'Connect faculty & students seamlessly' },
            ].map((f, i) => (
              <div className="edu-feature-item" key={i}>
                <div className="edu-feature-dot">{f.icon}</div>
                <div className="edu-feature-text">
                  <strong>{f.title}</strong>
                  <span>{f.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="edu-right">
          <div className="edu-card">
            <div className="edu-progress">
              {[0, 1, 2].map(i => (
                <div key={i} className={`edu-prog-dot ${i <= activeStep ? 'active' : ''}`} />
              ))}
            </div>

            <div className="edu-card-header">
              <div className="edu-step-badge">New Account</div>
              <h2>Create Account</h2>
              <p>Fill in your details to get started</p>
            </div>

            {/* Role Tabs */}
            <div className="edu-role-tabs">
              {ROLES.map(r => (
                <button
                  key={r.value}
                  type="button"
                  className={`edu-role-tab ${formData.role === r.value ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, role: r.value })}
                >
                  <span className="role-icon">{r.icon}</span>
                  {r.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleRegister}>
              <div className="edu-field">
                <label>Full Name</label>
                <div className="edu-input-wrap">
                  <span className="edu-input-icon">👤</span>
                  <input
                    className="edu-input"
                    type="text"
                    placeholder="John Doe"
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="edu-field">
                <label>Email Address</label>
                <div className="edu-input-wrap">
                  <span className="edu-input-icon">✉️</span>
                  <input
                    className="edu-input"
                    type="email"
                    placeholder="email@example.com"
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="edu-field">
                <label>Password</label>
                <div className="edu-input-wrap">
                  <span className="edu-input-icon">🔒</span>
                  <input
                    className="edu-input"
                    type="password"
                    placeholder="Create a strong password"
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                {formData.password && (
                  <>
                    <div className="edu-strength-bar">
                      <div className="edu-strength-fill" style={{ width: strength.w, background: strength.color }} />
                    </div>
                    <div className="edu-strength-label">{strength.label}</div>
                  </>
                )}
              </div>

              <div className="edu-divider">
                <div className="edu-divider-line" />
                <span>joining as {formData.role}</span>
                <div className="edu-divider-line" />
              </div>

              <button type="submit" className="edu-submit" disabled={loading}>
                {loading && <span className="edu-spinner" />}
                {loading ? 'Creating Account…' : 'Create My Account →'}
              </button>
            </form>

            <p className="edu-login-link">
              Already have an account? <Link to="/login">Sign in here</Link>
            </p>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`edu-toast ${toast.type} ${toast.hide ? 'hide' : ''}`}>
            <span>{toast.type === 'success' ? '✅' : '❌'}</span>
            {toast.msg}
          </div>
        )}
      </div>
    </>
  );
};

export default Register;