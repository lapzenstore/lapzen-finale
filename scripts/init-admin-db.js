const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function init() {
  console.log('Starting DB initialization...');
  const { error } = await supabase.rpc('exec_sql', {
    sql_query: `
      CREATE TABLE IF NOT EXISTS admin_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
      INSERT INTO admin_settings (key, value)
      VALUES ('admin_password', 'K@$h!123')
      ON CONFLICT (key) DO NOTHING;
    `
  });

  if (error) {
    console.log('RPC exec_sql failed (might not exist). Trying direct insert to test if table exists.');
    const { error: insertError } = await supabase.from('admin_settings').upsert({ key: 'admin_password', value: 'K@$h!123' });
    if (insertError) {
      console.error('Direct insert failed:', insertError.message);
      console.log('You might need to create the admin_settings table manually in Supabase dashboard:');
      console.log('CREATE TABLE admin_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);');
    } else {
      console.log('Table exists and was updated.');
    }
  } else {
    console.log('Successfully initialized table via RPC.');
  }
}

init();
