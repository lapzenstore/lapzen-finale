import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { SERIES_MAPPING, CATEGORIES } from '@/lib/constants';

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
    const min_price = searchParams.get('min_price');
    const max_price = searchParams.get('max_price');

    let query = supabaseAdmin.from('products').select('*');

    if (category) query = query.eq('category', category);
    if (brand) query = query.eq('brand', brand);
    if (series) query = query.eq('series', series);
    if (featured) query = query.eq('featured', true);
    if (new_arrival) query = query.eq('new_arrival', true);
    
    if (min_price) query = query.gte('price', parseInt(min_price));
    if (max_price) query = query.lte('price', parseInt(max_price));
    
    if (search) {
      console.log('Searching for:', search);
      const searchTerm = `%${search.trim()}%`;
      
      // Build an OR query that is more robust
      let orConditions = [
        `title.ilike.${searchTerm}`,
        `brand.ilike.${searchTerm}`,
        `series.ilike.${searchTerm}`,
        `category.ilike.${searchTerm}`
      ];

      const normalizedSearch = search.toLowerCase();

      // Check for series matches
      Object.values(SERIES_MAPPING).forEach(seriesName => {
        const normalizedSeriesName = seriesName.toLowerCase();
        if (normalizedSeriesName.includes(normalizedSearch) || normalizedSearch.includes(normalizedSeriesName)) {
          orConditions.push(`series.ilike.%${seriesName}%`);
          const parts = seriesName.split(' ');
          if (parts.length > 1) {
            orConditions.push(`series.ilike.%${parts[parts.length - 1]}%`);
          }
        }
      });

      // Check for category matches
      CATEGORIES.forEach(catName => {
        const normalizedCatName = catName.toLowerCase();
        if (normalizedCatName.includes(normalizedSearch) || normalizedSearch.includes(normalizedCatName)) {
          orConditions.push(`category.ilike.%${catName}%`);
        }
      });

      query = query.or(Array.from(new Set(orConditions)).join(','));
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
