import { createClient } from "@supabase/supabase-js";
const supabaseUrl = 'https://oqzphlenowjandvdncmh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xenBobGVub3dqYW5kdmRuY21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNjM0NDIsImV4cCI6MjA1NTgzOTQ0Mn0.ECojBq5uxy1bOYoovbPobDv-F90_d4e7Hm4UkhdeMIg"

export const supabase = createClient(supabaseUrl, supabaseKey);


