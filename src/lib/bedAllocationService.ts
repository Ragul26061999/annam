import { supabase } from './supabase';

// Types for bed allocation management
export interface BedAllocationData {
  patientId: string;
  bedId: string;
  doctorId?: string;
  admissionDate: string;
  admissionType: 'emergency' | 'scheduled' | 'transfer';
  reason: string;
}

export interface BedAllocation {
  id: string;
  patient_id: string;
  bed_id: string;
  doctor_id: string;
  admission_date: string;
  discharge_date?: string;
  admission_type: string;
  reason: string;
  status: string;
  daily_charges: number;
  total_charges: number;
  created_at: string;
  updated_at: string;
  patient: {
    name: string;
    patient_id: string;
  };
  bed: Bed;
  doctor: {
    license_number: string;
    user: {
      name: string;
    };
  };
}

export interface Bed {
  id: string;
  bed_number: string;
  room_number: string;
  floor_number: number;
  bed_type: string;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  department_id?: string;
  daily_rate?: number;
  features?: string[];
}

export interface BedStats {
  total: number;
  available: number;
  occupied: number;
  maintenance: number;
  reserved: number;
  occupancyRate: number;
}

/**
 * Generate a unique bed allocation ID
 * Format: BA{Year}{Month}{Day}{Sequential}
 * Example: BA202501150001
 */
export async function generateAllocationId(): Promise<string> {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const datePrefix = `${year}${month}${day}`;
  
  try {
    // Get count of existing allocations for today
    const { count, error } = await supabase
      .from('bed_allocations')
      .select('id', { count: 'exact', head: true })
      .like('allocation_id', `BA${datePrefix}%`);
    
    if (error) {
      console.error('Error getting allocation count:', error);
      throw new Error('Failed to generate allocation ID');
    }
    
    const sequence = ((count || 0) + 1).toString().padStart(4, '0');
    return `BA${datePrefix}${sequence}`;
  } catch (error) {
    console.error('Error generating allocation ID:', error);
    throw error;
  }
}

/**
 * Allocate bed to patient
 */
export async function allocateBed(allocationData: BedAllocationData): Promise<BedAllocation> {
  try {
    // Check if bed is available
    const { data: bed, error: bedError } = await supabase
      .from('beds')
      .select('*')
      .eq('id', allocationData.bedId)
      .eq('status', 'available')
      .single();

    if (bedError || !bed) {
      throw new Error('Bed is not available for allocation');
    }

    // Check if patient already has an active allocation
    const { data: existingAllocation, error: existingError } = await supabase
      .from('bed_allocations')
      .select('*')
      .eq('patient_id', allocationData.patientId)
      .eq('status', 'active')
      .single();

    if (existingError && existingError.code !== 'PGRST116') {
      throw new Error('Error checking existing allocation');
    }

    if (existingAllocation) {
      throw new Error('Patient already has an active bed allocation');
    }

    // Create allocation record with available columns
    const allocationRecord = {
      patient_id: allocationData.patientId,
      bed_id: allocationData.bedId,
      doctor_id: allocationData.doctorId || null,
      admission_date: allocationData.admissionDate,
      admission_type: allocationData.admissionType,
      reason: allocationData.reason,
      status: 'active',
      daily_charges: 0,
      total_charges: 0
    };

    const { data: allocation, error: allocationError } = await supabase
      .from('bed_allocations')
      .insert([allocationRecord])
      .select(`
        *,
        patient:patients(name, patient_id),
        bed:beds(id, bed_number, room_number, floor_number, bed_type),
        doctor:doctors(license_number, user:users(name))
      `)
      .single();

    if (allocationError) {
      console.error('Error creating bed allocation:', allocationError);
      throw new Error(`Failed to create bed allocation: ${allocationError.message}`);
    }

    // Update bed status to occupied
    const { error: updateError } = await supabase
      .from('beds')
      .update({ status: 'occupied' })
      .eq('id', allocationData.bedId);

    if (updateError) {
      console.error('Error updating bed status:', updateError);
      // Rollback allocation if bed status update fails
      await supabase
        .from('bed_allocations')
        .delete()
        .eq('id', allocation.id);
      throw new Error('Failed to update bed status');
    }

    return allocation;
  } catch (error) {
    console.error('Error allocating bed:', error);
    throw error;
  }
}

