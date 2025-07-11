import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Calendar, Clock, FileText, Activity, Heart, Thermometer, Settings as Lungs, Droplet, FileImage, File, MessageSquare, Pill, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

interface PatientDetailsCardProps {
  patient: any;
}

const PatientDetailsCard: React.FC<PatientDetailsCardProps> = ({ patient }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Basic Information */}
      <div className="card">
        <div className="flex items-start space-x-6">
          <img 
            src={patient.image} 
            alt={patient.name}
            className="h-24 w-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">{patient.name}</h2>
                <p className="text-gray-500">{patient.age} years, {patient.gender}</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                patient.status === 'Critical' ? 'bg-danger-50 text-danger-700' :
                patient.status === 'Stable' ? 'bg-success-50 text-success-700' :
                'bg-warning-50 text-warning-700'
              }`}>
                {patient.status}
              </span>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-2" />
                <span>{patient.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-2" />
                <span>Admitted: {format(new Date(patient.admissionDate), 'MMM dd, yyyy')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Vitals */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Latest Vitals</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="p-4 rounded-lg bg-primary-50">
            <div className="flex items-center text-primary-700 mb-2">
              <Heart size={18} className="mr-2" />
              <span className="font-medium">Heart Rate</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {patient.vitals[0].heartRate}
              <span className="text-sm text-gray-500 ml-1">bpm</span>
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-danger-50">
            <div className="flex items-center text-danger-700 mb-2">
              <Activity size={18} className="mr-2" />
              <span className="font-medium">Blood Pressure</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {patient.vitals[0].bloodPressure}
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-warning-50">
            <div className="flex items-center text-warning-700 mb-2">
              <Thermometer size={18} className="mr-2" />
              <span className="font-medium">Temperature</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {patient.vitals[0].temperature}
              <span className="text-sm text-gray-500 ml-1">°F</span>
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-success-50">
            <div className="flex items-center text-success-700 mb-2">
              <Lungs size={18} className="mr-2" />
              <span className="font-medium">Respiratory Rate</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {patient.vitals[0].respiratoryRate}
              <span className="text-sm text-gray-500 ml-1">bpm</span>
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-primary-50">
            <div className="flex items-center text-primary-700 mb-2">
              <Droplet size={18} className="mr-2" />
              <span className="font-medium">O₂ Saturation</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {patient.vitals[0].oxygenSaturation}
              <span className="text-sm text-gray-500 ml-1">%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Medical Records */}
      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Documents & Images</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileImage size={20} className="text-primary-500 mr-3" />
                <div>
                  <p className="font-medium">Chest X-Ray</p>
                  <p className="text-sm text-gray-500">Added {format(new Date(), 'MMM dd, yyyy')}</p>
                </div>
              </div>
              <button className="btn-secondary text-sm">View</button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <File size={20} className="text-primary-500 mr-3" />
                <div>
                  <p className="font-medium">Lab Results</p>
                  <p className="text-sm text-gray-500">Added {format(new Date(), 'MMM dd, yyyy')}</p>
                </div>
              </div>
              <button className="btn-secondary text-sm">View</button>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recent Notes</h3>
          <div className="space-y-4">
            {patient.notes.slice(0, 2).map((note: any, index: number) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{note.author}</span>
                  <span className="text-sm text-gray-500">{format(new Date(note.date), 'MMM dd, yyyy')}</span>
                </div>
                <p className="text-sm text-gray-600">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medications */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Current Medications</h3>
        <div className="grid grid-cols-3 gap-4">
          {patient.medications.map((medication: any, index: number) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-3">
                <Pill size={20} className="text-primary-500 mr-2" />
                <h4 className="font-medium">{medication.name}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-1">Dosage: {medication.dosage}</p>
              <p className="text-sm text-gray-600">Frequency: {medication.frequency}</p>
              <p className="text-xs text-gray-500 mt-2">Started: {medication.startDate}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      {patient.allergies.length > 0 && (
        <div className="card bg-danger-50">
          <div className="flex items-center mb-3">
            <AlertTriangle size={20} className="text-danger-500 mr-2" />
            <h3 className="text-lg font-semibold text-danger-700">Allergies & Warnings</h3>
          </div>
          <ul className="space-y-2">
            {patient.allergies.map((allergy: string, index: number) => (
              <li key={index} className="flex items-center text-danger-700">
                <span className="h-2 w-2 bg-danger-500 rounded-full mr-2"></span>
                {allergy}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default PatientDetailsCard;