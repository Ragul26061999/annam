module.exports = {

"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/punycode [external] (punycode, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("punycode", () => require("punycode"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[externals]/net [external] (net, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}}),
"[externals]/tls [external] (tls, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[project]/src/lib/supabase.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createAdminUser": (()=>createAdminUser),
    "getCurrentUser": (()=>getCurrentUser),
    "signInWithEmail": (()=>signInWithEmail),
    "signOut": (()=>signOut),
    "signUpWithEmail": (()=>signUpWithEmail),
    "supabase": (()=>supabase)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-ssr] (ecmascript) <locals>");
;
const supabaseUrl = 'https://zusheijhebsmjiyyeiqq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1c2hlaWpoZWJzbWppeXllaXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MjI0NDAsImV4cCI6MjA2NzM5ODQ0MH0.iwGPaOJPa6OvwX_iA1xvRt5cM72DWfd8Br1pwRTemRc';
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
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
}}),
"[project]/src/lib/barcodeUtils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-ssr] (ecmascript)");
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
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('patients').update({
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
        const { data: patient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('patients').select('*').eq('barcode_id', barcodeId).single();
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
        const { data: patient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('patients').select('barcode_id, patient_id').eq('patient_id', patientId).single();
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
}}),
"[project]/src/lib/patientService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$barcodeUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/barcodeUtils.ts [app-ssr] (ecmascript)");
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
            const { data: existing, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('patients').select('patient_id').eq('patient_id', uhid).single();
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
        const { data: authUser, error: authError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
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
        const barcodeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$barcodeUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateBarcodeId"])(uhid);
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
        const { data: patient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('patients').insert([
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
        const { data: user, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('users').insert([
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
        const { data: appointment, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('appointments').insert([
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
        const { data: existingPatient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('patients').select('patient_id').eq('patient_id', uhid).single();
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
        const { data: patient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('patients').select('*').eq('patient_id', uhid).single();
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
        const { data: patient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('patients').select(`
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
        const { data: patient, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('patients').update(updateData).eq('patient_id', uhid).select().single();
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
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('patients').select(`
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
}}),
"[project]/src/lib/vitalsService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "checkVitalAlerts": (()=>checkVitalAlerts),
    "deleteVitalRecord": (()=>deleteVitalRecord),
    "getLatestVitals": (()=>getLatestVitals),
    "getPatientVitals": (()=>getPatientVitals),
    "getVitalStats": (()=>getVitalStats),
    "getVitalsSummary": (()=>getVitalsSummary),
    "getVitalsTrends": (()=>getVitalsTrends),
    "recordVitals": (()=>recordVitals),
    "updateVitalRecord": (()=>updateVitalRecord)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-ssr] (ecmascript)");
;
async function recordVitals(vitalsData) {
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
        const { data: vital, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('vitals').insert([
            vitalRecord
        ]).select('*').single();
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
const getPatientVitals = async (patientId)=>{
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('get-vitals-with-user', {
            body: {
                patientId
            }
        });
        if (error) {
            console.error('Error fetching vitals via Edge Function:', error);
            throw new Error('Failed to fetch vitals');
        }
        return data?.vitals || [];
    } catch (err) {
        console.error('Exception in getPatientVitals:', err);
        throw err;
    }
};
async function getLatestVitals(patientId) {
    try {
        const { data: vital, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('vitals').select(`
        *,
        patient:patients(id, patient_id, name),
        recorded_by_user:users!recorded_by(id, name, role),
        visit:patient_visits(id, visit_id, visit_date, visit_type)
      `).eq('patient_id', patientId).order('recorded_at', {
            ascending: false
        }).limit(1).single();
        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching latest vitals:', error);
            throw new Error(`Failed to fetch latest vitals: ${error.message}`);
        }
        return vital || null;
    } catch (error) {
        console.error('Error fetching latest vitals:', error);
        throw error;
    }
}
async function getVitalsTrends(patientId, days = 30) {
    try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const { data: vitals, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('vitals').select('recorded_at, systolic_bp, diastolic_bp, heart_rate, temperature, weight, oxygen_saturation').eq('patient_id', patientId).gte('recorded_at', startDate.toISOString()).lte('recorded_at', endDate.toISOString()).order('recorded_at', {
            ascending: true
        });
        if (error) {
            console.error('Error fetching vitals trends:', error);
            throw new Error(`Failed to fetch vitals trends: ${error.message}`);
        }
        const trends = {
            dates: [],
            heartRate: [],
            bloodPressure: [],
            temperature: [],
            weight: [],
            oxygenSaturation: []
        };
        vitals?.forEach((vital)=>{
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
async function getVitalStats(patientId, vitalType, days = 30) {
    try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const { data: vitals, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('vitals').select(`recorded_at, ${vitalType}`).eq('patient_id', patientId).gte('recorded_at', startDate.toISOString()).lte('recorded_at', endDate.toISOString()).not(vitalType, 'is', null).order('recorded_at', {
            ascending: false
        });
        if (error) {
            console.error('Error fetching vital stats:', error);
            throw new Error(`Failed to fetch vital stats: ${error.message}`);
        }
        const values = vitals?.map((v)=>v[vitalType]).filter((v)=>v !== null) || [];
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
        const average = values.reduce((sum, val)=>sum + val, 0) / values.length;
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
async function checkVitalAlerts(patientId) {
    try {
        const latestVital = await getLatestVitals(patientId);
        if (!latestVital) {
            return {
                alerts: []
            };
        }
        const alerts = [];
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
        return {
            alerts
        };
    } catch (error) {
        console.error('Error checking vital alerts:', error);
        throw error;
    }
}
async function getVitalsSummary(patientId) {
    try {
        const [latestVitals, alertsData, totalCount] = await Promise.all([
            getLatestVitals(patientId),
            checkVitalAlerts(patientId),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('vitals').select('id', {
                count: 'exact',
                head: true
            }).eq('patient_id', patientId)
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
async function updateVitalRecord(vitalId, updates) {
    try {
        // Calculate BMI if height and weight are provided
        let bmi = updates.bmi;
        if (updates.height && updates.weight) {
            const heightInMeters = updates.height / 100;
            bmi = updates.weight / (heightInMeters * heightInMeters);
            bmi = Math.round(bmi * 10) / 10; // Round to 1 decimal place
        }
        const updateData = {};
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
        const { data: vital, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('vitals').update(updateData).eq('id', vitalId).select(`
        *,
        patient:patients(id, patient_id, name),
        recorded_by_user:users!recorded_by(id, name, role),
        visit:patient_visits(id, visit_id, visit_date, visit_type)
      `).single();
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
async function deleteVitalRecord(vitalId) {
    try {
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('vitals').delete().eq('id', vitalId);
        if (error) {
            console.error('Error deleting vital record:', error);
            throw new Error(`Failed to delete vital record: ${error.message}`);
        }
    } catch (error) {
        console.error('Error deleting vital record:', error);
        throw error;
    }
}
}}),
"[project]/src/lib/medicalHistoryService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "addDummyMedicalHistory": (()=>addDummyMedicalHistory),
    "createMedicalHistory": (()=>createMedicalHistory),
    "getMedicalHistory": (()=>getMedicalHistory)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-ssr] (ecmascript)");
;
const createMedicalHistory = async (input)=>{
    if (!input.patientId) {
        throw new Error('Patient ID is required to create medical history.');
    }
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('medical_history').insert({
            patient_id: input.patientId,
            event_type: input.eventType,
            event_name: input.eventName,
            event_date: input.eventDate,
            details: input.details || null,
            doctor_name: input.doctorName || null,
            facility_name: input.facilityName || null
        }).select().single();
        if (error) {
            console.error('Error creating medical history:', error);
            throw new Error('Failed to create medical history entry.');
        }
        return {
            ...data,
            source: 'history'
        };
    } catch (error) {
        console.error('An unexpected error occurred while creating medical history:', error);
        throw error;
    }
};
const addDummyMedicalHistory = async (patientId)=>{
    const dummyData = [
        {
            patientId,
            eventType: 'Diagnosis',
            eventName: 'Hypertension',
            eventDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            details: 'Diagnosed with Stage 1 Hypertension. Prescribed lifestyle changes and monitoring.',
            doctorName: 'Dr. Sarah Johnson',
            facilityName: 'City General Hospital'
        },
        {
            patientId,
            eventType: 'Surgery',
            eventName: 'Appendectomy',
            eventDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
            details: 'Laparoscopic appendectomy performed due to acute appendicitis. Recovery was uneventful.',
            doctorName: 'Dr. Michael Chen',
            facilityName: 'University Medical Center'
        },
        {
            patientId,
            eventType: 'Vaccination',
            eventName: 'COVID-19 Vaccine',
            eventDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            details: 'Received second dose of COVID-19 vaccine. No adverse reactions reported.',
            doctorName: 'Dr. Lisa Wong',
            facilityName: 'Community Health Clinic'
        }
    ];
    const results = [];
    for (const entry of dummyData){
        try {
            const result = await createMedicalHistory(entry);
            results.push(result);
        } catch (error) {
            console.error('Error adding dummy data:', error);
        }
    }
    return results;
};
const getMedicalHistory = async (patientId)=>{
    if (!patientId) {
        console.error('Patient ID is required to fetch medical history.');
        return [];
    }
    try {
        // Fetch from medical_history table
        const { data: historyData, error: historyError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('medical_history').select('*').eq('patient_id', patientId);
        if (historyError) {
            console.error('Error fetching medical history:', historyError);
            throw new Error('Failed to fetch medical history.');
        }
        // Fetch from patient_symptoms table
        const { data: symptomsData, error: symptomsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('patient_symptoms').select('*').eq('patient_id', patientId);
        if (symptomsError) {
            console.error('Error fetching patient symptoms:', symptomsError);
            throw new Error('Failed to fetch patient symptoms.');
        }
        // Fetch from patient_allergies table
        const { data: allergiesData, error: allergiesError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('patient_allergies').select('*').eq('patient_id', patientId);
        if (allergiesError) {
            console.error('Error fetching patient allergies:', allergiesError);
            throw new Error('Failed to fetch patient allergies.');
        }
        // Normalize and combine the data
        const combinedHistory = [];
        if (historyData) {
            historyData.forEach((item)=>{
                combinedHistory.push({
                    ...item,
                    source: 'history'
                });
            });
        }
        if (symptomsData) {
            symptomsData.forEach((item)=>{
                combinedHistory.push({
                    id: item.id,
                    patient_id: item.patient_id,
                    event_type: 'Symptom',
                    event_name: item.symptom_name,
                    event_date: item.recorded_at,
                    details: `Severity: ${item.severity}, Onset: ${item.onset_date}`,
                    doctor_name: null,
                    facility_name: null,
                    source: 'symptom'
                });
            });
        }
        if (allergiesData) {
            allergiesData.forEach((item)=>{
                combinedHistory.push({
                    id: item.id,
                    patient_id: item.patient_id,
                    event_type: 'Allergy',
                    event_name: item.allergen,
                    event_date: item.recorded_at,
                    details: `Reaction: ${item.reaction}, Severity: ${item.severity}`,
                    doctor_name: null,
                    facility_name: null,
                    source: 'allergy'
                });
            });
        }
        // Sort by event date, most recent first
        combinedHistory.sort((a, b)=>new Date(b.event_date).getTime() - new Date(a.event_date).getTime());
        return combinedHistory;
    } catch (error) {
        console.error('An unexpected error occurred while fetching medical history:', error);
        throw error;
    }
};
}}),
"[project]/app/patients/[id]/page.tsx [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const e = new Error(`Could not parse module '[project]/app/patients/[id]/page.tsx'

Expected ',', got '{'`);
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__4b8a8582._.js.map