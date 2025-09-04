import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { z } from 'zod'

// Validate request schema
const reservationRequestSchema = z.object({
  name: z.string().min(1),
  phone: z.string().regex(/^[0-9]{10,11}$/),
  menu: z.string().min(1),
  reservedAt: z.string().min(1),
  memo: z.string().optional(),
  lineUserId: z.string().min(1),
  lineDisplayName: z.string().min(1)
})

// Initialize Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    
    // Validate request
    const validationResult = reservationRequestSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: '入力データが不正です', details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Initialize Supabase
    const supabase = getSupabaseClient()

    // Insert into database
    const { data: reservation, error } = await supabase
      .from('reservations')
      .insert({
        name: data.name,
        phone: data.phone,
        menu: data.menu,
        reserved_at: new Date(data.reservedAt).toISOString(),
        memo: data.memo || null,
        line_user_id: data.lineUserId,
        line_display_name: data.lineDisplayName
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      
      // Check if table doesn't exist
      if (error.code === '42P01') {
        return NextResponse.json(
          { error: 'データベーステーブルが存在しません。管理者にお問い合わせください。' },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { error: '予約の保存に失敗しました' },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json(
      { id: reservation.id },
      { status: 201 }
    )

  } catch (error) {
    console.error('API error:', error)
    
    if (error instanceof Error && error.message.includes('Missing Supabase')) {
      return NextResponse.json(
        { error: 'サーバー設定エラー: 環境変数が設定されていません' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}