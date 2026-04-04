import React, { useEffect, useState, useCallback } from 'react';
import API from '../api';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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
  --sd3:0 12px 40px rgba(6,14,31,.13);
}
body{font-family:'Outfit',sans-serif;background:var(--bg);}
.shell{display:flex;min-height:100vh;}

/* SIDEBAR */
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
  width:40px;height:40px;background:linear-gradient(135deg,var(--n400),var(--teal));
  border-radius:11px;display:flex;align-items:center;justify-content:center;
  font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:700;color:#fff;
  flex-shrink:0;box-shadow:0 4px 14px rgba(45,95,196,.5);
}
.sb-brand-text h2{font-size:16px;font-weight:800;color:#fff;letter-spacing:-.3px;}
.sb-brand-text span{font-size:10px;color:var(--n200);font-weight:500;letter-spacing:.8px;text-transform:uppercase;}

/* Faculty Profile */
.sb-profile{
  padding:16px 18px;border-bottom:1px solid rgba(255,255,255,.07);
  display:flex;align-items:center;gap:11px;
}
.sb-avatar{
  width:44px;height:44px;border-radius:50%;
  background:linear-gradient(135deg,var(--n400) 0%,var(--violet) 100%);
  display:flex;align-items:center;justify-content:center;
  font-size:17px;color:#fff;font-weight:700;flex-shrink:0;
  border:2.5px solid rgba(255,255,255,.15);position:relative;
}
.sb-avatar-dot{
  position:absolute;bottom:1px;right:1px;width:10px;height:10px;
  border-radius:50%;background:var(--mint);border:2px solid var(--n900);
}
.sb-profile-info h4{font-size:13px;font-weight:700;color:#fff;line-height:1.2;}
.sb-profile-info p{font-size:10.5px;color:var(--n200);font-weight:500;margin-top:2px;}
.sb-role-badge{
  margin-left:auto;flex-shrink:0;
  background:rgba(45,95,196,.35);border:1px solid rgba(85,133,232,.4);
  color:var(--n200);font-size:9.5px;font-weight:700;
  padding:3px 8px;border-radius:20px;letter-spacing:.4px;
}

/* Nav */
.sb-nav{padding:14px 10px;flex:1;overflow-y:auto;}
.sb-sec-lbl{
  font-size:9px;font-weight:700;color:var(--n300);
  text-transform:uppercase;letter-spacing:1.4px;
  padding:0 8px 8px;margin-top:6px;
}
.sb-item{
  display:flex;align-items:center;gap:10px;
  padding:9px 10px;border-radius:var(--rx);cursor:pointer;margin-bottom:2px;
  transition:all .18s;color:var(--txt3);font-size:13px;font-weight:500;
  border:1px solid transparent;position:relative;
}
.sb-item:hover{background:rgba(255,255,255,.06);color:#fff;border-color:rgba(255,255,255,.07);}
.sb-item.active{
  background:linear-gradient(90deg,rgba(45,95,196,.4) 0%,rgba(45,95,196,.1) 100%);
  color:#fff;border-color:rgba(85,133,232,.3);
}
.sb-item.active .sb-item-icon{background:var(--n400);color:#fff;box-shadow:0 3px 10px rgba(45,95,196,.5);}
.sb-item-icon{
  width:29px;height:29px;border-radius:7px;
  display:flex;align-items:center;justify-content:center;
  font-size:14px;flex-shrink:0;background:rgba(255,255,255,.07);transition:all .18s;
}
.sb-item-label{flex:1;}
.sb-item-count{
  font-size:10.5px;font-weight:700;background:rgba(45,95,196,.35);
  color:var(--n200);padding:1px 7px;border-radius:20px;
}
.sb-active-bar{
  position:absolute;left:0;top:50%;transform:translateY(-50%);
  width:3px;height:18px;border-radius:0 3px 3px 0;background:var(--n300);
}
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

/* PANEL */
.panel{margin-left:250px;flex:1;display:flex;flex-direction:column;min-height:100vh;}

/* HEADER */
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
.h-search-wrap{position:relative;}
.h-s-icon{position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:13px;color:var(--txt3);pointer-events:none;}
.h-search{
  padding:8px 13px 8px 34px;border:1.5px solid var(--border);
  border-radius:var(--rs);font-size:12.5px;font-family:'Outfit',sans-serif;
  color:var(--txt1);background:#F7FAFF;outline:none;width:210px;transition:all .2s;
}
.h-search:focus{border-color:var(--n400);box-shadow:0 0 0 3px rgba(45,95,196,.1);background:#fff;width:250px;}
.h-search::placeholder{color:var(--txt3);}
.header-right{display:flex;align-items:center;gap:9px;}
.h-date{
  background:linear-gradient(135deg,var(--n700),var(--n600));
  color:var(--n100);font-size:11px;font-weight:600;
  padding:6px 13px;border-radius:20px;letter-spacing:.2px;
}
.h-btn{
  width:36px;height:36px;border-radius:var(--rs);
  display:flex;align-items:center;justify-content:center;
  background:#F0F4FA;border:1px solid var(--border);
  cursor:pointer;font-size:15px;position:relative;
  transition:all .18s;color:var(--txt2);
}
.h-btn:hover{background:var(--n100);border-color:var(--n300);}
.h-notif-dot{
  position:absolute;top:6px;right:7px;width:7px;height:7px;
  border-radius:50%;background:var(--rose);border:1.5px solid #fff;
}
.h-divider{width:1px;height:26px;background:var(--border);margin:0 2px;}
.h-user{
  display:flex;align-items:center;gap:8px;
  padding:5px 11px;border-radius:var(--rs);
  border:1px solid var(--border);background:#F7FAFF;
  cursor:pointer;transition:all .18s;
}
.h-user:hover{background:var(--n100);border-color:var(--n300);}
.h-avatar{
  width:28px;height:28px;border-radius:50%;
  background:linear-gradient(135deg,var(--n400),var(--violet));
  display:flex;align-items:center;justify-content:center;
  font-size:12px;color:#fff;font-weight:700;flex-shrink:0;
}
.h-uname{font-size:12px;font-weight:700;color:var(--txt1);}
.h-urole{font-size:10px;color:var(--txt3);font-weight:500;}

/* BODY */
.page-body{padding:24px 28px;flex:1;}

/* STATS */
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;margin-bottom:24px;}
.stat-card{
  background:var(--card);border-radius:var(--r);border:1px solid var(--border);
  padding:17px 18px;box-shadow:var(--sd1);
  display:flex;align-items:flex-start;gap:13px;
  transition:box-shadow .2s,transform .2s;position:relative;overflow:hidden;
}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;}
.stat-card:nth-child(1)::before{background:linear-gradient(90deg,var(--n400),var(--n300));}
.stat-card:nth-child(2)::before{background:linear-gradient(90deg,var(--teal),#00E5D8);}
.stat-card:nth-child(3)::before{background:linear-gradient(90deg,var(--violet),#A68BFF);}
.stat-card:nth-child(4)::before{background:linear-gradient(90deg,var(--gold),#FFCA6B);}
.stat-card:hover{box-shadow:var(--sd2);transform:translateY(-2px);}
.stat-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
.stat-val{font-size:26px;font-weight:800;color:var(--txt1);font-family:'JetBrains Mono',monospace;line-height:1;}
.stat-lbl{font-size:11.5px;color:var(--txt2);font-weight:500;margin-top:4px;}
.stat-trend{font-size:10.5px;font-weight:600;padding:2px 8px;border-radius:20px;margin-top:6px;display:inline-flex;align-items:center;gap:3px;}
.t-up{background:#D1FAE5;color:#065F46;}
.t-info{background:var(--n100);color:var(--n600);}

/* SECTION HEADER */
.sec-hd{display:flex;align-items:center;gap:10px;margin-bottom:13px;}
.sec-ttl{font-size:12px;font-weight:800;color:var(--txt1);letter-spacing:.3px;text-transform:uppercase;white-space:nowrap;}
.sec-line{flex:1;height:1px;background:var(--border);}

/* FORMS */
.forms-grid{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-bottom:24px;}
.card{background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sd1);overflow:hidden;transition:box-shadow .2s;}
.card:hover{box-shadow:var(--sd2);}
.card-hd{padding:14px 18px 12px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;background:linear-gradient(180deg,#FAFCFF 0%,#fff 100%);}
.card-hd-icon{width:30px;height:30px;border-radius:var(--rx);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
.card-hd-ttl{font-size:13px;font-weight:700;color:var(--txt1);}
.card-hd-sub{font-size:10.5px;color:var(--txt3);font-weight:500;margin-top:1px;}
.card-bd{padding:16px 18px;}
.fg{margin-bottom:11px;}
.fl{display:block;font-size:10.5px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.9px;margin-bottom:5px;}
.fi,.fs{
  width:100%;padding:9px 12px;border:1.5px solid var(--border);
  border-radius:var(--rs);font-size:13px;font-family:'Outfit',sans-serif;
  color:var(--txt1);background:#F7FAFF;outline:none;appearance:none;transition:all .2s;
}
.fi:focus,.fs:focus{border-color:var(--n400);box-shadow:0 0 0 3px rgba(45,95,196,.1);background:#fff;}
.fi::placeholder{color:var(--txt3);}
.fs{
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234A5E80' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 11px center;padding-right:32px;cursor:pointer;
}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:9px;}
.btn{
  padding:9px 16px;border-radius:var(--rs);font-size:12.5px;font-weight:700;
  cursor:pointer;border:none;font-family:'Outfit',sans-serif;
  display:inline-flex;align-items:center;gap:6px;transition:all .2s;
  width:100%;justify-content:center;
}
.b-blue{background:linear-gradient(135deg,var(--n500),var(--n400));color:#fff;box-shadow:0 3px 10px rgba(30,64,128,.35);}
.b-blue:hover{box-shadow:0 5px 16px rgba(30,64,128,.45);transform:translateY(-1px);}
.b-teal{background:linear-gradient(135deg,#009E96,var(--teal));color:#fff;box-shadow:0 3px 10px rgba(0,194,184,.3);}
.b-teal:hover{box-shadow:0 5px 16px rgba(0,194,184,.4);transform:translateY(-1px);}
.b-violet{background:linear-gradient(135deg,#6644F0,var(--violet));color:#fff;box-shadow:0 3px 10px rgba(124,92,252,.3);}
.b-violet:hover{box-shadow:0 5px 16px rgba(124,92,252,.4);transform:translateY(-1px);}
.b-mint{background:linear-gradient(135deg,#0C9B6E,var(--mint));color:#fff;box-shadow:0 3px 10px rgba(16,185,129,.3);}
.b-mint:hover{box-shadow:0 5px 16px rgba(16,185,129,.4);transform:translateY(-1px);}

/* CHARTS */
.charts-row{display:grid;grid-template-columns:320px 1fr;gap:13px;margin-bottom:24px;}
.chart-card{background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sd1);padding:18px;}
.chart-ttl{font-size:13px;font-weight:700;color:var(--txt1);margin-bottom:16px;display:flex;align-items:center;gap:8px;}
.chart-dot{width:8px;height:8px;border-radius:50%;}

/* TABLE */
.tbl-wrap{background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sd1);overflow:hidden;margin-bottom:24px;}
.tbl-bar{
  padding:13px 18px;border-bottom:1px solid var(--border);
  display:flex;align-items:center;gap:12px;
  background:linear-gradient(180deg,#FAFCFF 0%,#fff 100%);
}
.tbl-ttl{font-size:13px;font-weight:700;color:var(--txt1);}
.tbl-sw{position:relative;flex:1;max-width:260px;}
.tbl-si{position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:12px;color:var(--txt3);}
.tbl-search{
  width:100%;padding:7px 11px 7px 30px;border:1.5px solid var(--border);border-radius:var(--rx);
  font-size:12px;font-family:'Outfit',sans-serif;color:var(--txt1);background:#F7FAFF;outline:none;transition:all .2s;
}
.tbl-search:focus{border-color:var(--n400);box-shadow:0 0 0 3px rgba(45,95,196,.1);background:#fff;}
.tbl-search::placeholder{color:var(--txt3);}
.btn-csv{
  background:linear-gradient(135deg,#0A7C38,var(--mint));color:#fff;
  padding:7px 15px;border-radius:var(--rx);font-size:12px;font-weight:700;
  cursor:pointer;border:none;font-family:'Outfit',sans-serif;
  display:inline-flex;align-items:center;gap:5px;
  box-shadow:0 2px 8px rgba(16,185,129,.3);transition:all .2s;
}
.btn-csv:hover{box-shadow:0 4px 14px rgba(16,185,129,.4);transform:translateY(-1px);}
table{width:100%;border-collapse:collapse;}
thead tr{background:#F2F6FC;border-bottom:2px solid var(--border);}
th{padding:10px 18px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--txt2);}
tbody tr{border-bottom:1px solid #F2F6FC;transition:background .15s;}
tbody tr:last-child{border-bottom:none;}
tbody tr:hover{background:#F7FAFF;}
td{padding:11px 18px;font-size:13px;color:var(--txt1);}
.gp{display:inline-flex;align-items:center;justify-content:center;padding:3px 11px;border-radius:20px;font-size:11.5px;font-weight:700;font-family:'JetBrains Mono',monospace;}
.gA{background:#D1FAE5;color:#065F46;}
.gB{background:#DBEAFE;color:#1E3A8A;}
.gC{background:#FEF3C7;color:#92400E;}
.gD{background:#FEE2E2;color:#991B1B;}
.empty-st{text-align:center;padding:44px 20px;color:var(--txt3);}
.empty-st-ic{font-size:36px;margin-bottom:9px;}
.empty-st-tx{font-size:13px;font-weight:500;}

/* FOOTER */
.footer{background:var(--n900);border-top:1px solid rgba(255,255,255,.07);padding:26px 28px;margin-top:auto;}
.footer-inner{display:grid;grid-template-columns:1fr 1fr 1fr;gap:28px;}
.footer-brand{display:flex;flex-direction:column;gap:9px;}
.footer-logo-row{display:flex;align-items:center;gap:9px;}
.footer-logo{
  width:32px;height:32px;border-radius:9px;
  background:linear-gradient(135deg,var(--n400),var(--teal));
  display:flex;align-items:center;justify-content:center;
  font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:700;color:#fff;
}
.footer-logo-name{font-size:15px;font-weight:800;color:#fff;}
.footer-desc{font-size:11.5px;color:var(--n200);font-weight:400;line-height:1.65;max-width:210px;}
.footer-col-ttl{font-size:10.5px;font-weight:700;color:var(--n200);text-transform:uppercase;letter-spacing:1.2px;margin-bottom:11px;}
.footer-links{display:flex;flex-direction:column;gap:7px;}
.footer-lnk{font-size:12px;color:var(--n300);font-weight:500;cursor:pointer;transition:color .18s;display:flex;align-items:center;gap:6px;}
.footer-lnk:hover{color:#fff;}
.footer-bottom{
  border-top:1px solid rgba(255,255,255,.07);
  margin-top:20px;padding-top:14px;
  display:flex;align-items:center;justify-content:space-between;
}
.footer-copy{font-size:11px;color:var(--n300);font-weight:500;}
.footer-status{display:flex;align-items:center;gap:5px;font-size:11px;color:#10B981;font-weight:600;}
.status-dot{width:6px;height:6px;border-radius:50%;background:#10B981;box-shadow:0 0 0 2px rgba(16,185,129,.25);}
.footer-ver{
  background:rgba(45,95,196,.3);border:1px solid rgba(85,133,232,.3);
  color:var(--n200);font-size:10px;font-weight:700;
  padding:3px 10px;border-radius:20px;letter-spacing:.5px;
  font-family:'JetBrains Mono',monospace;
}
`;

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [fullReport, setFullReport] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeNav, setActiveNav] = useState('dashboard');

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [studentId, setStudentId] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [marks, setMarks] = useState('');
  const [selectedEnrollment, setSelectedEnrollment] = useState('');
  const [attStatus, setAttStatus] = useState('Present');
  

const fetchData = useCallback(async () => {
    try {
      // Localhost aur headers ki tension khatam
      const resCourses = await API.get('/courses');
      setCourses(resCourses.data);
      
      const resEnroll = await API.get('/enroll');
      setEnrollments(resEnroll.data);
      
      const resReport = await API.get('/reports/all');
      setFullReport(resReport.data);
    } catch (err) { 
      console.log("Fetch Error:", err); 
    }
}, []);

  // 1. Add Course
const handleAddCourse = async (e) => {
    e.preventDefault();
    await API.post('/courses', { title, courseCode: code }); // Headers ki zaroorat nahi, api.js de dega
    setTitle(''); setCode(''); fetchData(); alert("Course Created!");
};

// 2. Enroll
const handleEnroll = async (e) => {
    e.preventDefault();
    try {
      await API.post('/enroll', { studentId, courseId: selectedCourse });
      setStudentId(''); fetchData(); alert("Student Enrolled!");
    } catch (err) { alert(err.response?.data?.message || "Enrollment Failed"); }
};

// 3. Add Grade
const handleAddGrade = async (e) => {
    e.preventDefault();
    try {
      const enroll = enrollments.find(en => en._id === selectedEnrollment);
      if (!enroll) return alert("Select an enrollment first!");

      await API.post('/grades', {
        studentId: enroll.student._id,
        enrollmentId: selectedEnrollment,
        marks: marks
      });

      setMarks(''); fetchData(); alert("Grade Added!");
    } catch (err) { alert("Error adding grade"); }
};

// 4. Mark Attendance
const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      const enroll = enrollments.find(en => en._id === selectedEnrollment);
      if (!enroll) return alert("Select a student first!");
      
      await API.post('/attendance', {
        studentId: enroll.student._id, courseId: enroll.course._id, status: attStatus
      });
      alert("Attendance Marked!"); fetchData();
    } catch (err) { alert("Error marking attendance"); }
};
    



  const downloadCSV = () => {
    let csv = "Student,Course,Marks,Grade\n";
    fullReport.forEach(r => csv += `${r.enrollment?.student?.name},${r.enrollment?.course?.title},${r.marks},${r.grade}\n`);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'report.csv'; a.click();
  };

  const filteredData = fullReport.filter(item =>
    item.enrollment?.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.enrollment?.course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGC = (g) => {
    if (!g) return '';
    if (g.startsWith('A')) return 'gA';
    if (g.startsWith('B')) return 'gB';
    if (g.startsWith('C')) return 'gC';
    return 'gD';
  };

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const role = localStorage.getItem('role') || 'Admin';
  const facultyName = localStorage.getItem('name') || 'Dr. Sharma';

  const chartData = {
    labels: courses.map(c => c.title),
    datasets: [{
      label: 'Students',
      data: courses.map(c => enrollments.filter(e => e.course?._id === c._id).length),
      backgroundColor: ['#2D5FC4', '#00C2B8', '#7C5CFC', '#F5A623', '#F04E6A', '#10B981'],
      borderWidth: 0, borderRadius: 6,
    }],
  };

  const barOpts = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: 'Outfit', size: 11 }, color: '#4A5E80' } },
      y: { grid: { color: '#EEF2F7' }, ticks: { font: { family: 'Outfit', size: 11 }, color: '#4A5E80' } }
    },
    responsive: true, maintainAspectRatio: true,
  };

  const pieOpts = {
    plugins: {
      legend: { position: 'bottom', labels: { font: { family: 'Outfit', size: 11 }, color: '#4A5E80', padding: 11, boxWidth: 11 } }
    },
    responsive: true,
  };

  const navItems = [
    { key: 'dashboard', icon: '⊞', label: 'Dashboard', count: null },
    { key: 'courses', icon: '📚', label: 'Courses', count: courses.length },
    { key: 'enrollments', icon: '🎓', label: 'Enrollments', count: enrollments.length },
    { key: 'grades', icon: '📊', label: 'Grades', count: fullReport.length },
    { key: 'attendance', icon: '🗓', label: 'Attendance', count: null },
    { key: 'reports', icon: '📋', label: 'Reports', count: null },
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
              <span>LMS Platform</span>
            </div>
          </div>

          {/* Faculty Profile */}
          <div className="sb-profile">
            <div className="sb-avatar">
              {facultyName.charAt(0)}
              <span className="sb-avatar-dot" />
            </div>
            <div className="sb-profile-info">
              <h4>{facultyName}</h4>
              <p>Faculty · {role}</p>
            </div>
            <span className="sb-role-badge">{role}</span>
          </div>

          <nav className="sb-nav">
            <div className="sb-sec-lbl">Main Menu</div>
            {navItems.map(item => (
              <div
                key={item.key}
                className={`sb-item ${activeNav === item.key ? 'active' : ''}`}
                onClick={() => setActiveNav(item.key)}
              >
                {activeNav === item.key && <span className="sb-active-bar" />}
                <span className="sb-item-icon">{item.icon}</span>
                <span className="sb-item-label">{item.label}</span>
                {item.count !== null && <span className="sb-item-count">{item.count}</span>}
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
                <strong>Admin Dashboard</strong>
              </div>
              <div className="h-search-wrap">
                <span className="h-s-icon">🔍</span>
                <input className="h-search" placeholder="Quick search..." />
              </div>
            </div>

            <div className="header-right">
              <div className="h-date">📅 {today}</div>
              <div className="h-btn" title="Notifications">🔔<span className="h-notif-dot" /></div>
              <div className="h-btn" title="Messages">💬</div>
              <div className="h-btn" title="Help">❓</div>
              <div className="h-divider" />
              <div className="h-user">
                <div className="h-avatar">{facultyName.charAt(0)}</div>
                <div>
                  <div className="h-uname">{facultyName}</div>
                  <div className="h-urole">{role}</div>
                </div>
                <span style={{ color: '#8CA0BF', fontSize: 11, marginLeft: 3 }}>▾</span>
              </div>
            </div>
          </header>

          {/* PAGE BODY */}
          <main className="page-body">

            {/* STATS */}
            <div className="stats-grid">
              {[
                { icon: '📚', val: courses.length, lbl: 'Total Courses', trend: 'Active', cls: 't-info', bg: 'rgba(45,95,196,.1)' },
                { icon: '🎓', val: enrollments.length, lbl: 'Enrollments', trend: '↑ Running', cls: 't-up', bg: 'rgba(0,194,184,.1)' },
                { icon: '📊', val: fullReport.length, lbl: 'Grades Recorded', trend: 'Updated', cls: 't-info', bg: 'rgba(124,92,252,.1)' },
                { icon: '👥', val: [...new Set(enrollments.map(e => e.student?._id))].length, lbl: 'Unique Students', trend: '↑ Active', cls: 't-up', bg: 'rgba(245,166,35,.1)' },
              ].map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
                  <div>
                    <div className="stat-val">{s.val}</div>
                    <div className="stat-lbl">{s.lbl}</div>
                    <span className={`stat-trend ${s.cls}`}>{s.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* FORMS */}
            <div className="sec-hd"><span className="sec-ttl">Management Actions</span><div className="sec-line" /></div>
            <div className="forms-grid">

              {role === 'Admin' && (
                <div className="card">
                  <div className="card-hd">
                    <div className="card-hd-icon" style={{ background: 'rgba(45,95,196,.1)' }}>📘</div>
                    <div><div className="card-hd-ttl">Create New Course</div><div className="card-hd-sub">Add a course to the system</div></div>
                  </div>
                  <div className="card-bd">
                    <form onSubmit={handleAddCourse}>
                      <div className="fr">
                        <div className="fg">
                          <label className="fl">Course Title</label>
                          <input className="fi" placeholder="e.g. Mathematics" value={title} onChange={e => setTitle(e.target.value)} required />
                        </div>
                        <div className="fg">
                          <label className="fl">Course Code</label>
                          <input className="fi" placeholder="e.g. MATH101" value={code} onChange={e => setCode(e.target.value)} required />
                        </div>
                      </div>
                      <button type="submit" className="btn b-blue">＋ Create Course</button>
                    </form>
                  </div>
                </div>
              )}

              <div className="card">
                <div className="card-hd">
                  <div className="card-hd-icon" style={{ background: 'rgba(0,194,184,.1)' }}>🎓</div>
                  <div><div className="card-hd-ttl">Enroll Student</div><div className="card-hd-sub">Link student to a course</div></div>
                </div>
                <div className="card-bd">
                  <form onSubmit={handleEnroll}>
                    <div className="fg">
                      <label className="fl">Student MongoDB ID</label>
                      <input className="fi" placeholder="Paste student ID..." value={studentId} onChange={e => setStudentId(e.target.value)} required />
                    </div>
                    <div className="fg">
                      <label className="fl">Select Course</label>
                      <select className="fs" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} required>
                        <option value="">Choose a course...</option>
                        {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                      </select>
                    </div>
                    <button type="submit" className="btn b-teal">→ Enroll Now</button>
                  </form>
                </div>
              </div>

              <div className="card">
                <div className="card-hd">
                  <div className="card-hd-icon" style={{ background: 'rgba(124,92,252,.1)' }}>📝</div>
                  <div><div className="card-hd-ttl">Add Marks & Grades</div><div className="card-hd-sub">Record marks for enrollment</div></div>
                </div>
                <div className="card-bd">
                  <form onSubmit={handleAddGrade}>
                    <div className="fg">
                      <label className="fl">Select Enrollment</label>
                      <select className="fs" value={selectedEnrollment} onChange={e => setSelectedEnrollment(e.target.value)} required>
                        <option value="">Select student enrollment...</option>
                        {enrollments.map(e => (
                          <option key={e._id} value={e._id}>{e.student?.name} — {e.course?.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="fg">
                      <label className="fl">Marks Obtained</label>
                      <input className="fi" type="number" placeholder="Enter marks (0–100)" value={marks} onChange={e => setMarks(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn b-violet">💾 Save Grade</button>
                  </form>
                </div>
              </div>

              <div className="card">
                <div className="card-hd">
                  <div className="card-hd-icon" style={{ background: 'rgba(16,185,129,.1)' }}>🗓</div>
                  <div><div className="card-hd-ttl">Mark Attendance</div><div className="card-hd-sub">Record today's attendance</div></div>
                </div>
                <div className="card-bd">
                  <form onSubmit={handleMarkAttendance}>
                    <div className="fg">
                      <label className="fl">Select Student</label>
                      <select className="fs" value={selectedEnrollment} onChange={e => setSelectedEnrollment(e.target.value)} required>
                        <option value="">Select student enrollment...</option>
                        {enrollments.map(e => (
                          <option key={e._id} value={e._id}>{e.student?.name} — {e.course?.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="fg">
                      <label className="fl">Status</label>
                      <select className="fs" value={attStatus} onChange={e => setAttStatus(e.target.value)}>
                        <option value="Present">✅ Present</option>
                        <option value="Absent">❌ Absent</option>
                      </select>
                    </div>
                    <button type="submit" className="btn b-mint">✓ Mark Attendance</button>
                  </form>
                </div>
              </div>
            </div>

            {/* CHARTS */}
            <div className="sec-hd"><span className="sec-ttl">Analytics Overview</span><div className="sec-line" /></div>
            <div className="charts-row">
              <div className="chart-card">
                <div className="chart-ttl"><span className="chart-dot" style={{ background: '#2D5FC4' }} />Course Distribution</div>
                <Pie data={chartData} options={pieOpts} />
              </div>
              <div className="chart-card">
                <div className="chart-ttl"><span className="chart-dot" style={{ background: '#00C2B8' }} />Students per Course</div>
                <Bar data={chartData} options={barOpts} />
              </div>
            </div>

            {/* TABLE */}
            <div className="sec-hd"><span className="sec-ttl">Grade Report</span><div className="sec-line" /></div>
            <div className="tbl-wrap">
              <div className="tbl-bar">
                <span className="tbl-ttl">All Records</span>
                <div className="tbl-sw">
                  <span className="tbl-si">🔍</span>
                  <input className="tbl-search" placeholder="Search student or course..." onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <div style={{ flex: 1 }} />
                <button className="btn-csv" onClick={downloadCSV}>⬇ Download CSV</button>
              </div>
              <table>
                <thead>
                  <tr><th>#</th><th>Student Name</th><th>Course</th><th>Marks</th><th>Grade</th></tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr><td colSpan="5"><div className="empty-st"><div className="empty-st-ic">📋</div><div className="empty-st-tx">No records found</div></div></td></tr>
                  ) : filteredData.map((item, i) => (
                    <tr key={i}>
                      <td style={{ color: '#8CA0BF', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{String(i + 1).padStart(2, '0')}</td>
                      <td style={{ fontWeight: 600 }}>{item.enrollment?.student?.name}</td>
                      <td style={{ color: '#4A5E80' }}>{item.enrollment?.course?.title}</td>
                      <td style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>{item.marks}</td>
                      <td><span className={`gp ${getGC(item.grade)}`}>{item.grade}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </main>

          {/* FOOTER */}
          <footer className="footer">
            <div className="footer-inner">
              <div className="footer-brand">
                <div className="footer-logo-row">
                  <div className="footer-logo">ET</div>
                  <span className="footer-logo-name">EduTrack</span>
                </div>
                <p className="footer-desc">A modern LMS for institutions. Manage courses, grades, and attendance all in one place.</p>
              </div>
              <div>
                <div className="footer-col-ttl">Quick Links</div>
                <div className="footer-links">
                  {['⊞   Dashboard', '📚   Courses', '🎓   Enrollments', '📊   Reports'].map(l => (
                    <span key={l} className="footer-lnk">{l}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="footer-col-ttl">System</div>
                <div className="footer-links">
                  {['🏫   Institution Portal', '🔒   Privacy Policy', '📖   Documentation', '🛠   Support'].map(l => (
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

export default AdminDashboard;