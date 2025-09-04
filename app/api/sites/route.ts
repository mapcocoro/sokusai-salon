import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(request: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const body = await request.json()
    const { slug, domain, brand, tagline, phone, address } = body

    // Validation
    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 })
    }

    // Check for duplicate slug
    const { data: existingSite } = await supabaseAdmin
      .from('sites')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existingSite) {
      return NextResponse.json({ error: 'slug already exists' }, { status: 400 })
    }

    // Insert new site
    const { data, error } = await supabaseAdmin
      .from('sites')
      .insert({
        slug,
        domain: domain || null,
        brand: brand || null,
        tagline: tagline || null,
        phone: phone || null,
        address: address || null
      })
      .select('id')
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ id: data.id }, { status: 201 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}