'use client'

import { useEffect, useState } from 'react'
import liff from '@line/liff'
import { CreateReservationRequest, ApiResponse } from '@/app/types/reservation'

type State = 'init' | 'ready' | 'error'
type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface Profile {
  userId: string
  displayName: string
}

const MENU_OPTIONS = [
  'カット',
  'カット＋カラー',
  'カット＋パーマ',
  'カット＋トリートメント',
  'その他'
]

export default function LinePage() {
  const [state, setState] = useState<State>('init')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  const [menu, setMenu] = useState('')
  const [reservedAt, setReservedAt] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID
    if (!liffId) {
      setState('error')
      return
    }
    liff.init({ liffId, withLoginOnExternalBrowser: true })
      .then(async () => {
        if (!liff.isLoggedIn()) {
          liff.login()
          return
        }
        const liffProfile = await liff.getProfile()
        setProfile({
          userId: liffProfile.userId,
          displayName: liffProfile.displayName
        })
        setState('ready')
      })
      .catch(() => setState('error'))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!profile) return
    if (!menu || !reservedAt) {
      setErrorMessage('メニューと予約日時を選択してください')
      return
    }

    setFormState('submitting')
    setErrorMessage('')

    const requestData: CreateReservationRequest = {
      line_user_id: profile.userId,
      display_name: profile.displayName,
      menu,
      reserved_at: new Date(reservedAt).toISOString(),
      note: note || undefined
    }

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      })
      
      const result: ApiResponse = await response.json()
      
      if (result.success) {
        setFormState('success')
      } else {
        setFormState('error')
        setErrorMessage(result.error || '予約に失敗しました')
      }
    } catch {
      setFormState('error')
      setErrorMessage('ネットワークエラーが発生しました。もう一度お試しください。')
    }
  }

  const resetForm = () => {
    setFormState('idle')
    setMenu('')
    setReservedAt('')
    setNote('')
    setErrorMessage('')
  }

  if (state === 'error') {
    return <main className="p-8">LIFF の初期化に失敗しました。環境変数を確認してください。</main>
  }
  if (state !== 'ready' || !profile) {
    return <main className="p-8">Loading…</main>
  }

  if (formState === 'success') {
    return (
      <main className="p-8 max-w-md mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h2 className="text-xl font-bold mb-2">予約が完了しました</h2>
          <p className="text-gray-600 mb-4">{profile.displayName} 様の予約を承りました。</p>
          <p className="text-sm text-gray-500 mb-6">
            予約日時: {new Date(reservedAt).toLocaleString('ja-JP')}
          </p>
          <button
            onClick={resetForm}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            新規予約を作成
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">予約フォーム</h1>
      <p className="text-gray-600 mb-6">こんにちは、{profile.displayName} さん</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="menu" className="block text-sm font-medium mb-2">
            メニュー <span className="text-red-500">*</span>
          </label>
          <select
            id="menu"
            value={menu}
            onChange={(e) => setMenu(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={formState === 'submitting'}
          >
            <option value="">選択してください</option>
            {MENU_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="reserved_at" className="block text-sm font-medium mb-2">
            来店日時 <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            id="reserved_at"
            value={reservedAt}
            onChange={(e) => setReservedAt(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={formState === 'submitting'}
          />
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-medium mb-2">
            備考
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="ご要望などがあればご記入ください"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={formState === 'submitting'}
          />
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={formState === 'submitting'}
          className={`w-full py-3 rounded-lg font-medium transition ${
            formState === 'submitting'
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {formState === 'submitting' ? '送信中...' : '予約する'}
        </button>

        {formState === 'error' && (
          <button
            type="button"
            onClick={resetForm}
            className="w-full py-2 text-gray-600 hover:text-gray-800 transition"
          >
            フォームをリセット
          </button>
        )}
      </form>
    </main>
  )
}