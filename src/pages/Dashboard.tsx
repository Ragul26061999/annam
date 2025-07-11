import React from 'react';
import { Users, Calendar, Pill, Bed, TrendingUp, ArrowUpRight } from 'lucide-react';

// Components
import StatCard from '../components/StatCard';
import AppointmentItem from '../components/AppointmentItem';
import PatientRow from '../components/PatientRow';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Dr. Chen</p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Patients" 
          value="1,284" 
          change="+8.2%" 
          trend="up" 
          icon={<Users className="text-orange-300" />} 
        />
        <StatCard 
          title="Appointments" 
          value="42" 
          change="+12.5%" 
          trend="up" 
          icon={<Calendar className="text-blue-400" />} 
        />
        <StatCard 
          title="Medicine Stock" 
          value="842" 
          change="-3.4%" 
          trend="down" 
          icon={<Pill className="text-green-400" />} 
        />
        <StatCard 
          title="Bed Occupancy" 
          value="87%" 
          change="+2.1%" 
          trend="up" 
          icon={<Bed className="text-red-400" />} 
        />
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-900">Upcoming Appointments</h2>
            <button className="text-orange-400 hover:text-orange-500 text-sm font-medium flex items-center">
              View all <ArrowUpRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="card divide-y divide-gray-100">
            <AppointmentItem 
              name="Sarah Johnson" 
              time="10:00 AM" 
              date="Today" 
              type="Follow-up" 
              image="https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1"
            />
            <AppointmentItem 
              name="Michael Rodriguez" 
              time="11:30 AM" 
              date="Today" 
              type="Consultation" 
              image="https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1"
            />
            <AppointmentItem 
              name="Emma Watson" 
              time="2:15 PM" 
              date="Today" 
              type="Check-up" 
              image="https://images.pexels.com/photos/4714992/pexels-photo-4714992.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1"
            />
            <AppointmentItem 
              name="David Kim" 
              time="3:45 PM" 
              date="Today" 
              type="Surgery Prep" 
              image="https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1"
            />
            <AppointmentItem 
              name="Lisa Chen" 
              time="9:30 AM" 
              date="Tomorrow" 
              type="Follow-up" 
              image="https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1"
            />
          </div>
        </div>
        
        {/* Recent Patients */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-900">Recent Patients</h2>
            <button className="text-orange-400 hover:text-orange-500 text-sm font-medium flex items-center">
              View all <ArrowUpRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="card">
            <PatientRow 
              name="James Wilson" 
              status="Critical" 
              condition="Heart Failure" 
              image="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1"
            />
            <PatientRow 
              name="Olivia Martinez" 
              status="Stable" 
              condition="Pneumonia" 
              image="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1"
            />
            <PatientRow 
              name="Noah Parker" 
              status="Recovering" 
              condition="Post-Op" 
              image="https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1"
            />
            <PatientRow 
              name="Sophia Lee" 
              status="Stable" 
              condition="Diabetes" 
              image="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1"
            />
          </div>
        </div>
      </div>
      
      {/* Hospital Status */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900">Hospital Status</h2>
          <button className="text-orange-400 hover:text-orange-500 text-sm font-medium">Refresh</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">ICU Beds</span>
            <div className="flex items-end mt-2">
              <span className="text-2xl font-medium text-gray-900">16/20</span>
              <span className="text-red-500 text-xs ml-2">80% occupied</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-red-400 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">General Beds</span>
            <div className="flex items-end mt-2">
              <span className="text-2xl font-medium text-gray-900">124/150</span>
              <span className="text-orange-500 text-xs ml-2">83% occupied</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-orange-300 h-2 rounded-full" style={{ width: '83%' }}></div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Emergency Room</span>
            <div className="flex items-end mt-2">
              <span className="text-2xl font-medium text-gray-900">12/30</span>
              <span className="text-green-500 text-xs ml-2">40% occupied</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Operating Rooms</span>
            <div className="flex items-end mt-2">
              <span className="text-2xl font-medium text-gray-900">5/8</span>
              <span className="text-orange-500 text-xs ml-2">63% in use</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-orange-300 h-2 rounded-full" style={{ width: '63%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;