import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://byjkzyfftsykixsuoekb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5amt6eWZmdHN5a2l4c3VvZWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzY0ODMsImV4cCI6MjA3NDMxMjQ4M30.YzO-kbC3orfCWYkercGeBmBbhopJiIfDH8yXTa3zY2Q';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);