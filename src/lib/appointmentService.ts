import { supabase } from './supabase';
import { Doctor } from './doctorService';

// Validation and business rule interfaces
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface BusinessRules {
  maxAppointmentsPerDay: number;
  minAdvanceBookingHours: number;
  maxAdvanceBookingDays: number;
  allowWeekendBooking: boolean;
  emergencySlotBuffer: number; // minutes
  followUpGracePeriod: number; // days
}

// Default business rules
const DEFAULT_BUSINESS_RULES: BusinessRules = {
  maxAppointmentsPerDay: 20,
  minAdvanceBookingHours: 2,
  maxAdvanceBookingDays: 90,
  allowWeekendBooking: false,
  emergencySlotBuffer: 15,
  followUpGracePeriod: 7
};

/**
 * Validate appointment data before creation
 */
export async function validateAppointmentData(
  appointmentData: AppointmentData,
  businessRules: BusinessRules = DEFAULT_BUSINESS_RULES
): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Basic field validation
  if (!appointmentData.patientId) {
    errors.push('Patient ID is required');
  }
  if (!appointmentData.doctorId) {
    errors.push('Doctor ID is required');
  }
  if (!appointmentData.appointmentDate) {
    errors.push('Appointment date is required');
  }
  if (!appointmentData.appointmentTime) {
    errors.push('Appointment time is required');
  }

  // Date and time validation
  const appointmentDateTime = new Date(`${appointmentData.appointmentDate}T${appointmentData.appointmentTime}`);
  const now = new Date();
  const dayOfWeek = appointmentDateTime.getDay();

  // Check if appointment is in the past
  if (appointmentDateTime <= now) {
    errors.push('Appointment cannot be scheduled in the past');
  }

  // Check minimum advance booking time
  const hoursUntilAppointment = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (hoursUntilAppointment < businessRules.minAdvanceBookingHours) {
    errors.push(`Appointments must be booked at least ${businessRules.minAdvanceBookingHours} hours in advance`);
  }

  // Check maximum advance booking time
  const daysUntilAppointment = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  if (daysUntilAppointment > businessRules.maxAdvanceBookingDays) {
    errors.push(`Appointments cannot be booked more than ${businessRules.maxAdvanceBookingDays} days in advance`);
  }

  // Check weekend booking policy
  if (!businessRules.allowWeekendBooking && (dayOfWeek === 0 || dayOfWeek === 6)) {
    errors.push('Weekend appointments are not allowed');
  }

  // Check business hours (9 AM to 6 PM)
  const appointmentHour = appointmentDateTime.getHours();
  if (appointmentHour < 9 || appointmentHour >= 18) {
    errors.push('Appointments must be scheduled between 9:00 AM and 6:00 PM');
  }

  // Validate appointment duration
  if (appointmentData.durationMinutes && (appointmentData.durationMinutes < 15 || appointmentData.durationMinutes > 120)) {
    errors.push('Appointment duration must be between 15 and 120 minutes');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Check for appointment conflicts
 */
export async function checkAppointmentConflicts(
  appointmentData: AppointmentData,
  excludeAppointmentId?: string
): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    const appointmentDateTime = new Date(`${appointmentData.appointmentDate}T${appointmentData.appointmentTime}`);
    const duration = appointmentData.durationMinutes || 30;
    const endTime = new Date(appointmentDateTime.getTime() + duration * 60000);

    // Check for doctor conflicts
    let doctorQuery = supabase
      .from('appointments')
      .select('id, appointment_time, duration_minutes')
      .eq('doctor_id', appointmentData.doctorId)
      .eq('appointment_date', appointmentData.appointmentDate)
      .in('status', ['scheduled', 'confirmed', 'in_progress']);

    if (excludeAppointmentId) {
      doctorQuery = doctorQuery.neq('id', excludeAppointmentId);
    }

    const { data: doctorAppointments, error: doctorError } = await doctorQuery;

    if (doctorError) {
      errors.push('Failed to check doctor availability');
      return { isValid: false, errors, warnings };
    }

    // Check for time conflicts with doctor's existing appointments
    for (const existingAppointment of doctorAppointments || []) {
      const existingStart = new Date(`${appointmentData.appointmentDate}T${existingAppointment.appointment_time}`);
      const existingEnd = new Date(existingStart.getTime() + (existingAppointment.duration_minutes || 30) * 60000);

      // Check if appointments overlap
      if (
        (appointmentDateTime >= existingStart && appointmentDateTime < existingEnd) ||
        (endTime > existingStart && endTime <= existingEnd) ||
        (appointmentDateTime <= existingStart && endTime >= existingEnd)
      ) {
        errors.push(`Doctor has a conflicting appointment at ${existingAppointment.appointment_time}`);
      }
    }

    // Check patient conflicts (prevent double booking)
    let patientQuery = supabase
      .from('appointments')
      .select('id, appointment_time, duration_minutes')
      .eq('patient_id', appointmentData.patientId)
      .eq('appointment_date', appointmentData.appointmentDate)
      .in('status', ['scheduled', 'confirmed', 'in_progress']);

    if (excludeAppointmentId) {
      patientQuery = patientQuery.neq('id', excludeAppointmentId);
    }

    const { data: patientAppointments, error: patientError } = await patientQuery;

    if (patientError) {
      errors.push('Failed to check patient availability');
      return { isValid: false, errors, warnings };
    }

    // Check for patient conflicts
    for (const existingAppointment of patientAppointments || []) {
      const existingStart = new Date(`${appointmentData.appointmentDate}T${existingAppointment.appointment_time}`);
      const existingEnd = new Date(existingStart.getTime() + (existingAppointment.duration_minutes || 30) * 60000);

      if (
        (appointmentDateTime >= existingStart && appointmentDateTime < existingEnd) ||
        (endTime > existingStart && endTime <= existingEnd) ||
        (appointmentDateTime <= existingStart && endTime >= existingEnd)
      ) {
        errors.push(`Patient has a conflicting appointment at ${existingAppointment.appointment_time}`);
      }
    }

    // Check doctor's daily appointment limit
    const { count: dailyCount, error: countError } = await supabase
      .from('appointments')
      .select('id', { count: 'exact', head: true })
      .eq('doctor_id', appointmentData.doctorId)
      .eq('appointment_date', appointmentData.appointmentDate)
      .in('status', ['scheduled', 'confirmed', 'in_progress']);

    if (countError) {
      warnings.push('Could not verify daily appointment limit');
    } else if ((dailyCount || 0) >= DEFAULT_BUSINESS_RULES.maxAppointmentsPerDay) {
      errors.push(`Doctor has reached the maximum daily appointment limit (${DEFAULT_BUSINESS_RULES.maxAppointmentsPerDay})`);
    }

  } catch (error) {
    console.error('Error checking appointment conflicts:', error);
    errors.push('Failed to validate appointment conflicts');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Comprehensive appointment validation
 */
export async function validateAppointment(
  appointmentData: AppointmentData,
  excludeAppointmentId?: string,
  businessRules: BusinessRules = DEFAULT_BUSINESS_RULES
): Promise<ValidationResult> {
  // Run basic validation
  const basicValidation = await validateAppointmentData(appointmentData, businessRules);
  
  if (!basicValidation.isValid) {
    return basicValidation;
  }

  // Run conflict validation
  const conflictValidation = await checkAppointmentConflicts(appointmentData, excludeAppointmentId);
  
  return {
    isValid: basicValidation.isValid && conflictValidation.isValid,
    errors: [...basicValidation.errors, ...conflictValidation.errors],
    warnings: [...basicValidation.warnings, ...conflictValidation.warnings]
  };
}

/**
 * Smart slot recommendation when conflicts occur
 */
export async function getAlternativeSlots(
  appointmentData: AppointmentData,
  maxSuggestions: number = 5
): Promise<AppointmentSlot[]> {
  const suggestions: AppointmentSlot[] = [];
  const requestedDate = new Date(appointmentData.appointmentDate);
  const duration = appointmentData.durationMinutes || 30;
  
  try {
    // Get doctor information
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', appointmentData.doctorId)
      .single();

    if (doctorError || !doctor) {
      return suggestions;
    }

    // Check slots for the next 7 days
    for (let dayOffset = 0; dayOffset < 7 && suggestions.length < maxSuggestions; dayOffset++) {
      const checkDate = new Date(requestedDate);
      checkDate.setDate(requestedDate.getDate() + dayOffset);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      // Skip weekends if not allowed
      const dayOfWeek = checkDate.getDay();
      if (!DEFAULT_BUSINESS_RULES.allowWeekendBooking && (dayOfWeek === 0 || dayOfWeek === 6)) {
        continue;
      }

      // Get existing appointments for this date
      const { data: existingAppointments } = await supabase
        .from('appointments')
        .select('appointment_time, duration_minutes')
        .eq('doctor_id', appointmentData.doctorId)
        .eq('appointment_date', dateStr)
        .in('status', ['scheduled', 'confirmed', 'in_progress']);

      // Generate time slots (9 AM to 6 PM, 30-minute intervals)
      for (let hour = 9; hour < 18 && suggestions.length < maxSuggestions; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const slotStart = new Date(`${dateStr}T${timeStr}`);
          const slotEnd = new Date(slotStart.getTime() + duration * 60000);

          // Check if this slot conflicts with existing appointments
          let hasConflict = false;
          for (const existing of existingAppointments || []) {
            const existingStart = new Date(`${dateStr}T${existing.appointment_time}`);
            const existingEnd = new Date(existingStart.getTime() + (existing.duration_minutes || 30) * 60000);

            if (
              (slotStart >= existingStart && slotStart < existingEnd) ||
              (slotEnd > existingStart && slotEnd <= existingEnd) ||
              (slotStart <= existingStart && slotEnd >= existingEnd)
            ) {
              hasConflict = true;
              break;
            }
          }

          if (!hasConflict) {
            // Validate this alternative slot
            const altData = {
              ...appointmentData,
              appointmentDate: dateStr,
              appointmentTime: timeStr
            };
            
            const validation = await validateAppointmentData(altData);
            if (validation.isValid) {
              suggestions.push({
                date: dateStr,
                time: timeStr,
                available: true,
                doctorId: appointmentData.doctorId,
                doctorName: doctor.user?.name || 'Unknown',
                specialization: doctor.specialization || 'General'
              });
            }
          }
        }
      }
    }

    return suggestions;
  } catch (error) {
    console.error('Error getting alternative slots:', error);
    return suggestions;
  }
}

