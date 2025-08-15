import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import PatientManagement from './pages/PatientManagement';
import Appointments from './pages/Appointments';
import Workstation from './pages/Workstation';
import Pharmacy from './pages/Pharmacy';
import BedManagement from './pages/BedManagement';
import PatientDetails from './pages/PatientDetails';
import DoctorsManagement from './pages/DoctorsManagement';
import DoctorDetails from './pages/DoctorDetails';
import StaffManagement from './pages/StaffManagement';
import AppointmentDashboard from '../pages/AppointmentDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <LoginPage onLogin={handleLogin} />
          } 
        />
        
        <Route
          path="/"
          element={
            isAuthenticated ? 
            <DashboardLayout /> : 
            <Navigate to="/login" replace />
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<PatientManagement />} />
          <Route path="patients/:id" element={<PatientDetails />} />
          <Route path="doctors" element={<DoctorsManagement />} />
          <Route path="doctors/:id" element={<DoctorDetails />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointment-dashboard" element={<AppointmentDashboard />} />
          <Route path="workstation" element={<Workstation />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="beds" element={<BedManagement />} />
        </Route>

        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;