'use client'

import { useEffect, useState } from 'react'
import liff from '@line/liff'
import { z } from 'zod'

type State = 'init' | 'ready' | 'error'
type FormState = 'idle' | 'submitting' | 'success' | 'error'

const reservationSchema = z.object({
  name: z.string().min(1, 'お名前は必須です'),
  phone: z.string().regex(/^[0-9]{10,11}$/, '電話番号は10-11桁の数字で入力してください'),
  menu: z.string().min(1, 'メニューを選択してください'),
  reservedAt: z.string().min(1, '予約日時は必須です'),
  memo: z.string().optional()
})

const MENU_OPTIONS = [
  { value: '', label: '選択してください' },
  { value: 'カット', label: 'カット' },
  { value: 'カラー', label: 'カラー' },
  { value: 'パーマ', label: 'パーマ' },
  { value: 'トリートメント', label: 'トリートメント' },
  { value: 'カット＋カラー', label: 'カット＋カラー' },
  { value: 'その他', label: 'その他' }
]

export default function LinePage() {
  const [state, setState] = useState<State>('init')
  const [formState, setFormState] = useState<FormState>('idle')
  const [lineUserId, setLineUserId] = useState<string>('')
  const [lineDisplayName, setLineDisplayName] = useState<string>('')
  
  // Form fields
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [menu, setMenu] = useState<string>('')
  const [reservedAt, setReservedAt] = useState<string>('')
  const [memo, setMemo] = useState<string>('')
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitMessage, setSubmitMessage] = useState<string>('')

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
        const profile = await liff.getProfile()
        setLineUserId(profile.userId)
        setLineDisplayName(profile.displayName)
        setName(profile.displayName) // Set initial name value
        setState('ready')
      })
      .catch(() => setState('error'))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSubmitMessage('')

    // Validate form
    const formData = {
      name,
      phone,
      menu,
      reservedAt,
      memo
    }

    const result = reservationSchema.safeParse(formData)
    if (!result.success) {
      const newErrors: Record<string, string> = {}
      result.error.issues.forEach(err => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message
        }
      })
      setErrors(newErrors)
      return
    }

    // Submit form
    setFormState('submitting')
    
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...result.data,
          lineUserId,
          lineDisplayName
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || '予約の送信に失敗しました')
      }

      setFormState('success')
      setSubmitMessage('予約が完了しました！')
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState('idle')
        setSubmitMessage('')
        setPhone('')
        setMenu('')
        setReservedAt('')
        setMemo('')
      }, 3000)
    } catch (error) {
      setFormState('error')
      setSubmitMessage(error instanceof Error ? error.message : '予約の送信に失敗しました')
      setTimeout(() => {
        setFormState('idle')
      }, 3000)
    }
  }

  // Get minimum datetime (current time + 1 hour)
  const getMinDateTime = () => {
    const now = new Date()
    now.setHours(now.getHours() + 1)
    return now.toISOString().slice(0, 16)
  }

  if (state === 'error') {
    return <main className="p-8">LIFF の初期化に失敗しました。環境変数を確認してください。</main>
  }
  
  if (state !== 'ready') {
    return <main className="p-8">Loading…</main>
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">予約フォーム</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={formState === 'submitting'}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            電話番号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="09012345678"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={formState === 'submitting'}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Menu */}
        <div>
          <label htmlFor="menu" className="block text-sm font-medium text-gray-700 mb-1">
            メニュー <span className="text-red-500">*</span>
          </label>
          <select
            id="menu"
            value={menu}
            onChange={(e) => setMenu(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.menu ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={formState === 'submitting'}
          >
            {MENU_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.menu && <p className="text-red-500 text-sm mt-1">{errors.menu}</p>}
        </div>

        {/* Reserved At */}
        <div>
          <label htmlFor="reservedAt" className="block text-sm font-medium text-gray-700 mb-1">
            予約日時 <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            id="reservedAt"
            value={reservedAt}
            onChange={(e) => setReservedAt(e.target.value)}
            min={getMinDateTime()}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.reservedAt ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={formState === 'submitting'}
          />
          {errors.reservedAt && <p className="text-red-500 text-sm mt-1">{errors.reservedAt}</p>}
        </div>

        {/* Memo */}
        <div>
          <label htmlFor="memo" className="block text-sm font-medium text-gray-700 mb-1">
            メモ
          </label>
          <textarea
            id="memo"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={formState === 'submitting'}
            placeholder="ご要望などあればご記入ください"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={formState === 'submitting' || formState === 'success'}
          className={`w-full py-2 px-4 rounded-md font-medium text-white transition-colors ${
            formState === 'submitting' || formState === 'success'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {formState === 'submitting' ? '送信中...' : '予約する'}
        </button>

        {/* Messages */}
        {submitMessage && (
          <div className={`p-3 rounded-md text-center ${
            formState === 'success' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {submitMessage}
          </div>
        )}
      </form>
    </main>
  )
}