/**
 * Discharge patient from bed
 */
export async function dischargeBed(
  allocationId: string,
  dischargeData: {
    dischargeDate: string;
    dischargeTime: string;
    dischargeSummary?: string;
  }
): Promise<BedAllocation> {
  try {
    // Get current allocation
    const { data: allocation, error: allocationError } = await supabase
      .from('bed_allocations')
      .select('*, bed:beds(bed_id)')
      .eq('allocation_id', allocationId)
      .eq('status', 'active')
      .single();

    if (allocationError || !allocation) {
      throw new Error('Active bed allocation not found');
    }

    // Update allocation with discharge information
    const { data: updatedAllocation, error: updateError } = await supabase
      .from('bed_allocations')
      .update({
        discharge_date: dischargeData.dischargeDate,
        discharge_time: dischargeData.dischargeTime,
        discharge_summary: dischargeData.dischargeSummary || null,
        status: 'discharged'
      })
      .eq('allocation_id', allocationId)
      .select(`
        *,
        patient:patients(id, patient_id, name, phone),
        bed:beds(id, bed_id, bed_number, room_number, floor_number, ward_name, bed_type),
        doctor:doctors(
          id, 
          doctor_id, 
          specialization, 
          user:users(name, phone)
        ),
        allocated_by_user:users!allocated_by(id, name, role)
      `)
      .single();

    if (updateError) {
      console.error('Error updating bed allocation:', updateError);
      throw new Error(`Failed to discharge patient: ${updateError.message}`);
    }

    // Update bed status to available
    const { error: bedUpdateError } = await supabase
      .from('beds')
      .update({ status: 'available' })
      .eq('bed_id', allocation.bed.bed_id);

    if (bedUpdateError) {
      console.error('Error updating bed status after discharge:', bedUpdateError);
      // Note: Don't rollback discharge, just log the error
    }

    return updatedAllocation;
  } catch (error) {
    console.error('Error discharging patient:', error);
    throw error;
  }
}

/**
 * Transfer patient to another bed
 */
export async function transferBed(
  allocationId: string,
  newBedId: string,
  reason: string
): Promise<BedAllocation> {
  try {
    // Check if new bed is available
    const { data: newBed, error: newBedError } = await supabase
      .from('beds')
      .select('*')
      .eq('bed_id', newBedId)
      .eq('status', 'available')
      .single();

    if (newBedError || !newBed) {
      throw new Error('New bed is not available for transfer');
    }

    // Get current allocation
    const { data: currentAllocation, error: currentError } = await supabase
      .from('bed_allocations')
      .select('*, bed:beds(bed_id)')
      .eq('allocation_id', allocationId)
      .eq('status', 'active')
      .single();

    if (currentError || !currentAllocation) {
      throw new Error('Active bed allocation not found');
    }

    // Update current allocation to transferred
    const { error: updateCurrentError } = await supabase
      .from('bed_allocations')
      .update({
        status: 'transferred',
        discharge_summary: `Transferred to bed ${newBedId}. Reason: ${reason}`
      })
      .eq('allocation_id', allocationId);

    if (updateCurrentError) {
      throw new Error('Failed to update current allocation');
    }

    // Create new allocation
    const newAllocationId = await generateAllocationId();
    const newAllocationRecord = {
      allocation_id: newAllocationId,
      patient_id: currentAllocation.patient_id,
      bed_id: newBedId,
      doctor_id: currentAllocation.doctor_id,
      admission_date: new Date().toISOString().split('T')[0],
      admission_time: new Date().toTimeString().split(' ')[0],
      admission_type: 'transfer',
      reason_for_admission: `Transfer from bed ${currentAllocation.bed.bed_id}. Reason: ${reason}`,
      status: 'active',
      allocated_by: currentAllocation.allocated_by
    };

    const { data: newAllocation, error: newAllocationError } = await supabase
      .from('bed_allocations')
      .insert([newAllocationRecord])
      .select(`
        *,
        patient:patients(id, patient_id, name, phone),
        bed:beds(id, bed_id, bed_number, room_number, floor_number, ward_name, bed_type),
        doctor:doctors(
          id, 
          doctor_id, 
          specialization, 
          user:users(name, phone)
        ),
        allocated_by_user:users!allocated_by(id, name, role)
      `)
      .single();

    if (newAllocationError) {
      throw new Error(`Failed to create new allocation: ${newAllocationError.message}`);
    }

    // Update bed statuses
    await Promise.all([
      supabase
        .from('beds')
        .update({ status: 'available' })
        .eq('bed_id', currentAllocation.bed.bed_id),
      supabase
        .from('beds')
        .update({ status: 'occupied' })
        .eq('bed_id', newBedId)
    ]);

    return newAllocation;
  } catch (error) {
    console.error('Error transferring patient:', error);
    throw error;
  }
}

