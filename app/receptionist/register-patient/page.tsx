'use client';
import React, { useState, useEffect } from 'react';
import { registerPatient, getAvailableDoctors, generateUHID } from '@/src/lib/supabase-patient';
import { 
  User, 
  Calendar, 
  Phone, 
  MapPin, 
  Heart,
  FileText,
  Stethoscope,
  Save,
  ArrowLeft,
  UserPlus,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  consultation_fee: string;
}

export default function RegisterPatientPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [generatedUHID, setGeneratedUHID] = useState('');
  
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    
    // Medical Information
    bloodGroup: '',
    allergies: '',
    medicalHistory: '',
    
    // Insurance (Optional)
    insuranceNumber: '',
    insuranceProvider: '',
    
    // Visit Information
    purposeOfVisit: '',
    symptoms: '',
    doctorId: '',
    appointmentType: 'consultation',
    preferredTime: ''
  });

  // Generate UHID on component mount
  useEffect(() => {
    generateUHIDAsync();
    fetchDoctors();
  }, []);

  const generateUHIDAsync = async () => {
    try {
      const uhid = await generateUHID();
      setGeneratedUHID(uhid);
    } catch (error) {
      console.error('Error generating UHID:', error);
      // Fallback to local generation if database fails
      const year = new Date().getFullYear();
      const randomNum = Math.floor(Math.random() * 9000) + 1000;
      setGeneratedUHID(`AH${year}${randomNum}`);
    }
  };

  const fetchDoctors = async () => {
    try {
      const availableDoctors = await getAvailableDoctors();
      setDoctors(availableDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      // Fallback to hardcoded doctors if database fails
      setDoctors([
        { id: "f5b417bb-4136-4054-a00d-a68ab066e54c", name: "Dr. Amit Singh", specialization: "Emergency Medicine", consultation_fee: "2000.00" },
        { id: "1499e5f0-6760-4d5e-b8f5-891054dca786", name: "Dr. Kavitha Reddy", specialization: "Radiology", consultation_fee: "1000.00" },
        { id: "77a292f1-da3e-48ef-a7da-88fc651217a4", name: "Dr. Priya Sharma", specialization: "Cardiology", consultation_fee: "1500.00" },
        { id: "5df81b90-1dc7-4095-9c15-727d3084aecb", name: "Dr. Rajesh Kumar", specialization: "Pediatrics", consultation_fee: "1200.00" },
        { id: "172b5e44-9e80-4050-8d39-45d026974b01", name: "Dr. Sunita Patel", specialization: "Orthopedics", consultation_fee: "1800.00" }
      ]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return '';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Use the real Supabase integration
      const result = await registerPatient({
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        emergencyContactName: formData.emergencyContactName,
        emergencyContactPhone: formData.emergencyContactPhone,
        bloodGroup: formData.bloodGroup,
        allergies: formData.allergies,
        medicalHistory: formData.medicalHistory,
        insuranceNumber: formData.insuranceNumber,
        insuranceProvider: formData.insuranceProvider,
        purposeOfVisit: formData.purposeOfVisit,
        symptoms: formData.symptoms,
        doctorId: formData.doctorId,
        appointmentType: formData.appointmentType,
        preferredTime: formData.preferredTime
      });

      console.log('Patient registered successfully:', result);
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          dateOfBirth: '',
          gender: '',
          phone: '',
          email: '',
          address: '',
          emergencyContactName: '',
          emergencyContactPhone: '',
          bloodGroup: '',
          allergies: '',
          medicalHistory: '',
          insuranceNumber: '',
          insuranceProvider: '',
          purposeOfVisit: '',
          symptoms: '',
          doctorId: '',
          appointmentType: 'consultation',
          preferredTime: ''
        });
        generateUHIDAsync(); // Generate new UHID for next patient
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Error registering patient:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDoctor = doctors.find(doc => doc.id === formData.doctorId);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/receptionist" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Register New Patient</h1>
            <p className="text-gray-500 mt-1">Complete patient registration and create appointment</p>
          </div>
        </div>
        
        {/* Generated UHID Display */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <p className="text-sm font-medium text-orange-800">Generated UHID</p>
          <p className="text-lg font-bold text-orange-900">{generatedUHID}</p>
          <p className="text-xs text-orange-600">Patient Email: {generatedUHID.toLowerCase()}@annam.com</p>
        </div>
      </div>

      {/* Success/Error Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
          <div>
            <p className="font-medium text-green-800">Patient Registered Successfully!</p>
            <p className="text-sm text-green-600">UHID: {generatedUHID} | Email: {generatedUHID.toLowerCase()}@annam.com | Password: password</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
          <div>
            <p className="font-medium text-red-800">Registration Failed</p>
            <p className="text-sm text-red-600">Please check the form and try again.</p>
          </div>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <User className="h-5 w-5 text-orange-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter patient's full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              {formData.dateOfBirth && (
                <p className="text-xs text-gray-500 mt-1">Age: {calculateAge(formData.dateOfBirth)} years</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="+91-9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="patient@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Complete address"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <Phone className="h-5 w-5 text-red-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Emergency Contact</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact Name
              </label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Contact person name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact Phone
              </label>
              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="+91-9876543210"
              />
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <Heart className="h-5 w-5 text-pink-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Medical Information</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Known Allergies
              </label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="List any known allergies (medications, food, environmental)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical History
              </label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Previous surgeries, chronic conditions, medications"
              />
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <FileText className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Insurance Information (Optional)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Number
              </label>
              <input
                type="text"
                name="insuranceNumber"
                value={formData.insuranceNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Insurance policy number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Provider
              </label>
              <input
                type="text"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Insurance company name"
              />
            </div>
          </div>
        </div>

        {/* Visit Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <Stethoscope className="h-5 w-5 text-green-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Visit Information</h2>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose of Visit <span className="text-red-500">*</span>
                </label>
                <select
                  name="purposeOfVisit"
                  value={formData.purposeOfVisit}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select Purpose</option>
                  <option value="consultation">General Consultation</option>
                  <option value="follow_up">Follow-up Visit</option>
                  <option value="emergency">Emergency</option>
                  <option value="checkup">Routine Checkup</option>
                  <option value="surgery">Surgery Consultation</option>
                  <option value="lab_test">Lab Test</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Type
                </label>
                <select
                  name="appointmentType"
                  value={formData.appointmentType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="consultation">Consultation</option>
                  <option value="follow_up">Follow-up</option>
                  <option value="emergency">Emergency</option>
                  <option value="checkup">Checkup</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Doctor <span className="text-red-500">*</span>
              </label>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization} (₹{doctor.consultation_fee})
                  </option>
                ))}
              </select>
              {selectedDoctor && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>{selectedDoctor.name}</strong> - {selectedDoctor.specialization}
                  </p>
                  <p className="text-sm text-blue-600">Consultation Fee: ₹{selectedDoctor.consultation_fee}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Symptoms
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Describe current symptoms or concerns"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Appointment Time
              </label>
              <input
                type="datetime-local"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link 
            href="/receptionist"
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
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
                Registering Patient...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Register Patient
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 