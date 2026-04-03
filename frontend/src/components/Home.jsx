import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const page = {
    fontFamily: "'Playfair Display', 'Georgia', serif",
    background: "#FAFAF8",
    overflowX: "hidden"
  };

  /* ─── NAVBAR ─── */
  const navbar = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scrolled ? "0 80px" : "0 80px",
    height: scrolled ? "64px" : "80px",
    background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.0)",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(232,228,221,0.8)" : "1px solid rgba(255,255,255,0.1)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.08)" : "none",
    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)"
  };

  const navLogo = {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  };

  const logoMark = {
    width: "40px",
    height: "40px",
    background: "linear-gradient(135deg, #C45B1A 0%, #E07A3A 100%)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "17px",
    fontFamily: "'Playfair Display', serif",
    letterSpacing: "-0.5px",
    boxShadow: "0 4px 12px rgba(196,91,26,0.35)"
  };

  const logoText = {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: scrolled ? "#1A2B52" : "#FFFFFF",
    letterSpacing: "-0.3px",
    fontFamily: "'Playfair Display', serif",
    transition: "color 0.35s ease"
  };

  const navLinks = {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  };

  const navLink = {
    fontSize: "0.875rem",
    color: scrolled ? "#4A5568" : "rgba(255,255,255,0.85)",
    textDecoration: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "500",
    letterSpacing: "0.02em",
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "all 0.2s ease"
  };

  const navBtns = {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  };

  const loginBtn = {
    padding: "9px 22px",
    background: "transparent",
    color: scrolled ? "#C45B1A" : "rgba(255,255,255,0.9)",
    border: scrolled ? "1.5px solid #C45B1A" : "1.5px solid rgba(255,255,255,0.4)",
    borderRadius: "9px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.875rem",
    fontWeight: "600",
    letterSpacing: "0.02em",
    transition: "all 0.25s ease"
  };

  const registerBtn = {
    padding: "9px 22px",
    background: scrolled ? "#C45B1A" : "rgba(255,255,255,0.15)",
    color: "#FFFFFF",
    border: scrolled ? "1.5px solid #C45B1A" : "1.5px solid rgba(255,255,255,0.3)",
    borderRadius: "9px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.875rem",
    fontWeight: "600",
    letterSpacing: "0.02em",
    backdropFilter: scrolled ? "none" : "blur(8px)",
    transition: "all 0.25s ease"
  };

  /* ─── HERO ─── */
  const hero = {
    minHeight: "100vh",
    background: "#1A2B52",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "100px 80px 80px"
  };

  const heroPattern = {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `
      radial-gradient(ellipse at 15% 50%, rgba(196,91,26,0.18) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 20%, rgba(196,91,26,0.10) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 100%, rgba(26,43,82,0.5) 0%, transparent 60%)
    `,
    pointerEvents: "none"
  };

  const heroDots = {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
    pointerEvents: "none"
  };

  const heroContent = {
    maxWidth: "760px",
    textAlign: "center",
    zIndex: 1,
    animation: "fadeUp 0.9s cubic-bezier(0.4,0,0.2,1) both"
  };

  const heroBadge = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(196,91,26,0.12)",
    color: "#E07A3A",
    border: "1px solid rgba(196,91,26,0.25)",
    borderRadius: "100px",
    padding: "7px 20px",
    fontSize: "0.78rem",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "600",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "28px",
    backdropFilter: "blur(8px)"
  };

  const badgeDot = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#E07A3A",
    animation: "pulse 2s infinite"
  };

  const heroTitle = {
    fontSize: "clamp(2.8rem, 5.5vw, 4.4rem)",
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: "1.12",
    letterSpacing: "-1.5px",
    marginBottom: "24px",
    fontFamily: "'Playfair Display', serif"
  };

  const heroSpan = {
    color: "#E07A3A",
    position: "relative",
    display: "inline-block"
  };

  const heroSubtitle = {
    fontSize: "1.1rem",
    color: "rgba(255,255,255,0.65)",
    lineHeight: "1.8",
    maxWidth: "580px",
    margin: "0 auto 44px auto",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "400"
  };

  const heroCTA = {
    display: "flex",
    gap: "14px",
    justifyContent: "center",
    flexWrap: "wrap"
  };

  const primaryBtn = {
    padding: "15px 38px",
    background: "linear-gradient(135deg, #C45B1A, #E07A3A)",
    color: "white",
    border: "none",
    borderRadius: "11px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.02em",
    boxShadow: "0 10px 32px rgba(196,91,26,0.45), 0 2px 8px rgba(0,0,0,0.15)",
    transition: "all 0.25s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  };

  const secondaryBtn = {
    padding: "15px 38px",
    background: "rgba(255,255,255,0.07)",
    color: "rgba(255,255,255,0.9)",
    border: "1.5px solid rgba(255,255,255,0.2)",
    borderRadius: "11px",
    fontSize: "0.95rem",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.02em",
    backdropFilter: "blur(10px)",
    transition: "all 0.25s ease"
  };

  const heroStats = {
    display: "flex",
    justifyContent: "center",
    gap: "0",
    marginTop: "80px",
    paddingTop: "48px",
    borderTop: "1px solid rgba(255,255,255,0.08)"
  };

  const heroStat = {
    textAlign: "center",
    padding: "0 48px",
    borderRight: "1px solid rgba(255,255,255,0.08)"
  };

  const heroStatNum = {
    display: "block",
    fontSize: "2.4rem",
    fontWeight: "700",
    color: "#E07A3A",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1"
  };

  const heroStatLabel = {
    display: "block",
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.45)",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "500",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginTop: "8px"
  };

  /* ─── TRUST BAR ─── */
  const trustBar = {
    background: "#F4F0E8",
    padding: "20px 80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    borderBottom: "1px solid #EDE9E2"
  };

  const trustText = {
    fontSize: "0.8rem",
    color: "#9CA3AF",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "500",
    letterSpacing: "0.05em",
    textTransform: "uppercase"
  };

  const trustBadges = {
    display: "flex",
    gap: "32px",
    alignItems: "center"
  };

  const trustBadge = {
    fontSize: "0.85rem",
    color: "#6B7280",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  };

  /* ─── FEATURES ─── */
  const featuresSection = {
    padding: "110px 80px",
    background: "#FAFAF8"
  };

  const sectionLabel = {
    fontSize: "0.72rem",
    fontWeight: "700",
    color: "#C45B1A",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
    marginBottom: "12px"
  };

  const sectionTitle = {
    fontSize: "clamp(1.9rem, 3vw, 2.5rem)",
    fontWeight: "700",
    color: "#1A2B52",
    letterSpacing: "-0.6px",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "16px",
    lineHeight: "1.2"
  };

  const sectionDesc = {
    fontSize: "1rem",
    color: "#6B7280",
    fontFamily: "'DM Sans', sans-serif",
    maxWidth: "500px",
    lineHeight: "1.75",
    marginBottom: "60px"
  };

  const cardsGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "24px"
  };

  const featureCard = {
    background: "#FFFFFF",
    border: "1px solid #EDE9E2",
    borderRadius: "20px",
    padding: "40px 34px",
    transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
    cursor: "default",
    position: "relative",
    overflow: "hidden"
  };

  const cardAccent = {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #C45B1A, #E07A3A)"
  };

  const cardIconWrap = {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "26px",
    fontSize: "24px"
  };

  const cardTitle = {
    fontSize: "1.15rem",
    fontWeight: "600",
    color: "#1A2B52",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "12px"
  };

  const cardDesc = {
    fontSize: "0.9rem",
    color: "#6B7280",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: "1.7"
  };

  const cardLink = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "22px",
    color: "#C45B1A",
    fontSize: "0.875rem",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "600",
    textDecoration: "none",
    letterSpacing: "0.02em"
  };

  const features = [
    {
      icon: "👤",
      iconBg: "rgba(196,91,26,0.08)",
      title: "Student Management",
      desc: "Track student records, enrollment history, and academic progress with a clean, intuitive interface."
    },
    {
      icon: "🏛️",
      iconBg: "rgba(26,43,82,0.07)",
      title: "Faculty Dashboard",
      desc: "Manage classes, assignments, evaluations and connect with students — all in one place."
    },
    {
      icon: "⚙️",
      iconBg: "rgba(16,185,129,0.08)",
      title: "Admin Control",
      desc: "Complete system oversight including user access, reports, and institutional configurations."
    }
  ];

  /* ─── HIGHLIGHT STRIP ─── */
  const highlightStrip = {
    background: "#1A2B52",
    padding: "100px 80px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "100px",
    alignItems: "center"
  };

  const highlightTitle = {
    fontSize: "clamp(1.9rem, 2.5vw, 2.6rem)",
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1.2",
    letterSpacing: "-0.5px",
    marginBottom: "18px"
  };

  const highlightDesc = {
    fontSize: "0.95rem",
    color: "rgba(255,255,255,0.6)",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: "1.8",
    marginBottom: "36px"
  };

  const checkList = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  };

  const checkItem = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "0.92rem",
    color: "rgba(255,255,255,0.8)",
    fontFamily: "'DM Sans', sans-serif"
  };

  const checkDot = {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #C45B1A, #E07A3A)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    color: "white",
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(196,91,26,0.4)"
  };

  const statsPanel = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px"
  };

  const statCard = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "30px 26px",
    transition: "all 0.25s ease"
  };

  const statCardNum = {
    fontSize: "2.6rem",
    fontWeight: "700",
    color: "#E07A3A",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1"
  };

  const statCardLabel = {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.45)",
    fontFamily: "'DM Sans', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginTop: "8px"
  };

  /* ─── TESTIMONIAL ─── */
  const testimonialSection = {
    padding: "110px 80px",
    background: "#F4F0E8",
    textAlign: "center"
  };

  const testimonialCard = {
    maxWidth: "700px",
    margin: "0 auto",
    background: "#FFFFFF",
    border: "1px solid #EDE9E2",
    borderRadius: "24px",
    padding: "60px",
    position: "relative",
    boxShadow: "0 24px 80px rgba(0,0,0,0.07)"
  };

  const testimonialQuote = {
    fontSize: "1.2rem",
    color: "#374151",
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
    lineHeight: "1.85",
    marginBottom: "36px"
  };

  const testimonialAuthor = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px"
  };

  const authorAvatar = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1A2B52, #2D4A7A)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 12px rgba(26,43,82,0.3)"
  };

  const authorName = {
    fontSize: "0.92rem",
    fontWeight: "600",
    color: "#1A2B52",
    fontFamily: "'DM Sans', sans-serif"
  };

  const authorRole = {
    fontSize: "0.8rem",
    color: "#9CA3AF",
    fontFamily: "'DM Sans', sans-serif",
    marginTop: "2px"
  };

  /* ─── CTA BANNER ─── */
  const ctaBanner = {
    background: "linear-gradient(135deg, #C45B1A 0%, #B8501A 40%, #E07A3A 100%)",
    padding: "90px 80px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "40px",
    flexWrap: "wrap",
    position: "relative",
    overflow: "hidden"
  };

  const ctaOverlay = {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `radial-gradient(circle at 10% 50%, rgba(255,255,255,0.07) 0%, transparent 50%),
                      radial-gradient(circle at 90% 50%, rgba(0,0,0,0.1) 0%, transparent 50%)`,
    pointerEvents: "none"
  };

  const ctaTitle = {
    fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1.25",
    maxWidth: "520px",
    letterSpacing: "-0.4px",
    zIndex: 1
  };

  const ctaWhiteBtn = {
    padding: "15px 38px",
    background: "#FFFFFF",
    color: "#C45B1A",
    border: "none",
    borderRadius: "11px",
    fontSize: "0.95rem",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    flexShrink: 0,
    zIndex: 1,
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
  };

  /* ─── FOOTER ─── */
  const footer = {
    background: "#0F1B35",
    color: "white",
    padding: "80px 80px 0"
  };

  const footerGrid = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "60px",
    marginBottom: "60px"
  };

  const footerBrand = {
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.45)",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: "1.75",
    marginTop: "16px",
    maxWidth: "270px"
  };

  const footerHeading = {
    fontSize: "0.72rem",
    fontWeight: "700",
    color: "rgba(255,255,255,0.35)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
    marginBottom: "20px"
  };

  const footerLink = {
    display: "block",
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.6)",
    fontFamily: "'DM Sans', sans-serif",
    textDecoration: "none",
    marginBottom: "12px",
    transition: "color 0.2s"
  };

  const footerBottom = {
    borderTop: "1px solid rgba(255,255,255,0.07)",
    padding: "26px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.3)",
    fontFamily: "'DM Sans', sans-serif"
  };

  const divider = {
    display: "flex",
    gap: "24px"
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        a { text-decoration: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .nav-link-item:hover {
          background: rgba(196,91,26,0.08) !important;
          color: #C45B1A !important;
        }
        .nav-login-btn:hover {
          background: rgba(196,91,26,0.06) !important;
        }
        .nav-register-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(196,91,26,0.35);
        }
        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(196,91,26,0.5) !important;
        }
        .secondary-btn:hover {
          background: rgba(255,255,255,0.14) !important;
          border-color: rgba(255,255,255,0.35) !important;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 64px rgba(0,0,0,0.1);
          border-color: #D4C8B8;
        }
        .stat-card:hover {
          background: rgba(255,255,255,0.09) !important;
          border-color: rgba(255,255,255,0.15) !important;
        }
        .footer-link:hover { color: rgba(255,255,255,0.9) !important; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.2) !important; }

        .hero-stat:last-child { border-right: none !important; }
      `}</style>

      <div style={page}>

        {/* ── NAVBAR ── */}
        <nav style={navbar}>
          <div style={navLogo}>
            <div style={logoMark}>E</div>
            <span style={logoText}>EduTrack</span>
          </div>

          <div style={navLinks}>
            <a href="#features" style={navLink} className="nav-link-item">Features</a>
            <a href="#about" style={navLink} className="nav-link-item">About</a>
            <a href="#contact" style={navLink} className="nav-link-item">Contact</a>
          </div>

          <div style={navBtns}>
            <Link to="/login">
              <button style={loginBtn} className="nav-login-btn">Login</button>
            </Link>
            <Link to="/register">
              <button style={registerBtn} className="nav-register-btn">Register</button>
            </Link>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={hero}>
          <div style={heroPattern} />
          <div style={heroDots} />

          <div style={heroContent}>
            <div style={heroBadge}>
              <span style={badgeDot}></span>
              University Management Platform
            </div>

            <h1 style={heroTitle}>
              The Smarter Way to
              <br />
              <span style={heroSpan}>Manage Education</span>
            </h1>

            <p style={heroSubtitle}>
              A unified portal for students, faculty, and administrators.
              Manage courses, track progress, and simplify every workflow —
              all from one place.
            </p>

            <div style={heroCTA}>
              <Link to="/login">
                <button style={primaryBtn} className="primary-btn">
                  Access Portal
                  <span>→</span>
                </button>
              </Link>
              <button style={secondaryBtn} className="secondary-btn">▶ Watch Demo</button>
            </div>

            <div style={heroStats}>
              {[
                { num: "5,000+", label: "Students" },
                { num: "50+", label: "Courses" },
                { num: "100+", label: "Faculty" }
              ].map((s, i) => (
                <div key={i} style={i < 2 ? heroStat : { ...heroStat, borderRight: "none" }} className="hero-stat">
                  <span style={heroStatNum}>{s.num}</span>
                  <span style={heroStatLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <div style={trustBar}>
          <span style={trustText}>Trusted by</span>
          <div style={trustBadges}>
            {["🏛️ Top Universities", "🎓 10K+ Students", "✅ ISO Certified", "🔒 GDPR Compliant"].map((b, i) => (
              <span key={i} style={trustBadge}>{b}</span>
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <section id="features" style={featuresSection}>
          <div style={sectionLabel}>Platform Features</div>
          <h2 style={sectionTitle}>Everything You Need,<br />All in One Place</h2>
          <p style={sectionDesc}>
            Designed for modern universities — whether you're a student tracking grades,
            faculty managing classes, or an admin overseeing the institution.
          </p>

          <div style={cardsGrid}>
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={featureCard}>
                <div style={cardAccent} />
                <div style={{ ...cardIconWrap, background: f.iconBg }}>
                  {f.icon}
                </div>
                <h3 style={cardTitle}>{f.title}</h3>
                <p style={cardDesc}>{f.desc}</p>
                <Link to="/login" style={cardLink}>
                  Explore feature →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── HIGHLIGHT STRIP ── */}
        <section id="about" style={highlightStrip}>
          <div>
            <div style={{ ...sectionLabel, color: "#E07A3A" }}>Why EduTrack</div>
            <h2 style={highlightTitle}>Built for the Modern University Experience</h2>
            <p style={highlightDesc}>
              EduTrack brings all the tools a university needs into a single, cohesive
              platform — reducing friction and improving outcomes for everyone.
            </p>

            <ul style={checkList}>
              {[
                "Real-time academic progress tracking",
                "Role-based dashboards for all users",
                "Secure data management & compliance",
                "Easy enrollment and course handling"
              ].map((item, i) => (
                <li key={i} style={checkItem}>
                  <span style={checkDot}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={statsPanel}>
            {[
              { num: "98%", label: "Satisfaction Rate" },
              { num: "3x", label: "Faster Processing" },
              { num: "24/7", label: "System Uptime" },
              { num: "10+", label: "Departments" }
            ].map((s, i) => (
              <div key={i} style={statCard} className="stat-card">
                <div style={statCardNum}>{s.num}</div>
                <div style={statCardLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <section style={testimonialSection}>
          <div style={sectionLabel}>Testimonials</div>
          <h2 style={{ ...sectionTitle, textAlign: "center", marginBottom: "52px" }}>
            Trusted Across Campus
          </h2>

          <div style={testimonialCard}>
            <div style={{ fontSize: "56px", color: "#E07A3A", lineHeight: "1", marginBottom: "20px", fontFamily: "serif" }}>"</div>
            <p style={testimonialQuote}>
              EduTrack transformed how our university operates. Managing 5,000 students
              used to be chaos — now everything is streamlined, transparent, and fast.
            </p>
            <div style={testimonialAuthor}>
              <div style={authorAvatar}>VP</div>
              <div style={{ textAlign: "left" }}>
                <div style={authorName}>Dr. Vikram Patil</div>
                <div style={authorRole}>Vice Chancellor, EduTrack University</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={ctaBanner}>
          <div style={ctaOverlay} />
          <h2 style={ctaTitle}>Ready to Transform Your University Management?</h2>
          <Link to="/login">
            <button style={ctaWhiteBtn} className="cta-btn">Get Started Today →</button>
          </Link>
        </section>

        {/* ── FOOTER ── */}
        <footer id="contact" style={footer}>
          <div style={footerGrid}>
            <div>
              <div style={{ ...navLogo }}>
                <div style={{ ...logoMark }}>E</div>
                <span style={{ ...logoText, color: "white" }}>EduTrack</span>
              </div>
              <p style={footerBrand}>
                A modern university management system built for students,
                faculty, and administrators across the globe.
              </p>
            </div>

            <div>
              <div style={footerHeading}>Platform</div>
              {["Students", "Faculty", "Admin", "Reports"].map(l => (
                <a key={l} href="#" style={footerLink} className="footer-link">{l}</a>
              ))}
            </div>

            <div>
              <div style={footerHeading}>Support</div>
              {["Help Center", "Documentation", "Contact Us", "System Status"].map(l => (
                <a key={l} href="#" style={footerLink} className="footer-link">{l}</a>
              ))}
            </div>

            <div>
              <div style={footerHeading}>Legal</div>
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map(l => (
                <a key={l} href="#" style={footerLink} className="footer-link">{l}</a>
              ))}
            </div>
          </div>

          <div style={footerBottom}>
            <span>© 2026 EduTrack University Portal. All Rights Reserved.</span>
             <span>developer by g-one</span>
            <div style={divider}>
              <a href="#" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>Privacy</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>Terms</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
};

export default Home;