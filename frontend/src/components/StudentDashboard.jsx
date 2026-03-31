import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --n900:#060E1F;--n800:#0B1A35;--n700:#112349;--n600:#1A3368;--n500:#1E4080;
  --n400:#2D5FC4;--n300:#5585E8;--n200:#9AB8F5;--n100:#D6E4FF;
  --teal:#00C2B8;--gold:#F5A623;--rose:#F04E6A;--mint:#10B981;--violet:#7C5CFC;
  --bg:#F0F4FA;--card:#FFFFFF;--border:#D9E4F0;
  --txt1:#0B1A35;--txt2:#4A5E80;--txt3:#8CA0BF;
  --r:12px;--rs:8px;--rx:6px;
  --sd1:0 1px 3px rgba(6,14,31,.06);
  --sd2:0 4px 16px rgba(6,14,31,.09);
}
body{font-family:'Outfit',sans-serif;background:var(--bg);}
.shell{display:flex;min-height:100vh;}

/* ── SIDEBAR ── */
.sidebar{
  width:250px;min-height:100vh;background:var(--n900);
  display:flex;flex-direction:column;position:fixed;top:0;left:0;z-index:200;
  border-right:1px solid rgba(255,255,255,.05);
}
.sb-brand{
  padding:22px 18px 18px;border-bottom:1px solid rgba(255,255,255,.07);
  display:flex;align-items:center;gap:12px;
}
.sb-logo{
  width:40px;height:40px;background:linear-gradient(135deg,var(--teal),var(--n400));
  border-radius:11px;display:flex;align-items:center;justify-content:center;
  font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:#fff;
  flex-shrink:0;box-shadow:0 4px 14px rgba(0,194,184,.4);
}
.sb-brand-text h2{font-size:16px;font-weight:800;color:#fff;letter-spacing:-.3px;}
.sb-brand-text span{font-size:10px;color:var(--n200);font-weight:500;letter-spacing:.8px;text-transform:uppercase;}

/* Student Profile */
.sb-profile{
  padding:16px 18px;border-bottom:1px solid rgba(255,255,255,.07);
  display:flex;align-items:center;gap:11px;
}
.sb-avatar{
  width:46px;height:46px;border-radius:50%;
  background:linear-gradient(135deg,var(--teal) 0%,var(--n400) 100%);
  display:flex;align-items:center;justify-content:center;
  font-size:18px;color:#fff;font-weight:700;flex-shrink:0;
  border:2.5px solid rgba(255,255,255,.15);position:relative;
}
.sb-avatar-dot{
  position:absolute;bottom:1px;right:1px;width:10px;height:10px;
  border-radius:50%;background:var(--mint);border:2px solid var(--n900);
}
.sb-profile-info h4{font-size:13px;font-weight:700;color:#fff;line-height:1.2;}
.sb-profile-info p{font-size:10.5px;color:var(--n200);font-weight:500;margin-top:2px;}
.sb-stu-badge{
  margin-left:auto;flex-shrink:0;
  background:rgba(0,194,184,.2);border:1px solid rgba(0,194,184,.35);
  color:var(--teal);font-size:9.5px;font-weight:700;
  padding:3px 8px;border-radius:20px;letter-spacing:.4px;
}

/* Sidebar stats mini */
.sb-mini-stats{
  padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.07);
  display:grid;grid-template-columns:1fr 1fr;gap:8px;
}
.sb-mini-stat{
  background:rgba(255,255,255,.05);border-radius:8px;
  padding:10px 10px;text-align:center;border:1px solid rgba(255,255,255,.07);
}
.sb-mini-val{font-size:18px;font-weight:800;color:#fff;font-family:'JetBrains Mono',monospace;line-height:1;}
.sb-mini-lbl{font-size:9.5px;color:var(--n200);font-weight:500;margin-top:3px;text-transform:uppercase;letter-spacing:.6px;}

/* Nav */
.sb-nav{padding:14px 10px;flex:1;}
.sb-sec-lbl{font-size:9px;font-weight:700;color:var(--n300);text-transform:uppercase;letter-spacing:1.4px;padding:0 8px 8px;margin-top:4px;}
.sb-item{
  display:flex;align-items:center;gap:10px;
  padding:9px 10px;border-radius:var(--rx);cursor:pointer;margin-bottom:2px;
  transition:all .18s;color:var(--txt3);font-size:13px;font-weight:500;
  border:1px solid transparent;position:relative;
}
.sb-item:hover{background:rgba(255,255,255,.06);color:#fff;border-color:rgba(255,255,255,.07);}
.sb-item.active{
  background:linear-gradient(90deg,rgba(0,194,184,.25) 0%,rgba(0,194,184,.07) 100%);
  color:#fff;border-color:rgba(0,194,184,.25);
}
.sb-item.active .sb-item-icon{background:rgba(0,194,184,.3);color:var(--teal);box-shadow:0 3px 10px rgba(0,194,184,.3);}
.sb-item-icon{
  width:29px;height:29px;border-radius:7px;
  display:flex;align-items:center;justify-content:center;
  font-size:14px;flex-shrink:0;background:rgba(255,255,255,.07);transition:all .18s;
}
.sb-item-label{flex:1;}
.sb-active-bar{position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:18px;border-radius:0 3px 3px 0;background:var(--teal);}
.sb-divider{height:1px;background:rgba(255,255,255,.06);margin:10px 0;}
.sb-bottom{padding:12px 10px;border-top:1px solid rgba(255,255,255,.07);}
.btn-logout-sb{
  width:100%;display:flex;align-items:center;gap:9px;
  padding:10px 12px;border-radius:var(--rx);
  background:rgba(240,78,106,.12);border:1px solid rgba(240,78,106,.25);
  color:#F04E6A;font-size:13px;font-weight:600;
  cursor:pointer;transition:all .18s;font-family:'Outfit',sans-serif;
}
.btn-logout-sb:hover{background:rgba(240,78,106,.22);border-color:rgba(240,78,106,.5);}

/* ── PANEL ── */
.panel{margin-left:250px;flex:1;display:flex;flex-direction:column;min-height:100vh;}

/* ── HEADER ── */
.header{
  background:var(--card);border-bottom:1px solid var(--border);
  padding:0 28px;height:66px;
  display:flex;align-items:center;justify-content:space-between;
  position:sticky;top:0;z-index:100;
  box-shadow:0 2px 12px rgba(6,14,31,.06);
}
.header-left{display:flex;align-items:center;gap:14px;}
.breadcrumb{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--txt3);font-weight:500;}
.breadcrumb strong{color:var(--txt1);font-size:14.5px;font-weight:700;}
.header-right{display:flex;align-items:center;gap:9px;}
.h-date{background:linear-gradient(135deg,var(--n700),var(--n600));color:var(--n100);font-size:11px;font-weight:600;padding:6px 13px;border-radius:20px;letter-spacing:.2px;}
.h-btn{width:36px;height:36px;border-radius:var(--rs);display:flex;align-items:center;justify-content:center;background:#F0F4FA;border:1px solid var(--border);cursor:pointer;font-size:15px;position:relative;transition:all .18s;color:var(--txt2);}
.h-btn:hover{background:var(--n100);border-color:var(--n300);}
.h-notif-dot{position:absolute;top:6px;right:7px;width:7px;height:7px;border-radius:50%;background:var(--rose);border:1.5px solid #fff;}
.h-divider{width:1px;height:26px;background:var(--border);margin:0 2px;}
.h-user{display:flex;align-items:center;gap:8px;padding:5px 11px;border-radius:var(--rs);border:1px solid var(--border);background:#F7FAFF;cursor:pointer;transition:all .18s;}
.h-user:hover{background:var(--n100);border-color:var(--n300);}
.h-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--teal),var(--n400));display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;font-weight:700;flex-shrink:0;}
.h-uname{font-size:12px;font-weight:700;color:var(--txt1);}
.h-urole{font-size:10px;color:var(--txt3);font-weight:500;}

/* ── PAGE BODY ── */
.page-body{padding:24px 28px;flex:1;}

/* Welcome Banner */
.welcome-banner{
  background:linear-gradient(135deg,var(--n800) 0%,var(--n600) 60%,var(--n500) 100%);
  border-radius:var(--r);padding:24px 28px;margin-bottom:22px;
  display:flex;align-items:center;justify-content:space-between;
  position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.08);
  box-shadow:0 8px 32px rgba(6,14,31,.2);
}
.welcome-banner::before{
  content:'';position:absolute;top:-40px;right:-40px;
  width:200px;height:200px;border-radius:50%;
  background:radial-gradient(circle,rgba(0,194,184,.18) 0%,transparent 70%);
}
.welcome-banner::after{
  content:'';position:absolute;bottom:-30px;right:120px;
  width:140px;height:140px;border-radius:50%;
  background:radial-gradient(circle,rgba(45,95,196,.2) 0%,transparent 70%);
}
.wb-left{position:relative;z-index:1;}
.wb-greeting{font-size:12px;color:var(--n200);font-weight:600;letter-spacing:.5px;text-transform:uppercase;margin-bottom:5px;}
.wb-name{font-size:24px;font-weight:800;color:#fff;letter-spacing:-.3px;margin-bottom:6px;}
.wb-sub{font-size:13px;color:var(--n200);font-weight:400;}
.wb-right{position:relative;z-index:1;display:flex;align-items:center;gap:24px;}
.wb-stat{text-align:center;}
.wb-stat-val{font-size:28px;font-weight:800;color:#fff;font-family:'JetBrains Mono',monospace;line-height:1;}
.wb-stat-lbl{font-size:10.5px;color:var(--n200);font-weight:600;margin-top:3px;text-transform:uppercase;letter-spacing:.6px;}
.wb-divider{width:1px;height:48px;background:rgba(255,255,255,.12);}

/* Stat cards */
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;margin-bottom:22px;}
.stat-card{
  background:var(--card);border-radius:var(--r);border:1px solid var(--border);
  padding:16px 18px;box-shadow:var(--sd1);
  display:flex;align-items:flex-start;gap:12px;
  transition:box-shadow .2s,transform .2s;position:relative;overflow:hidden;
}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;}
.stat-card:nth-child(1)::before{background:linear-gradient(90deg,var(--teal),#00E5D8);}
.stat-card:nth-child(2)::before{background:linear-gradient(90deg,var(--n400),var(--n300));}
.stat-card:nth-child(3)::before{background:linear-gradient(90deg,var(--mint),#6EE7B7);}
.stat-card:nth-child(4)::before{background:linear-gradient(90deg,var(--gold),#FFCA6B);}
.stat-card:hover{box-shadow:var(--sd2);transform:translateY(-2px);}
.stat-icon{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:19px;flex-shrink:0;}
.stat-val{font-size:24px;font-weight:800;color:var(--txt1);font-family:'JetBrains Mono',monospace;line-height:1;}
.stat-lbl{font-size:11.5px;color:var(--txt2);font-weight:500;margin-top:4px;}
.stat-pill{font-size:10.5px;font-weight:600;padding:2px 8px;border-radius:20px;margin-top:6px;display:inline-block;}
.p-green{background:#D1FAE5;color:#065F46;}
.p-blue{background:var(--n100);color:var(--n600);}
.p-gold{background:#FEF3C7;color:#92400E;}

/* Section header */
.sec-hd{display:flex;align-items:center;gap:10px;margin-bottom:13px;}
.sec-ttl{font-size:12px;font-weight:800;color:var(--txt1);letter-spacing:.3px;text-transform:uppercase;white-space:nowrap;}
.sec-line{flex:1;height:1px;background:var(--border);}

/* REPORT CARD TABLE */
.tbl-wrap{background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sd1);overflow:hidden;margin-bottom:22px;}
.tbl-bar{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:linear-gradient(180deg,#FAFCFF 0%,#fff 100%);}
.tbl-ttl{font-size:13.5px;font-weight:700;color:var(--txt1);}
.tbl-sub{font-size:11.5px;color:var(--txt3);font-weight:500;}
table{width:100%;border-collapse:collapse;}
thead tr{background:#F2F6FC;border-bottom:2px solid var(--border);}
th{padding:10px 18px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--txt2);}
tbody tr{border-bottom:1px solid #F2F6FC;transition:background .15s;}
tbody tr:last-child{border-bottom:none;}
tbody tr:hover{background:#F7FAFF;}
td{padding:12px 18px;font-size:13px;color:var(--txt1);}
.gp{display:inline-flex;align-items:center;justify-content:center;padding:3px 12px;border-radius:20px;font-size:12px;font-weight:700;font-family:'JetBrains Mono',monospace;}
.gA{background:#D1FAE5;color:#065F46;}
.gB{background:#DBEAFE;color:#1E3A8A;}
.gC{background:#FEF3C7;color:#92400E;}
.gD{background:#FEE2E2;color:#991B1B;}
.marks-bar-wrap{display:flex;align-items:center;gap:9px;}
.marks-bar-bg{flex:1;height:6px;border-radius:3px;background:#EEF2F7;overflow:hidden;max-width:100px;}
.marks-bar-fill{height:100%;border-radius:3px;transition:width .5s;}

/* ATTENDANCE */
.att-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-bottom:22px;}
.att-summary-card{
  background:var(--card);border-radius:var(--r);border:1px solid var(--border);
  box-shadow:var(--sd1);padding:20px;
}
.att-summary-title{font-size:13.5px;font-weight:700;color:var(--txt1);margin-bottom:16px;display:flex;align-items:center;gap:8px;}
.att-ring-wrap{display:flex;align-items:center;gap:20px;}
.att-ring{position:relative;width:90px;height:90px;flex-shrink:0;}
.att-ring svg{width:90px;height:90px;transform:rotate(-90deg);}
.att-ring-track{fill:none;stroke:#EEF2F7;stroke-width:8;}
.att-ring-fill{fill:none;stroke-width:8;stroke-linecap:round;transition:stroke-dashoffset .8s ease;}
.att-ring-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;}
.att-ring-pct{font-size:17px;font-weight:800;color:var(--txt1);font-family:'JetBrains Mono',monospace;line-height:1;}
.att-ring-sub{font-size:9px;color:var(--txt3);font-weight:600;text-transform:uppercase;margin-top:2px;}
.att-ring-info{flex:1;}
.att-ring-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
.att-ring-lbl{font-size:12px;color:var(--txt2);font-weight:500;display:flex;align-items:center;gap:6px;}
.att-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.att-ring-val{font-size:13px;font-weight:700;color:var(--txt1);font-family:'JetBrains Mono',monospace;}

/* Attendance list */
.att-list-card{
  background:var(--card);border-radius:var(--r);border:1px solid var(--border);
  box-shadow:var(--sd1);overflow:hidden;
}
.att-list-hd{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:linear-gradient(180deg,#FAFCFF 0%,#fff 100%);}
.att-list-ttl{font-size:13.5px;font-weight:700;color:var(--txt1);}
.att-scroll{max-height:300px;overflow-y:auto;padding:8px 0;}
.att-scroll::-webkit-scrollbar{width:4px;}
.att-scroll::-webkit-scrollbar-track{background:transparent;}
.att-scroll::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px;}
.att-item{
  display:flex;align-items:center;gap:12px;
  padding:10px 18px;transition:background .15s;
  border-bottom:1px solid #F7FAFF;
}
.att-item:last-child{border-bottom:none;}
.att-item:hover{background:#F7FAFF;}
.att-item-date{
  width:46px;height:46px;border-radius:10px;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:#F0F4FA;flex-shrink:0;
}
.att-item-day{font-size:16px;font-weight:800;color:var(--txt1);font-family:'JetBrains Mono',monospace;line-height:1;}
.att-item-mon{font-size:9.5px;color:var(--txt3);font-weight:600;text-transform:uppercase;letter-spacing:.5px;}
.att-item-info{flex:1;}
.att-item-course{font-size:13px;font-weight:600;color:var(--txt1);}
.att-item-time{font-size:11px;color:var(--txt3);font-weight:500;margin-top:2px;}
.att-status{padding:4px 13px;border-radius:20px;font-size:11.5px;font-weight:700;flex-shrink:0;}
.att-present{background:#D1FAE5;color:#065F46;}
.att-absent{background:#FEE2E2;color:#991B1B;}
.empty-st{text-align:center;padding:36px 20px;color:var(--txt3);}
.empty-st-ic{font-size:34px;margin-bottom:8px;}
.empty-st-tx{font-size:13px;font-weight:500;}

/* ── FOOTER ── */
.footer{background:var(--n900);border-top:1px solid rgba(255,255,255,.07);padding:24px 28px;margin-top:auto;}
.footer-inner{display:grid;grid-template-columns:1fr 1fr 1fr;gap:28px;}
.footer-brand{display:flex;flex-direction:column;gap:9px;}
.footer-logo-row{display:flex;align-items:center;gap:9px;}
.footer-logo{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,var(--teal),var(--n400));display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:700;color:#fff;}
.footer-logo-name{font-size:15px;font-weight:800;color:#fff;}
.footer-desc{font-size:11.5px;color:var(--n200);font-weight:400;line-height:1.65;max-width:210px;}
.footer-col-ttl{font-size:10.5px;font-weight:700;color:var(--n200);text-transform:uppercase;letter-spacing:1.2px;margin-bottom:11px;}
.footer-links{display:flex;flex-direction:column;gap:7px;}
.footer-lnk{font-size:12px;color:var(--n300);font-weight:500;cursor:pointer;transition:color .18s;display:flex;align-items:center;gap:6px;}
.footer-lnk:hover{color:#fff;}
.footer-bottom{border-top:1px solid rgba(255,255,255,.07);margin-top:20px;padding-top:14px;display:flex;align-items:center;justify-content:space-between;}
.footer-copy{font-size:11px;color:var(--n300);font-weight:500;}
.footer-status{display:flex;align-items:center;gap:5px;font-size:11px;color:#10B981;font-weight:600;}
.status-dot{width:6px;height:6px;border-radius:50%;background:#10B981;box-shadow:0 0 0 2px rgba(16,185,129,.25);}
.footer-ver{background:rgba(45,95,196,.3);border:1px solid rgba(85,133,232,.3);color:var(--n200);font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:.5px;font-family:'JetBrains Mono',monospace;}
`;

const StudentDashboard = () => {
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [activeNav, setActiveNav] = useState('dashboard');
  const userName = localStorage.getItem('userName') || 'Student';

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const resGrades = await axios.get('http://localhost:5000/api/student/my-grades', { headers });
      setGrades(resGrades.data);
      const resAttendance = await axios.get('http://localhost:5000/api/student/my-attendance', { headers });
      setAttendance(resAttendance.data);
    } catch (err) { console.log("Fetch error:", err); }
  };

  useEffect(() => { fetchData(); }, []);

  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const absentCount = attendance.filter(a => a.status === 'Absent').length;
  const totalAtt = attendance.length;
  const attPct = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 0;
  const avgMarks = grades.length > 0 ? Math.round(grades.reduce((s, g) => s + g.marks, 0) / grades.length) : 0;

  const getGC = (g) => {
    if (!g) return '';
    if (g.startsWith('A')) return 'gA';
    if (g.startsWith('B')) return 'gB';
    if (g.startsWith('C')) return 'gC';
    return 'gD';
  };

  const getBarColor = (m) => {
    if (m >= 75) return '#10B981';
    if (m >= 50) return '#2D5FC4';
    if (m >= 35) return '#F5A623';
    return '#F04E6A';
  };

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  // ring calc
  const radius = 34;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (attPct / 100) * circ;
  const ringColor = attPct >= 75 ? '#10B981' : attPct >= 50 ? '#F5A623' : '#F04E6A';

  const navItems = [
    { key: 'dashboard', icon: '⊞', label: 'Dashboard' },
    { key: 'grades', icon: '📊', label: 'My Grades', count: grades.length },
    { key: 'attendance', icon: '🗓', label: 'Attendance', count: totalAtt },
    { key: 'courses', icon: '📚', label: 'My Courses' },
    { key: 'timetable', icon: '🕐', label: 'Timetable' },
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="shell">

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="sb-brand">
            <div className="sb-logo">ET</div>
            <div className="sb-brand-text">
              <h2>EduTrack</h2>
              <span>Student Portal</span>
            </div>
          </div>

          {/* Student Profile */}
          <div className="sb-profile">
            <div className="sb-avatar">
              {userName.charAt(0).toUpperCase()}
              <span className="sb-avatar-dot" />
            </div>
            <div className="sb-profile-info">
              <h4>{userName}</h4>
              <p>Student · Active</p>
            </div>
            <span className="sb-stu-badge">Student</span>
          </div>

          {/* Mini stats in sidebar */}
          <div className="sb-mini-stats">
            <div className="sb-mini-stat">
              <div className="sb-mini-val">{grades.length}</div>
              <div className="sb-mini-lbl">Courses</div>
            </div>
            <div className="sb-mini-stat">
              <div className="sb-mini-val" style={{ color: attPct >= 75 ? '#10B981' : '#F5A623' }}>{attPct}%</div>
              <div className="sb-mini-lbl">Attendance</div>
            </div>
          </div>

          <nav className="sb-nav">
            <div className="sb-sec-lbl">Navigation</div>
            {navItems.map(item => (
              <div
                key={item.key}
                className={`sb-item ${activeNav === item.key ? 'active' : ''}`}
                onClick={() => setActiveNav(item.key)}
              >
                {activeNav === item.key && <span className="sb-active-bar" />}
                <span className="sb-item-icon">{item.icon}</span>
                <span className="sb-item-label">{item.label}</span>
                {item.count !== undefined && (
                  <span style={{ fontSize: 10.5, fontWeight: 700, background: 'rgba(0,194,184,.2)', color: '#00C2B8', padding: '1px 7px', borderRadius: 20 }}>
                    {item.count}
                  </span>
                )}
              </div>
            ))}
            <div className="sb-divider" />
            <div className="sb-sec-lbl">Account</div>
            {[
              { key: 'profile', icon: '👤', label: 'My Profile' },
              { key: 'settings', icon: '⚙', label: 'Settings' },
            ].map(item => (
              <div key={item.key} className={`sb-item ${activeNav === item.key ? 'active' : ''}`} onClick={() => setActiveNav(item.key)}>
                <span className="sb-item-icon">{item.icon}</span>
                <span className="sb-item-label">{item.label}</span>
              </div>
            ))}
          </nav>

          <div className="sb-bottom">
            <button className="btn-logout-sb" onClick={() => { localStorage.clear(); window.location.href = '/'; }}>
              <span>⎋</span> Sign Out
            </button>
          </div>
        </aside>

        {/* ── MAIN PANEL ── */}
        <div className="panel">

          {/* HEADER */}
          <header className="header">
            <div className="header-left">
              <div className="breadcrumb">
                <span>EduTrack</span>
                <span style={{ margin: '0 2px' }}>›</span>
                <strong>Student Dashboard</strong>
              </div>
            </div>
            <div className="header-right">
              <div className="h-date">📅 {today}</div>
              <div className="h-btn" title="Notifications">🔔<span className="h-notif-dot" /></div>
              <div className="h-btn" title="Messages">💬</div>
              <div className="h-btn" title="Help">❓</div>
              <div className="h-divider" />
              <div className="h-user">
                <div className="h-avatar">{userName.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="h-uname">{userName}</div>
                  <div className="h-urole">Student</div>
                </div>
                <span style={{ color: '#8CA0BF', fontSize: 11, marginLeft: 3 }}>▾</span>
              </div>
            </div>
          </header>

          {/* PAGE BODY */}
          <main className="page-body">

            {/* Welcome Banner */}
            <div className="welcome-banner">
              <div className="wb-left">
                <div className="wb-greeting">Welcome back 👋</div>
                <div className="wb-name">{userName}</div>
                <div className="wb-sub">Here's a summary of your academic progress today.</div>
              </div>
              <div className="wb-right">
                <div className="wb-stat">
                  <div className="wb-stat-val">{avgMarks}</div>
                  <div className="wb-stat-lbl">Avg Marks</div>
                </div>
                <div className="wb-divider" />
                <div className="wb-stat">
                  <div className="wb-stat-val">{attPct}%</div>
                  <div className="wb-stat-lbl">Attendance</div>
                </div>
                <div className="wb-divider" />
                <div className="wb-stat">
                  <div className="wb-stat-val">{grades.length}</div>
                  <div className="wb-stat-lbl">Courses</div>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="stats-grid">
              {[
                { icon: '📚', val: grades.length, lbl: 'Enrolled Courses', pill: 'Active', cls: 'p-blue', bg: 'rgba(0,194,184,.1)' },
                { icon: '📝', val: avgMarks, lbl: 'Average Marks', pill: avgMarks >= 75 ? 'Excellent' : avgMarks >= 50 ? 'Good' : 'Needs Work', cls: avgMarks >= 75 ? 'p-green' : 'p-gold', bg: 'rgba(45,95,196,.1)' },
                { icon: '✅', val: presentCount, lbl: 'Classes Present', pill: `${attPct}% rate`, cls: 'p-green', bg: 'rgba(16,185,129,.1)' },
                { icon: '❌', val: absentCount, lbl: 'Classes Absent', pill: absentCount === 0 ? 'Perfect!' : 'Check record', cls: absentCount === 0 ? 'p-green' : 'p-gold', bg: 'rgba(245,166,35,.1)' },
              ].map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
                  <div>
                    <div className="stat-val">{s.val}</div>
                    <div className="stat-lbl">{s.lbl}</div>
                    <span className={`stat-pill ${s.cls}`}>{s.pill}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* REPORT CARD */}
            <div className="sec-hd"><span className="sec-ttl">My Report Card</span><div className="sec-line" /></div>
            <div className="tbl-wrap">
              <div className="tbl-bar">
                <span className="tbl-ttl">Grade Overview — All Courses</span>
                <span className="tbl-sub">{grades.length} subject{grades.length !== 1 ? 's' : ''} enrolled</span>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Marks</th>
                    <th>Performance</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.length === 0 ? (
                    <tr><td colSpan="5">
                      <div className="empty-st">
                        <div className="empty-st-ic">📋</div>
                        <div className="empty-st-tx">No grades recorded yet</div>
                      </div>
                    </td></tr>
                  ) : grades.map((g, i) => (
                    <tr key={g._id}>
                      <td style={{ color: '#8CA0BF', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{String(i + 1).padStart(2, '0')}</td>
                      <td style={{ fontWeight: 600 }}>{g.enrollment?.course?.title}</td>
                      <td>
                        <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: 14 }}>{g.marks}</span>
                        <span style={{ color: '#8CA0BF', fontSize: 11 }}>/100</span>
                      </td>
                      <td>
                        <div className="marks-bar-wrap">
                          <div className="marks-bar-bg">
                            <div className="marks-bar-fill" style={{ width: `${g.marks}%`, background: getBarColor(g.marks) }} />
                          </div>
                          <span style={{ fontSize: 11, color: getBarColor(g.marks), fontWeight: 600 }}>
                            {g.marks >= 75 ? 'Excellent' : g.marks >= 50 ? 'Good' : g.marks >= 35 ? 'Average' : 'Low'}
                          </span>
                        </div>
                      </td>
                      <td><span className={`gp ${getGC(g.grade)}`}>{g.grade}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ATTENDANCE */}
            <div className="sec-hd"><span className="sec-ttl">Attendance Record</span><div className="sec-line" /></div>
            <div className="att-grid">

              {/* Summary donut card */}
              <div className="att-summary-card">
                <div className="att-summary-title">
                  <span style={{ fontSize: 16 }}>📈</span> Attendance Summary
                </div>
                <div className="att-ring-wrap">
                  <div className="att-ring">
                    <svg viewBox="0 0 90 90">
                      <circle className="att-ring-track" cx="45" cy="45" r={radius} />
                      <circle
                        className="att-ring-fill"
                        cx="45" cy="45" r={radius}
                        stroke={ringColor}
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                      />
                    </svg>
                    <div className="att-ring-text">
                      <div className="att-ring-pct">{attPct}%</div>
                      <div className="att-ring-sub">Rate</div>
                    </div>
                  </div>
                  <div className="att-ring-info">
                    {[
                      { color: '#10B981', label: 'Present', val: presentCount },
                      { color: '#F04E6A', label: 'Absent', val: absentCount },
                      { color: '#5585E8', label: 'Total', val: totalAtt },
                    ].map(row => (
                      <div className="att-ring-row" key={row.label}>
                        <span className="att-ring-lbl">
                          <span className="att-dot" style={{ background: row.color }} />
                          {row.label}
                        </span>
                        <span className="att-ring-val">{row.val}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 10, padding: '8px 12px', borderRadius: 8, background: attPct >= 75 ? '#D1FAE5' : '#FEF3C7', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13 }}>{attPct >= 75 ? '✅' : '⚠️'}</span>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: attPct >= 75 ? '#065F46' : '#92400E' }}>
                        {attPct >= 75 ? 'Good standing!' : 'Below 75% threshold'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance list */}
              <div className="att-list-card">
                <div className="att-list-hd">
                  <span className="att-list-ttl">Detailed Log</span>
                  <span style={{ fontSize: 11.5, color: '#8CA0BF', fontWeight: 500 }}>{totalAtt} records</span>
                </div>
                <div className="att-scroll">
                  {attendance.length === 0 ? (
                    <div className="empty-st">
                      <div className="empty-st-ic">🗓</div>
                      <div className="empty-st-tx">No attendance records yet</div>
                    </div>
                  ) : attendance.slice().reverse().map(a => {
                    const d = new Date(a.date);
                    return (
                      <div className="att-item" key={a._id}>
                        <div className="att-item-date">
                          <div className="att-item-day">{d.getDate()}</div>
                          <div className="att-item-mon">{d.toLocaleString('en', { month: 'short' })}</div>
                        </div>
                        <div className="att-item-info">
                          <div className="att-item-course">{a.course?.title}</div>
                          <div className="att-item-time">{d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric' })}</div>
                        </div>
                        <span className={`att-status ${a.status === 'Present' ? 'att-present' : 'att-absent'}`}>
                          {a.status === 'Present' ? '✓ Present' : '✗ Absent'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </main>

          {/* ── FOOTER ── */}
          <footer className="footer">
            <div className="footer-inner">
              <div className="footer-brand">
                <div className="footer-logo-row">
                  <div className="footer-logo">ET</div>
                  <span className="footer-logo-name">EduTrack</span>
                </div>
                <p className="footer-desc">Your personal academic hub. Track grades, attendance, and course progress in one place.</p>
              </div>
              <div>
                <div className="footer-col-ttl">Student Links</div>
                <div className="footer-links">
                  {['⊞  Dashboard', '📊  My Grades', '🗓  Attendance', '📚  Courses'].map(l => (
                    <span key={l} className="footer-lnk">{l}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="footer-col-ttl">Support</div>
                <div className="footer-links">
                  {['🏫  Institution Portal', '📖  Student Handbook', '🛠  Help Desk', '🔒  Privacy Policy'].map(l => (
                    <span key={l} className="footer-lnk">{l}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span className="footer-copy">© {new Date().getFullYear()} EduTrack LMS. All rights reserved.</span>
              <div className="footer-status"><span className="status-dot" />All systems operational</div>
              <span className="footer-ver">v2.4.1</span>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
};

export default StudentDashboard;