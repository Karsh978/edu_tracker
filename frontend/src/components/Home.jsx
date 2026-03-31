import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {

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
    padding: "0 80px",
    height: "72px",
    background: "#FFFFFF",
    borderBottom: "1px solid #E8E4DD",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 16px rgba(0,0,0,0.05)"
  };

  const navLogo = {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  };

  const logoMark = {
    width: "36px",
    height: "36px",
    background: "linear-gradient(135deg, #C45B1A 0%, #E07A3A 100%)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "700",
    fontSize: "16px",
    fontFamily: "'Playfair Display', serif",
    letterSpacing: "-0.5px"
  };

  const logoText = {
    fontSize: "1.35rem",
    fontWeight: "700",
    color: "#1A2B52",
    letterSpacing: "-0.3px",
    fontFamily: "'Playfair Display', serif"
  };

  const navLinks = {
    display: "flex",
    alignItems: "center",
    gap: "36px"
  };

  const navLink = {
    fontSize: "0.875rem",
    color: "#4A5568",
    textDecoration: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "500",
    letterSpacing: "0.02em"
  };

  const loginBtn = {
    padding: "9px 24px",
    background: "transparent",
    color: "#C45B1A",
    border: "1.5px solid #C45B1A",
    borderRadius: "8px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.875rem",
    fontWeight: "600",
    letterSpacing: "0.02em",
    transition: "all 0.2s ease"
  };

  /* ─── HERO ─── */
  const hero = {
    minHeight: "92vh",
    background: "#1A2B52",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "60px 80px"
  };

  const heroPattern = {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundImage: `radial-gradient(circle at 20% 20%, rgba(196,91,26,0.12) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(196,91,26,0.08) 0%, transparent 50%)`,
    pointerEvents: "none"
  };

  const heroContent = {
    maxWidth: "720px",
    textAlign: "center",
    zIndex: 1
  };

  const heroBadge = {
    display: "inline-block",
    background: "rgba(196,91,26,0.15)",
    color: "#E07A3A",
    border: "1px solid rgba(196,91,26,0.3)",
    borderRadius: "100px",
    padding: "6px 18px",
    fontSize: "0.8rem",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "500",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "24px"
  };

  const heroTitle = {
    fontSize: "clamp(2.6rem, 5vw, 4rem)",
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: "1.15",
    letterSpacing: "-1px",
    marginBottom: "20px",
    fontFamily: "'Playfair Display', serif"
  };

  const heroSpan = {
    color: "#E07A3A"
  };

  const heroSubtitle = {
    fontSize: "1.1rem",
    color: "rgba(255,255,255,0.7)",
    lineHeight: "1.75",
    maxWidth: "560px",
    margin: "0 auto 40px auto",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "400"
  };

  const heroCTA = {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap"
  };

  const primaryBtn = {
    padding: "14px 36px",
    background: "#C45B1A",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.02em",
    boxShadow: "0 8px 24px rgba(196,91,26,0.35)",
    transition: "all 0.2s ease"
  };

  const secondaryBtn = {
    padding: "14px 36px",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    border: "1.5px solid rgba(255,255,255,0.25)",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.02em",
    transition: "all 0.2s ease"
  };

  const heroStats = {
    display: "flex",
    justifyContent: "center",
    gap: "60px",
    marginTop: "72px",
    paddingTop: "48px",
    borderTop: "1px solid rgba(255,255,255,0.1)"
  };

  const heroStat = {
    textAlign: "center"
  };

  const heroStatNum = {
    display: "block",
    fontSize: "2.2rem",
    fontWeight: "700",
    color: "#E07A3A",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1"
  };

  const heroStatLabel = {
    display: "block",
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.55)",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "400",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    marginTop: "6px"
  };

  /* ─── FEATURES ─── */
  const featuresSection = {
    padding: "100px 80px",
    background: "#FAFAF8"
  };

  const sectionLabel = {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "#C45B1A",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
    marginBottom: "12px"
  };

  const sectionTitle = {
    fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
    fontWeight: "700",
    color: "#1A2B52",
    letterSpacing: "-0.5px",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "16px",
    lineHeight: "1.2"
  };

  const sectionDesc = {
    fontSize: "1rem",
    color: "#6B7280",
    fontFamily: "'DM Sans', sans-serif",
    maxWidth: "480px",
    lineHeight: "1.7",
    marginBottom: "56px"
  };

  const cardsGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px"
  };

  const featureCard = {
    background: "#FFFFFF",
    border: "1px solid #EDE9E2",
    borderRadius: "16px",
    padding: "36px 32px",
    transition: "all 0.25s ease",
    cursor: "default"
  };

  const cardIconWrap = {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
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
    fontSize: "0.9rem",
    color: "#6B7280",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: "1.65"
  };

  const cardLink = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "20px",
    color: "#C45B1A",
    fontSize: "0.875rem",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: "500",
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
    padding: "80px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    alignItems: "center"
  };

  const highlightTitle = {
    fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1.25",
    letterSpacing: "-0.5px",
    marginBottom: "16px"
  };

  const highlightDesc = {
    fontSize: "0.95rem",
    color: "rgba(255,255,255,0.65)",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: "1.75",
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
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#C45B1A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    color: "white",
    flexShrink: 0
  };

  const statsPanel = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  };

  const statCard = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "14px",
    padding: "28px 24px"
  };

  const statCardNum = {
    fontSize: "2.4rem",
    fontWeight: "700",
    color: "#E07A3A",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1"
  };

  const statCardLabel = {
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.5)",
    fontFamily: "'DM Sans', sans-serif",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginTop: "6px"
  };

  /* ─── TESTIMONIAL ─── */
  const testimonialSection = {
    padding: "100px 80px",
    background: "#F4F0E8",
    textAlign: "center"
  };

  const testimonialCard = {
    maxWidth: "680px",
    margin: "0 auto",
    background: "#FFFFFF",
    border: "1px solid #EDE9E2",
    borderRadius: "20px",
    padding: "52px",
    position: "relative"
  };

  const testimonialQuote = {
    fontSize: "1.15rem",
    color: "#374151",
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
    lineHeight: "1.8",
    marginBottom: "32px"
  };

  const testimonialAuthor = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px"
  };

  const authorAvatar = {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "#1A2B52",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "'DM Sans', sans-serif"
  };

  const authorName = {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#1A2B52",
    fontFamily: "'DM Sans', sans-serif"
  };

  const authorRole = {
    fontSize: "0.8rem",
    color: "#9CA3AF",
    fontFamily: "'DM Sans', sans-serif"
  };

  /* ─── CTA BANNER ─── */
  const ctaBanner = {
    background: "linear-gradient(135deg, #C45B1A 0%, #E07A3A 100%)",
    padding: "80px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "40px",
    flexWrap: "wrap"
  };

  const ctaTitle = {
    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "'Playfair Display', serif",
    lineHeight: "1.25",
    maxWidth: "480px",
    letterSpacing: "-0.3px"
  };

  const ctaWhiteBtn = {
    padding: "14px 36px",
    background: "#FFFFFF",
    color: "#C45B1A",
    border: "none",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
    flexShrink: 0
  };

  /* ─── FOOTER ─── */
  const footer = {
    background: "#0F1B35",
    color: "white",
    padding: "72px 80px 0"
  };

  const footerGrid = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "60px",
    marginBottom: "56px"
  };

  const footerBrand = {
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.5)",
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: "1.7",
    marginTop: "14px",
    maxWidth: "260px"
  };

  const footerHeading = {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
    marginBottom: "18px"
  };

  const footerLink = {
    display: "block",
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.65)",
    fontFamily: "'DM Sans', sans-serif",
    textDecoration: "none",
    marginBottom: "10px",
    transition: "color 0.2s"
  };

  const footerBottom = {
    borderTop: "1px solid rgba(255,255,255,0.08)",
    padding: "24px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.35)",
    fontFamily: "'DM Sans', sans-serif"
  };

  const divider = {
    display: "flex",
    gap: "24px"
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        a { text-decoration: none; }
        button:hover { opacity: 0.88; transform: translateY(-1px); }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,0.09); border-color: #D4C8B8; }
      `}</style>

      <div style={page}>

        {/* ── NAVBAR ── */}
        <nav style={navbar}>
          <div style={navLogo}>
            <div style={logoMark}>E</div>
            <span style={logoText}>EduTrack</span>
          </div>

          <div style={navLinks}>
            <a href="#features" style={navLink}>Features</a>
            <a href="#about" style={navLink}>About</a>
            <a href="#contact" style={navLink}>Contact</a>
          </div>

          <Link to="/login">
            <button style={loginBtn}>Login</button>
          </Link>
        </nav>

        {/* ── HERO ── */}
        <section style={hero}>
          <div style={heroPattern} />

          <div style={heroContent}>
            <div style={heroBadge}>University Management Platform</div>

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
                <button style={primaryBtn}>Access Portal →</button>
              </Link>
              <button style={secondaryBtn}>Watch Demo</button>
            </div>

            <div style={heroStats}>
              <div style={heroStat}>
                <span style={heroStatNum}>5,000+</span>
                <span style={heroStatLabel}>Students</span>
              </div>
              <div style={heroStat}>
                <span style={heroStatNum}>50+</span>
                <span style={heroStatLabel}>Courses</span>
              </div>
              <div style={heroStat}>
                <span style={heroStatNum}>100+</span>
                <span style={heroStatLabel}>Faculty</span>
              </div>
            </div>
          </div>
        </section>

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
              <div
                key={i}
                className="feature-card"
                style={featureCard}
              >
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
              {["Real-time academic progress tracking", "Role-based dashboards for all users", "Secure data management & compliance", "Easy enrollment and course handling"].map((item, i) => (
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
              <div key={i} style={statCard}>
                <div style={statCardNum}>{s.num}</div>
                <div style={statCardLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <section style={testimonialSection}>
          <div style={sectionLabel}>Testimonials</div>
          <h2 style={{ ...sectionTitle, textAlign: "center", marginBottom: "48px" }}>
            Trusted Across Campus
          </h2>

          <div style={testimonialCard}>
            <div style={{ fontSize: "48px", color: "#E07A3A", lineHeight: "1", marginBottom: "20px", fontFamily: "serif" }}>"</div>
            <p style={testimonialQuote}>
              EduTrack transformed how our university operates. Managing 5,000 students
              used to be chaos — now everything is streamlined, transparent, and fast.
            </p>
            <div style={testimonialAuthor}>
              <div style={authorAvatar}>VP</div>
              <div>
                <div style={authorName}>Dr. Vikram Patil</div>
                <div style={authorRole}>Vice Chancellor, EduTrack University</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={ctaBanner}>
          <h2 style={ctaTitle}>Ready to Transform Your University Management?</h2>
          <Link to="/login">
            <button style={ctaWhiteBtn}>Get Started Today</button>
          </Link>
        </section>

        {/* ── FOOTER ── */}
        <footer id="contact" style={footer}>
          <div style={footerGrid}>
            <div>
              <div style={{ ...navLogo, marginBottom: "0" }}>
                <div style={{ ...logoMark, background: "#C45B1A" }}>E</div>
                <span style={{ ...logoText, color: "white" }}>EduTrack</span>
              </div>
              <p style={footerBrand}>
                A modern university management system built for students,
                faculty, and administrators.
              </p>
            </div>

            <div>
              <div style={footerHeading}>Platform</div>
              {["Students", "Faculty", "Admin", "Reports"].map(l => (
                <a key={l} href="#" style={footerLink}>{l}</a>
              ))}
            </div>

            <div>
              <div style={footerHeading}>Support</div>
              {["Help Center", "Documentation", "Contact Us", "System Status"].map(l => (
                <a key={l} href="#" style={footerLink}>{l}</a>
              ))}
            </div>

            <div>
              <div style={footerHeading}>Legal</div>
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map(l => (
                <a key={l} href="#" style={footerLink}>{l}</a>
              ))}
            </div>
          </div>

          <div style={footerBottom}>
            <span>© 2026 EduTrack University Portal. All Rights Reserved.</span>
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