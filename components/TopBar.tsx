'use client';
import React, { useState } from 'react';
import { Bell, Search, HelpCircle, MessageSquare, ChevronDown } from 'lucide-react';

const TopBar: React.FC = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-4 w-4 transition-colors duration-200 ${
              searchFocused ? 'text-orange-500' : 'text-gray-400'
            }`} />
          </div>
          <input 
            type="text" 
            placeholder="Search patients, doctors, appointments..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition-all duration-200"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center space-x-3 ml-6">
        {/* Quick Actions */}
        <div className="flex items-center space-x-1">
          {/* Messages */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200">
            <MessageSquare size={18} />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              2
            </span>
          </button>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200">
            <Bell size={18} />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {notificationCount}
              </span>
            )}
          </button>
          
          {/* Help */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200">
            <HelpCircle size={18} />
          </button>
        </div>
        
        {/* Divider */}
        <div className="h-6 w-px bg-gray-200"></div>
        
        {/* User Profile */}
        <div className="flex items-center space-x-2 p-1.5 hover:bg-gray-50 rounded-xl transition-all duration-200 cursor-pointer group">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-sm">
              DR
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">Dr. Selvan</p>
              <p className="text-xs text-gray-500">Chief Doctor (MD)</p>
            </div>
          </div>
          <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
        </div>
      </div>
    </header>
  );
};

export default TopBar; 