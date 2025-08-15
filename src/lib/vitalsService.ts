import { supabase } from './supabase';

// Types for vitals management
export interface VitalSigns {
  patientId: string;
  visitId?: string;
  recordedBy?: string; // Made optional to allow null values
  
  // Primary vital signs
  systolicBp?: number;
  diastolicBp?: number;
  heartRate?: number;
  temperature?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  
  // Physical measurements
  weight?: number;
  height?: number;
  bmi?: number;
  
  // Additional measurements
  bloodGlucose?: number;
  painScale?: number; // 0-10 scale
  
  // Timestamps
  recordedAt?: string;
  
  // Notes
  notes?: string;
}

export interface VitalRecord {
  id: string;
  patient_id: string;
  // visit_id field removed as it doesn't exist in the database
  recorded_by: string;
  
  // Vital signs
  systolic_bp?: number;
  diastolic_bp?: number;
  heart_rate?: number;
  temperature?: number;
  respiratory_rate?: number;
  oxygen_saturation?: number;
  weight?: number;
  height?: number;
  bmi?: number;
  blood_glucose?: number;
  pain_scale?: number;
  
  // Timestamps
  recorded_at: string;
  
  // Notes
  notes?: string;
  
  // System fields
  created_at: string;
  
  // Related data
  patient?: any;
  user?: { name: string };
  visit?: any;
}

export interface VitalTrends {
  dates: string[];
  heartRate: number[];
  bloodPressure: { systolic: number; diastolic: number }[];
  temperature: number[];
  weight: number[];
  oxygenSaturation: number[];
}

/**
 * Record new vital signs
 */
export async function recordVitals(vitalsData: VitalSigns): Promise<VitalRecord> {
  try {
    // Calculate BMI if height and weight are provided
    let bmi = vitalsData.bmi;
    if (vitalsData.height && vitalsData.weight) {
      const heightInMeters = vitalsData.height / 100;
      bmi = vitalsData.weight / (heightInMeters * heightInMeters);
      bmi = Math.round(bmi * 10) / 10; // Round to 1 decimal place
    }

    const vitalRecord = {
      patient_id: vitalsData.patientId,
      recorded_by: vitalsData.recordedBy || null,
      systolic_bp: vitalsData.systolicBp || null,
      diastolic_bp: vitalsData.diastolicBp || null,
      heart_rate: vitalsData.heartRate || null,
      temperature: vitalsData.temperature || null,
      respiratory_rate: vitalsData.respiratoryRate || null,
      oxygen_saturation: vitalsData.oxygenSaturation || null,
      weight: vitalsData.weight || null,
      height: vitalsData.height || null,
      bmi: bmi || null,
      blood_glucose: vitalsData.bloodGlucose || null,
      pain_scale: vitalsData.painScale || null,
      recorded_at: vitalsData.recordedAt || new Date().toISOString(),
      notes: vitalsData.notes || null
    };

    const { data: vital, error } = await supabase
      .from('vitals')
      .insert([vitalRecord])
      .select('*')
      .single();

    if (error) {
      console.error('Error recording vitals:', error);
      throw new Error(`Failed to record vitals: ${error.message}`);
    }

    return vital;
  } catch (error) {
    console.error('Error recording vitals:', error);
    throw error;
  }
}

/**
 * Get patient vitals history
 */
export const getPatientVitals = async (patientId: string): Promise<VitalRecord[]> => {
  try {
    const { data: vitals, error } = await supabase
      .from('vitals')
      .select(`
        *,
        patient:patients(id, patient_id, name),
        user:recorded_by(name)
      `)
      .eq('patient_id', patientId)
      .order('recorded_at', { ascending: false });

    if (error) {
      // Handle case where vitals table doesn't exist
      if (error.code === '42P01' || error.code === 'PGRST200') {
        console.log('Vitals table does not exist, returning empty array');
        return [];
      }
      console.error('Error fetching vitals:', error);
      throw new Error('Failed to fetch vitals');
    }

    return (vitals || []) as VitalRecord[];
  } catch (err: any) {
    // Handle database connection or table access errors
    if (err.message?.includes('relation') && err.message?.includes('does not exist')) {
      console.log('Vitals table does not exist, returning empty array');
      return [];
    }
    console.error('Exception in getPatientVitals:', err);
    throw err;
  }
};

/**
 * Get latest vitals for a patient
 */
export async function getLatestVitals(patientId: string): Promise<VitalRecord | null> {
  try {
    const { data: vital, error } = await supabase
      .from('vitals')
      .select(`
        *,
        patient:patients(id, patient_id, name),
        recorded_by_user:users!recorded_by(id, name, role),
        visit:patient_visits(id, visit_id, visit_date, visit_type)
      `)
      .eq('patient_id', patientId)
      .order('recorded_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // Handle case where vitals table doesn't exist
      if (error.code === '42P01' || error.code === 'PGRST200') {
        console.log('Vitals table does not exist, returning null');
        return null;
      }
      if (error.code !== 'PGRST116') {
        console.error('Error fetching latest vitals:', error);
        throw new Error(`Failed to fetch latest vitals: ${error.message}`);
      }
    }

    return vital || null;
  } catch (error: any) {
    // Handle database connection or table access errors
    if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
      console.log('Vitals table does not exist, returning null');
      return null;
    }
    console.error('Error fetching latest vitals:', error);
    throw error;
  }
}

/**
 * Get vitals trends for analysis
 */
export async function getVitalsTrends(
  patientId: string,
  days: number = 30
): Promise<VitalTrends> {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: vitals, error } = await supabase
      .from('vitals')
      .select('recorded_at, systolic_bp, diastolic_bp, heart_rate, temperature, weight, oxygen_saturation')
      .eq('patient_id', patientId)
      .gte('recorded_at', startDate.toISOString())
      .lte('recorded_at', endDate.toISOString())
      .order('recorded_at', { ascending: true });

    if (error) {
      console.error('Error fetching vitals trends:', error);
      throw new Error(`Failed to fetch vitals trends: ${error.message}`);
    }

    const trends: VitalTrends = {
      dates: [],
      heartRate: [],
      bloodPressure: [],
      temperature: [],
      weight: [],
      oxygenSaturation: []
    };

    vitals?.forEach(vital => {
      const date = new Date(vital.recorded_at).toISOString().split('T')[0];
      trends.dates.push(date);
      
      trends.heartRate.push(vital.heart_rate || 0);
      trends.bloodPressure.push({
        systolic: vital.systolic_bp || 0,
        diastolic: vital.diastolic_bp || 0
      });
      trends.temperature.push(vital.temperature || 0);
      trends.weight.push(vital.weight || 0);
      trends.oxygenSaturation.push(vital.oxygen_saturation || 0);
    });

    return trends;
  } catch (error) {
    console.error('Error fetching vitals trends:', error);
    throw error;
  }
}

/**
 * Get vital statistics
 */
export async function getVitalStats(
  patientId: string,
  vitalType: 'heart_rate' | 'systolic_bp' | 'diastolic_bp' | 'temperature' | 'weight' | 'oxygen_saturation',
  days: number = 30
): Promise<{
  current: number | null;
  average: number;
  min: number;
  max: number;
  readings: number;
}> {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: vitals, error } = await supabase
      .from('vitals')
      .select(`recorded_at, ${vitalType}`)
      .eq('patient_id', patientId)
      .gte('recorded_at', startDate.toISOString())
      .lte('recorded_at', endDate.toISOString())
      .not(vitalType, 'is', null)
      .order('recorded_at', { ascending: false });

    if (error) {
      console.error('Error fetching vital stats:', error);
      throw new Error(`Failed to fetch vital stats: ${error.message}`);
    }

    const values = vitals?.map(v => (v as any)[vitalType] as number).filter(v => v !== null) || [];
    
    if (values.length === 0) {
      return {
        current: null,
        average: 0,
        min: 0,
        max: 0,
        readings: 0
      };
    }

    const current = values[0];
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    return {
      current,
      average: Math.round(average * 10) / 10,
      min,
      max,
      readings: values.length
    };
  } catch (error) {
    console.error('Error fetching vital stats:', error);
    throw error;
  }
}

/**
 * Check for vital alerts/abnormalities
 */
export async function checkVitalAlerts(patientId: string): Promise<{
  alerts: Array<{
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    value: number;
    normalRange: string;
  }>;
}> {
  try {
    const latestVital = await getLatestVitals(patientId);
    
    if (!latestVital) {
      return { alerts: [] };
    }

    const alerts: Array<{
      type: string;
      message: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      value: number;
      normalRange: string;
    }> = [];

    // Blood pressure alerts
    if (latestVital.systolic_bp && latestVital.diastolic_bp) {
      const systolic = latestVital.systolic_bp;
      const diastolic = latestVital.diastolic_bp;
      
      if (systolic >= 180 || diastolic >= 110) {
        alerts.push({
          type: 'blood_pressure',
          message: 'Hypertensive Crisis - Immediate attention required',
          severity: 'critical',
          value: systolic,
          normalRange: '90-139/60-89 mmHg'
        });
      } else if (systolic >= 140 || diastolic >= 90) {
        alerts.push({
          type: 'blood_pressure',
          message: 'High Blood Pressure',
          severity: 'high',
          value: systolic,
          normalRange: '90-139/60-89 mmHg'
        });
      } else if (systolic < 90 || diastolic < 60) {
        alerts.push({
          type: 'blood_pressure',
          message: 'Low Blood Pressure',
          severity: 'medium',
          value: systolic,
          normalRange: '90-139/60-89 mmHg'
        });
      }
    }

    // Heart rate alerts
    if (latestVital.heart_rate) {
      const hr = latestVital.heart_rate;
      if (hr > 100) {
        alerts.push({
          type: 'heart_rate',
          message: 'Tachycardia - Elevated heart rate',
          severity: hr > 120 ? 'high' : 'medium',
          value: hr,
          normalRange: '60-100 bpm'
        });
      } else if (hr < 60) {
        alerts.push({
          type: 'heart_rate',
          message: 'Bradycardia - Low heart rate',
          severity: hr < 50 ? 'high' : 'medium',
          value: hr,
          normalRange: '60-100 bpm'
        });
      }
    }

    // Temperature alerts
    if (latestVital.temperature) {
      const temp = latestVital.temperature;
      if (temp >= 39.0) {
        alerts.push({
          type: 'temperature',
          message: 'High Fever',
          severity: 'high',
          value: temp,
          normalRange: '36.1-37.2°C'
        });
      } else if (temp >= 38.0) {
        alerts.push({
          type: 'temperature',
          message: 'Fever',
          severity: 'medium',
          value: temp,
          normalRange: '36.1-37.2°C'
        });
      } else if (temp < 36.0) {
        alerts.push({
          type: 'temperature',
          message: 'Low body temperature',
          severity: 'medium',
          value: temp,
          normalRange: '36.1-37.2°C'
        });
      }
    }

    // Oxygen saturation alerts
    if (latestVital.oxygen_saturation) {
      const spo2 = latestVital.oxygen_saturation;
      if (spo2 < 90) {
        alerts.push({
          type: 'oxygen_saturation',
          message: 'Low oxygen saturation - Immediate attention required',
          severity: 'critical',
          value: spo2,
          normalRange: '95-100%'
        });
      } else if (spo2 < 95) {
        alerts.push({
          type: 'oxygen_saturation',
          message: 'Below normal oxygen saturation',
          severity: 'high',
          value: spo2,
          normalRange: '95-100%'
        });
      }
    }

    return { alerts };
  } catch (error) {
    console.error('Error checking vital alerts:', error);
    throw error;
  }
}

/**
 * Get vitals summary for dashboard
 */
export async function getVitalsSummary(patientId: string): Promise<{
  latestVitals: VitalRecord | null;
  alerts: Array<{
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    value: number;
    normalRange: string;
  }>;
  totalReadings: number;
  lastRecordedAt: string | null;
}> {
  try {
    const [latestVitals, alertsData, totalCount] = await Promise.all([
      getLatestVitals(patientId),
      checkVitalAlerts(patientId),
      supabase
        .from('vitals')
        .select('id', { count: 'exact', head: true })
        .eq('patient_id', patientId)
    ]);

    return {
      latestVitals,
      alerts: alertsData.alerts,
      totalReadings: totalCount.count || 0,
      lastRecordedAt: latestVitals?.recorded_at || null
    };
  } catch (error) {
    console.error('Error getting vitals summary:', error);
    throw error;
  }
}

/**
 * Update vital record
 */
export async function updateVitalRecord(
  vitalId: string,
  updates: Partial<VitalSigns>
): Promise<VitalRecord> {
  try {
    // Calculate BMI if height and weight are provided
    let bmi = updates.bmi;
    if (updates.height && updates.weight) {
      const heightInMeters = updates.height / 100;
      bmi = updates.weight / (heightInMeters * heightInMeters);
      bmi = Math.round(bmi * 10) / 10; // Round to 1 decimal place
    }

    const updateData: any = {};
    
    if (updates.systolicBp !== undefined) updateData.systolic_bp = updates.systolicBp;
    if (updates.diastolicBp !== undefined) updateData.diastolic_bp = updates.diastolicBp;
    if (updates.heartRate !== undefined) updateData.heart_rate = updates.heartRate;
    if (updates.temperature !== undefined) updateData.temperature = updates.temperature;
    if (updates.respiratoryRate !== undefined) updateData.respiratory_rate = updates.respiratoryRate;
    if (updates.oxygenSaturation !== undefined) updateData.oxygen_saturation = updates.oxygenSaturation;
    if (updates.weight !== undefined) updateData.weight = updates.weight;
    if (updates.height !== undefined) updateData.height = updates.height;
    if (bmi !== undefined) updateData.bmi = bmi;
    if (updates.bloodGlucose !== undefined) updateData.blood_glucose = updates.bloodGlucose;
    if (updates.painScale !== undefined) updateData.pain_scale = updates.painScale;
    if (updates.notes !== undefined) updateData.notes = updates.notes;

    const { data: vital, error } = await supabase
      .from('vitals')
      .update(updateData)
      .eq('id', vitalId)
      .select(`
        *,
        patient:patients(id, patient_id, name),
        recorded_by_user:users!recorded_by(id, name, role),
        visit:patient_visits(id, visit_id, visit_date, visit_type)
      `)
      .single();

    if (error) {
      console.error('Error updating vital record:', error);
      throw new Error(`Failed to update vital record: ${error.message}`);
    }

    return vital;
  } catch (error) {
    console.error('Error updating vital record:', error);
    throw error;
  }
}

/**
 * Delete vital record
 */
export async function deleteVitalRecord(vitalId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('vitals')
      .delete()
      .eq('id', vitalId);

    if (error) {
      console.error('Error deleting vital record:', error);
      throw new Error(`Failed to delete vital record: ${error.message}`);
    }
  } catch (error) {
    console.error('Error deleting vital record:', error);
    throw error;
  }
}