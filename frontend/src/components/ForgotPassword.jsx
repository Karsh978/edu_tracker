import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .fp-page {
    min-height: 100vh;
    background: #f0f4f8;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-family: 'DM Sans', sans-serif;
  }

  .fp-split {
    display: flex;
    width: 100%;
    max-width: 900px;
    min-height: 520px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 12px 48px rgba(0,25,80,0.18);
  }

  .fp-left {
    background: #0d2161;
    flex: 1.1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .fp-left::before {
    content: '';
    position: absolute;
    width: 280px; height: 280px;
    border-radius: 50%;
    border: 40px solid rgba(255,255,255,0.06);
    top: -60px; left: -60px;
  }

  .fp-left::after {
    content: '';
    position: absolute;
    width: 180px; height: 180px;
    border-radius: 50%;
    border: 30px solid rgba(255,255,255,0.05);
    bottom: 30px; right: -40px;
  }

  .fp-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1;
  }

  .fp-brand-icon {
    width: 36px; height: 36px;
    background: #fff;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
  }

  .fp-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 0.3px;
  }

  .fp-left-body { z-index: 1; }

  .fp-left-body h2 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 500;
    color: #fff;
    line-height: 1.4;
    margin-bottom: 12px;
  }

  .fp-left-body p {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    line-height: 1.6;
    max-width: 220px;
  }

  .fp-dots { display: flex; gap: 8px; z-index: 1; }

  .fp-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
  }

  .fp-dot.active {
    background: #fff;
    width: 22px;
    border-radius: 4px;
  }

  .fp-right {
    background: #fff;
    flex: 1;
    padding: 2.5rem 2.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .fp-right h1 {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 600;
    color: #0d2161;
    margin-bottom: 6px;
  }

  .fp-subtitle {
    font-size: 14px;
    color: #6b7a99;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .fp-steps {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 1.8rem;
  }

  .fp-step {
    display: flex; align-items: center; gap: 6px;
    font-size: 12px;
    font-weight: 500;
    color: #a0aec0;
  }

  .fp-step.active { color: #0d2161; }

  .fp-step-num {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: #e8ecf5;
    color: #a0aec0;
    font-size: 11px;
    font-weight: 500;
    display: flex; align-items: center; justify-content: center;
  }

  .fp-step.active .fp-step-num {
    background: #0d2161;
    color: #fff;
  }

  .fp-step-line {
    width: 28px; height: 1.5px;
    background: #dde3f0;
  }

  .fp-field { margin-bottom: 1.2rem; }

  .fp-field label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 6px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  .fp-input-wrap { position: relative; }

  .fp-input-wrap svg {
    position: absolute;
    left: 12px; top: 50%;
    transform: translateY(-50%);
    width: 16px; height: 16px;
    color: #a0aec0;
    pointer-events: none;
  }

  .fp-input-wrap input {
    width: 100%;
    padding: 11px 14px 11px 38px;
    border: 1.5px solid #dde3f0;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #0d2161;
    background: #f8fafd;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .fp-input-wrap input:focus {
    border-color: #0d2161;
    background: #fff;
  }

  .fp-input-wrap input::placeholder { color: #b0bdd4; }

  .fp-hint {
    font-size: 12px;
    color: #8a9bbf;
    margin-top: 6px;
    line-height: 1.5;
  }

  .fp-error {
    font-size: 12px;
    color: #e24b4a;
    margin-top: 6px;
  }

  .fp-btn-primary {
    width: 100%;
    padding: 13px;
    background: #0d2161;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.3px;
    margin-top: 0.4rem;
    transition: background 0.2s, transform 0.15s;
  }

  .fp-btn-primary:hover { background: #162f85; }
  .fp-btn-primary:active { transform: scale(0.98); }
  .fp-btn-primary:disabled { background: #7a8ab5; cursor: not-allowed; }

  .fp-back-link {
    text-align: center;
    margin-top: 1.2rem;
    font-size: 13px;
    color: #6b7a99;
  }

  .fp-back-link a {
    color: #0d2161;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }

  .fp-back-link a:hover { text-decoration: underline; }

  @media (max-width: 600px) {
    .fp-left { display: none; }
    .fp-right { padding: 2rem 1.5rem; }
  }
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      alert("OTP Sent! Check your email.");
      localStorage.setItem('resetEmail', email);
      navigate('/verify-otp');
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="fp-page">
        <div className="fp-split">

          {/* Left Panel */}
          <div className="fp-left">
            <div className="fp-brand">
              <div className="fp-brand-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L2 6v8l8 4 8-4V6L10 2z" fill="#0d2161" />
                </svg>
              </div>
              <span className="fp-brand-name">EduTrack</span>
            </div>
            <div className="fp-left-body">
              <h2>Regain access to your account</h2>
              <p>We'll send a secure OTP to reset your password in seconds.</p>
            </div>
            <div className="fp-dots">
              <div className="fp-dot active"></div>
              <div className="fp-dot"></div>
              <div className="fp-dot"></div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="fp-right">
            <h1>Forgot Password?</h1>
            <p className="fp-subtitle">
              Enter your email to receive a verification code.
            </p>

            <div className="fp-steps">
              <div className="fp-step active">
                <div className="fp-step-num">1</div>
                <span>Email</span>
              </div>
              <div className="fp-step-line"></div>
              <div className="fp-step">
                <div className="fp-step-num">2</div>
                <span>Verify</span>
              </div>
              <div className="fp-step-line"></div>
              <div className="fp-step">
                <div className="fp-step-num">3</div>
                <span>Reset</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="fp-field">
                <label>Email address</label>
                <div className="fp-input-wrap">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="3" width="14" height="10" rx="2" />
                    <path d="M1 5l7 5 7-5" />
                  </svg>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    required
                  />
                </div>
                <div className="fp-hint">
                  We'll send an OTP to this address if it's linked to an account.
                </div>
                {error && <div className="fp-error">{error}</div>}
              </div>

              <button type="submit" className="fp-btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send Code'}
              </button>
            </form>

            <div className="fp-back-link">
              Remembered it? <a onClick={() => navigate('/login')} >Sign in instead</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ForgotPassword;