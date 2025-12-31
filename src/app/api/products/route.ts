import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const limiter = rateLimit(ip, 100, 60000); // 100 requests per minute

  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const series = searchParams.get('series');
    const featured = searchParams.get('featured');
    const new_arrival = searchParams.get('new_arrival');
    const search = searchParams.get('search');

    let query = supabaseAdmin.from('products').select('*');

    if (category) query = query.eq('category', category);
    if (brand) query = query.eq('brand', brand);
    if (series) query = query.eq('series', series);
    if (featured) query = query.eq('featured', true);
    if (new_arrival) query = query.eq('new_arrival', true);
    
    if (search) {
      console.log('Searching for:', search);
      // Optimize search: Search title, brand, and series. 
      // Avoid searching large description with ilike for better performance.
      const searchTerm = `%${search}%`;
      query = query.or(`title.ilike.${searchTerm},brand.ilike.${searchTerm},series.ilike.${searchTerm}`);
    }

    console.log('Executing Supabase query...');
    const { data, error } = await query.order('created_at', { ascending: false });
    console.log('Supabase query finished.', error ? 'Error!' : `Found ${data?.length} rows`);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const limiter = rateLimit(ip, 20, 60000); // 20 requests per minute for POST

  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await request.json();
    
    // Enforce max 5 images
    if (body.image_urls && body.image_urls.length > 5) {
      return NextResponse.json({ error: 'Maximum 5 images allowed per laptop' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.from('products').insert([body]).select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
