/// <reference types="https://esm.sh/@supabase/functions-js/edge-runtime.d.ts" />

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse request body and validate patientId
    let patientId;
    try {
      const body = await req.json();
      patientId = body.patientId;
      console.log('Request received for patientId:', patientId);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }
    
    if (!patientId) {
      console.error('Missing patientId in request');
      return new Response(JSON.stringify({ error: 'patientId is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // Create a Supabase client with the service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      });
    }
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    console.log('Fetching vitals for patient:', patientId);
    
    // Handle case where vitals table doesn't exist
    try {
      const { data, error } = await supabaseAdmin
        .from('vitals')
        .select(`
          *,
          user:recorded_by ( name )
        `)
        .eq('patient_id', patientId)
        .order('recorded_at', { ascending: false });

      if (error) {
        // If table doesn't exist (42P01) or relation doesn't exist, return empty array
        if (error.code === '42P01' || error.code === 'PGRST200') {
          console.log('Vitals table does not exist, returning empty array');
          return new Response(JSON.stringify({ vitals: [] }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          });
        }
        
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        });
      }
      
      console.log(`Successfully fetched ${data?.length || 0} vitals records`);
       return new Response(JSON.stringify({ vitals: data || [] }), {
         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
         status: 200,
       });
     } catch (dbError: any) {
       console.log('Vitals table access failed, returning empty array:', dbError.message);
       return new Response(JSON.stringify({ vitals: [] }), {
         headers: { ...corsHeaders, 'Content-Type': 'application/json' },
         status: 200,
       });
     }
  } catch (err) {
    const error = err as Error;
    console.error('Unexpected error in Edge Function:', error);
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
})
