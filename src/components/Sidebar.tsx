import React, { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Stethoscope, 
  Pill, 
  Bed, 
  Settings,
  LogOut,
  UserCog,
  UsersRound,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const handleLogout = () => {
    onLogout();
    history.push('/login');
  };

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gray-100 h-full flex flex-col shadow-neu-flat transition-all duration-300`}>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 border-b border-gray-200 px-4">
        <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="h-10 w-10 flex items-center justify-center">
            <img 
              src="/images/logo.png" 
              alt="Annam Hospital" 
              className="h-full w-auto object-contain"
            />
          </div>
          {!isCollapsed && <span className="ml-2 text-xl font-medium text-gray-900">Annam Hospital</span>}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="neu-icon bg-gray-200 hover:bg-gray-300"
        >
          {isCollapsed ? 
            <ChevronRight size={20} className="text-gray-600" /> : 
            <ChevronLeft size={20} className="text-gray-600" />
          }
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/dashboard" className={isActive('/dashboard') ? 'nav-link active' : 'nav-link'}>
          <div className="neu-icon bg-primary-100">
            <LayoutDashboard className="text-primary-500" size={20} />
          </div>
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>
        
        <NavLink to="/patients" className={isActive('/patients') ? 'nav-link active' : 'nav-link'}>
          <div className="neu-icon bg-success-100">
            <Users className="text-success-500" size={20} />
          </div>
          {!isCollapsed && <span>Patients</span>}
        </NavLink>
        
        <NavLink to="/doctors" className={isActive('/doctors') ? 'nav-link active' : 'nav-link'}>
          <div className="neu-icon bg-warning-100">
            <Stethoscope className="text-warning-500" size={20} />
          </div>
          {!isCollapsed && <span>Doctors</span>}
        </NavLink>

        <NavLink to="/staff" className={isActive('/staff') ? 'nav-link active' : 'nav-link'}>
          <div className="neu-icon bg-danger-100">
            <UsersRound className="text-danger-500" size={20} />
          </div>
          {!isCollapsed && <span>Staff</span>}
        </NavLink>
        
        <NavLink to="/appointments" className={isActive('/appointments') ? 'nav-link active' : 'nav-link'}>
          <div className="neu-icon bg-primary-100">
            <Calendar className="text-primary-500" size={20} />
          </div>
          {!isCollapsed && <span>Appointments</span>}
        </NavLink>
        
        <NavLink to="/workstation" className={isActive('/workstation') ? 'nav-link active' : 'nav-link'}>
          <div className="neu-icon bg-success-100">
            <UserCog className="text-success-500" size={20} />
          </div>
          {!isCollapsed && <span>Workstation</span>}
        </NavLink>
        
        <NavLink to="/pharmacy" className={isActive('/pharmacy') ? 'nav-link active' : 'nav-link'}>
          <div className="neu-icon bg-warning-100">
            <Pill className="text-warning-500" size={20} />
          </div>
          {!isCollapsed && <span>Pharmacy</span>}
        </NavLink>
        
        <NavLink to="/beds" className={isActive('/beds') ? 'nav-link active' : 'nav-link'}>
          <div className="neu-icon bg-danger-100">
            <Bed className="text-danger-500" size={20} />
          </div>
          {!isCollapsed && <span>Bed Management</span>}
        </NavLink>
      </nav>
      
      {/* Bottom Actions */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <NavLink to="/settings" className={isActive('/settings') ? 'nav-link active' : 'nav-link'}>
          <div className="neu-icon bg-gray-100">
            <Settings className="text-gray-500" size={20} />
          </div>
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
        <button 
          onClick={handleLogout}
          className="nav-link w-full text-left"
        >
          <div className="neu-icon bg-gray-100">
            <LogOut className="text-gray-500" size={20} />
          </div>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;