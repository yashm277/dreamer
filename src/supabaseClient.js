import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iqexlutfxiicxvouqxlz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZXhsdXRmeGlpY3h2b3VxeGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNDM2OTQsImV4cCI6MjA0NzcxOTY5NH0.zLZdGCoP-UafnY88MmyhHtwpqIsrwMbdRKLRW81jeco';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
