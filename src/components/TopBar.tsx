import React from 'react';
import { Bell, Search, HelpCircle } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-10 pr-4 py-2 bg-gray-100 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-orange-200"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
      </div>
      
      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-4 w-4 bg-orange-200 rounded-full border-2 border-white"></span>
        </button>
        
        {/* Help */}
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
          <HelpCircle size={20} />
        </button>
        
        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-orange-200 flex items-center justify-center text-gray-900 font-medium">
            DR
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">Dr. Robert Chen</p>
            <p className="text-xs text-gray-500">Cardiologist</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;