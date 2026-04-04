// VerifyOTP.jsx
// Special Features:
//  1. 6 individual auto-advance OTP boxes (paste, backspace, arrow nav)
//  2. 1-minute countdown timer with animated progress bar (turns red at 15s)
//  3. Expired overlay with resend option
//  4. Shake animation on wrong OTP
//  5. Success animation (boxes turn green + checkmark pulse)
//  6. Attempt counter — locks input after 3 failed attempts
//  7. Resend cooldown (30 s after first resend)
//  8. Masked email display
//  9. Clipboard paste support (auto-fills all 6 digits)
// 10. Fully navy-themed, professional UI (no dark mode required)

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

/* ─── Google Fonts injected once ─── */
const injectFonts = () => {
  if (document.getElementById('otp-fonts')) return;
  const link = document.createElement('link');
  link.id = 'otp-fonts';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Space+Mono:wght@700&display=swap';
  document.head.appendChild(link);
};

/* ─── Inline style helpers ─── */
const navy = {
  900: '#0d1f3c',
  800: '#0f2850',
  700: '#1a3a6b',
  600: '#1f4b8e',
  500: '#2563c0',
  200: '#b5ccf0',
  100: '#dce8fb',
  50:  '#f0f5ff',
};

const styles = {
  page: {
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${navy[900]} 0%, ${navy[800]} 60%, #0b2045 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: "'DM Sans', sans-serif",
  },
  card: {
    background: '#ffffff',
    borderRadius: '22px',
    padding: '2.75rem 2.25rem 2rem',
    width: '100%',
    maxWidth: '430px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: `0 24px 80px rgba(10,22,40,0.45)`,
  },
  topBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${navy[700]}, ${navy[500]}, ${navy[700]})`,
  },
  logoRing: {
    width: 68, height: 68,
    borderRadius: '50%',
    background: navy[50],
    border: `2px solid ${navy[200]}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 1.5rem',
  },
  title: {
    fontSize: 22, fontWeight: 600, color: navy[900],
    textAlign: 'center', marginBottom: '0.35rem',
  },
  sub: {
    fontSize: 14, color: '#64748b',
    textAlign: 'center', lineHeight: 1.65,
    marginBottom: '2rem',
  },
  emailSpan: { color: navy[700], fontWeight: 600 },

  /* OTP row */
  otpRow: {
    display: 'flex', gap: '10px', justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  otpBox: (state) => ({
    width: 50, height: 60,
    border: `1.5px solid ${
      state === 'error'   ? '#e53e3e' :
      state === 'success' ? '#1a7a4a' :
      state === 'filled'  ? navy[700] :
                            navy[200]
    }`,
    borderRadius: 10,
    fontFamily: "'Space Mono', monospace",
    fontSize: 22, fontWeight: 700,
    color: state === 'success' ? '#1a7a4a' : navy[900],
    textAlign: 'center',
    background:
      state === 'success' ? '#eafaf1' :
      state === 'error'   ? '#fff5f5' :
      state === 'filled'  ? navy[50]  : '#f7faff',
    outline: 'none',
    transition: 'all 0.2s',
    caretColor: navy[500],
    boxShadow: state === 'focus' ? `0 0 0 3px rgba(37,99,192,0.14)` : 'none',
  }),

  /* Timer */
  timerRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: navy[50],
    border: `1px solid ${navy[100]}`,
    borderRadius: 10,
    padding: '0.65rem 1rem',
    marginBottom: '1.75rem',
  },
  timerLabel: {
    fontSize: 13, color: '#64748b',
    display: 'flex', alignItems: 'center', gap: 5,
  },
  timerVal: (urgent) => ({
    fontFamily: "'Space Mono', monospace",
    fontSize: 15, fontWeight: 700,
    color: urgent ? '#c0392b' : navy[700],
    letterSpacing: 1,
    minWidth: 42, textAlign: 'right',
    transition: 'color 0.4s',
  }),
  barWrap: {
    height: 3, background: navy[100],
    borderRadius: 99, marginTop: 6, overflow: 'hidden',
  },
  bar: (pct, urgent) => ({
    height: '100%',
    width: `${pct}%`,
    background: urgent ? '#e53e3e' : navy[500],
    borderRadius: 99,
    transition: 'width 1s linear, background 0.5s',
  }),

  /* Attempts badge */
  attemptsBadge: (remaining) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    fontSize: 12, fontWeight: 500,
    color: remaining <= 1 ? '#c0392b' : '#64748b',
    marginBottom: '1rem',
    background: remaining <= 1 ? '#fff5f5' : navy[50],
    border: `1px solid ${remaining <= 1 ? '#fed7d7' : navy[100]}`,
    borderRadius: 8, padding: '5px 10px',
  }),

  /* Buttons */
  btnVerify: (disabled) => ({
    width: '100%', padding: '0.9rem',
    background: disabled ? '#a0aec0' : navy[700],
    color: '#fff', border: 'none', borderRadius: 12,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    letterSpacing: 0.3,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    transition: 'background 0.2s, transform 0.1s',
  }),
  resendRow: {
    textAlign: 'center', marginTop: '1.25rem',
    fontSize: 13, color: '#64748b',
  },
  resendBtn: (disabled) => ({
    background: 'none', border: 'none',
    color: disabled ? '#a0aec0' : navy[500],
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13, fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: disabled ? 'none' : 'underline',
    padding: 0,
  }),
  statusMsg: (type) => ({
    textAlign: 'center', fontSize: 13, fontWeight: 500,
    marginTop: '0.75rem', minHeight: 20,
    color: type === 'error' ? '#c0392b' : type === 'success' ? '#1a7a4a' : 'transparent',
  }),

  /* Locked overlay */
  overlay: {
    position: 'absolute', inset: 0,
    background: 'rgba(10,22,40,0.6)',
    borderRadius: 22,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: 12, color: '#fff',
    fontSize: 15, fontWeight: 500,
    textAlign: 'center', padding: '2rem',
    backdropFilter: 'blur(3px)',
    zIndex: 10,
  },
  overlayBtn: {
    marginTop: 8, padding: '0.65rem 1.5rem',
    background: '#fff', color: navy[700],
    border: 'none', borderRadius: 8,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600, fontSize: 14, cursor: 'pointer',
  },
};

