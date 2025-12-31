
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function check() {
  const { data: products, count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact' });
  
  console.log('Products:', products);
  console.log('Count:', count);
  console.log('Error:', error);
}

check();
