import React from 'react';
import { 
  UserPlus, 
  Calendar, 
  Activity, 
  Users,
  Search, 
  Plus,
  Clock,
  CheckCircle,
  TrendingUp,
  Heart,
  FileText,
  Phone,
  MapPin,
  Stethoscope,
  User
} from 'lucide-react';
import Link from 'next/link';

export default function ReceptionistDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Receptionist Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome Monica! Manage patient registrations and appointments</p>
        </div>
        <div className="flex gap-2">
          <Link href="/receptionist/vitals" className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md">
            <Activity size={16} className="mr-2" />
            Record Vitals
          </Link>
          <Link href="/receptionist/register-patient" className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md">
            <UserPlus size={16} className="mr-2" />
            New Patient
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Today's Registrations</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">+3 from yesterday</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <UserPlus className="text-white" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Pending Appointments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
              <div className="flex items-center mt-2">
                <Clock className="h-3 w-3 text-blue-500 mr-1" />
                <span className="text-sm font-medium text-blue-600">Next at 10:30 AM</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Calendar className="text-white" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Vitals Recorded</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">15</p>
              <div className="flex items-center mt-2">
                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">All completed</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Activity className="text-white" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Walk-ins Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
              <div className="flex items-center mt-2">
                <Users className="h-3 w-3 text-purple-500 mr-1" />
                <span className="text-sm font-medium text-purple-600">Emergency cases</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="text-white" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/receptionist/register-patient" className="group flex items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors duration-200">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
              <UserPlus className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-orange-700">Register New Patient</h3>
              <p className="text-xs text-gray-500">Create patient profile & UHID</p>
            </div>
          </Link>

          <Link href="/receptionist/vitals" className="group flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <Activity className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-blue-700">Record Vitals</h3>
              <p className="text-xs text-gray-500">Blood pressure, temperature, etc.</p>
            </div>
          </Link>

          <Link href="/appointments" className="group flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
              <Calendar className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-green-700">Schedule Appointment</h3>
              <p className="text-xs text-gray-500">Book doctor consultation</p>
            </div>
          </Link>

          <Link href="/patients" className="group flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors duration-200">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
              <Users className="text-white" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-purple-700">View Patients</h3>
              <p className="text-xs text-gray-500">Search existing patients</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Registrations</h2>
            <Link href="/patients" className="text-sm text-orange-600 hover:text-orange-700 font-medium">View All</Link>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                  SJ
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">UHID: AH2024001 • 38F</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">10:30 AM</p>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Cardiology
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                  MR
                </div>
                <div>
                  <p className="font-medium text-gray-900">Michael Rodriguez</p>
                  <p className="text-sm text-gray-500">UHID: AH2024002 • 32M</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">09:45 AM</p>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                  Emergency
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                  EW
                </div>
                <div>
                  <p className="font-medium text-gray-900">Emma Watson</p>
                  <p className="text-sm text-gray-500">UHID: AH2024003 • 14F</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">09:15 AM</p>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Pediatrics
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
            <Link href="/appointments" className="text-sm text-orange-600 hover:text-orange-700 font-medium">View All</Link>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                  10:30
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Dr. Priya Sharma • Cardiology</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Scheduled
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                  11:00
                </div>
                <div>
                  <p className="font-medium text-gray-900">Walk-in Patient</p>
                  <p className="text-sm text-gray-500">Dr. Amit Singh • Emergency</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                In Progress
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                  14:15
                </div>
                <div>
                  <p className="font-medium text-gray-900">Emma Watson</p>
                  <p className="text-sm text-gray-500">Dr. Rajesh Kumar • Pediatrics</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                Scheduled
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 