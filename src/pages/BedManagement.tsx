import React, { useState } from 'react';
import { Search, Filter, Plus, ArrowUpRight, Clock, AlertTriangle, Bed as BedIcon } from 'lucide-react';

const BedManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Mock data for bed status
  const beds = {
    icu: [
      { id: 'ICU-01', patient: 'James Wilson', admissionDate: '2023-05-10', doctor: 'Dr. Robert Chen', status: 'Occupied', type: 'Critical' },
      { id: 'ICU-02', patient: null, admissionDate: null, doctor: null, status: 'Available', type: 'Critical' },
      { id: 'ICU-03', patient: 'Sarah Johnson', admissionDate: '2023-05-12', doctor: 'Dr. Lisa Wong', status: 'Occupied', type: 'Critical' },
      { id: 'ICU-04', patient: 'Michael Rodriguez', admissionDate: '2023-05-11', doctor: 'Dr. James Wilson', status: 'Occupied', type: 'Critical' }
    ],
    general: [
      { id: 'GW-01', patient: 'Emma Watson', admissionDate: '2023-05-09', doctor: 'Dr. Robert Chen', status: 'Occupied', type: 'General' },
      { id: 'GW-02', patient: 'David Kim', admissionDate: '2023-05-08', doctor: 'Dr. Lisa Wong', status: 'Occupied', type: 'General' },
      { id: 'GW-03', patient: null, admissionDate: null, doctor: null, status: 'Maintenance', type: 'General' },
      { id: 'GW-04', patient: null, admissionDate: null, doctor: null, status: 'Available', type: 'General' },
      { id: 'GW-05', patient: 'Olivia Martinez', admissionDate: '2023-05-10', doctor: 'Dr. James Wilson', status: 'Occupied', type: 'General' },
      { id: 'GW-06', patient: null, admissionDate: null, doctor: null, status: 'Available', type: 'General' }
    ],
    emergency: [
      { id: 'ER-01', patient: 'William Johnson', admissionDate: '2023-05-13', doctor: 'Dr. Robert Chen', status: 'Occupied', type: 'Emergency' },
      { id: 'ER-02', patient: null, admissionDate: null, doctor: null, status: 'Available', type: 'Emergency' },
      { id: 'ER-03', patient: null, admissionDate: null, doctor: null, status: 'Available', type: 'Emergency' },
      { id: 'ER-04', patient: 'Noah Parker', admissionDate: '2023-05-13', doctor: 'Dr. Lisa Wong', status: 'Occupied', type: 'Emergency' }
    ]
  };

  const getBedStatusColor = (status: string) => {
    switch (status) {
      case 'Occupied':
        return 'bg-red-50 text-red-600';
      case 'Available':
        return 'bg-green-50 text-green-600';
      case 'Maintenance':
        return 'bg-orange-50 text-orange-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const BedCard = ({ bed }: { bed: any }) => (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-lg font-medium text-gray-900">{bed.id}</span>
          <span className={`ml-3 px-2 py-1 rounded-lg text-xs font-medium ${getBedStatusColor(bed.status)}`}>
            {bed.status}
          </span>
        </div>
        {bed.status === 'Occupied' && (
          <button className="text-gray-400 hover:text-orange-400">
            <ArrowUpRight size={20} />
          </button>
        )}
      </div>

      {bed.status === 'Occupied' ? (
        <>
          <div className="space-y-2">
            <p className="font-medium text-gray-900">{bed.patient}</p>
            <p className="text-sm text-gray-500">{bed.doctor}</p>
            <div className="flex items-center text-xs text-gray-500">
              <Clock size={12} className="mr-1" />
              Admitted {bed.admissionDate}
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button className="btn-secondary text-sm py-1 px-3">Transfer</button>
            <button className="btn-primary text-sm py-1 px-3">Discharge</button>
          </div>
        </>
      ) : bed.status === 'Available' ? (
        <button 
          className="btn-primary w-full mt-4"
          onClick={() => setShowAssignModal(true)}
        >
          Assign Patient
        </button>
      ) : (
        <div className="flex items-center mt-4 text-sm text-orange-500">
          <AlertTriangle size={14} className="mr-1" />
          Under maintenance
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-gray-900">Bed Management</h1>
        <p className="text-gray-500 mt-1">Monitor and manage hospital bed occupancy</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500">Total Beds</p>
              <h3 className="text-2xl font-medium text-gray-900 mt-1">14</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
              <BedIcon className="text-gray-500" size={20} />
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="bg-gray-500 h-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500">Occupied</p>
              <h3 className="text-2xl font-medium text-gray-900 mt-1">8</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <BedIcon className="text-red-500" size={20} />
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full" style={{ width: '57%' }}></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500">Available</p>
              <h3 className="text-2xl font-medium text-gray-900 mt-1">5</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <BedIcon className="text-green-500" size={20} />
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: '36%' }}></div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500">Maintenance</p>
              <h3 className="text-2xl font-medium text-gray-900 mt-1">1</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="text-orange-500" size={20} />
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="bg-orange-500 h-full" style={{ width: '7%' }}></div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <input 
            type="text" 
            placeholder="Search beds..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <Filter size={18} className="mr-2" />
            Filter
          </button>
          <button className="btn-primary flex items-center">
            <Plus size={18} className="mr-2" />
            Add Bed
          </button>
        </div>
      </div>

      {/* ICU Section */}
      <div>
        <h2 className="text-gray-900 mb-4">Intensive Care Unit</h2>
        <div className="grid grid-cols-4 gap-6">
          {beds.icu.map((bed) => (
            <BedCard key={bed.id} bed={bed} />
          ))}
        </div>
      </div>

      {/* General Ward Section */}
      <div>
        <h2 className="text-gray-900 mb-4">General Ward</h2>
        <div className="grid grid-cols-4 gap-6">
          {beds.general.map((bed) => (
            <BedCard key={bed.id} bed={bed} />
          ))}
        </div>
      </div>

      {/* Emergency Section */}
      <div>
        <h2 className="text-gray-900 mb-4">Emergency Room</h2>
        <div className="grid grid-cols-4 gap-6">
          {beds.emergency.map((bed) => (
            <BedCard key={bed.id} bed={bed} />
          ))}
        </div>
      </div>

      {/* Assign Patient Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowAssignModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-5 pb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Assign Patient to Bed</h3>
                  <button 
                    className="text-gray-400 hover:text-gray-500" 
                    onClick={() => setShowAssignModal(false)}
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
                      <option>John Smith</option>
                      <option>Maria Garcia</option>
                      <option>Robert Johnson</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Attending Doctor</label>
                    <select id="doctor" className="input-field mt-1">
                      <option>Select Doctor</option>
                      <option>Dr. Robert Chen</option>
                      <option>Dr. Lisa Wong</option>
                      <option>Dr. James Wilson</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="admissionDate" className="block text-sm font-medium text-gray-700">Admission Date</label>
                    <input type="date" id="admissionDate" className="input-field mt-1" />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea 
                      id="notes" 
                      rows={3} 
                      className="input-field mt-1"
                      placeholder="Add any additional notes..."
                    ></textarea>
                  </div>
                </form>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowAssignModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => setShowAssignModal(false)}
                >
                  Assign Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BedManagement;