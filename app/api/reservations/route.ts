// app/api/reservations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type ReservationInput = {
  lineUserId: string;
  lineDisplayName?: string;
  displayName?: string; // 任意: 手入力したお名前（使わないなら未設定でOK）
  menu: string;
  reservedAt: string; // ISO文字列
  note?: string;
};

// ────────────────────────────────────────────────
// Supabase（サービスロール）
// 実行は「サーバーのみ」。クライアントにキーは渡らない。
// ────────────────────────────────────────────────
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function getSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase environment variables are not configured");
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

export async function POST(req: NextRequest) {
  try {
    // Supabase 環境変数チェック
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { ok: false, message: "Server configuration error: Supabase not configured" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as Partial<ReservationInput>;

    // 必須チェック
    if (!body?.lineUserId) {
      return NextResponse.json(
        { ok: false, message: "lineUserId is required" },
        { status: 400 }
      );
    }
    if (!body?.menu) {
      return NextResponse.json(
        { ok: false, message: "menu is required" },
        { status: 400 }
      );
    }
    if (!body?.reservedAt) {
      return NextResponse.json(
        { ok: false, message: "reservedAt is required" },
        { status: 400 }
      );
    }

    // 日時はISOで保存（DBは timestamptz）
    const reservedAtISO = new Date(body.reservedAt).toISOString();

    // DBへ insert
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("reservations").insert({
      line_user_id: body.lineUserId,
      line_display_name: body.lineDisplayName ?? null,
      display_name: body.displayName ?? null,
      menu: body.menu,
      reserved_at: reservedAtISO,
      note: body.note ?? null,
    });

    if (error) {
      // スキーマ未反映などのときに原因が分かるように詳細を返す
      return NextResponse.json(
        { ok: false, message: "Supabase insert error", detail: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, message: "Invalid request", detail: String(e) },
      { status: 400 }
    );
  }
}