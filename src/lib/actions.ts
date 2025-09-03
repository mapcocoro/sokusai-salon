'use client'

import siteConfig from '@/src/config/site.config.json'

export function openBooking() {
  if (siteConfig.social?.bookingUrl) {
    window.open(siteConfig.social.bookingUrl, '_blank')
  } else if (siteConfig.contact?.tel) {
    window.location.href = `tel:${siteConfig.contact.tel}`
  }
}

export function openLINE() {
  if (siteConfig.social?.lineUrl) {
    window.open(siteConfig.social.lineUrl, '_blank')
  }
}

export function copyCode(code: string) {
  navigator.clipboard.writeText(code).then(() => {
    alert(`クーポンコード「${code}」をコピーしました！`)
  }).catch(() => {
    alert('クーポンコードのコピーに失敗しました')
  })
}