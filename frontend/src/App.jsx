import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import Home from './components/Home';

const ProtectedDashboard = () => {
  const role = localStorage.getItem('role');

  if (!role) {
    return <Navigate to="/" />; // Agar login nahi hai toh login page par bhejein
  }

  if (role === 'Admin' || role === 'Faculty') {
    return <AdminDashboard />;
  } else if (role === 'Student') {
    return <StudentDashboard />;
  } else {
    return <Navigate to="/" />;
  }
};
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}   />
        <Route path="/login" element={<Login />} />
        
        
        <Route path="/dashboard" element={<ProtectedDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;