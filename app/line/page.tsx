// app/line/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

// liff はブラウザ専用のため、動的 import にする
async function loadLiff() {
  const mod = await import("@line/liff");
  return mod.default;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function LineReservationPage() {
  // LIFF
  const [liffReady, setLiffReady] = useState(false);
  const [lineUserId, setLineUserId] = useState<string>("");
  const [lineDisplayName, setLineDisplayName] = useState<string>("");

  // フォーム
  const [displayName, setDisplayName] = useState("");
  const [menu, setMenu] = useState("カラー");
  const [reservedAtLocal, setReservedAtLocal] = useState<string>("");
  const [note, setNote] = useState("");

  // UI 状態
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const liffId = useMemo(
    () => process.env.NEXT_PUBLIC_LIFF_ID ?? "",
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const liff = await loadLiff();
        if (!liffId) {
          throw new Error("NEXT_PUBLIC_LIFF_ID が設定されていません。");
        }
        if (!liff.isInClient()) {
          // ブラウザ開の場合も init してOK
        }
        await liff.init({ liffId });

        if (!liff.isLoggedIn()) {
          liff.login(); // ログイン後、同URLに戻ってくる
          return;
        }

        // プロフィール取得
        const profile = await liff.getProfile();
        setLineUserId(profile.userId);
        setLineDisplayName(profile.displayName || "");
        // 任意：フォームのお名前初期値として使う
        setDisplayName(profile.displayName || "");

        // 予約日時の初期値（今から2時間後など適当に）
        const d = new Date();
        d.setHours(d.getHours() + 2);
        // datetime-local 用に「YYYY-MM-DDTHH:mm」形式
        const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
        setReservedAtLocal(local);

        setLiffReady(true);
      } catch (e) {
        setErrorMessage(
          `LIFF 初期化に失敗しました: ${String(e)}（LIFF IDの設定やログイン状態を確認してください）`
        );
      }
    })();
  }, [liffId]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("");

    try {
      // datetime-local の値はローカル時刻なので、ISOに正しく変換
      const reservedISO = new Date(reservedAtLocal).toISOString();

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineUserId,
          lineDisplayName,
          displayName,
          menu,
          reservedAt: reservedISO,
          note,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        setSubmitState("error");
        setErrorMessage(
          data?.detail?.message ??
            data?.message ??
            "予約の保存に失敗しました。しばらくしてからもう一度お試しください。"
        );
        return;
      }

      setSubmitState("success");
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(`送信エラー: ${String(err)}`);
    }
  };

  return (
    <main className="min-h-screen px-5 py-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">予約フォーム</h1>

        {!liffReady && (
          <p className="text-gray-600 mb-6">
            LINEログイン/初期化中です…
            {errorMessage && (
              <span className="block text-red-600 mt-2">{errorMessage}</span>
            )}
          </p>
        )}

        {liffReady && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              <div>LINE表示名：{lineDisplayName || "（取得できませんでした）"}</div>
              <div className="break-words">UserID：{lineUserId}</div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  お名前（任意・既定はLINE名）
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded border px-3 py-2"
                  placeholder="例）山田 花子"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">メニュー *</label>
                <select
                  value={menu}
                  onChange={(e) => setMenu(e.target.value)}
                  className="w-full rounded border px-3 py-2"
                  required
                >
                  <option>カラー</option>
                  <option>カット</option>
                  <option>パーマ</option>
                  <option>トリートメント</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  予約日時（必須）
                </label>
                <input
                  type="datetime-local"
                  value={reservedAtLocal}
                  onChange={(e) => setReservedAtLocal(e.target.value)}
                  className="w-full rounded border px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">メモ</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded border px-3 py-2"
                  rows={3}
                  placeholder="ご要望があればご記入ください"
                />
              </div>

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="w-full rounded bg-blue-600 text-white py-3 font-semibold disabled:opacity-60"
              >
                {submitState === "submitting" ? "送信中…" : "予約する"}
              </button>

              {submitState === "success" && (
                <p className="text-green-700">
                  予約を受け付けました。ご来店お待ちしております！
                </p>
              )}
              {submitState === "error" && (
                <p className="text-red-600">エラー：{errorMessage}</p>
              )}
            </form>
          </>
        )}
      </div>
    </main>
  );
}