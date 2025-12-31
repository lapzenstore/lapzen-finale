
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(url, key);

async function checkSchema() {
  const { data, error } = await supabase.from('orders').select('*').limit(1);
  if (error) {
    console.error('Error fetching orders:', error);
    return;
  }
  if (data && data.length > 0) {
    console.log('Sample order columns:', Object.keys(data[0]));
  } else {
    console.log('Orders table is empty, trying to get column names via RPC or just assuming standard schema.');
    // Try to get table info from postgres if possible via a query
    const { data: cols, error: colError } = await supabase.rpc('get_table_columns', { table_name: 'orders' });
    if (colError) {
      console.log('RPC failed, trying raw query via supabase.rpc if defined...');
    }
    console.log('Columns info:', cols);
  }
}

checkSchema();