/* ─── SVG Icons ─── */
const LockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={navy[700]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const ShieldXIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>
  </svg>
);

const TOTAL_TIME   = 60;  // seconds
const MAX_ATTEMPTS = 3;
const RESEND_COOLDOWN = 30; // seconds

/* ─── Shake keyframes injected once ─── */
const injectShake = () => {
  if (document.getElementById('otp-shake')) return;
  const s = document.createElement('style');
  s.id = 'otp-shake';
  s.textContent = `
    @keyframes otpShake {
      0%,100%{transform:translateX(0)} 20%{transform:translateX(-7px)}
      40%{transform:translateX(7px)} 60%{transform:translateX(-4px)}
      80%{transform:translateX(4px)}
    }
    @keyframes otpPulse {
      0%{transform:scale(1)} 40%{transform:scale(1.08)} 100%{transform:scale(1)}
    }
    .otp-shake  { animation: otpShake 0.4s ease; }
    .otp-pulse  { animation: otpPulse 0.35s ease forwards; }
    .btn-hover:hover { filter: brightness(1.1); }
  `;
  document.head.appendChild(s);
};

/* ──────────────────────────────────────
   Main Component
─────────────────────────────────────── */
const VerifyOTP = () => {
  const [digits, setDigits]         = useState(Array(6).fill(''));
  const [boxState, setBoxState]     = useState(Array(6).fill('idle')); // idle|filled|focus|error|success
  const [timeLeft, setTimeLeft]     = useState(TOTAL_TIME);
  const [expired, setExpired]       = useState(false);
  const [locked, setLocked]         = useState(false);
  const [attempts, setAttempts]     = useState(MAX_ATTEMPTS); // remaining
  const [loading, setLoading]       = useState(false);
  const [status, setStatus]         = useState({ msg: '', type: '' });
  const [resendCooldown, setResendCooldown] = useState(0);
  const [overlayMode, setOverlayMode] = useState(null); // null | 'expired' | 'locked'

  const navigate  = useNavigate();
  const inputsRef = useRef([]);
  const timerRef  = useRef(null);
  const rowRef    = useRef(null);
  const cooldownRef = useRef(null);

  /* masked email */
  const rawEmail = localStorage.getItem('resetEmail') || '';
  const maskedEmail = rawEmail.replace(/(.{2})(.*)(?=@)/, (_, a, b) => a + '•'.repeat(b.length));

  useEffect(() => {
    injectFonts();
    injectShake();
    startTimer();
    return () => { clearInterval(timerRef.current); clearInterval(cooldownRef.current); };
    // eslint-disable-next-line
  }, []);

  /* ── Timer ── */
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    setTimeLeft(TOTAL_TIME);
    setExpired(false);
    setOverlayMode(null);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setExpired(true);
          setOverlayMode('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const pct = (timeLeft / TOTAL_TIME) * 100;
  const urgent = timeLeft <= 15;

  /* ── Box helpers ── */
  const updateBox = (idx, val) => {
    setDigits(prev => { const d = [...prev]; d[idx] = val; return d; });
    setBoxState(prev => {
      const s = [...prev]; s[idx] = val ? 'filled' : 'idle'; return s;
    });
  };

  const setFocusState = (idx, focused) => {
    setBoxState(prev => {
      const s = [...prev];
      s[idx] = focused ? 'focus' : (digits[idx] ? 'filled' : 'idle');
      return s;
    });
  };

  const handleInput = (i, e) => {
    const val = e.target.value.replace(/\D/g, '').slice(-1);
    updateBox(i, val);
    setStatus({ msg: '', type: '' });
    if (val && i < 5) { inputsRef.current[i + 1]?.focus(); }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      updateBox(i - 1, '');
      inputsRef.current[i - 1]?.focus();
    }
    if (e.key === 'ArrowLeft'  && i > 0) inputsRef.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const handlePaste = (i, e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData)
      .getData('text').replace(/\D/g, '').slice(0, 6);
    const newDigits = [...digits];
    const newState  = [...boxState];
    paste.split('').forEach((ch, j) => {
      if (i + j < 6) { newDigits[i + j] = ch; newState[i + j] = 'filled'; }
    });
    setDigits(newDigits);
    setBoxState(newState);
    const next = Math.min(i + paste.length, 5);
    inputsRef.current[next]?.focus();
  };

  /* ── Shake + error states ── */
  const triggerShake = () => {
    if (!rowRef.current) return;
    rowRef.current.classList.remove('otp-shake');
    void rowRef.current.offsetWidth;
    rowRef.current.classList.add('otp-shake');
    setBoxState(Array(6).fill('error'));
    setTimeout(() => {
      rowRef.current?.classList.remove('otp-shake');
      setBoxState(digits.map(d => d ? 'filled' : 'idle'));
    }, 420);
  };

  /* ── Success pulse ── */
  const triggerSuccess = () => {
    setBoxState(Array(6).fill('success'));
    inputsRef.current.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.classList.add('otp-pulse');
        setTimeout(() => el.classList.remove('otp-pulse'), 350);
      }, i * 60);
    });
  };

  /* ── Verify ── */
  const handleVerify = async () => {
    if (expired || locked || loading) return;
    const otp = digits.join('');
    if (otp.length < 6) {
      setStatus({ msg: 'Please enter all 6 digits.', type: 'error' });
      return;
    }
    setLoading(true);
    setStatus({ msg: '', type: '' });
    try {
  const res = await API.post('/auth/verify-otp', {
    email: rawEmail, 
    otp: otp,
  });
      if (res.data?.message?.includes('Verified')) {
        triggerSuccess();
        setStatus({ msg: 'Verified! Redirecting…', type: 'success' });
        localStorage.setItem('resetOTP', otp);
        clearInterval(timerRef.current);
        setTimeout(() => navigate('/reset-password'), 1400);
      } else {
        throw new Error(res.data?.message || 'Invalid OTP');
      }
    } catch (err) {
      const remaining = attempts - 1;
      setAttempts(remaining);
      triggerShake();
      if (remaining <= 0) {
        setLocked(true);
        setOverlayMode('locked');
        clearInterval(timerRef.current);
        setStatus({ msg: '', type: '' });
      } else {
        setStatus({
          msg: err.response?.data?.message || `Incorrect code — ${remaining} attempt${remaining > 1 ? 's' : ''} left`,
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  /* ── Resend ── */
  const handleResend = () => {
    setAttempts(MAX_ATTEMPTS);
    setLocked(false);
    setDigits(Array(6).fill(''));
    setBoxState(Array(6).fill('idle'));
    setStatus({ msg: 'New code sent to your email!', type: 'success' });
    startTimer();
    /* start resend cooldown */
    setResendCooldown(RESEND_COOLDOWN);
    clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) { clearInterval(cooldownRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
    setTimeout(() => inputsRef.current[0]?.focus(), 100);
  };

  /* ── Render ── */
  const otp = digits.join('');
  const canVerify = otp.length === 6 && !expired && !locked && !loading;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* top accent bar */}
        <div style={styles.topBar} />

        {/* lock icon */}
        <div style={styles.logoRing}><LockIcon /></div>

        <h1 style={styles.title}>Verify your identity</h1>
        <p style={styles.sub}>
          Enter the 6-digit code sent to<br />
          <span style={styles.emailSpan}>{maskedEmail || 'your email address'}</span>
        </p>

        {/* OTP boxes */}
        <div ref={rowRef} style={styles.otpRow}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              disabled={locked || expired}
              style={styles.otpBox(boxState[i])}
              onFocus={() => setFocusState(i, true)}
              onBlur={() => setFocusState(i, false)}
              onChange={e => handleInput(i, e)}
              onKeyDown={e => handleKeyDown(i, e)}
              onPaste={e => handlePaste(i, e)}
            />
          ))}
        </div>

        {/* Attempt counter */}
        {attempts < MAX_ATTEMPTS && !locked && (
          <div style={styles.attemptsBadge(attempts)}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {attempts} attempt{attempts !== 1 ? 's' : ''} remaining
          </div>
        )}

        {/* Timer */}
        <div style={styles.timerRow}>
          <div style={{ flex: 1 }}>
            <div style={styles.timerLabel}>
              <ClockIcon /> Code expires in
            </div>
            <div style={styles.barWrap}>
              <div style={styles.bar(pct, urgent)} />
            </div>
          </div>
          <div style={styles.timerVal(urgent)}>{fmt(timeLeft)}</div>
        </div>

        {/* Verify button */}
        <button
          style={styles.btnVerify(!canVerify)}
          className="btn-hover"
          disabled={!canVerify}
          onClick={handleVerify}
        >
          {loading ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 2a10 10 0 1 0 10 10" style={{ animation: 'spin 0.8s linear infinite', transformOrigin: '50% 50%' }}/>
              </svg>
              Verifying…
            </>
          ) : (
            <><CheckIcon /> Verify code</>
          )}
        </button>

        {/* Status message */}
        <p style={styles.statusMsg(status.type)}>{status.msg || '\u00A0'}</p>

        {/* Resend row */}
        <p style={styles.resendRow}>
          Didn't receive the code?{' '}
          <button
            style={styles.resendBtn(resendCooldown > 0)}
            disabled={resendCooldown > 0}
            onClick={handleResend}
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
          </button>
        </p>

        {/* Overlay: expired or locked */}
        {overlayMode && (
          <div style={styles.overlay}>
            {overlayMode === 'expired' ? (
              <>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  <line x1="18" y1="18" x2="6" y2="6"/>
                </svg>
                <div>Your verification code<br />has <strong>expired</strong></div>
                <button style={styles.overlayBtn} onClick={handleResend}>
                  Request new code
                </button>
              </>
            ) : (
              <>
                <ShieldXIcon />
                <div>Too many failed attempts.<br />Your session has been <strong>locked</strong>.</div>
                <button style={styles.overlayBtn} onClick={handleResend}>
                  Unlock &amp; resend code
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default VerifyOTP;