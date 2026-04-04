import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
    padding: scrolled ? "0 clamp(20px, 5vw, 80px)" : "0 clamp(20px, 5vw, 80px)",
    height: scrolled ? "60px" : "72px",
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
    width: "38px",
    height: "38px",
    background: "linear-gradient(135deg, #C45B1A 0%, #E07A3A 100%)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    fontFamily: "'Playfair Display', serif",
    letterSpacing: "-0.5px",
    boxShadow: "0 4px 12px rgba(196,91,26,0.35)",
    flexShrink: 0
  };

  const logoText = {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: scrolled ? "#1A2B52" : "#FFFFFF",
    letterSpacing: "-0.3px",
    fontFamily: "'Playfair Display', serif",
    transition: "color 0.35s ease"
  };

  const navLinks = {
    display: "flex",
    alignItems: "center",
    gap: "4px"
  };

  const navLink = {
    fontSize: "0.875rem",
    color: scrolled ? "#4A5568" : "rgba(255,255,255,0.85)",
    textDecoration: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "500",
    letterSpacing: "0.02em",
    padding: "8px 14px",
    borderRadius: "8px",
    transition: "all 0.2s ease"
  };

  const navBtns = {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  };

  const loginBtn = {
    padding: "8px 18px",
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
    padding: "8px 18px",
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
    padding: "100px clamp(20px, 6vw, 80px) 80px"
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
    width: "100%",
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
    padding: "7px 18px",
    fontSize: "0.72rem",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "600",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "24px",
    backdropFilter: "blur(8px)"
  };

  const badgeDot = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#E07A3A",
    animation: "pulse 2s infinite",
    flexShrink: 0
  };

  const heroTitle = {
    fontSize: "clamp(2.2rem, 6vw, 4.4rem)",
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: "1.12",
    letterSpacing: "-1px",
    marginBottom: "20px",
    fontFamily: "'Playfair Display', serif"
  };

  const heroSpan = {
    color: "#E07A3A",
    position: "relative",
    display: "inline-block"
  };

  const heroSubtitle = {
    fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
    color: "rgba(255,255,255,0.65)",
    lineHeight: "1.8",
    maxWidth: "560px",
    margin: "0 auto 36px auto",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "400"
  };

  const heroCTA = {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap"
  };

  const primaryBtn = {
    padding: "13px clamp(24px, 4vw, 38px)",
    background: "linear-gradient(135deg, #C45B1A, #E07A3A)",
    color: "white",
    border: "none",
    borderRadius: "11px",
    fontSize: "0.92rem",
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
    padding: "13px clamp(24px, 4vw, 38px)",
    background: "rgba(255,255,255,0.07)",
    color: "rgba(255,255,255,0.9)",
    border: "1.5px solid rgba(255,255,255,0.2)",
    borderRadius: "11px",
    fontSize: "0.92rem",
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
    marginTop: "60px",
    paddingTop: "40px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    flexWrap: "wrap"
  };

  const heroStat = {
    textAlign: "center",
    padding: "16px clamp(20px, 4vw, 48px)",
    borderRight: "1px solid rgba(255,255,255,0.08)"
  };

  const heroStatNum = {
    display: "block",
    fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
    fontWeight: "700",
    color: "#E07A3A",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1"
  };

  const heroStatLabel = {
    display: "block",
    fontSize: "0.72rem",
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
    padding: "18px clamp(20px, 5vw, 80px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    borderBottom: "1px solid #EDE9E2",
    flexWrap: "wrap"
  };

  const trustText = {
    fontSize: "0.75rem",
    color: "#9CA3AF",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "500",
    letterSpacing: "0.05em",
    textTransform: "uppercase"
  };

  const trustBadges = {
    display: "flex",
    gap: "clamp(12px, 3vw, 32px)",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center"
  };

  const trustBadge = {
    fontSize: "0.82rem",
    color: "#6B7280",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "6px"
  };

  /* ─── FEATURES ─── */
  const featuresSection = {
    padding: "80px clamp(20px, 6vw, 80px)",
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
    fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
    fontWeight: "700",
    color: "#1A2B52",
    letterSpacing: "-0.6px",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "16px",
    lineHeight: "1.2"
  };

  const sectionDesc = {
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
    color: "#6B7280",
    fontFamily: "'DM Sans', sans-serif",
    maxWidth: "500px",
    lineHeight: "1.75",
    marginBottom: "50px"
  };

  const cardsGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px"
  };

  const featureCard = {
    background: "#FFFFFF",
    border: "1px solid #EDE9E2",
    borderRadius: "20px",
    padding: "clamp(24px, 4vw, 40px) clamp(20px, 3vw, 34px)",
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
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "22px",
    fontSize: "22px"
  };

  const cardTitle = {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1A2B52",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "10px"
  };

  const cardDesc = {
    fontSize: "0.88rem",
    color: "#6B7280",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: "1.7"
  };

  const cardLink = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "20px",
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
    padding: "80px clamp(20px, 6vw, 80px)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "60px",
    alignItems: "center"
  };

  const highlightTitle = {
    fontSize: "clamp(1.6rem, 2.5vw, 2.6rem)",
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1.2",
    letterSpacing: "-0.5px",
    marginBottom: "16px"
  };

  const highlightDesc = {
    fontSize: "clamp(0.875rem, 1.5vw, 0.95rem)",
    color: "rgba(255,255,255,0.6)",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: "1.8",
    marginBottom: "32px"
  };

  const checkList = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  };

  const checkItem = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "0.9rem",
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
    gap: "14px"
  };

  const statCard = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "clamp(20px, 3vw, 30px) clamp(18px, 2.5vw, 26px)",
    transition: "all 0.25s ease"
  };

  const statCardNum = {
    fontSize: "clamp(2rem, 4vw, 2.6rem)",
    fontWeight: "700",
    color: "#E07A3A",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1"
  };

  const statCardLabel = {
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.45)",
    fontFamily: "'DM Sans', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginTop: "8px"
  };

  /* ─── TESTIMONIAL ─── */
  const testimonialSection = {
    padding: "80px clamp(20px, 6vw, 80px)",
    background: "#F4F0E8",
    textAlign: "center"
  };

  const testimonialCard = {
    maxWidth: "680px",
    margin: "0 auto",
    background: "#FFFFFF",
    border: "1px solid #EDE9E2",
    borderRadius: "24px",
    padding: "clamp(32px, 5vw, 60px)",
    position: "relative",
    boxShadow: "0 24px 80px rgba(0,0,0,0.07)"
  };

  const testimonialQuote = {
    fontSize: "clamp(1rem, 2vw, 1.2rem)",
    color: "#374151",
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
    lineHeight: "1.85",
    marginBottom: "32px"
  };

  const testimonialAuthor = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px"
  };

  const authorAvatar = {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1A2B52, #2D4A7A)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "13px",
    fontWeight: "600",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 12px rgba(26,43,82,0.3)",
    flexShrink: 0
  };

  const authorName = {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#1A2B52",
    fontFamily: "'DM Sans', sans-serif"
  };

  const authorRole = {
    fontSize: "0.78rem",
    color: "#9CA3AF",
    fontFamily: "'DM Sans', sans-serif",
    marginTop: "2px"
  };

  /* ─── CTA BANNER ─── */
  const ctaBanner = {
    background: "linear-gradient(135deg, #C45B1A 0%, #B8501A 40%, #E07A3A 100%)",
    padding: "70px clamp(20px, 6vw, 80px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "28px",
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
    fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1.25",
    maxWidth: "520px",
    letterSpacing: "-0.4px",
    zIndex: 1
  };

  const ctaWhiteBtn = {
    padding: "13px clamp(24px, 4vw, 38px)",
    background: "#FFFFFF",
    color: "#C45B1A",
    border: "none",
    borderRadius: "11px",
    fontSize: "0.92rem",
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
    padding: "60px clamp(20px, 6vw, 80px) 0"
  };

  const footerGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "40px",
    marginBottom: "48px"
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
    fontSize: "0.7rem",
    fontWeight: "700",
    color: "rgba(255,255,255,0.35)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
    marginBottom: "18px"
  };

  const footerLink = {
    display: "block",
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.6)",
    fontFamily: "'DM Sans', sans-serif",
    textDecoration: "none",
    marginBottom: "10px",
    transition: "color 0.2s"
  };

  const footerBottom = {
    borderTop: "1px solid rgba(255,255,255,0.07)",
    padding: "22px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.3)",
    fontFamily: "'DM Sans', sans-serif"
  };

  const divider = {
    display: "flex",
    gap: "20px"
  };

  /* ─── HAMBURGER ─── */
  const hamburger = {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    background: "transparent",
    border: "none"
  };

  const hamburgerLine = {
    width: "22px",
    height: "2px",
    background: scrolled ? "#1A2B52" : "#FFFFFF",
    borderRadius: "2px",
    transition: "all 0.25s ease"
  };

  /* ─── MOBILE MENU ─── */
  const mobileMenu = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(26,43,82,0.98)",
    backdropFilter: "blur(20px)",
    zIndex: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transform: menuOpen ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)"
  };

  const mobileNavLink = {
    fontSize: "1.5rem",
    color: "rgba(255,255,255,0.85)",
    textDecoration: "none",
    fontFamily: "'Playfair Display', serif",
    fontWeight: "600",
    padding: "14px 40px",
    borderRadius: "12px",
    transition: "all 0.2s ease",
    textAlign: "center"
  };

  const mobileClose = {
    position: "absolute",
    top: "20px",
    right: "24px",
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "1.8rem",
    cursor: "pointer",
    padding: "8px",
    lineHeight: "1"
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
        .nav-login-btn:hover { background: rgba(196,91,26,0.06) !important; }
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
        .mobile-nav-link:hover { background: rgba(255,255,255,0.08); color: #E07A3A !important; }

        .hero-stat:last-child { border-right: none !important; }

        /* ── RESPONSIVE ── */

        /* Tablet */
        @media (max-width: 900px) {
          .nav-links-desktop { display: none !important; }
          .nav-btns-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .hero-stats-wrap {
            flex-direction: column !important;
            gap: 0 !important;
          }
          .hero-stat-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.08) !important;
            padding: 18px 24px !important;
          }
          .hero-stat-item:last-child { border-bottom: none !important; }

          .highlight-strip-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }

          .stats-panel-grid {
            grid-template-columns: 1fr 1fr !important;
          }

          .footer-bottom-wrap {
            flex-direction: column !important;
            text-align: center !important;
          }

          .trust-bar-wrap {
            flex-direction: column !important;
            gap: 10px !important;
          }

          .trust-badges-wrap {
            gap: 14px !important;
            justify-content: center !important;
          }

          .cta-banner-wrap {
            flex-direction: column !important;
            text-align: center !important;
            align-items: center !important;
          }

          .testimonial-author-wrap {
            flex-direction: column !important;
            text-align: center !important;
          }
        }

        /* Large mobile / small tablet */
        @media (min-width: 601px) and (max-width: 900px) {
          .highlight-strip-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>

      <div style={page}>

        {/* ── MOBILE MENU OVERLAY ── */}
        <div style={mobileMenu}>
          <button style={mobileClose} onClick={() => setMenuOpen(false)}>✕</button>
          <a href="#features" style={mobileNavLink} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#about" style={mobileNavLink} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" style={mobileNavLink} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Contact</a>
          <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button style={{ ...loginBtn, color: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(255,255,255,0.4)" }}>Login</button>
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              <button style={{ ...registerBtn }}>Register</button>
            </Link>
          </div>
        </div>

        {/* ── NAVBAR ── */}
        <nav style={navbar}>
          <div style={navLogo}>
            <div style={logoMark}>E</div>
            <span style={logoText}>EduTrack</span>
          </div>

          <div style={navLinks} className="nav-links-desktop">
            <a href="#features" style={navLink} className="nav-link-item">Features</a>
            <a href="#about" style={navLink} className="nav-link-item">About</a>
            <a href="#contact" style={navLink} className="nav-link-item">Contact</a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="nav-btns-desktop">
              <Link to="/login">
                <button style={loginBtn} className="nav-login-btn">Login</button>
              </Link>
              <Link to="/register">
                <button style={registerBtn} className="nav-register-btn">Register</button>
              </Link>
            </div>
            <button
              style={{ ...hamburger }}
              className="hamburger-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span style={hamburgerLine}></span>
              <span style={hamburgerLine}></span>
              <span style={hamburgerLine}></span>
            </button>
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

            <div style={heroStats} className="hero-stats-wrap">
              {[
                { num: "5,000+", label: "Students" },
                { num: "50+", label: "Courses" },
                { num: "100+", label: "Faculty" }
              ].map((s, i) => (
                <div
                  key={i}
                  style={i < 2 ? heroStat : { ...heroStat, borderRight: "none" }}
                  className="hero-stat hero-stat-item"
                >
                  <span style={heroStatNum}>{s.num}</span>
                  <span style={heroStatLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <div style={trustBar} className="trust-bar-wrap">
          <span style={trustText}>Trusted by</span>
          <div style={trustBadges} className="trust-badges-wrap">
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
        <section id="about" style={highlightStrip} className="highlight-strip-grid">
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

          <div style={statsPanel} className="stats-panel-grid">
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
          <h2 style={{ ...sectionTitle, textAlign: "center", marginBottom: "44px" }}>
            Trusted Across Campus
          </h2>

          <div style={testimonialCard}>
            <div style={{ fontSize: "52px", color: "#E07A3A", lineHeight: "1", marginBottom: "16px", fontFamily: "serif" }}>"</div>
            <p style={testimonialQuote}>
              EduTrack transformed how our university operates. Managing 5,000 students
              used to be chaos — now everything is streamlined, transparent, and fast.
            </p>
            <div style={testimonialAuthor} className="testimonial-author-wrap">
              <div style={authorAvatar}>VP</div>
              <div style={{ textAlign: "left" }}>
                <div style={authorName}>Dr. Vikram Patil</div>
                <div style={authorRole}>Vice Chancellor, EduTrack University</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={ctaBanner} className="cta-banner-wrap">
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
                <span style={{ fontSize: "1.3rem", fontWeight: "700", color: "white", fontFamily: "'Playfair Display', serif", letterSpacing: "-0.3px" }}>EduTrack</span>
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

          <div style={footerBottom} className="footer-bottom-wrap">
            <span>© 2026 EduTrack University Portal. All Rights Reserved.</span>
            <span>developed by g-one</span>
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