import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import Home from './components/Home';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import VerifyOTP from './components/VerifyOTP';
import ResetPassword from './components/ResetPassword';

const ProtectedDashboard = () => {
  const role = localStorage.getItem('role');

  if (!role) {
    return <Navigate to="/" />; 
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
        <Route path="/register" element={<Register />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        
        
        <Route path="/dashboard" element={<ProtectedDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;