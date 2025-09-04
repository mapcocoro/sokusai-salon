'use client'

import { useEffect, useState } from 'react'
import liff from '@line/liff'

type State = 'init' | 'ready' | 'error'

export default function LinePage() {
  const [state, setState] = useState<State>('init')
  const [name, setName] = useState<string>('')

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
        setName(profile.displayName)
        setState('ready')
      })
      .catch(() => setState('error'))
  }, [])

  if (state === 'error') {
    return <main className="p-8">LIFF の初期化に失敗しました。環境変数を確認してください。</main>
  }
  if (state !== 'ready') {
    return <main className="p-8">Loading…</main>
  }
  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-3">LINE ミニアプリ</h1>
      <p>こんにちは、{name} さん！</p>
    </main>
  )
}