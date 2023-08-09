import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://aoqhvldcenjveyifrcrp.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvcWh2bGRjZW5qdmV5aWZyY3JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQyMzk2NjQsImV4cCI6MTk5OTgxNTY2NH0.FA1rdYEUyMMIrwEMeLym7lHc-UIITkSWrR2wvTYAuYw"
);
