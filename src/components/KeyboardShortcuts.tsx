'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function KeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Shift+A для адмін-панелі
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault()
        router.push('/admin')
        return
      }

      // Ctrl+Shift+F для форми
      if (event.ctrlKey && event.shiftKey && event.key === 'F') {
        event.preventDefault()
        router.push('/form')
        return
      }

      // Ctrl+Shift+H для головної сторінки
      if (event.ctrlKey && event.shiftKey && event.key === 'H') {
        event.preventDefault()
        router.push('/')
        return
      }
    }

    // Додаємо слухач події
    document.addEventListener('keydown', handleKeyDown)

    // Очищуємо слухач при демонтуванні компонента
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [router])

  return null // Компонент нічого не рендерить
}