/**
 * Get all bed allocations with filtering
 */
export async function getBedAllocations(options: {
  page?: number;
  limit?: number;
  patientId?: string;
  doctorId?: string;
  bedId?: string;
  status?: string;
  admissionType?: string;
  dateRange?: { start: string; end: string };
  searchTerm?: string;
} = {}): Promise<{
  allocations: BedAllocation[];
  total: number;
  page: number;
  limit: number;
}> {
  try {
    const { 
      page = 1, 
      limit = 20, 
      patientId, 
      doctorId, 
      bedId, 
      status, 
      admissionType,
      dateRange,
      searchTerm 
    } = options;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('bed_allocations')
      .select(`
        *,
        patient:patients(name, patient_id),
        bed:beds(id, bed_number, room_number, floor_number, bed_type),
        doctor:doctors(license_number, user:users(name))
      `, { count: 'exact' });

    // Apply filters
    if (patientId) query = query.eq('patient_id', patientId);
    if (doctorId) query = query.eq('doctor_id', doctorId);
    if (bedId) query = query.eq('bed_id', bedId);
    if (status) query = query.eq('status', status);
    if (admissionType) query = query.eq('admission_type', admissionType);
    
    if (dateRange) {
      query = query.gte('admission_date', dateRange.start)
                   .lte('admission_date', dateRange.end);
    }

    if (searchTerm) {
      query = query.or(`
        allocation_id.ilike.%${searchTerm}%,
        reason_for_admission.ilike.%${searchTerm}%,
        discharge_summary.ilike.%${searchTerm}%
      `);
    }

    const { data: allocations, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('admission_date', { ascending: false })
      .order('admission_time', { ascending: false });

    if (error) {
      console.error('Error fetching bed allocations:', error);
      throw new Error(`Failed to fetch bed allocations: ${error.message}`);
    }

    return {
      allocations: allocations || [],
      total: count || 0,
      page,
      limit
    };
  } catch (error) {
    console.error('Error fetching bed allocations:', error);
    throw error;
  }
}

/**
 * Get all beds with their current status
 */
export async function getAllBeds(options: {
  page?: number;
  limit?: number;
  bedType?: string;
  status?: string;
  wardName?: string;
  floorNumber?: number;
  searchTerm?: string;
} = {}): Promise<{
  beds: Bed[];
  total: number;
  page: number;
  limit: number;
}> {
  try {
    const { 
      page = 1, 
      limit = 50, 
      bedType, 
      status, 
      wardName, 
      floorNumber,
      searchTerm 
    } = options;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('beds')
      .select(`
        *,
        current_allocation:bed_allocations!bed_id(
          *,
          patient:patients(id, patient_id, name, phone),
          doctor:doctors(
            id, 
            doctor_id, 
            specialization, 
            user:users(name)
          )
        )
      `, { count: 'exact' });

    // Apply filters
    if (bedType) query = query.eq('bed_type', bedType);
    if (status) query = query.eq('status', status);
    if (wardName) query = query.eq('ward_name', wardName);
    if (floorNumber) query = query.eq('floor_number', floorNumber);

    if (searchTerm) {
      query = query.or(`
        bed_id.ilike.%${searchTerm}%,
        bed_number.ilike.%${searchTerm}%,
        room_number.ilike.%${searchTerm}%,
        ward_name.ilike.%${searchTerm}%
      `);
    }

    const { data: beds, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('floor_number', { ascending: true })
      .order('room_number', { ascending: true })
      .order('bed_number', { ascending: true });

    if (error) {
      console.error('Error fetching beds:', error);
      throw new Error(`Failed to fetch beds: ${error.message}`);
    }

    return {
      beds: beds || [],
      total: count || 0,
      page,
      limit
    };
  } catch (error) {
    console.error('Error fetching beds:', error);
    throw error;
  }
}

/**
 * Get bed statistics
 */
export async function getBedStats(): Promise<BedStats> {
  try {
    const { data: beds, error } = await supabase
      .from('beds')
      .select('status');

    if (error) {
      console.error('Error fetching bed stats:', error);
      throw new Error(`Failed to fetch bed stats: ${error.message}`);
    }

    const total = beds?.length || 0;
    const available = beds?.filter(b => b.status === 'available').length || 0;
    const occupied = beds?.filter(b => b.status === 'occupied').length || 0;
    const maintenance = beds?.filter(b => b.status === 'maintenance').length || 0;
    const reserved = beds?.filter(b => b.status === 'reserved').length || 0;
    const occupancyRate = total > 0 ? (occupied / total) * 100 : 0;

    return {
      total,
      available,
      occupied,
      maintenance,
      reserved,
      occupancyRate: Math.round(occupancyRate * 10) / 10
    };
  } catch (error) {
    console.error('Error getting bed stats:', error);
    throw error;
  }
}

/**
 * Get available beds by type
 */
export async function getAvailableBeds(
  bedType?: string,
  wardName?: string,
  floorNumber?: number
): Promise<Bed[]> {
  try {
    let query = supabase
      .from('beds')
      .select('*')
      .eq('status', 'available');

    if (bedType) query = query.eq('bed_type', bedType);
    if (wardName) query = query.eq('ward_name', wardName);
    if (floorNumber) query = query.eq('floor_number', floorNumber);

    const { data: beds, error } = await query
      .order('floor_number', { ascending: true })
      .order('room_number', { ascending: true })
      .order('bed_number', { ascending: true });

    if (error) {
      console.error('Error fetching available beds:', error);
      throw new Error(`Failed to fetch available beds: ${error.message}`);
    }

    return beds || [];
  } catch (error) {
    console.error('Error fetching available beds:', error);
    throw error;
  }
}

/**
 * Get patient bed allocation history
 */
export async function getPatientBedHistory(patientId: string): Promise<BedAllocation[]> {
  try {
    const { data: allocations, error } = await supabase
      .from('bed_allocations')
      .select(`
        *,
        bed:beds(id, bed_number, room_number, floor_number, bed_type),
        doctor:doctors(license_number, user:users(name))
      `)
      .eq('patient_id', patientId)
      .order('admission_date', { ascending: false });

    if (error) {
      console.error('Error fetching patient bed history:', error);
      throw new Error(`Failed to fetch patient bed history: ${error.message}`);
    }

    return allocations || [];
  } catch (error) {
    console.error('Error fetching patient bed history:', error);
    throw error;
  }
}

/**
 * Update bed status
 */
export async function updateBedStatus(
  bedId: string,
  status: 'available' | 'occupied' | 'maintenance' | 'reserved'
): Promise<Bed> {
  try {
    const { data: bed, error } = await supabase
      .from('beds')
      .update({ status })
      .eq('bed_id', bedId)
      .select()
      .single();

    if (error) {
      console.error('Error updating bed status:', error);
      throw new Error(`Failed to update bed status: ${error.message}`);
    }

    return bed;
  } catch (error) {
    console.error('Error updating bed status:', error);
    throw error;
  }
}

/**
 * Get bed allocation by ID
 */
export async function getBedAllocationById(allocationId: string): Promise<BedAllocation> {
  try {
    const { data: allocation, error } = await supabase
      .from('bed_allocations')
      .select(`
        *,
        patient:patients(name, patient_id),
        bed:beds(id, bed_number, room_number, floor_number, bed_type),
        doctor:doctors(license_number, user:users(name))
      `)
      .eq('id', allocationId)
      .single();

    if (error) {
      console.error('Error fetching bed allocation:', error);
      throw new Error(`Bed allocation not found: ${error.message}`);
    }

    return allocation;
  } catch (error) {
    console.error('Error fetching bed allocation:', error);
    throw error;
  }
}