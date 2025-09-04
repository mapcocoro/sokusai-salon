import { NextRequest, NextResponse } from 'next/server'
import { supabase, createReservationsTableIfNotExists } from '@/app/lib/supabase'
import { CreateReservationRequest, ApiResponse, Reservation } from '@/app/types/reservation'

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'データベース接続が設定されていません'
      }, { status: 500 })
    }

    const body: CreateReservationRequest = await request.json()

    if (!body.menu || !body.reserved_at) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'メニューと予約日時は必須項目です'
      }, { status: 400 })
    }

    if (!body.line_user_id || !body.display_name) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'LINEユーザー情報が取得できませんでした'
      }, { status: 400 })
    }

    await createReservationsTableIfNotExists()

    const { data, error } = await supabase
      .from('reservations')
      .insert([{
        line_user_id: body.line_user_id,
        display_name: body.display_name,
        menu: body.menu,
        reserved_at: body.reserved_at,
        note: body.note || null
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json<ApiResponse>({
        success: false,
        error: '予約の登録に失敗しました。もう一度お試しください。'
      }, { status: 500 })
    }

    return NextResponse.json<ApiResponse<Reservation>>({
      success: true,
      data
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json<ApiResponse>({
      success: false,
      error: 'サーバーエラーが発生しました'
    }, { status: 500 })
  }
}