/**
 * Enhanced validation with smart suggestions
 */
export async function validateAppointmentWithSuggestions(
  appointmentData: AppointmentData,
  excludeAppointmentId?: string,
  businessRules: BusinessRules = DEFAULT_BUSINESS_RULES
): Promise<ValidationResult & { suggestions?: AppointmentSlot[] }> {
  const validation = await validateAppointment(appointmentData, excludeAppointmentId, businessRules);
  
  // If validation fails due to conflicts, provide alternative suggestions
  if (!validation.isValid && validation.errors.some(error => 
    error.includes('conflicting appointment') || 
    error.includes('maximum daily appointment limit')
  )) {
    const suggestions = await getAlternativeSlots(appointmentData);
    return {
      ...validation,
      suggestions
    };
  }
  
  return validation;
}

// Types for appointment management
export interface AppointmentData {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  durationMinutes?: number;
  type: 'new_patient' | 'follow_up' | 'emergency' | 'routine_checkup' | 'consultation';
  symptoms?: string;
  chiefComplaint?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  appointment_id: string;
  patient_id: string;
  doctor_id: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  type: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'rescheduled';
  symptoms?: string;
  chief_complaint?: string;
  diagnosis?: string;
  treatment_plan?: string;
  prescriptions?: any[];
  next_appointment_date?: string;
  follow_up_instructions?: string;
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  
  // Related data
  patient?: any;
  doctor?: any;
}

