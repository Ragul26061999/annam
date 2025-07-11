'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
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
  ChevronRight,
  Activity,
  DollarSign,
  UserPlus
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
}

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Check if current user is receptionist (in real app, this would come from auth context)
  const isReceptionist = pathname?.startsWith('/receptionist') || false;

  const receptionistNavItems: NavItem[] = [
    { 
      href: '/receptionist', 
      label: 'Dashboard', 
      icon: <LayoutDashboard size={18} />, 
      color: 'text-blue-600'
    },
    { 
      href: '/receptionist/register-patient', 
      label: 'Register Patient', 
      icon: <UserPlus size={18} />, 
      color: 'text-orange-600'
    },
    { 
      href: '/receptionist/vitals', 
      label: 'Record Vitals', 
      icon: <Activity size={18} />, 
      color: 'text-green-600'
    },
    { 
      href: '/patients', 
      label: 'View Patients', 
      icon: <Users size={18} />, 
      color: 'text-purple-600',
      badge: '1,284'
    },
    { 
      href: '/appointments', 
      label: 'Appointments', 
      icon: <Calendar size={18} />, 
      color: 'text-blue-600',
      badge: '42'
    },
  ];

  const adminNavItems: NavItem[] = [
    { 
      href: '/dashboard', 
      label: 'Dashboard', 
      icon: <LayoutDashboard size={18} />, 
      color: 'text-blue-600'
    },
    { 
      href: '/patients', 
      label: 'Patients', 
      icon: <Users size={18} />, 
      color: 'text-green-600',
      badge: '1,284'
    },
    { 
      href: '/doctors', 
      label: 'Doctors', 
      icon: <Stethoscope size={18} />, 
      color: 'text-purple-600'
    },
    { 
      href: '/staff', 
      label: 'Staff', 
      icon: <UsersRound size={18} />, 
      color: 'text-indigo-600'
    },
    { 
      href: '/appointments', 
      label: 'Appointments', 
      icon: <Calendar size={18} />, 
      color: 'text-orange-600',
      badge: '42'
    },
    { 
      href: '/workstation', 
      label: 'Workstation', 
      icon: <Activity size={18} />, 
      color: 'text-teal-600'
    },
    { 
      href: '/pharmacy', 
      label: 'Pharmacy', 
      icon: <Pill size={18} />, 
      color: 'text-red-600'
    },
    { 
      href: '/beds', 
      label: 'Bed Management', 
      icon: <Bed size={18} />, 
      color: 'text-pink-600'
    },
    { 
      href: '/finance', 
      label: 'Finance', 
      icon: <DollarSign size={18} />, 
      color: 'text-emerald-600'
    },
  ];

  const navItems = isReceptionist ? receptionistNavItems : adminNavItems;

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 h-full flex flex-col shadow-sm transition-all duration-300 ease-in-out`}>
      {/* Header */}
      <div className="h-20 border-b border-gray-100 flex items-center justify-between px-4">
        <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="flex items-center justify-center">
            <Image
              src="/logo/annamHospital-bg.png"
              alt="Annam Hospital"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
        
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronLeft size={16} className="text-gray-500" />
          </button>
        )}
      </div>

      {/* Expand button for collapsed state */}
      {isCollapsed && (
        <div className="px-2 py-2 border-b border-gray-100">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex justify-center"
          >
            <ChevronRight size={16} className="text-gray-500" />
          </button>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden ${
                isActive 
                  ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-500 rounded-r-full"></div>
              )}
              
              {/* Icon */}
              <div className={`flex-shrink-0 ${isActive ? 'text-orange-600' : item.color} transition-colors duration-200`}>
                {item.icon}
              </div>
              
              {/* Label and Badge */}
              {!isCollapsed && (
                <div className="flex items-center justify-between w-full ml-3">
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      isActive 
                        ? 'bg-orange-200 text-orange-700' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
      
      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="px-2 py-3 border-t border-gray-100">
          <div className="flex items-center space-x-3 p-2.5 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
              {isReceptionist ? 'M' : 'DR'}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">
                {isReceptionist ? 'Monica' : 'Dr. Selvan'}
              </p>
              <p className="text-xs text-gray-500">
                {isReceptionist ? 'Receptionist' : 'Chief Doctor (MD)'}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Bottom Actions */}
      <div className="px-2 py-3 border-t border-gray-100 space-y-1">
        <button className="w-full flex items-center px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all duration-200">
          <Settings size={18} />
          {!isCollapsed && <span className="ml-3 font-medium text-sm">Settings</span>}
        </button>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <LogOut size={18} />
          {!isCollapsed && <span className="ml-3 font-medium text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 