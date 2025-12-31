import { createClient } from '@supabase/supabase-js';

const url = "https://ovxxmjqwacgtupatlbhm.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92eHhtanF3YWNndHVwYXRsYmhtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjE2MDI3MywiZXhwIjoyMDgxNzM2MjczfQ.JldBUxsPqMHGF8HvyOzBVWdLHcY1pTx3AcZfNgeVHVc";

const supabase = createClient(url, key);

async function test() {
  console.log("Testing connection...");
  const start = Date.now();
  const { data, error } = await supabase.from('products').select('id, name').limit(5);
  const end = Date.now();
  
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Success! Fetched", data?.length, "rows in", end - start, "ms");
    console.log("Sample:", data?.[0]);
  }
}

test();