export interface AppointmentSlot {
  date: string;
  time: string;
  available: boolean;
  doctorId: string;
  doctorName: string;
  specialization: string;
}

/**
 * Generate a unique appointment ID
 * Format: APT{Year}{Month}{Day}{Sequential}
 * Example: APT202501150001
 */
export async function generateAppointmentId(): Promise<string> {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const datePrefix = `${year}${month}${day}`;
  
  try {
    // Get count of existing appointments for today
    const { count, error } = await supabase
      .from('appointments')
      .select('id', { count: 'exact', head: true })
      .like('appointment_id', `APT${datePrefix}%`);
    
    if (error) {
      console.error('Error getting appointment count:', error);
      throw new Error('Failed to generate appointment ID');
    }
    
    const sequence = ((count || 0) + 1).toString().padStart(4, '0');
    return `APT${datePrefix}${sequence}`;
  } catch (error) {
    console.error('Error generating appointment ID:', error);
    throw error;
  }
}

/**
 * Create a new appointment
 */
export async function createAppointment(
  appointmentData: AppointmentData,
  createdBy?: string
): Promise<Appointment> {
  try {
    // Validate appointment data and check for conflicts
    const validation = await validateAppointment(appointmentData);
    
    if (!validation.isValid) {
      const errorMessage = validation.errors.join('; ');
      throw new Error(`Appointment validation failed: ${errorMessage}`);
    }
    
    // Log warnings if any
    if (validation.warnings.length > 0) {
      console.warn('Appointment warnings:', validation.warnings.join('; '));
    }
    
    const appointmentId = await generateAppointmentId();
    
    const appointmentRecord = {
      appointment_id: appointmentId,
      patient_id: appointmentData.patientId,
      doctor_id: appointmentData.doctorId,
      appointment_date: appointmentData.appointmentDate,
      appointment_time: appointmentData.appointmentTime,
      duration_minutes: appointmentData.durationMinutes || 30,
      type: appointmentData.type,
      status: 'scheduled',
      symptoms: appointmentData.symptoms || null,
      chief_complaint: appointmentData.chiefComplaint || null,
      notes: appointmentData.notes || null,
      created_by: createdBy || null,
      prescriptions: []
    };

    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert([appointmentRecord])
      .select(`
        *,
        patient:patients(id, patient_id, name, phone, email),
        doctor:doctors(
          id, 
          doctor_id, 
          specialization, 
          department,
          user:users(name, phone, email)
        )
      `)
      .single();

    if (error) {
      console.error('Error creating appointment:', error);
      throw new Error(`Failed to create appointment: ${error.message}`);
    }

    return appointment;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
}

/**
 * Get appointments with filtering and pagination
 */
export async function getAppointments(options: {
  page?: number;
  limit?: number;
  patientId?: string;
  doctorId?: string;
  date?: string;
  status?: string;
  type?: string;
  searchTerm?: string;
} = {}): Promise<{
  appointments: Appointment[];
  total: number;
  page: number;
  limit: number;
}> {
  try {
    const { page = 1, limit = 20, patientId, doctorId, date, status, type, searchTerm } = options;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('appointments')
      .select(`
        *,
        patient:patients(id, patient_id, name, phone, email),
        doctor:doctors(
          id, 
          doctor_id, 
          specialization, 
          department,
          user:users(name, phone, email)
        )
      `, { count: 'exact' });

    // Apply filters
    if (patientId) {
      query = query.eq('patient_id', patientId);
    }

    if (doctorId) {
      query = query.eq('doctor_id', doctorId);
    }

    if (date) {
      query = query.eq('appointment_date', date);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (type) {
      query = query.eq('type', type);
    }

    if (searchTerm) {
      query = query.or(`
        appointment_id.ilike.%${searchTerm}%,
        symptoms.ilike.%${searchTerm}%,
        chief_complaint.ilike.%${searchTerm}%,
        diagnosis.ilike.%${searchTerm}%
      `);
    }

    // Apply pagination and ordering
    const { data: appointments, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('appointment_date', { ascending: false })
      .order('appointment_time', { ascending: false });

    if (error) {
      console.error('Error fetching appointments:', error);
      throw new Error(`Failed to fetch appointments: ${error.message}`);
    }

    return {
      appointments: appointments || [],
      total: count || 0,
      page,
      limit
    };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}

/**
 * Get appointment by ID
 */
export async function getAppointmentById(appointmentId: string): Promise<Appointment> {
  try {
    const { data: appointment, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patient:patients(id, patient_id, name, phone, email, date_of_birth, gender, address),
        doctor:doctors(
          id, 
          doctor_id, 
          specialization, 
          department,
          qualification,
          user:users(name, phone, email)
        )
      `)
      .eq('appointment_id', appointmentId)
      .single();

    if (error) {
      console.error('Error fetching appointment:', error);
      throw new Error(`Appointment not found: ${error.message}`);
    }

    return appointment;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    throw error;
  }
}

/**
 * Update appointment status
 */
export async function updateAppointmentStatus(
  appointmentId: string,
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'rescheduled'
): Promise<Appointment> {
  try {
    const { data: appointment, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('appointment_id', appointmentId)
      .select(`
        *,
        patient:patients(id, patient_id, name, phone, email),
        doctor:doctors(
          id, 
          doctor_id, 
          specialization, 
          department,
          user:users(name, phone, email)
        )
      `)
      .single();

    if (error) {
      console.error('Error updating appointment status:', error);
      throw new Error(`Failed to update appointment status: ${error.message}`);
    }

    return appointment;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
}

/**
 * Update appointment with medical information
 */
export async function updateAppointmentMedicalInfo(
  appointmentId: string,
  medicalInfo: {
    diagnosis?: string;
    treatmentPlan?: string;
    prescriptions?: any[];
    followUpInstructions?: string;
    nextAppointmentDate?: string;
  }
): Promise<Appointment> {
  try {
    const updateData: any = {};
    
    if (medicalInfo.diagnosis) updateData.diagnosis = medicalInfo.diagnosis;
    if (medicalInfo.treatmentPlan) updateData.treatment_plan = medicalInfo.treatmentPlan;
    if (medicalInfo.prescriptions) updateData.prescriptions = medicalInfo.prescriptions;
    if (medicalInfo.followUpInstructions) updateData.follow_up_instructions = medicalInfo.followUpInstructions;
    if (medicalInfo.nextAppointmentDate) updateData.next_appointment_date = medicalInfo.nextAppointmentDate;

    const { data: appointment, error } = await supabase
      .from('appointments')
      .update(updateData)
      .eq('appointment_id', appointmentId)
      .select(`
        *,
        patient:patients(id, patient_id, name, phone, email),
        doctor:doctors(
          id, 
          doctor_id, 
          specialization, 
          department,
          user:users(name, phone, email)
        )
      `)
      .single();

    if (error) {
      console.error('Error updating appointment medical info:', error);
      throw new Error(`Failed to update appointment medical info: ${error.message}`);
    }

    return appointment;
  } catch (error) {
    console.error('Error updating appointment medical info:', error);
    throw error;
  }
}

/**
 * Get patient appointment history
 */
export async function getPatientAppointmentHistory(
  patientId: string,
  limit: number = 10
): Promise<Appointment[]> {
  try {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select(`
        *,
        doctor:doctors(
          id, 
          doctor_id, 
          specialization, 
          department,
          user:users(name, phone, email)
        )
      `)
      .eq('patient_id', patientId)
      .order('appointment_date', { ascending: false })
      .order('appointment_time', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching patient appointment history:', error);
      throw new Error(`Failed to fetch appointment history: ${error.message}`);
    }

    return appointments || [];
  } catch (error) {
    console.error('Error fetching patient appointment history:', error);
    throw error;
  }
}

/**
 * Get doctor appointment schedule
 */
export async function getDoctorAppointmentSchedule(
  doctorId: string,
  date: string
): Promise<Appointment[]> {
  try {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select(`
        *,
        patient:patients(id, patient_id, name, phone, email)
      `)
      .eq('doctor_id', doctorId)
      .eq('appointment_date', date)
      .in('status', ['scheduled', 'confirmed', 'in_progress'])
      .order('appointment_time', { ascending: true });

    if (error) {
      console.error('Error fetching doctor schedule:', error);
      throw new Error(`Failed to fetch doctor schedule: ${error.message}`);
    }

    return appointments || [];
  } catch (error) {
    console.error('Error fetching doctor schedule:', error);
    throw error;
  }
}

/**
 * Get available appointment slots for a doctor
 */
export async function getAvailableSlots(
  doctorId: string,
  date: string
): Promise<AppointmentSlot[]> {
  try {
    // Get doctor information
    const { data: doctor, error: doctorError } = await supabase
      .from('doctors')
      .select(`
        *,
        user:users(name)
      `)
      .eq('doctor_id', doctorId)
      .single();

    if (doctorError) {
      console.error('Error fetching doctor:', doctorError);
      throw new Error(`Doctor not found: ${doctorError.message}`);
    }

    // Get existing appointments for the date
    const { data: existingAppointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('appointment_time, duration_minutes')
      .eq('doctor_id', doctorId)
      .eq('appointment_date', date)
      .in('status', ['scheduled', 'confirmed', 'in_progress']);

    if (appointmentsError) {
      console.error('Error fetching existing appointments:', appointmentsError);
      throw new Error(`Failed to fetch existing appointments: ${appointmentsError.message}`);
    }

    // Generate time slots based on doctor's working hours
    const slots: AppointmentSlot[] = [];
    const workingStartHour = parseInt(doctor.working_hours_start.split(':')[0]);
    const workingEndHour = parseInt(doctor.working_hours_end.split(':')[0]);
    const slotDuration = 30; // 30 minutes per slot

    for (let hour = workingStartHour; hour < workingEndHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Check if slot is available
        const isBooked = existingAppointments?.some(apt => {
          const aptTime = apt.appointment_time;
          const aptDuration = apt.duration_minutes || 30;
          const aptEndTime = new Date(`2000-01-01T${aptTime}`);
          aptEndTime.setMinutes(aptEndTime.getMinutes() + aptDuration);
          
          const slotTime = new Date(`2000-01-01T${timeString}`);
          const slotEndTime = new Date(slotTime);
          slotEndTime.setMinutes(slotEndTime.getMinutes() + slotDuration);
          
          return (slotTime < aptEndTime && slotEndTime > new Date(`2000-01-01T${aptTime}`));
        });

        slots.push({
          date,
          time: timeString,
          available: !isBooked,
          doctorId,
          doctorName: doctor.user?.name || 'Unknown',
          specialization: doctor.specialization
        });
      }
    }

    return slots;
  } catch (error) {
    console.error('Error generating available slots:', error);
    throw error;
  }
}

/**
 * Reschedule appointment
 */
export async function rescheduleAppointment(
  appointmentId: string,
  newDate: string,
  newTime: string
): Promise<Appointment> {
  try {
    // First, get the current appointment
    const currentAppointment = await getAppointmentById(appointmentId);
    
    if (!currentAppointment) {
      throw new Error('Appointment not found');
    }

    // Create appointment data for validation
    const rescheduleData: AppointmentData = {
      patientId: currentAppointment.patient_id,
      doctorId: currentAppointment.doctor_id,
      appointmentDate: newDate,
      appointmentTime: newTime,
      durationMinutes: currentAppointment.duration_minutes,
      type: currentAppointment.type as any,
      symptoms: currentAppointment.symptoms,
      chiefComplaint: currentAppointment.chief_complaint,
      notes: currentAppointment.notes
    };

    // Validate the new appointment time (exclude current appointment from conflict check)
    const validation = await validateAppointment(rescheduleData, currentAppointment.id);
    
    if (!validation.isValid) {
      const errorMessage = validation.errors.join('; ');
      throw new Error(`Reschedule validation failed: ${errorMessage}`);
    }
    
    // Log warnings if any
    if (validation.warnings.length > 0) {
      console.warn('Reschedule warnings:', validation.warnings.join('; '));
    }

    const { data: appointment, error } = await supabase
      .from('appointments')
      .update({
        appointment_date: newDate,
        appointment_time: newTime,
        status: 'rescheduled'
      })
      .eq('appointment_id', appointmentId)
      .select(`
        *,
        patient:patients(id, patient_id, name, phone, email),
        doctor:doctors(
          id, 
          doctor_id, 
          specialization, 
          department,
          user:users(name, phone, email)
        )
      `)
      .single();

    if (error) {
      console.error('Error rescheduling appointment:', error);
      throw new Error(`Failed to reschedule appointment: ${error.message}`);
    }

    return appointment;
  } catch (error) {
    console.error('Error rescheduling appointment:', error);
    throw error;
  }
}

/**
 * Cancel appointment
 */
export async function cancelAppointment(
  appointmentId: string,
  reason?: string
): Promise<Appointment> {
  try {
    const updateData: any = { status: 'cancelled' };
    if (reason) {
      updateData.notes = reason;
    }

    const { data: appointment, error } = await supabase
      .from('appointments')
      .update(updateData)
      .eq('appointment_id', appointmentId)
      .select(`
        *,
        patient:patients(id, patient_id, name, phone, email),
        doctor:doctors(
          id, 
          doctor_id, 
          specialization, 
          department,
          user:users(name, phone, email)
        )
      `)
      .single();

    if (error) {
      console.error('Error cancelling appointment:', error);
      throw new Error(`Failed to cancel appointment: ${error.message}`);
    }

    return appointment;
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    throw error;
  }
}

/**
 * Get appointment statistics
 */
export async function getAppointmentStats(
  doctorId?: string,
  patientId?: string,
  dateRange?: { start: string; end: string }
): Promise<{
  total: number;
  scheduled: number;
  completed: number;
  cancelled: number;
  todayCount: number;
  upcomingCount: number;
}> {
  try {
    let query = supabase
      .from('appointments')
      .select('id, status, appointment_date');

    if (doctorId) {
      query = query.eq('doctor_id', doctorId);
    }

    if (patientId) {
      query = query.eq('patient_id', patientId);
    }

    if (dateRange) {
      query = query.gte('appointment_date', dateRange.start)
                   .lte('appointment_date', dateRange.end);
    }

    const { data: appointments, error } = await query;

    if (error) {
      console.error('Error fetching appointment stats:', error);
      throw new Error(`Failed to fetch appointment stats: ${error.message}`);
    }

    const today = new Date().toISOString().split('T')[0];
    const total = appointments?.length || 0;
    const scheduled = appointments?.filter(apt => apt.status === 'scheduled').length || 0;
    const completed = appointments?.filter(apt => apt.status === 'completed').length || 0;
    const cancelled = appointments?.filter(apt => apt.status === 'cancelled').length || 0;
    const todayCount = appointments?.filter(apt => apt.appointment_date === today).length || 0;
    const upcomingCount = appointments?.filter(apt => 
      new Date(apt.appointment_date) > new Date(today) && 
      ['scheduled', 'confirmed'].includes(apt.status)
    ).length || 0;

    return {
      total,
      scheduled,
      completed,
      cancelled,
      todayCount,
      upcomingCount
    };
  } catch (error) {
    console.error('Error getting appointment stats:', error);
    throw error;
  }
}

/**
 * Get upcoming appointments
 */
export async function getUpcomingAppointments(
  doctorId?: string,
  patientId?: string,
  limit: number = 10
): Promise<Appointment[]> {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    let query = supabase
      .from('appointments')
      .select(`
        *,
        patient:patients(id, patient_id, name, phone, email),
        doctor:doctors(
          id, 
          doctor_id, 
          specialization, 
          department,
          user:users(name, phone, email)
        )
      `)
      .gte('appointment_date', today)
      .in('status', ['scheduled', 'confirmed'])
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true })
      .limit(limit);

    if (doctorId) {
      query = query.eq('doctor_id', doctorId);
    }

    if (patientId) {
      query = query.eq('patient_id', patientId);
    }

    const { data: appointments, error } = await query;

    if (error) {
      console.error('Error fetching upcoming appointments:', error);
      throw new Error(`Failed to fetch upcoming appointments: ${error.message}`);
    }

    return appointments || [];
  } catch (error) {
    console.error('Error fetching upcoming appointments:', error);
    throw error;
  }
}