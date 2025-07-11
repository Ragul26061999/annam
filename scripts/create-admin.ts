import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://zusheijhebsmjiyyeiqq.supabase.co';
const supabaseServiceKey = 'SUPABASE_SERVICE_KEY_HERE'; // TODO: Replace with actual service key

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables. Make sure to set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  const email = 'selvan@annam.com';
  const password = 'password';

  console.log('Creating admin user...');
  
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Skip email confirmation for this user
    user_metadata: {
      role: 'admin',
      name: 'Admin User',
    },
  });

  if (error) {
    console.error('Error creating user:', error.message);
    return;
  }

  console.log('Admin user created successfully:');
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('User ID:', data.user.id);
}

createAdminUser().catch(console.error);
