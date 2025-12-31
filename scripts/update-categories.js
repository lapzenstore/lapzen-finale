const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateCategories() {
  console.log('Updating categories from "Professional" to "ChromeBooks"...');
  const { data, error } = await supabase
    .from('products')
    .update({ category: 'ChromeBooks' })
    .eq('category', 'Professional');

  if (error) {
    console.error('Error updating categories:', error);
    process.exit(1);
  }

  console.log('Successfully updated categories.');
}

updateCategories();
