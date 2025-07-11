'use client';
import React, { useState, useEffect } from 'react';
import { searchPatients, recordVitals, Patient as PatientType } from '@/src/lib/supabase-patient';
import { 
  Activity, 
  Search, 
  User, 
  Heart,
  Thermometer,
  Weight,
  Ruler,
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import Link from 'next/link';

interface Patient {
  id: string;
  uhid: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
}

interface VitalSigns {
  systolicBP: string;
  diastolicBP: string;
  heartRate: string;
  temperature: string;
  temperatureUnit: string;
  respiratoryRate: string;
  oxygenSaturation: string;
  weight: string;
  height: string;
  bmi: string;
  bloodSugar: string;
  notes: string;
}

export default function VitalsPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const [vitals, setVitals] = useState<VitalSigns>({
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    temperature: '',
    temperatureUnit: 'celsius',
    respiratoryRate: '',
    oxygenSaturation: '',
    weight: '',
    height: '',
    bmi: '',
    bloodSugar: '',
    notes: ''
  });

  // Search for patients in real-time
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      handlePatientSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handlePatientSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const results = await searchPatients(query);
      // Convert PatientType to Patient interface with calculated age
      const patientsWithAge = results.map(patient => ({
        id: patient.id,
        uhid: patient.uhid,
        name: patient.name,
        age: calculateAge(patient.dateOfBirth),
        gender: patient.gender,
        phone: patient.phone
      }));
      setSearchResults(patientsWithAge);
    } catch (error) {
      console.error('Error searching patients:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleVitalChange = (field: keyof VitalSigns, value: string) => {
    setVitals(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate BMI when weight and height are available
      if ((field === 'weight' || field === 'height') && updated.weight && updated.height) {
        const weightKg = parseFloat(updated.weight);
        const heightM = parseFloat(updated.height) / 100; // Convert cm to m
        if (weightKg > 0 && heightM > 0) {
          const bmi = (weightKg / (heightM * heightM)).toFixed(1);
          updated.bmi = bmi;
        }
      }
      
      return updated;
    });
  };

  const selectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setSearchQuery('');
  };

  const getBMICategory = (bmi: string) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmiValue < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmiValue < 30) return { category: 'Overweight', color: 'text-orange-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const getVitalStatus = (vital: string, range: [number, number]) => {
    const value = parseFloat(vital);
    if (isNaN(value)) return { status: 'normal', color: 'text-gray-500' };
    
    if (value < range[0] || value > range[1]) {
      return { status: 'abnormal', color: 'text-red-600' };
    }
    return { status: 'normal', color: 'text-green-600' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Use the real Supabase integration
      const vitalsData = {
        systolicBP: vitals.systolicBP ? parseFloat(vitals.systolicBP) : undefined,
        diastolicBP: vitals.diastolicBP ? parseFloat(vitals.diastolicBP) : undefined,
        heartRate: vitals.heartRate ? parseFloat(vitals.heartRate) : undefined,
        temperature: vitals.temperature ? parseFloat(vitals.temperature) : undefined,
        temperatureUnit: vitals.temperatureUnit as 'celsius' | 'fahrenheit',
        respiratoryRate: vitals.respiratoryRate ? parseFloat(vitals.respiratoryRate) : undefined,
        oxygenSaturation: vitals.oxygenSaturation ? parseFloat(vitals.oxygenSaturation) : undefined,
        weight: vitals.weight ? parseFloat(vitals.weight) : undefined,
        height: vitals.height ? parseFloat(vitals.height) : undefined,
        bloodSugar: vitals.bloodSugar ? parseFloat(vitals.bloodSugar) : undefined,
        notes: vitals.notes || undefined
      };

      const result = await recordVitals(selectedPatient.id, vitalsData);
      console.log('Vitals recorded successfully:', result);
      
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setVitals({
          systolicBP: '',
          diastolicBP: '',
          heartRate: '',
          temperature: '',
          temperatureUnit: 'celsius',
          respiratoryRate: '',
          oxygenSaturation: '',
          weight: '',
          height: '',
          bmi: '',
          bloodSugar: '',
          notes: ''
        });
        setSelectedPatient(null);
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Error recording vitals:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/receptionist" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Record Patient Vitals</h1>
            <p className="text-gray-500 mt-1">Search and record vital signs for patients</p>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
          <div>
            <p className="font-medium text-green-800">Vitals Recorded Successfully!</p>
            <p className="text-sm text-green-600">Patient: {selectedPatient?.name} ({selectedPatient?.uhid})</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
          <div>
            <p className="font-medium text-red-800">Failed to Record Vitals</p>
            <p className="text-sm text-red-600">Please check the form and try again.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Search */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Patient</h2>
            
            {/* Search Input */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by UHID, name, or phone..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Selected Patient */}
            {selectedPatient && (
              <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-orange-900">{selectedPatient.name}</p>
                    <p className="text-sm text-orange-700">UHID: {selectedPatient.uhid}</p>
                    <p className="text-sm text-orange-600">{selectedPatient.age}Y • {selectedPatient.gender}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="text-orange-500 hover:text-orange-700"
                  >
                    <AlertCircle size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Patient List */}
            {searchQuery && !selectedPatient && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {isSearching ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="text-sm text-gray-500 mt-2">Searching...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((patient: Patient) => (
                    <button
                      key={patient.id}
                      onClick={() => selectPatient(patient)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xs mr-3">
                          {patient.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-500">UHID: {patient.uhid}</p>
                          <p className="text-xs text-gray-400">{patient.age}Y • {patient.gender}</p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    {searchQuery.length < 2 ? 'Type at least 2 characters to search' : 'No patients found'}
                  </p>
                )}
              </div>
            )}

            {!searchQuery && !selectedPatient && (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Search for a patient to record vitals</p>
              </div>
            )}
          </div>
        </div>

        {/* Vitals Form */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Blood Pressure & Heart Rate */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Cardiovascular</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Systolic BP (mmHg)
                    </label>
                    <input
                      type="number"
                      value={vitals.systolicBP}
                      onChange={(e) => handleVitalChange('systolicBP', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="120"
                    />
                    {vitals.systolicBP && (
                      <p className={`text-xs mt-1 ${getVitalStatus(vitals.systolicBP, [90, 140]).color}`}>
                        {getVitalStatus(vitals.systolicBP, [90, 140]).status === 'abnormal' ? 'Outside normal range' : 'Normal'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Diastolic BP (mmHg)
                    </label>
                    <input
                      type="number"
                      value={vitals.diastolicBP}
                      onChange={(e) => handleVitalChange('diastolicBP', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="80"
                    />
                    {vitals.diastolicBP && (
                      <p className={`text-xs mt-1 ${getVitalStatus(vitals.diastolicBP, [60, 90]).color}`}>
                        {getVitalStatus(vitals.diastolicBP, [60, 90]).status === 'abnormal' ? 'Outside normal range' : 'Normal'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heart Rate (bpm)
                    </label>
                    <input
                      type="number"
                      value={vitals.heartRate}
                      onChange={(e) => handleVitalChange('heartRate', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="72"
                    />
                    {vitals.heartRate && (
                      <p className={`text-xs mt-1 ${getVitalStatus(vitals.heartRate, [60, 100]).color}`}>
                        {getVitalStatus(vitals.heartRate, [60, 100]).status === 'abnormal' ? 'Outside normal range' : 'Normal'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Temperature & Respiratory */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                  <Thermometer className="h-5 w-5 text-blue-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Temperature & Respiratory</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temperature
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        step="0.1"
                        value={vitals.temperature}
                        onChange={(e) => handleVitalChange('temperature', e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="98.6"
                      />
                      <select
                        value={vitals.temperatureUnit}
                        onChange={(e) => handleVitalChange('temperatureUnit', e.target.value)}
                        className="px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="celsius">°C</option>
                        <option value="fahrenheit">°F</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Respiratory Rate (breaths/min)
                    </label>
                    <input
                      type="number"
                      value={vitals.respiratoryRate}
                      onChange={(e) => handleVitalChange('respiratoryRate', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="16"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Oxygen Saturation (%)
                    </label>
                    <input
                      type="number"
                      value={vitals.oxygenSaturation}
                      onChange={(e) => handleVitalChange('oxygenSaturation', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="98"
                    />
                    {vitals.oxygenSaturation && (
                      <p className={`text-xs mt-1 ${getVitalStatus(vitals.oxygenSaturation, [95, 100]).color}`}>
                        {getVitalStatus(vitals.oxygenSaturation, [95, 100]).status === 'abnormal' ? 'Low oxygen saturation' : 'Normal'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Physical Measurements */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                  <Ruler className="h-5 w-5 text-green-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Physical Measurements</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={vitals.weight}
                      onChange={(e) => handleVitalChange('weight', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="70.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={vitals.height}
                      onChange={(e) => handleVitalChange('height', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="170"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      BMI
                    </label>
                    <input
                      type="text"
                      value={vitals.bmi}
                      readOnly
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600"
                      placeholder="Auto-calculated"
                    />
                    {vitals.bmi && (
                      <p className={`text-xs mt-1 ${getBMICategory(vitals.bmi).color}`}>
                        {getBMICategory(vitals.bmi).category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Sugar (mg/dL)
                    </label>
                    <input
                      type="number"
                      value={vitals.bloodSugar}
                      onChange={(e) => handleVitalChange('bloodSugar', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="100"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={vitals.notes}
                  onChange={(e) => handleVitalChange('notes', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Any additional observations or notes..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedPatient(null)}
                  className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-orange-500 hover:bg-orange-600 shadow-sm hover:shadow-md'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Recording Vitals...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Record Vitals
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
              <div className="text-center">
                <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Patient Selected</h3>
                <p className="text-gray-500">Please select a patient from the search panel to record their vital signs.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 