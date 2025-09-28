import { supabase } from './supabase';

// =====================================================
// INTERFACES AND TYPES
// =====================================================

export interface Medication {
  id: string;
  medication_code: string;
  name: string;
  generic_name: string;
  manufacturer: string;
  category: string;
  dosage_form: string;
  strength: string;
  unit_price: number;
  stock_quantity: number;
  minimum_stock_level: number;
  maximum_stock_level?: number;
  batch_number?: string;
  expiry_date?: string;
  storage_conditions?: string;
  prescription_required: boolean;
  status: 'active' | 'inactive' | 'discontinued';
  created_at: string;
  updated_at: string;
}

export interface StockTransaction {
  id: string;
  medication_id: string;
  transaction_id: string;
  transaction_type: 'purchase' | 'sale' | 'adjustment' | 'return' | 'expired';
  quantity: number;
  unit_price: number;
  total_amount: number;
  batch_number?: string;
  expiry_date?: string;
  supplier_name?: string;
  customer_name?: string;
  notes?: string;
  created_by: string;
  created_at: string;
}

export interface MedicationHistory {
  id: string;
  patient_id: string;
  medication_name: string;
  generic_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribed_date: string;
  dispensed_date?: string;
  prescribed_by: string;
  dispensed_by?: string;
  status: 'prescribed' | 'dispensed' | 'completed' | 'discontinued';
  total_amount?: number;
  payment_status?: string;
}

export interface PharmacyBilling {
  id: string;
  bill_number: string;
  patient_id: string;
  patient_name?: string;
  items: PharmacyBillItem[];
  subtotal: number;
  discount: number;
  tax_amount: number;
  tax_rate: number;
  total_amount: number;
  payment_method: 'cash' | 'card' | 'insurance' | 'online';
  payment_status: 'pending' | 'paid' | 'partial' | 'refunded';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface PharmacyBillItem {
  id?: string;
  medication_id: string;
  medication_name?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface PrescriptionDispensing {
  id: string;
  prescription_id: string;
  medication_id: string;
  quantity_prescribed: number;
  quantity_dispensed: number;
  dispensed_by: string;
  dispensed_at: string;
  notes?: string;
  status: 'pending' | 'partial' | 'complete';
}

// =====================================================
// MEDICATION MANAGEMENT
// =====================================================

export async function getMedications(filters?: {
  category?: string;
  prescription_required?: boolean;
  search?: string;
  status?: string;
}): Promise<Medication[]> {
  try {
    let query = supabase
      .from('medications')
      .select('*')
      .order('name');

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.prescription_required !== undefined) {
      query = query.eq('prescription_required', filters.prescription_required);
    }

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,generic_name.ilike.%${filters.search}%,medication_code.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching medications:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getMedications:', error);
    throw error;
  }
}

export async function getMedicationById(id: string): Promise<Medication | null> {
  try {
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching medication:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getMedicationById:', error);
    throw error;
  }
}

export async function getLowStockMedications(): Promise<Medication[]> {
  try {
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .filter('stock_quantity', 'lte', 'minimum_stock_level')
      .eq('status', 'active')
      .order('stock_quantity');

    if (error) {
      console.error('Error fetching low stock medications:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getLowStockMedications:', error);
    throw error;
  }
}

// =====================================================
// STOCK MANAGEMENT
// =====================================================

export async function addStock(
  medicationId: string,
  quantity: number,
  unitPrice: number,
  batchNumber?: string,
  expiryDate?: string,
  supplierName?: string,
  notes?: string,
  createdBy?: string
): Promise<StockTransaction> {
  try {
    // Generate transaction ID
    const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const { data, error } = await supabase
      .from('pharmacy_stock_transactions')
      .insert({
        medication_id: medicationId,
        transaction_id: transactionId,
        transaction_type: 'purchase',
        quantity,
        unit_price: unitPrice,
        total_amount: quantity * unitPrice,
        batch_number: batchNumber,
        expiry_date: expiryDate,
        supplier_name: supplierName,
        notes,
        created_by: createdBy
      })
      .select('*')
      .single();

    if (error) {
      console.error('Error adding stock:', error);
      throw error;
    }

    // Update medication stock quantity
    const { data: currentMed } = await supabase
      .from('medications')
      .select('stock_quantity')
      .eq('id', medicationId)
      .single();

    if (currentMed) {
      await supabase
        .from('medications')
        .update({
          stock_quantity: currentMed.stock_quantity + quantity,
          unit_price: unitPrice,
          updated_at: new Date().toISOString()
        })
        .eq('id', medicationId);
    }

    return data;
  } catch (error) {
    console.error('Error in addStock:', error);
    throw error;
  }
}

export async function getStockTransactions(
  medicationId?: string,
  transactionType?: string,
  limit: number = 50
): Promise<StockTransaction[]> {
  try {
    let query = supabase
      .from('pharmacy_stock_transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (medicationId) {
      query = query.eq('medication_id', medicationId);
    }

    if (transactionType) {
      query = query.eq('transaction_type', transactionType);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching stock transactions:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getStockTransactions:', error);
    throw error;
  }
}

// =====================================================
// PATIENT MEDICATION HISTORY
// =====================================================

export async function getPatientMedicationHistory(patientId: string): Promise<MedicationHistory[]> {
  try {
    const history: MedicationHistory[] = [];

    // Get prescribed medications from prescriptions
    const { data: prescriptions, error: prescError } = await supabase
      .from('prescriptions')
      .select(`
        id,
        created_at,
        doctor_id,
        prescription_items(
          medication_id,
          dosage,
          frequency,
          duration
        )
      `)
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });

    if (prescError) {
      console.error('Error fetching prescriptions:', prescError);
    } else if (prescriptions) {
      // Get doctor names
      const doctorIds = [...new Set(prescriptions.map(p => p.doctor_id))];
      const { data: doctors } = await supabase
        .from('users')
        .select('id, name')
        .in('id', doctorIds);

      // Get medicine names
      const medicineIds = prescriptions.flatMap(p => 
        p.prescription_items?.map(item => item.medication_id) || []
      );
      const { data: medicines } = await supabase
        .from('medications')
        .select('id, name, generic_name')
        .in('id', medicineIds);

      prescriptions.forEach(prescription => {
        const doctor = doctors?.find(d => d.id === prescription.doctor_id);
        
        prescription.prescription_items?.forEach(item => {
          const medicine = medicines?.find(m => m.id === item.medication_id);
          
          history.push({
            id: `presc_${prescription.id}_${item.medication_id}`,
            patient_id: patientId,
            medication_name: medicine?.name || 'Unknown',
            generic_name: medicine?.generic_name || '',
            dosage: item.dosage || '',
            frequency: item.frequency || '',
            duration: item.duration || '',
            prescribed_date: prescription.created_at,
            prescribed_by: doctor?.name || 'Unknown Doctor',
            status: 'prescribed'
          });
        });
      });
    }

    // Get dispensed medications
    const { data: dispensed, error: dispError } = await supabase
      .from('prescription_dispensed')
      .select(`
        id,
        dispensed_at,
        total_amount,
        payment_status,
        dispensed_by,
        prescription_dispensed_items(
          medication_id,
          quantity_dispensed,
          unit_price,
          total_price
        )
      `)
      .eq('patient_id', patientId)
      .order('dispensed_at', { ascending: false });

    if (dispError) {
      console.error('Error fetching dispensed medications:', dispError);
    } else if (dispensed) {
      // Get pharmacist names
      const pharmacistIds = [...new Set(dispensed.map(d => d.dispensed_by))];
      const { data: pharmacists } = await supabase
        .from('users')
        .select('id, name')
        .in('id', pharmacistIds);

      // Get medication names
      const medicationIds = dispensed.flatMap(d => 
        d.prescription_dispensed_items?.map(item => item.medication_id) || []
      );
      const { data: medications } = await supabase
        .from('medications')
        .select('id, name, generic_name, strength, dosage_form')
        .in('id', medicationIds);

      dispensed.forEach(dispense => {
        const pharmacist = pharmacists?.find(p => p.id === dispense.dispensed_by);
        
        dispense.prescription_dispensed_items?.forEach(item => {
          const medication = medications?.find(m => m.id === item.medication_id);
          
          history.push({
            id: `disp_${dispense.id}_${item.medication_id}`,
            patient_id: patientId,
            medication_name: medication?.name || 'Unknown',
            generic_name: medication?.generic_name || '',
            dosage: `${medication?.strength} ${medication?.dosage_form}` || '',
            frequency: `Qty: ${item.quantity_dispensed}`,
            duration: '',
            prescribed_date: '',
            dispensed_date: dispense.dispensed_at,
            prescribed_by: '',
            dispensed_by: pharmacist?.name || 'Unknown Pharmacist',
            status: 'dispensed',
            total_amount: item.total_price,
            payment_status: dispense.payment_status
          });
        });
      });
    }

    // Sort by date (most recent first)
    history.sort((a, b) => {
      const dateA = new Date(a.dispensed_date || a.prescribed_date);
      const dateB = new Date(b.dispensed_date || b.prescribed_date);
      return dateB.getTime() - dateA.getTime();
    });

    return history;
  } catch (error) {
    console.error('Error in getPatientMedicationHistory:', error);
    throw error;
  }
}

// =====================================================
// DASHBOARD ANALYTICS
// =====================================================

export async function getPharmacyDashboardStats(): Promise<{
  totalMedications: number;
  lowStockCount: number;
  todaySales: number;
  pendingBills: number;
  totalRevenue: number;
  prescriptionsDispensed: number;
}> {
  try {
    // Get total medications
    const { count: totalMedications } = await supabase
      .from('medications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    // Get low stock count
    const { count: lowStockCount } = await supabase
      .from('medications')
      .select('*', { count: 'exact', head: true })
      .filter('stock_quantity', 'lte', 'minimum_stock_level')
      .eq('status', 'active');

    // Get today's sales
    const today = new Date().toISOString().split('T')[0];
    const { data: todaySalesData } = await supabase
      .from('pharmacy_stock_transactions')
      .select('total_amount')
      .eq('transaction_type', 'sale')
      .gte('created_at', `${today}T00:00:00`)
      .lt('created_at', `${today}T23:59:59`);

    const todaySales = todaySalesData?.reduce((sum, transaction) => sum + transaction.total_amount, 0) || 0;

    // Get pending bills count
    const { count: pendingBills } = await supabase
      .from('pharmacy_billing')
      .select('*', { count: 'exact', head: true })
      .eq('payment_status', 'pending');

    // Get total revenue (this month)
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
    const { data: revenueData } = await supabase
      .from('pharmacy_billing')
      .select('final_amount')
      .eq('payment_status', 'paid')
      .gte('created_at', firstDayOfMonth);

    const totalRevenue = revenueData?.reduce((sum, bill) => sum + bill.final_amount, 0) || 0;

    // Get prescriptions dispensed today
    const { count: prescriptionsDispensed } = await supabase
      .from('prescription_items')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'dispensed')
      .gte('updated_at', `${today}T00:00:00`)
      .lt('updated_at', `${today}T23:59:59`);

    return {
      totalMedications: totalMedications || 0,
      lowStockCount: lowStockCount || 0,
      todaySales,
      pendingBills: pendingBills || 0,
      totalRevenue,
      prescriptionsDispensed: prescriptionsDispensed || 0
    };
  } catch (error) {
    console.error('Error in getPharmacyDashboardStats:', error);
    return {
      totalMedications: 0,
      lowStockCount: 0,
      todaySales: 0,
      pendingBills: 0,
      totalRevenue: 0,
      prescriptionsDispensed: 0
    };
  }
}

// =====================================================
// PRESCRIPTION MANAGEMENT
// =====================================================

export interface PendingPrescription {
  id: string;
  prescription_id: string;
  patient_id: string;
  patient_name: string;
  doctor_name: string;
  issue_date: string;
  status: string;
  total_items: number;
  total_amount: number;
  prescription_items: {
    id: string;
    medication_id: string;
    medication_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
}

export async function getPendingPrescriptions(): Promise<PendingPrescription[]> {
  try {
    const { data: prescriptions, error } = await supabase
      .from('prescriptions')
      .select(`
        id,
        prescription_id,
        patient_id,
        doctor_id,
        issue_date,
        status,
        patients!inner(name),
        users!inner(name),
        prescription_items(
          id,
          medication_id,
          medication_name,
          quantity,
          unit_price,
          total_price
        )
      `)
      .eq('status', 'pending')
      .order('issue_date', { ascending: false });

    if (error) {
      console.error('Error fetching pending prescriptions:', error);
      throw error;
    }

    const formattedPrescriptions: PendingPrescription[] = (prescriptions || []).map(prescription => ({
      id: prescription.id,
      prescription_id: prescription.prescription_id,
      patient_id: prescription.patient_id,
      patient_name: (prescription.patients as any)?.name || 'Unknown Patient',
      doctor_name: (prescription.users as any)?.name || 'Unknown Doctor',
      issue_date: prescription.issue_date,
      status: prescription.status,
      total_items: prescription.prescription_items?.length || 0,
      total_amount: prescription.prescription_items?.reduce((sum, item) => sum + item.total_price, 0) || 0,
      prescription_items: prescription.prescription_items || []
    }));

    return formattedPrescriptions;
  } catch (error) {
    console.error('Error in getPendingPrescriptions:', error);
    throw error;
  }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

export async function searchMedications(searchTerm: string): Promise<Medication[]> {
  return getMedications({ search: searchTerm, status: 'active' });
}

export async function getMedicationCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('medications')
      .select('category')
      .eq('status', 'active');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    const categories = [...new Set(data?.map(item => item.category) || [])];
    return categories.sort();
  } catch (error) {
    console.error('Error in getMedicationCategories:', error);
    return [];
  }
}

// =====================================================
// STOCK ADJUSTMENT FUNCTIONS
// =====================================================

export async function adjustStock(
  medicationId: string,
  adjustmentQuantity: number,
  reason: string,
  notes: string,
  userId: string
): Promise<StockTransaction> {
  try {
    // Get current stock
    const { data: medication, error: medicationError } = await supabase
      .from('medications')
      .select('stock_quantity')
      .eq('id', medicationId)
      .single();

    if (medicationError) {
      throw new Error('Failed to fetch medication');
    }

    // Calculate new stock quantity
    const newStockQuantity = Math.max(0, medication.stock_quantity + adjustmentQuantity);

    // Update medication stock
    const { error: updateError } = await supabase
      .from('medications')
      .update({ 
        stock_quantity: newStockQuantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', medicationId);

    if (updateError) {
      throw new Error('Failed to update medication stock');
    }

    // Create stock transaction record
    const transactionId = `ADJ-${Date.now()}`;
    const { data: transaction, error: transactionError } = await supabase
      .from('pharmacy_stock_transactions')
      .insert({
        medication_id: medicationId,
        transaction_id: transactionId,
        transaction_type: 'adjustment',
        quantity: Math.abs(adjustmentQuantity),
        unit_price: 0,
        total_amount: 0,
        notes: `${reason}: ${notes}`,
        created_by: userId,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (transactionError) {
      throw new Error('Failed to create stock transaction');
    }

    return transaction;
  } catch (error) {
    console.error('Error in adjustStock:', error);
    throw error;
  }
}

// =====================================================
// PHARMACY BILLING FUNCTIONS
// =====================================================

export async function createPharmacyBill(
  patientId: string,
  items: { medication_id: string; quantity: number; unit_price: number }[],
  discount: number,
  taxRate: number,
  paymentMethod: string,
  userId: string
): Promise<PharmacyBilling> {
  try {
    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const discountAmount = (subtotal * discount) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * taxRate) / 100;
    const totalAmount = taxableAmount + taxAmount;

    // Generate bill number
    const billNumber = `PH${Date.now()}`;

    // Create bill
    const { data: bill, error: billError } = await supabase
      .from('pharmacy_billing')
      .insert({
        bill_number: billNumber,
        patient_id: patientId,
        subtotal,
        discount: discountAmount,
        tax_amount: taxAmount,
        tax_rate: taxRate,
        final_amount: totalAmount,
        payment_method: paymentMethod,
        payment_status: 'paid',
        created_by: userId,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (billError) {
      throw new Error('Failed to create pharmacy bill');
    }

    // Create bill items and update stock
    for (const item of items) {
      // Create bill item
      await supabase
        .from('pharmacy_bill_items')
        .insert({
          bill_id: bill.id,
          medication_id: item.medication_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.quantity * item.unit_price
        });

      // Update medication stock
      const { data: medication } = await supabase
        .from('medications')
        .select('stock_quantity')
        .eq('id', item.medication_id)
        .single();

      if (medication) {
        const newStock = Math.max(0, medication.stock_quantity - item.quantity);
        await supabase
          .from('medications')
          .update({ stock_quantity: newStock })
          .eq('id', item.medication_id);

        // Create stock transaction
        const transactionId = `SALE-${Date.now()}-${item.medication_id}`;
        await supabase
          .from('pharmacy_stock_transactions')
          .insert({
            medication_id: item.medication_id,
            transaction_id: transactionId,
            transaction_type: 'sale',
            quantity: item.quantity,
            unit_price: item.unit_price,
            total_amount: item.quantity * item.unit_price,
            notes: `Sold via bill ${billNumber}`,
            created_by: userId,
            created_at: new Date().toISOString()
          });
      }
    }

    return {
      ...bill,
      total_amount: totalAmount,
      items: items.map(item => ({
        medication_id: item.medication_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.quantity * item.unit_price
      }))
    };
  } catch (error) {
    console.error('Error in createPharmacyBill:', error);
    throw error;
  }
}

export async function getPharmacyBills(patientId?: string): Promise<PharmacyBilling[]> {
  try {
    let query = supabase
      .from('pharmacy_billing')
      .select(`
        *,
        patient:patients(first_name, last_name)
      `)
      .order('created_at', { ascending: false });

    if (patientId) {
      query = query.eq('patient_id', patientId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching pharmacy bills:', error);
      return [];
    }

    // Transform data to include patient name and total_amount
    const bills = data?.map(bill => ({
      ...bill,
      patient_name: bill.patient ? `${bill.patient.first_name} ${bill.patient.last_name}` : 'Unknown',
      total_amount: bill.final_amount,
      items: [] // Items would need to be fetched separately if needed
    })) || [];

    return bills;
  } catch (error) {
    console.error('Error in getPharmacyBills:', error);
    return [];
  }
}

// =====================================================
// PRESCRIPTION DISPENSING FUNCTIONS
// =====================================================

export async function dispensePrescription(
  prescriptionId: string,
  medicationId: string,
  quantityDispensed: number,
  userId: string,
  notes?: string
): Promise<PrescriptionDispensing> {
  try {
    // Create dispensing record
    const { data: dispensing, error: dispensingError } = await supabase
      .from('prescription_dispensing')
      .insert({
        prescription_id: prescriptionId,
        medication_id: medicationId,
        quantity_dispensed: quantityDispensed,
        dispensed_by: userId,
        dispensed_at: new Date().toISOString(),
        notes,
        status: 'complete'
      })
      .select()
      .single();

    if (dispensingError) {
      throw new Error('Failed to create dispensing record');
    }

    // Update medication stock
    const { data: medication } = await supabase
      .from('medications')
      .select('stock_quantity')
      .eq('id', medicationId)
      .single();

    if (medication) {
      const newStock = Math.max(0, medication.stock_quantity - quantityDispensed);
      await supabase
        .from('medications')
        .update({ stock_quantity: newStock })
        .eq('id', medicationId);

      // Create stock transaction
      const transactionId = `DISP-${Date.now()}-${prescriptionId}`;
      await supabase
        .from('pharmacy_stock_transactions')
        .insert({
          medication_id: medicationId,
          transaction_id: transactionId,
          transaction_type: 'sale',
          quantity: quantityDispensed,
          unit_price: 0,
          total_amount: 0,
          notes: `Dispensed for prescription ${prescriptionId}`,
          created_by: userId,
          created_at: new Date().toISOString()
        });
    }

    return dispensing;
  } catch (error) {
    console.error('Error in dispensePrescription:', error);
    throw error;
  }
}