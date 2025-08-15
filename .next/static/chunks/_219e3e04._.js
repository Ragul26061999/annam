(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/supabase.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createAdminUser": (()=>createAdminUser),
    "getCurrentUser": (()=>getCurrentUser),
    "signInWithEmail": (()=>signInWithEmail),
    "signOut": (()=>signOut),
    "signUpWithEmail": (()=>signUpWithEmail),
    "supabase": (()=>supabase)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
;
const supabaseUrl = 'https://zusheijhebsmjiyyeiqq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1c2hlaWpoZWJzbWppeXllaXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MjI0NDAsImV4cCI6MjA2NzM5ODQ0MH0.iwGPaOJPa6OvwX_iA1xvRt5cM72DWfd8Br1pwRTemRc';
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
const signInWithEmail = async (email, password)=>{
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    return {
        data,
        error
    };
};
const signUpWithEmail = async (email, password)=>{
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
        }
    });
    return {
        data,
        error
    };
};
const createAdminUser = async (email, password)=>{
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
                email_confirm: true
            }
        }
    });
    return {
        data,
        error
    };
};
const signOut = async ()=>{
    await supabase.auth.signOut();
};
const getCurrentUser = async ()=>{
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/barcodeUtils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "extractBarcodeInfo": (()=>extractBarcodeInfo),
    "generateBarcodeForPatient": (()=>generateBarcodeForPatient),
    "generateBarcodeId": (()=>generateBarcodeId),
    "generateBarcodeSVG": (()=>generateBarcodeSVG),
    "generatePrintableBarcodeData": (()=>generatePrintableBarcodeData),
    "generateRealisticBarcodeSVG": (()=>generateRealisticBarcodeSVG),
    "getPatientByBarcodeId": (()=>getPatientByBarcodeId),
    "updatePatientWithBarcode": (()=>updatePatientWithBarcode),
    "validateBarcodeId": (()=>validateBarcodeId)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
;
function generateBarcodeId(uhid) {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    // Use UHID as base and add timestamp for uniqueness
    const timestamp = now.getTime().toString().slice(-4); // Last 4 digits of timestamp
    return `BARS${year}${month}${timestamp}`;
}
function generateBarcodeSVG(barcodeId) {
    const width = 300;
    const height = 80;
    const barWidth = 2;
    const barsCount = barcodeId.length * 6; // Approximate for Code-128
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
    // Background
    svg += `<rect width="${width}" height="${height}" fill="white"/>`;
    // Generate bars pattern (simplified)
    let x = 10;
    for(let i = 0; i < barcodeId.length; i++){
        const char = barcodeId[i];
        const charCode = char.charCodeAt(0);
        // Create alternating pattern based on character
        for(let j = 0; j < 6; j++){
            if ((charCode + j) % 2 === 0) {
                svg += `<rect x="${x}" y="10" width="${barWidth}" height="50" fill="black"/>`;
            }
            x += barWidth;
        }
    }
    // Add text below barcode
    svg += `<text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-family="monospace" font-size="12" fill="black">${barcodeId}</text>`;
    svg += '</svg>';
    return svg;
}
function generateRealisticBarcodeSVG(barcodeId) {
    const width = 300;
    const height = 80;
    const minBarWidth = 1;
    const maxBarWidth = 4;
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
    // Background
    svg += `<rect width="${width}" height="${height}" fill="white"/>`;
    // Generate more realistic bar pattern
    let x = 20;
    let isBlack = true;
    // Start and end patterns
    const startPattern = [
        1,
        1,
        1,
        1,
        1,
        1
    ];
    const endPattern = [
        1,
        1,
        1,
        1,
        1,
        1
    ];
    // Draw start pattern
    for (const barWidth of startPattern){
        if (isBlack) {
            svg += `<rect x="${x}" y="10" width="${barWidth}" height="50" fill="black"/>`;
        }
        x += barWidth;
        isBlack = !isBlack;
    }
    // Draw data pattern
    for(let i = 0; i < barcodeId.length; i++){
        const char = barcodeId[i];
        const charCode = char.charCodeAt(0);
        // Create pattern based on character
        const pattern = [];
        for(let j = 0; j < 6; j++){
            const width = minBarWidth + (charCode + j) % (maxBarWidth - minBarWidth + 1);
            pattern.push(width);
        }
        for (const barWidth of pattern){
            if (isBlack) {
                svg += `<rect x="${x}" y="10" width="${barWidth}" height="50" fill="black"/>`;
            }
            x += barWidth;
            isBlack = !isBlack;
        }
    }
    // Draw end pattern
    for (const barWidth of endPattern){
        if (isBlack) {
            svg += `<rect x="${x}" y="10" width="${barWidth}" height="50" fill="black"/>`;
        }
        x += barWidth;
        isBlack = !isBlack;
    }
    // Add text below barcode
    svg += `<text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-family="monospace" font-size="12" fill="black">${barcodeId}</text>`;
    svg += '</svg>';
    return svg;
}
async function updatePatientWithBarcode(patientId, barcodeId) {
    try {
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('patients').update({
            barcode_id: barcodeId
        }).eq('patient_id', patientId);
        if (error) {
            console.error('Error updating patient with barcode:', error);
            throw new Error(`Failed to update patient with barcode: ${error.message}`);
        }
    } catch (error) {
        console.error('Error updating patient with barcode:', error);
        throw error;
    }
}
async function getPatientByBarcodeId(barcodeId) {
    try {
        const { data: patient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('patients').select('*').eq('barcode_id', barcodeId).single();
        if (error) {
            console.error('Error fetching patient by barcode:', error);
            throw new Error(`Patient not found: ${error.message}`);
        }
        return patient;
    } catch (error) {
        console.error('Error fetching patient by barcode:', error);
        throw error;
    }
}
function generatePrintableBarcodeData(uhid, barcodeId, patientName) {
    const svg = generateRealisticBarcodeSVG(barcodeId);
    return `
    <div style="width: 4in; height: 2in; padding: 0.2in; font-family: Arial, sans-serif; border: 1px solid #ccc; margin: 0.1in;">
      <div style="text-align: center; margin-bottom: 0.1in;">
        <h3 style="margin: 0; font-size: 14px; color: #333;">ANNAM HOSPITAL</h3>
        <p style="margin: 0; font-size: 10px; color: #666;">Patient ID Card</p>
      </div>
      <div style="text-align: center; margin-bottom: 0.1in;">
        ${svg}
      </div>
      <div style="text-align: center; font-size: 12px;">
        <p style="margin: 0; font-weight: bold;">${patientName}</p>
        <p style="margin: 0; font-size: 10px; color: #666;">UHID: ${uhid}</p>
      </div>
    </div>
  `;
}
function validateBarcodeId(barcodeId) {
    // Check if it matches the format: BARS{Year}{Month}{4digits}
    const barcodeRegex = /^BARS\d{4}(0[1-9]|1[0-2])\d{4}$/;
    return barcodeRegex.test(barcodeId);
}
function extractBarcodeInfo(barcodeId) {
    if (!validateBarcodeId(barcodeId)) {
        return null;
    }
    const year = barcodeId.substring(4, 8);
    const month = barcodeId.substring(8, 10);
    const sequence = barcodeId.substring(10, 14);
    return {
        year,
        month,
        sequence
    };
}
async function generateBarcodeForPatient(patientId) {
    try {
        // Check if patient already has a barcode
        const { data: patient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('patients').select('barcode_id, patient_id').eq('patient_id', patientId).single();
        if (error) {
            throw new Error(`Patient not found: ${error.message}`);
        }
        // If patient already has a barcode, return it
        if (patient.barcode_id && patient.barcode_id.trim() !== '') {
            return patient.barcode_id;
        }
        // Generate new barcode
        const barcodeId = generateBarcodeId(patientId);
        // Update patient with barcode
        await updatePatientWithBarcode(patientId, barcodeId);
        return barcodeId;
    } catch (error) {
        console.error('Error generating barcode for patient:', error);
        throw error;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/patientService.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createInitialAppointment": (()=>createInitialAppointment),
    "createPatientAuthCredentials": (()=>createPatientAuthCredentials),
    "generateUHID": (()=>generateUHID),
    "getAllPatients": (()=>getAllPatients),
    "getPatientByUHID": (()=>getPatientByUHID),
    "getPatientWithRelatedData": (()=>getPatientWithRelatedData),
    "insertPatientRecord": (()=>insertPatientRecord),
    "linkAuthUserToPatient": (()=>linkAuthUserToPatient),
    "registerNewPatient": (()=>registerNewPatient),
    "updatePatientRecord": (()=>updatePatientRecord),
    "validateUHIDUnique": (()=>validateUHIDUnique)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$barcodeUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/barcodeUtils.ts [app-client] (ecmascript)");
;
;
async function generateUHID() {
    const now = new Date();
    const yearTwoDigits = now.getFullYear().toString().slice(-2); // Last two digits of year
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month with leading zero
    try {
        // Generate a unique 4-digit random number
        let uhid = '';
        let isUnique = false;
        let attempts = 0;
        const maxAttempts = 1000;
        while(!isUnique && attempts < maxAttempts){
            // Generate 4-digit random number
            const randomNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            uhid = `AH${yearTwoDigits}${month}${randomNumber}`;
            // Check if this UHID already exists
            const { data: existing, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('patients').select('patient_id').eq('patient_id', uhid).single();
            if (error && error.code === 'PGRST116') {
                // No record found, UHID is unique
                isUnique = true;
            } else if (error) {
                console.error('Error checking UHID uniqueness:', error);
                throw new Error('Failed to generate UHID');
            }
            attempts++;
        }
        if (!isUnique) {
            throw new Error('Failed to generate unique UHID after maximum attempts');
        }
        return uhid;
    } catch (error) {
        console.error('Error generating UHID:', error);
        throw new Error('Failed to generate UHID');
    }
}
async function createPatientAuthCredentials(uhid) {
    const email = `${uhid}@annam.com`;
    const password = 'password';
    try {
        // Create auth user using Supabase Admin API
        const { data: authUser, error: authError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
                data: {
                    role: 'patient',
                    uhid: uhid,
                    email_confirm: true
                }
            }
        });
        if (authError) {
            console.error('Error creating auth user:', authError);
            throw new Error(`Failed to create authentication: ${authError.message}`);
        }
        return {
            authUser: authUser.user,
            credentials: {
                email,
                password
            }
        };
    } catch (error) {
        console.error('Error creating patient auth credentials:', error);
        throw error;
    }
}
async function insertPatientRecord(uhid, registrationData, userId) {
    try {
        const fullName = `${registrationData.firstName} ${registrationData.lastName}`;
        // Generate barcode ID
        const barcodeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$barcodeUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateBarcodeId"])(uhid);
        // Prepare admission date and time
        let admissionDateTime = null;
        if (registrationData.admissionDate) {
            if (registrationData.admissionTime) {
                admissionDateTime = `${registrationData.admissionDate}T${registrationData.admissionTime}`;
            } else {
                admissionDateTime = `${registrationData.admissionDate}T00:00:00`;
            }
        }
        const patientData = {
            // Basic Information
            patient_id: uhid,
            barcode_id: barcodeId,
            name: fullName,
            date_of_birth: registrationData.dateOfBirth,
            gender: registrationData.gender.toLowerCase(),
            marital_status: registrationData.maritalStatus || null,
            phone: registrationData.phone,
            email: registrationData.email || `${uhid}@annam.com`,
            address: registrationData.address,
            // Medical Information
            blood_group: registrationData.bloodGroup || null,
            allergies: registrationData.allergies || null,
            medical_history: registrationData.medicalHistory || null,
            current_medications: registrationData.currentMedications || null,
            chronic_conditions: registrationData.chronicConditions || null,
            previous_surgeries: registrationData.previousSurgeries || null,
            // New Admission Information
            admission_date: admissionDateTime,
            admission_time: registrationData.admissionTime || null,
            primary_complaint: registrationData.primaryComplaint,
            admission_type: registrationData.admissionType,
            referring_doctor_facility: registrationData.referringDoctorFacility || null,
            department_ward: registrationData.departmentWard || null,
            room_number: registrationData.roomNumber || null,
            // Guardian/Attendant Details (Optional)
            guardian_name: registrationData.guardianName || null,
            guardian_relationship: registrationData.guardianRelationship || null,
            guardian_phone: registrationData.guardianPhone || null,
            guardian_address: registrationData.guardianAddress || null,
            // Emergency Contact (Optional)
            emergency_contact_name: registrationData.emergencyContactName || null,
            emergency_contact_phone: registrationData.emergencyContactPhone || null,
            emergency_contact_relationship: registrationData.emergencyContactRelationship || null,
            // Insurance Information
            insurance_number: registrationData.insuranceNumber || null,
            insurance_provider: registrationData.insuranceProvider || null,
            // Additional fields
            initial_symptoms: registrationData.initialSymptoms || null,
            referred_by: registrationData.referredBy || null,
            // Link to users table
            user_id: userId || null,
            // System fields
            status: 'active'
        };
        const { data: patient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('patients').insert([
            patientData
        ]).select().single();
        if (error) {
            console.error('Error inserting patient record:', error);
            throw new Error(`Failed to create patient record: ${error.message}`);
        }
        return patient;
    } catch (error) {
        console.error('Error inserting patient record:', error);
        throw error;
    }
}
async function linkAuthUserToPatient(authUserId, uhid, registrationData) {
    try {
        const fullName = `${registrationData.firstName} ${registrationData.lastName}`;
        const userData = {
            auth_id: authUserId,
            employee_id: uhid,
            name: fullName,
            email: registrationData.email || `${uhid}@annam.com`,
            role: 'patient',
            phone: registrationData.phone,
            address: registrationData.address,
            status: 'active',
            permissions: {
                patient_portal: true,
                view_own_records: true,
                book_appointments: true
            }
        };
        const { data: user, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('users').insert([
            userData
        ]).select().single();
        if (error) {
            console.error('Error linking auth user to patient:', error);
            throw new Error(`Failed to create user record: ${error.message}`);
        }
        return user;
    } catch (error) {
        console.error('Error linking auth user to patient:', error);
        throw error;
    }
}
async function createInitialAppointment(patientId, registrationData) {
    try {
        if (!registrationData.initialSymptoms?.trim() && !registrationData.primaryComplaint?.trim()) {
            return null; // No appointment needed if no symptoms
        }
        // Generate appointment ID
        const appointmentId = `APT${Date.now()}`;
        // Use tomorrow as default appointment date
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const appointmentData = {
            appointment_id: appointmentId,
            patient_id: patientId,
            appointment_date: tomorrow.toISOString().split('T')[0],
            appointment_time: '09:00:00',
            type: 'consultation',
            status: 'scheduled',
            symptoms: registrationData.initialSymptoms || registrationData.primaryComplaint,
            notes: `Initial consultation for newly registered patient. Primary complaint: ${registrationData.primaryComplaint}`
        };
        const { data: appointment, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('appointments').insert([
            appointmentData
        ]).select().single();
        if (error) {
            console.error('Error creating initial appointment:', error);
            // Don't throw error for appointment creation failure
            return null;
        }
        return appointment;
    } catch (error) {
        console.error('Error creating initial appointment:', error);
        // Don't throw error for appointment creation failure
        return null;
    }
}
async function registerNewPatient(registrationData, preGeneratedUHID) {
    try {
        // Step 1: Use pre-generated UHID or generate new one
        const uhid = preGeneratedUHID || await generateUHID();
        console.log('Using UHID:', uhid);
        // Step 2: Create authentication credentials
        const { authUser, credentials } = await createPatientAuthCredentials(uhid);
        console.log('Created auth user:', authUser?.id);
        // Step 3: Create user record in users table
        const userRecord = await linkAuthUserToPatient(authUser.id, uhid, registrationData);
        console.log('Created user record:', userRecord.id);
        // Step 4: Insert patient record with user_id link
        const patient = await insertPatientRecord(uhid, registrationData, userRecord.id);
        console.log('Created patient record:', patient.id);
        // Step 5: Create initial appointment if symptoms provided
        if (registrationData.initialSymptoms?.trim() || registrationData.primaryComplaint?.trim()) {
            const appointment = await createInitialAppointment(patient.id, registrationData);
            if (appointment) {
                console.log('Created initial appointment:', appointment.id);
            }
        }
        return {
            success: true,
            patient,
            uhid,
            credentials
        };
    } catch (error) {
        console.error('Error registering new patient:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}
async function validateUHIDUnique(uhid) {
    try {
        const { data: existingPatient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('patients').select('patient_id').eq('patient_id', uhid).single();
        if (error && error.code !== 'PGRST116') {
            console.error('Error validating UHID uniqueness:', error);
            throw new Error('Failed to validate UHID');
        }
        return !existingPatient; // Return true if no existing patient found
    } catch (error) {
        console.error('Error validating UHID uniqueness:', error);
        throw error;
    }
}
async function getPatientByUHID(uhid) {
    try {
        const { data: patient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('patients').select('*').eq('patient_id', uhid).single();
        if (error) {
            console.error('Error fetching patient by UHID:', error);
            throw new Error(`Patient not found: ${error.message}`);
        }
        return patient;
    } catch (error) {
        console.error('Error fetching patient by UHID:', error);
        throw error;
    }
}
async function getPatientWithRelatedData(uhid) {
    try {
        const { data: patient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('patients').select(`
        *,
        users:user_id (
          id,
          name,
          email,
          role,
          status,
          permissions
        ),
        appointments:appointments(
          id,
          appointment_id,
          appointment_date,
          appointment_time,
          type,
          status,
          symptoms,
          diagnosis,
          doctor:doctors(
            id,
            user:users(name, specialization)
          )
        ),
        bed_allocations:bed_allocations(
          id,
          admission_date,
          discharge_date,
          admission_type,
          status,
          bed:beds(bed_number, room_number, bed_type),
          doctor:doctors(
            id,
            user:users(name, specialization)
          )
        )
      `).eq('patient_id', uhid).single();
        if (error) {
            console.error('Error fetching patient with related data:', error);
            throw new Error(`Patient not found: ${error.message}`);
        }
        return patient;
    } catch (error) {
        console.error('Error fetching patient with related data:', error);
        throw error;
    }
}
async function updatePatientRecord(uhid, updateData) {
    try {
        const { data: patient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('patients').update(updateData).eq('patient_id', uhid).select().single();
        if (error) {
            console.error('Error updating patient record:', error);
            throw new Error(`Failed to update patient: ${error.message}`);
        }
        return patient;
    } catch (error) {
        console.error('Error updating patient record:', error);
        throw error;
    }
}
async function getAllPatients(options = {}) {
    try {
        const { page = 1, limit = 20, status, searchTerm } = options;
        const offset = (page - 1) * limit;
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('patients').select(`
        *,
        users:user_id (
          id,
          name,
          email,
          role,
          status,
          permissions
        )
      `, {
            count: 'exact'
        });
        // Apply filters
        if (status) {
            query = query.eq('status', status);
        }
        if (searchTerm) {
            query = query.or(`name.ilike.%${searchTerm}%,patient_id.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`);
        }
        // Apply pagination
        const { data: patients, error, count } = await query.range(offset, offset + limit - 1).order('created_at', {
            ascending: false
        });
        if (error) {
            console.error('Error fetching patients:', error);
            throw new Error(`Failed to fetch patients: ${error.message}`);
        }
        return {
            patients: patients || [],
            total: count || 0,
            page,
            limit
        };
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/EmergencyPatientRegistrationForm.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>EmergencyPatientRegistrationForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hash.js [app-client] (ecmascript) <export default as Hash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/stethoscope.js [app-client] (ecmascript) <export default as Stethoscope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$patientService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/patientService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function EmergencyPatientRegistrationForm({ onSubmit, onCancel, isLoading = false }) {
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        address: '',
        primaryComplaint: '',
        allergies: '',
        bloodGroup: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelationship: '',
        admissionType: 'emergency',
        admissionDate: new Date().toISOString().split('T')[0],
        admissionTime: new Date().toTimeString().slice(0, 5)
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [previewUHID, setPreviewUHID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isGeneratingUHID, setIsGeneratingUHID] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleInputChange = (field, value)=>{
        setFormData((prev)=>({
                ...prev,
                [field]: value
            }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev)=>({
                    ...prev,
                    [field]: ''
                }));
        }
    };
    const validateForm = ()=>{
        const newErrors = {};
        // Only First Name is mandatory
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        // All other fields are now optional
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const generatePreviewUHID = async ()=>{
        try {
            setIsGeneratingUHID(true);
            const uhid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$patientService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateUHID"])();
            setPreviewUHID(uhid);
            return true;
        } catch (error) {
            console.error('Error generating UHID preview:', error);
            setErrors({
                firstName: 'Failed to generate UHID. Please try again.'
            });
            return false;
        } finally{
            setIsGeneratingUHID(false);
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (validateForm()) {
            // Generate UHID if not already generated
            if (!previewUHID) {
                const uhidGenerated = await generatePreviewUHID();
                if (!uhidGenerated) {
                    return;
                }
            }
            await onSubmit(formData, previewUHID);
        }
    };
    // Auto-generate UHID when first name is filled (only mandatory field)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "EmergencyPatientRegistrationForm.useEffect": ()=>{
            if (formData.firstName && !previewUHID && !isGeneratingUHID) {
                generatePreviewUHID();
            }
        }
    }["EmergencyPatientRegistrationForm.useEffect"], [
        formData.firstName,
        previewUHID,
        isGeneratingUHID
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 border-b border-gray-200 bg-red-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-2 bg-red-100 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                className: "h-6 w-6 text-red-600"
                            }, void 0, false, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold text-red-900",
                                    children: "Emergency Patient Registration"
                                }, void 0, false, {
                                    fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-red-700",
                                    children: "Quick registration for emergency patients - only essential information required"
                                }, void 0, false, {
                                    fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-sm text-red-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Fast Track Registration"
                                }, void 0, false, {
                                    fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "p-6",
                children: [
                    previewUHID && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-green-50 p-4 rounded-lg border border-green-200 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 bg-green-100 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hash$3e$__["Hash"], {
                                            className: "h-4 w-4 text-green-600"
                                        }, void 0, false, {
                                            fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                            lineNumber: 158,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 157,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-semibold text-green-900",
                                                children: "Generated Patient UHID"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 161,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-green-700",
                                                children: "Emergency registration ID"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "h-5 w-5 text-green-600 ml-auto"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white px-4 py-3 rounded-lg border border-green-300",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-mono text-xl font-bold text-green-900 text-center tracking-wider",
                                    children: previewUHID
                                }, void 0, false, {
                                    fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                    lineNumber: 167,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 bg-orange-100 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "h-5 w-5 text-orange-600"
                                        }, void 0, false, {
                                            fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                            lineNumber: 178,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 177,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900",
                                                children: "Essential Patient Information"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 181,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: "Required fields for emergency registration"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 182,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "firstName",
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: [
                                                    "First Name ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 189,
                                                        columnNumber: 28
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 188,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                id: "firstName",
                                                value: formData.firstName,
                                                onChange: (e)=>handleInputChange('firstName', e.target.value),
                                                className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.firstName ? 'border-red-300' : 'border-gray-300'}`,
                                                placeholder: "Enter first name"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 191,
                                                columnNumber: 15
                                            }, this),
                                            errors.firstName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-500 text-xs mt-1",
                                                children: errors.firstName
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 199,
                                                columnNumber: 36
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 187,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "lastName",
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: [
                                                    "Last Name ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 203,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                id: "lastName",
                                                value: formData.lastName,
                                                onChange: (e)=>handleInputChange('lastName', e.target.value),
                                                className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.lastName ? 'border-red-300' : 'border-gray-300'}`,
                                                placeholder: "Enter last name"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 206,
                                                columnNumber: 15
                                            }, this),
                                            errors.lastName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-500 text-xs mt-1",
                                                children: errors.lastName
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 214,
                                                columnNumber: 35
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "dateOfBirth",
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: [
                                                    "Date of Birth ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 218,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                id: "dateOfBirth",
                                                value: formData.dateOfBirth,
                                                onChange: (e)=>handleInputChange('dateOfBirth', e.target.value),
                                                className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'}`
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 221,
                                                columnNumber: 15
                                            }, this),
                                            errors.dateOfBirth && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-500 text-xs mt-1",
                                                children: errors.dateOfBirth
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 228,
                                                columnNumber: 38
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "gender",
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: [
                                                    "Gender ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 233,
                                                        columnNumber: 24
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 232,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "gender",
                                                value: formData.gender,
                                                onChange: (e)=>handleInputChange('gender', e.target.value),
                                                className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.gender ? 'border-red-300' : 'border-gray-300'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select gender"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "male",
                                                        children: "Male"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "female",
                                                        children: "Female"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "other",
                                                        children: "Other"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 235,
                                                columnNumber: 15
                                            }, this),
                                            errors.gender && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-500 text-xs mt-1",
                                                children: errors.gender
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 246,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "phone",
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: [
                                                    "Phone Number ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 30
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 250,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "tel",
                                                id: "phone",
                                                value: formData.phone,
                                                onChange: (e)=>handleInputChange('phone', e.target.value),
                                                className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.phone ? 'border-red-300' : 'border-gray-300'}`,
                                                placeholder: "Enter phone number"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 253,
                                                columnNumber: 15
                                            }, this),
                                            errors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-500 text-xs mt-1",
                                                children: errors.phone
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 261,
                                                columnNumber: 32
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 249,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "bloodGroup",
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: [
                                                    "Blood Group ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-400",
                                                        children: "(if known)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 265,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "bloodGroup",
                                                value: formData.bloodGroup,
                                                onChange: (e)=>handleInputChange('bloodGroup', e.target.value),
                                                className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select blood group"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "A+",
                                                        children: "A+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "A-",
                                                        children: "A-"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "B+",
                                                        children: "B+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "B-",
                                                        children: "B-"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "AB+",
                                                        children: "AB+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 279,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "AB-",
                                                        children: "AB-"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 280,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "O+",
                                                        children: "O+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "O-",
                                                        children: "O-"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 268,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 264,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "address",
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: [
                                            "Address ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-500",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 289,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 288,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "address",
                                        value: formData.address,
                                        onChange: (e)=>handleInputChange('address', e.target.value),
                                        rows: 2,
                                        className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.address ? 'border-red-300' : 'border-gray-300'}`,
                                        placeholder: "Enter complete address"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this),
                                    errors.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-500 text-xs mt-1",
                                        children: errors.address
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 299,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 287,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-4 mt-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 bg-red-100 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                                            className: "h-5 w-5 text-red-600"
                                        }, void 0, false, {
                                            fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                            lineNumber: 305,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 304,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900",
                                                children: "Emergency Medical Information"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 308,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: "Critical information for immediate care"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 309,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 307,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "primaryComplaint",
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: [
                                            "Primary Complaint / Chief Complaint ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-500",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 315,
                                                columnNumber: 51
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 314,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "primaryComplaint",
                                        value: formData.primaryComplaint,
                                        onChange: (e)=>handleInputChange('primaryComplaint', e.target.value),
                                        rows: 3,
                                        className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.primaryComplaint ? 'border-red-300' : 'border-gray-300'}`,
                                        placeholder: "Describe the main reason for this emergency visit"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this),
                                    errors.primaryComplaint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-500 text-xs mt-1",
                                        children: errors.primaryComplaint
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 325,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 313,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "allergies",
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: [
                                            "Known Allergies ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-400",
                                                children: "(if any)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 330,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 329,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "allergies",
                                        value: formData.allergies,
                                        onChange: (e)=>handleInputChange('allergies', e.target.value),
                                        rows: 2,
                                        className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                                        placeholder: "List any known allergies (medications, food, etc.) or type 'None'"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 332,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 mb-4 mt-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 bg-blue-100 rounded-lg",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                            className: "h-5 w-5 text-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                            lineNumber: 345,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 344,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold text-gray-900",
                                                children: "Emergency Contact"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 348,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: "Optional but recommended for emergency situations"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 349,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 347,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 343,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "emergencyContactName",
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Contact Name"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 355,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                id: "emergencyContactName",
                                                value: formData.emergencyContactName,
                                                onChange: (e)=>handleInputChange('emergencyContactName', e.target.value),
                                                className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                                                placeholder: "Emergency contact name"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 358,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 354,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "emergencyContactPhone",
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Contact Phone"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 369,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "tel",
                                                id: "emergencyContactPhone",
                                                value: formData.emergencyContactPhone,
                                                onChange: (e)=>handleInputChange('emergencyContactPhone', e.target.value),
                                                className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                                                placeholder: "Emergency contact phone"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 372,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 368,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "emergencyContactRelationship",
                                                className: "block text-sm font-medium text-gray-700 mb-1",
                                                children: "Relationship"
                                            }, void 0, false, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 383,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "emergencyContactRelationship",
                                                value: formData.emergencyContactRelationship,
                                                onChange: (e)=>handleInputChange('emergencyContactRelationship', e.target.value),
                                                className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select relationship"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "spouse",
                                                        children: "Spouse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 393,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "parent",
                                                        children: "Parent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "child",
                                                        children: "Child"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "sibling",
                                                        children: "Sibling"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 396,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "friend",
                                                        children: "Friend"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "other",
                                                        children: "Other"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                                lineNumber: 386,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 382,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4 pt-6 mt-8 border-t border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onCancel,
                                className: "flex-1 flex items-center justify-center bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-4 w-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                        lineNumber: 411,
                                        columnNumber: 13
                                    }, this),
                                    "Cancel"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 406,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isLoading || isGeneratingUHID,
                                className: "flex-1 flex items-center justify-center bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                            lineNumber: 421,
                                            columnNumber: 17
                                        }, this),
                                        "Registering Emergency Patient..."
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                            className: "h-4 w-4 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                            lineNumber: 426,
                                            columnNumber: 17
                                        }, this),
                                        "Register Emergency Patient"
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                                lineNumber: 414,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                        lineNumber: 405,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/EmergencyPatientRegistrationForm.tsx",
        lineNumber: 134,
        columnNumber: 5
    }, this);
}
_s(EmergencyPatientRegistrationForm, "lyVz90E+HHI604tPgd6d01W5hSA=");
_c = EmergencyPatientRegistrationForm;
var _c;
__turbopack_context__.k.register(_c, "EmergencyPatientRegistrationForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/patients/emergency-register/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>EmergencyPatientRegisterPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EmergencyPatientRegistrationForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/EmergencyPatientRegistrationForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$patientService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/patientService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function EmergencyPatientRegisterPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [registrationResult, setRegistrationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Convert emergency data to full registration data
    const convertToFullRegistrationData = (emergencyData)=>{
        return {
            firstName: emergencyData.firstName,
            lastName: emergencyData.lastName,
            dateOfBirth: emergencyData.dateOfBirth,
            gender: emergencyData.gender,
            phone: emergencyData.phone,
            address: emergencyData.address,
            primaryComplaint: emergencyData.primaryComplaint,
            admissionType: emergencyData.admissionType,
            admissionDate: emergencyData.admissionDate,
            admissionTime: emergencyData.admissionTime,
            // Optional fields from emergency form
            allergies: emergencyData.allergies || '',
            bloodGroup: emergencyData.bloodGroup || '',
            emergencyContactName: emergencyData.emergencyContactName || '',
            emergencyContactPhone: emergencyData.emergencyContactPhone || '',
            emergencyContactRelationship: emergencyData.emergencyContactRelationship || '',
            // Default/empty values for fields not collected in emergency registration
            maritalStatus: '',
            email: '',
            medicalHistory: '',
            currentMedications: '',
            chronicConditions: '',
            previousSurgeries: '',
            referringDoctorFacility: '',
            consultingDoctorName: '',
            consultingDoctorId: '',
            departmentWard: '',
            roomNumber: '',
            guardianName: '',
            guardianRelationship: '',
            guardianPhone: '',
            guardianAddress: '',
            insuranceProvider: '',
            insuranceNumber: '',
            initialSymptoms: '',
            referredBy: ''
        };
    };
    const handleEmergencyRegistrationSubmit = async (data, previewUHID)=>{
        setIsLoading(true);
        try {
            // Convert emergency data to full registration format
            const fullRegistrationData = convertToFullRegistrationData(data);
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$patientService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["registerNewPatient"])(fullRegistrationData, previewUHID);
            setRegistrationResult(result);
            if (result.success) {
                // Auto-hide success message after 8 seconds and redirect for emergency cases
                setTimeout(()=>{
                    router.push('/patients');
                }, 8000);
            }
        } catch (error) {
            console.error('Emergency registration error:', error);
            setRegistrationResult({
                success: false,
                error: 'An unexpected error occurred during emergency registration'
            });
        } finally{
            setIsLoading(false);
        }
    };
    const handleCancel = ()=>{
        router.push('/patients');
    };
    const copyToClipboard = (text)=>{
        navigator.clipboard.writeText(text);
    };
    const renderSuccessResult = ()=>{
        if (!registrationResult?.success || !registrationResult.uhid || !registrationResult.credentials) {
            return null;
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b border-gray-200 bg-green-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 bg-green-100 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                    className: "h-6 w-6 text-green-600"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/patients/emergency-register/page.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold text-green-900",
                                        children: "Emergency Patient Registration Successful!"
                                    }, void 0, false, {
                                        fileName: "[project]/app/patients/emergency-register/page.tsx",
                                        lineNumber: 130,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-green-700",
                                        children: "Patient has been registered for emergency care"
                                    }, void 0, false, {
                                        fileName: "[project]/app/patients/emergency-register/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/patients/emergency-register/page.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/patients/emergency-register/page.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                    lineNumber: 124,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-50 p-4 rounded-lg border border-red-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-red-900 mb-3 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this),
                                        "Emergency Patient UHID"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white px-4 py-2 rounded-lg border border-red-300 font-mono text-lg font-bold text-red-900 flex-1",
                                            children: registrationResult.uhid
                                        }, void 0, false, {
                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                            lineNumber: 144,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>copyToClipboard(registrationResult.uhid),
                                            className: "p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors",
                                            title: "Copy UHID",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                className: "h-4 w-4 text-red-600"
                                            }, void 0, false, {
                                                fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-red-700 mt-2",
                                    children: "This UHID is for emergency care. Additional information can be updated later."
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                            lineNumber: 138,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-50 p-4 rounded-lg border border-blue-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-blue-900 mb-3",
                                    children: "Patient Portal Login Credentials"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-blue-700 mb-1",
                                                    children: "Email Address"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-white px-3 py-2 rounded-lg border border-blue-300 font-mono text-sm flex-1",
                                                            children: registrationResult.credentials.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                            lineNumber: 168,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>copyToClipboard(registrationResult.credentials.email),
                                                            className: "p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors",
                                                            title: "Copy Email",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                className: "h-4 w-4 text-blue-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                                lineNumber: 176,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-medium text-blue-700 mb-1",
                                                    children: "Temporary Password"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-white px-3 py-2 rounded-lg border border-blue-300 font-mono text-sm flex-1",
                                                            children: showPassword ? registrationResult.credentials.password : '••••••••••••'
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setShowPassword(!showPassword),
                                                            className: "p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors",
                                                            title: showPassword ? "Hide Password" : "Show Password",
                                                            children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                                className: "h-4 w-4 text-blue-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                                lineNumber: 192,
                                                                columnNumber: 37
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                className: "h-4 w-4 text-blue-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                                lineNumber: 192,
                                                                columnNumber: 84
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                            lineNumber: 187,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>copyToClipboard(registrationResult.credentials.password),
                                                            className: "p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors",
                                                            title: "Copy Password",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                className: "h-4 w-4 text-blue-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                                lineNumber: 199,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                            lineNumber: 194,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                            lineNumber: 181,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 p-3 bg-blue-100 rounded-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-blue-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Important:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/patients/emergency-register/page.tsx",
                                                lineNumber: 207,
                                                columnNumber: 17
                                            }, this),
                                            " Please provide these credentials to the patient or their emergency contact. The patient should change the password upon first login."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/patients/emergency-register/page.tsx",
                                        lineNumber: 206,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 205,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-orange-50 p-4 rounded-lg border border-orange-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-orange-900 mb-3",
                                    children: "Next Steps for Emergency Care"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 215,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "text-sm text-orange-800 space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "• Patient can now be admitted for emergency treatment"
                                        }, void 0, false, {
                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "• Additional medical information can be collected during treatment"
                                        }, void 0, false, {
                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                            lineNumber: 218,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "• Insurance and detailed medical history can be updated later"
                                        }, void 0, false, {
                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                            lineNumber: 219,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: "• Emergency contact has been notified if provided"
                                        }, void 0, false, {
                                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                                            lineNumber: 220,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push(`/patients/${registrationResult.uhid}`),
                                    className: "flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors",
                                    children: "View Patient Details"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push('/patients'),
                                    className: "flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors",
                                    children: "Back to Patients"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/patients/emergency-register/page.tsx",
            lineNumber: 123,
            columnNumber: 7
        }, this);
    };
    const renderErrorResult = ()=>{
        if (!registrationResult || registrationResult.success) {
            return null;
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-red-200",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 border-b border-red-200 bg-red-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2 bg-red-100 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "h-6 w-6 text-red-600"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 254,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/patients/emergency-register/page.tsx",
                                lineNumber: 253,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold text-red-900",
                                        children: "Emergency Registration Failed"
                                    }, void 0, false, {
                                        fileName: "[project]/app/patients/emergency-register/page.tsx",
                                        lineNumber: 257,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-red-700",
                                        children: "There was an error during the registration process"
                                    }, void 0, false, {
                                        fileName: "[project]/app/patients/emergency-register/page.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/patients/emergency-register/page.tsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/patients/emergency-register/page.tsx",
                        lineNumber: 252,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                    lineNumber: 251,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-50 p-4 rounded-lg border border-red-200 mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-800",
                                children: registrationResult.error
                            }, void 0, false, {
                                fileName: "[project]/app/patients/emergency-register/page.tsx",
                                lineNumber: 265,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                            lineNumber: 264,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setRegistrationResult(null),
                                    className: "flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors",
                                    children: "Try Again"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 269,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push('/patients'),
                                    className: "flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/patients/emergency-register/page.tsx",
                            lineNumber: 268,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/patients/emergency-register/page.tsx",
                    lineNumber: 263,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/patients/emergency-register/page.tsx",
            lineNumber: 250,
            columnNumber: 7
        }, this);
    };
    // Show result screens if registration is complete
    if (registrationResult) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 py-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4",
                children: registrationResult.success ? renderSuccessResult() : renderErrorResult()
            }, void 0, false, {
                fileName: "[project]/app/patients/emergency-register/page.tsx",
                lineNumber: 291,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/patients/emergency-register/page.tsx",
            lineNumber: 290,
            columnNumber: 7
        }, this);
    }
    // Show the emergency registration form
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$EmergencyPatientRegistrationForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onSubmit: handleEmergencyRegistrationSubmit,
                onCancel: handleCancel,
                isLoading: isLoading
            }, void 0, false, {
                fileName: "[project]/app/patients/emergency-register/page.tsx",
                lineNumber: 302,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/patients/emergency-register/page.tsx",
            lineNumber: 301,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/patients/emergency-register/page.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
_s(EmergencyPatientRegisterPage, "L/CojXNx4+0xSgP6Mfi3CyNsRIc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = EmergencyPatientRegisterPage;
var _c;
__turbopack_context__.k.register(_c, "EmergencyPatientRegisterPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_219e3e04._.js.map