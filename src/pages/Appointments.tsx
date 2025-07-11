import React, { useState } from 'react';
import { Calendar, Clock, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const appointments = [
  {
    id: 1,
    patientName: 'Sarah Johnson',
    type: 'Follow-up',
    doctor: 'Dr. Robert Chen',
    time: '10:00 AM',
    date: '2023-05-15',
    status: 'Scheduled',
    image: 'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1'
  },
  {
    id: 2,
    patientName: 'Michael Rodriguez',
    type: 'Initial Consultation',
    doctor: 'Dr. Robert Chen',
    time: '11:30 AM',
    date: '2023-05-15',
    status: 'In Progress',
    image: 'https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1'
  },
  {
    id: 3,
    patientName: 'Emma Watson',
    type: 'Check-up',
    doctor: 'Dr. Lisa Wong',
    time: '2:15 PM',
    date: '2023-05-15',
    status: 'Completed',
    image: 'https://images.pexels.com/photos/4714992/pexels-photo-4714992.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1'
  },
  {
    id: 4,
    patientName: 'David Kim',
    type: 'Surgery Prep',
    doctor: 'Dr. James Wilson',
    time: '3:45 PM',
    date: '2023-05-15',
    status: 'Scheduled',
    image: 'https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1'
  }
];

const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-gray-900">Appointments</h1>
        <p className="text-gray-500 mt-1">Manage and schedule patient appointments</p>
      </div>

      {/* Calendar Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button className="btn-secondary">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-gray-900">May 2023</h2>
            <button className="btn-secondary">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex space-x-3">
            <button className="btn-secondary flex items-center">
              <Filter size={18} className="mr-2" />
              Filter
            </button>
            <button 
              className="btn-primary flex items-center"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={18} className="mr-2" />
              New Appointment
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-gray-500 font-medium">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => (
            <button
              key={i}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 hover:bg-orange-50 ${
                i === 14 ? 'bg-orange-100 text-gray-900' : 'text-gray-600'
              }`}
            >
              <span className="text-sm">{i + 1}</span>
              {i === 14 && <span className="text-xs text-orange-500 mt-1">4 appointments</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900">Today's Appointments</h2>
          <div className="flex items-center text-gray-500">
            <Calendar size={18} className="mr-2" />
            <span>May 15, 2023</span>
          </div>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-orange-50">
              <div className="flex items-center">
                <img 
                  src={appointment.image} 
                  alt={appointment.patientName} 
                  className="h-10 w-10 rounded-full object-cover" 
                />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                  <div className="flex space-x-4 mt-1">
                    <span className="flex items-center text-xs text-gray-500">
                      <Clock size={12} className="mr-1" />
                      {appointment.time}
                    </span>
                    <span className="text-xs text-gray-500">{appointment.type}</span>
                    <span className="text-xs text-gray-500">{appointment.doctor}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  appointment.status === 'Scheduled' ? 'bg-blue-50 text-blue-600' :
                  appointment.status === 'In Progress' ? 'bg-orange-50 text-orange-600' :
                  'bg-green-50 text-green-600'
                }`}>
                  {appointment.status}
                </span>
                <button className="text-gray-400 hover:text-orange-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowAddModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-5 pb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Schedule New Appointment</h3>
                  <button 
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowAddModal(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Patient</label>
                    <select id="patient" className="input-field mt-1">
                      <option>Select Patient</option>
                      <option>Sarah Johnson</option>
                      <option>Michael Rodriguez</option>
                      <option>Emma Watson</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Appointment Type</label>
                    <select id="type" className="input-field mt-1">
                      <option>Select Type</option>
                      <option>Initial Consultation</option>
                      <option>Follow-up</option>
                      <option>Check-up</option>
                      <option>Surgery Prep</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
                    <select id="doctor" className="input-field mt-1">
                      <option>Select Doctor</option>
                      <option>Dr. Robert Chen</option>
                      <option>Dr. Lisa Wong</option>
                      <option>Dr. James Wilson</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                      <input type="date" id="date" className="input-field mt-1" />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                      <input type="time" id="time" className="input-field mt-1" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea id="notes" rows={3} className="input-field mt-1"></textarea>
                  </div>
                </form>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => setShowAddModal(false)}
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;