import React, { useState } from 'react';
import { Search, Filter, Plus, SortAsc, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dummy data for patients
const patients = [
  { id: 1, name: 'James Wilson', gender: 'Male', age: 52, contact: '+1 (555) 123-4567', diagnosis: 'Heart Failure', status: 'Critical', lastVisit: '2023-05-12', image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1' },
  { id: 2, name: 'Olivia Martinez', gender: 'Female', age: 34, contact: '+1 (555) 987-6543', diagnosis: 'Pneumonia', status: 'Stable', lastVisit: '2023-05-15', image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1' },
  { id: 3, name: 'Noah Parker', gender: 'Male', age: 45, contact: '+1 (555) 234-5678', diagnosis: 'Post-Operation', status: 'Recovering', lastVisit: '2023-05-16', image: 'https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1' },
  { id: 4, name: 'Sophia Lee', gender: 'Female', age: 67, contact: '+1 (555) 345-6789', diagnosis: 'Diabetes', status: 'Stable', lastVisit: '2023-05-17', image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1' },
  { id: 5, name: 'William Johnson', gender: 'Male', age: 58, contact: '+1 (555) 456-7890', diagnosis: 'Hypertension', status: 'Stable', lastVisit: '2023-05-18', image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1' },
  { id: 6, name: 'Emma Thompson', gender: 'Female', age: 29, contact: '+1 (555) 567-8901', diagnosis: 'Pregnancy', status: 'Stable', lastVisit: '2023-05-19', image: 'https://images.pexels.com/photos/4714992/pexels-photo-4714992.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1' },
  { id: 7, name: 'Michael Rodriguez', gender: 'Male', age: 41, contact: '+1 (555) 678-9012', diagnosis: 'Asthma', status: 'Stable', lastVisit: '2023-05-20', image: 'https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1' },
  { id: 8, name: 'Sarah Johnson', gender: 'Female', age: 63, contact: '+1 (555) 789-0123', diagnosis: 'Arthritis', status: 'Stable', lastVisit: '2023-05-21', image: 'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=1' },
];

const PatientManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Filter patients based on search query
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-gray-900">Patient Management</h1>
        <p className="text-gray-500 mt-1">View and manage patient records</p>
      </div>
      
      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search patients..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-xl w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
        </div>
        
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <Filter size={18} className="mr-2" />
            Filter
          </button>
          <button className="btn-secondary flex items-center">
            <SortAsc size={18} className="mr-2" />
            Sort
          </button>
                      <Link to="/patients/register">
              <button className="btn-primary flex items-center">
                <UserPlus size={18} className="mr-2" />
                Register New Patient
              </button>
            </Link>
        </div>
      </div>
      
      {/* Patient Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 text-left text-gray-500 text-sm">
              <tr>
                <th className="py-4 px-6 font-medium">Patient Name</th>
                <th className="py-4 px-6 font-medium">Gender</th>
                <th className="py-4 px-6 font-medium">Age</th>
                <th className="py-4 px-6 font-medium">Contact</th>
                <th className="py-4 px-6 font-medium">Diagnosis</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Last Visit</th>
                <th className="py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-orange-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <img 
                        src={patient.image} 
                        alt={patient.name} 
                        className="h-8 w-8 rounded-full object-cover" 
                      />
                      <Link to={`/patients/${patient.id}`} className="ml-3 font-medium text-gray-900 hover:text-orange-400">
                        {patient.name}
                      </Link>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{patient.gender}</td>
                  <td className="py-4 px-6 text-gray-600">{patient.age}</td>
                  <td className="py-4 px-6 text-gray-600">{patient.contact}</td>
                  <td className="py-4 px-6 text-gray-600">{patient.diagnosis}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Critical' ? 'bg-red-50 text-red-500' :
                      patient.status === 'Recovering' ? 'bg-orange-50 text-orange-500' :
                      'bg-green-50 text-green-500'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{patient.lastVisit}</td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-orange-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button className="text-gray-500 hover:text-orange-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPatients.length}</span> of <span className="font-medium">{patients.length}</span> patients
          </div>
          
          <div className="flex space-x-2">
            <button className="btn-secondary text-sm py-1">Previous</button>
            <button className="btn-primary text-sm py-1">Next</button>
          </div>
        </div>
      </div>
      
      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowAddModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-6 pt-5 pb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Add New Patient</h3>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                      <input type="text" id="firstName" className="input-field mt-1" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input type="text" id="lastName" className="input-field mt-1" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                      <select id="gender" className="input-field mt-1">
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                      <input type="number" id="age" className="input-field mt-1" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input type="tel" id="contact" className="input-field mt-1" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email" className="input-field mt-1" />
                  </div>
                  
                  <div>
                    <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">Initial Diagnosis</label>
                    <input type="text" id="diagnosis" className="input-field mt-1" />
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
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientManagement;