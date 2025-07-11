import { supabase } from './supabase';

export interface PatientRegistrationData {
  // Basic Information
  name: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email?: string;
  address?: string;
  
  // Emergency Contact
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  
  // Medical Information
  bloodGroup?: string;
  allergies?: string;
  medicalHistory?: string;
  
  // Insurance (Optional)
  insuranceNumber?: string;
  insuranceProvider?: string;
  
  // Visit Information
  purposeOfVisit: string;
  symptoms?: string;
  doctorId: string;
  appointmentType: string;
  preferredTime?: string;
}

export interface VitalsData {
  systolicBP?: number;
  diastolicBP?: number;
  heartRate?: number;
  temperature?: number;
  temperatureUnit?: 'celsius' | 'fahrenheit';
  respiratoryRate?: number;
  oxygenSaturation?: number;
  weight?: number;
  height?: number;
  bloodSugar?: number;
  notes?: string;
}

export interface Patient {
  id: string;
  uhid: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email?: string;
  bloodGroup?: string;
  status: string;
}

// Generate unique UHID
export async function generateUHID(): Promise<string> {
  const year = new Date().getFullYear();
  let uhid = '';
  let isUnique = false;
  
  while (!isUnique) {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    uhid = `AH${year}${randomNum}`;
    
    // Check if UHID already exists
    const { data, error } = await supabase
      .from('patients')
      .select('patient_id')
      .eq('patient_id', uhid)
      .single();
    
    if (error && error.code === 'PGRST116') {
      // No matching rows found, UHID is unique
      isUnique = true;
    } else if (error) {
      throw new Error('Error checking UHID uniqueness');
    }
  }
  
  return uhid;
}

// Create patient authentication account
export async function createPatientAuth(uhid: string, email: string): Promise<string> {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: 'password', // Default password
    options: {
      data: {
        uhid: uhid,
        role: 'patient'
      }
    }
  });
  
  if (error) {
    throw new Error(`Error creating patient auth: ${error.message}`);
  }
  
  return data.user?.id || '';
}

// Register new patient
export async function registerPatient(patientData: PatientRegistrationData): Promise<{
  patient: Patient;
  appointment: any;
  uhid: string;
  patientEmail: string;
}> {
  try {
    // Generate UHID
    const uhid = await generateUHID();
    const patientEmail = `${uhid.toLowerCase()}@annam.com`;
    
    // Create patient authentication
    const authId = await createPatientAuth(uhid, patientEmail);
    
    // Calculate age
    const birthDate = new Date(patientData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    // Insert patient record
    const { data: patientRecord, error: patientError } = await supabase
      .from('patients')
      .insert([{
        patient_id: uhid,
        name: patientData.name,
        date_of_birth: patientData.dateOfBirth,
        gender: patientData.gender,
        phone: patientData.phone,
        email: patientData.email || patientEmail,
        address: patientData.address,
        emergency_contact_name: patientData.emergencyContactName,
        emergency_contact_phone: patientData.emergencyContactPhone,
        blood_group: patientData.bloodGroup,
        allergies: patientData.allergies,
        medical_history: patientData.medicalHistory,
        insurance_number: patientData.insuranceNumber,
        insurance_provider: patientData.insuranceProvider,
        status: 'active'
      }])
      .select()
      .single();
    
    if (patientError) {
      throw new Error(`Error creating patient: ${patientError.message}`);
    }
    
    // Create appointment if doctor is selected
    let appointmentRecord = null;
    if (patientData.doctorId) {
      const appointmentId = `APT${Date.now()}`;
      const appointmentDate = patientData.preferredTime 
        ? new Date(patientData.preferredTime).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      const appointmentTime = patientData.preferredTime 
        ? new Date(patientData.preferredTime).toTimeString().split(' ')[0]
        : '10:00:00';
      
      // Get receptionist user ID
      const { data: receptionistUser } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'receptionist')
        .single();
      
      const { data: appointment, error: appointmentError } = await supabase
        .from('appointments')
        .insert([{
          appointment_id: appointmentId,
          patient_id: patientRecord.id,
          doctor_id: patientData.doctorId,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          type: patientData.appointmentType,
          status: 'scheduled',
          notes: patientData.purposeOfVisit,
          symptoms: patientData.symptoms,
          created_by: receptionistUser?.id
        }])
        .select()
        .single();
      
      if (appointmentError) {
        console.error('Error creating appointment:', appointmentError);
        // Don't throw error here as patient is already created
      } else {
        appointmentRecord = appointment;
      }
    }
    
    return {
      patient: patientRecord,
      appointment: appointmentRecord,
      uhid,
      patientEmail
    };
    
  } catch (error) {
    console.error('Error in registerPatient:', error);
    throw error;
  }
}

// Record patient vitals
export async function recordVitals(patientId: string, vitalsData: VitalsData): Promise<any> {
  try {
    // For now, we'll store vitals in the patient's medical history
    // In a real system, you might want a separate vitals table
    const vitalsRecord = {
      patient_id: patientId,
      recorded_at: new Date().toISOString(),
      systolic_bp: vitalsData.systolicBP,
      diastolic_bp: vitalsData.diastolicBP,
      heart_rate: vitalsData.heartRate,
      temperature: vitalsData.temperature,
      temperature_unit: vitalsData.temperatureUnit,
      respiratory_rate: vitalsData.respiratoryRate,
      oxygen_saturation: vitalsData.oxygenSaturation,
      weight: vitalsData.weight,
      height: vitalsData.height,
      blood_sugar: vitalsData.bloodSugar,
      notes: vitalsData.notes,
      recorded_by: 'Monica (Receptionist)'
    };
    
    // Update patient's medical history with vitals
    const { data: patient, error: fetchError } = await supabase
      .from('patients')
      .select('medical_history')
      .eq('id', patientId)
      .single();
    
    if (fetchError) {
      throw new Error(`Error fetching patient: ${fetchError.message}`);
    }
    
    const currentHistory = patient.medical_history || '';
    const vitalsEntry = `\n[${new Date().toLocaleDateString()}] Vitals recorded by Monica:\n${JSON.stringify(vitalsRecord, null, 2)}`;
    const updatedHistory = currentHistory + vitalsEntry;
    
    const { data: updatedPatient, error: updateError } = await supabase
      .from('patients')
      .update({ medical_history: updatedHistory })
      .eq('id', patientId)
      .select()
      .single();
    
    if (updateError) {
      throw new Error(`Error updating patient vitals: ${updateError.message}`);
    }
    
    return updatedPatient;
    
  } catch (error) {
    console.error('Error in recordVitals:', error);
    throw error;
  }
}

// Search patients by UHID, name, or phone
export async function searchPatients(query: string): Promise<Patient[]> {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('id, patient_id, name, date_of_birth, gender, phone, email, blood_group, status')
      .or(`patient_id.ilike.%${query}%,name.ilike.%${query}%,phone.ilike.%${query}%`)
      .eq('status', 'active')
      .order('name');
    
    if (error) {
      throw new Error(`Error searching patients: ${error.message}`);
    }
    
    return data?.map(patient => ({
      id: patient.id,
      uhid: patient.patient_id,
      name: patient.name,
      dateOfBirth: patient.date_of_birth,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      bloodGroup: patient.blood_group,
      status: patient.status
    })) || [];
    
  } catch (error) {
    console.error('Error in searchPatients:', error);
    throw error;
  }
}

// Get available doctors
export async function getAvailableDoctors(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        id, 
        name, 
        specialization,
        doctors (
          consultation_fee,
          availability_hours,
          status
        )
      `)
      .eq('role', 'doctor')
      .eq('status', 'active')
      .order('name');
    
    if (error) {
      throw new Error(`Error fetching doctors: ${error.message}`);
    }
    
    return data?.map(doctor => ({
      id: doctor.id,
      name: doctor.name,
      specialization: doctor.specialization,
      consultation_fee: doctor.doctors?.[0]?.consultation_fee || '0',
      availability_hours: doctor.doctors?.[0]?.availability_hours,
      status: doctor.doctors?.[0]?.status || 'active'
    })) || [];
    
  } catch (error) {
    console.error('Error in getAvailableDoctors:', error);
    throw error;
  }
}

// Get patient by UHID
export async function getPatientByUHID(uhid: string): Promise<Patient | null> {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('id, patient_id, name, date_of_birth, gender, phone, email, blood_group, status')
      .eq('patient_id', uhid)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No patient found
      }
      throw new Error(`Error fetching patient: ${error.message}`);
    }
    
    return {
      id: data.id,
      uhid: data.patient_id,
      name: data.name,
      dateOfBirth: data.date_of_birth,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      bloodGroup: data.blood_group,
      status: data.status
    };
    
  } catch (error) {
    console.error('Error in getPatientByUHID:', error);
    throw error;
  }
} 