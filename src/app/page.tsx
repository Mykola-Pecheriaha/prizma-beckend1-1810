'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [showShortcuts, setShowShortcuts] = useState(false)

  return (
    <div className="min-h-screen p-8">
      <main className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Система Консультацій</h1>

          {/* Кнопка для показу клавіатурних скорочень */}
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="rounded bg-gray-100 px-3 py-2 text-sm text-gray-600 hover:bg-gray-200"
            title="Показати клавіатурні скорочення"
          >
            ⌨️ Hotkeys
          </button>
        </div>

        {/* Панель з клавіатурними скороченнями */}
        {showShortcuts && (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-800">
              🔥 Клавіатурні скорочення:
            </h3>
            <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
              <div className="flex items-center space-x-2">
                <kbd className="rounded bg-white px-2 py-1 font-mono text-xs shadow">
                  Ctrl+Shift+A
                </kbd>
                <span>Адмін-панель</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="rounded bg-white px-2 py-1 font-mono text-xs shadow">
                  Ctrl+Shift+F
                </kbd>
                <span>Форма</span>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="rounded bg-white px-2 py-1 font-mono text-xs shadow">
                  Ctrl+Shift+H
                </kbd>
                <span>Головна</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link
            href="/form"
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-blue-600">
              Заповнити форму
            </h2>
            <p className="text-gray-600">Створити нову консультацію</p>
          </Link>

          <Link
            href="/admin"
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-green-600">
              Адмін панель
            </h2>
            <p className="text-gray-600">Переглянути всі відповіді</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
