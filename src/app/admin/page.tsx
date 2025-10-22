'use client'

import { useState, useEffect } from 'react'

interface ConsultationItem {
  id: number
  name: string
  age: number
  gender: string | null
  phone: string | null
  height: number | null
  weight: number | null
  bmi: number | null
  complaints: string | null
  examination_oglyad: boolean
  examination_analyses: boolean
  examination_ekg: boolean
  examination_xray: boolean
  examination_uzi: boolean
  examination_kt: boolean
  examination_mrt: boolean
  has_chronic_diseases: boolean
  chronic_diseases: string | null
  takes_medications: boolean
  medications: string | null
  pain_scale: number | null
  has_allergies: boolean
  allergies: string | null
  additional_comments: string | null
  createdAt: string
}

export default function AdminPage() {
  const [data, setData] = useState<ConsultationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/consultations', {
        cache: 'no-cache',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const consultations = await response.json()
      setData(consultations)
      setError(null)
    } catch (e) {
      console.error('Error fetching consultations:', e)
      setError('Не вдалося завантажити дані. Перевірте підключення до бази.')
    } finally {
      setLoading(false)
    }
  }

  const deleteConsultation = async (id: number, patientName: string) => {
    if (
      !confirm(
        `Ви впевнені, що хочете видалити консультацію пацієнта "${patientName}"?\n\nЦю дію неможливо скасувати.`
      )
    ) {
      return
    }

    try {
      setDeletingId(id)
      const response = await fetch(`/api/consultations/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete consultation')
      }

      // Оновлюємо список без перезавантаження
      setData((prevData) => prevData.filter((item) => item.id !== id))
    } catch (e) {
      console.error('Error deleting consultation:', e)
      alert('Помилка при видаленні консультації. Спробуйте ще раз.')
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
            Адмін-панель
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Завантаження...
          </p>
        </div>
        <div className="flex h-64 items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      </div>
    )
  }

  // Show error message if database connection failed
  if (error) {
    return (
      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-red-600 sm:text-3xl dark:text-red-400">
            Помилка підключення
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{error}</p>
          <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/30">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-400">
              Що робити:
            </h3>
            <ol className="mt-2 list-inside list-decimal space-y-1 text-yellow-700 dark:text-yellow-300">
              <li>Перевірте підключення до інтернету</li>
              <li>Оновіть сторінку (F5)</li>
              <li>Зверніться до адміністратора</li>
            </ol>
            <button
              onClick={fetchData}
              className="mt-4 rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600"
            >
              Спробувати знову
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
            Адмін-панель
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Всього консультацій: {data.length}
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {loading ? '⏳ Завантаження...' : '🔄 Оновити'}
        </button>
      </div>

      <div className="space-y-6">
        {data.map((item: ConsultationItem) => (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-gray-800"
          >
            {/* Заголовок */}
            <div className="mb-4 flex flex-col gap-2 border-b border-gray-200 pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 dark:border-gray-700">
              <div className="flex flex-col gap-1 sm:gap-0">
                <h3 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-gray-100">
                  Консультація #{item.id} - {item.name}
                </h3>
                <span className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                  {new Date(item.createdAt).toLocaleString('uk-UA')}
                </span>
              </div>
              <button
                onClick={() => deleteConsultation(item.id, item.name)}
                disabled={deletingId === item.id}
                className="flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-xs text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-2 sm:text-sm dark:bg-red-500 dark:hover:bg-red-600"
                title="Видалити консультацію"
              >
                {deletingId === item.id ? (
                  <>
                    <div className="h-3 w-3 animate-spin rounded-full border border-white border-t-transparent sm:h-4 sm:w-4"></div>
                    <span className="hidden sm:inline">Видалення...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">🗑️</span>
                    <span className="hidden sm:inline">Видалити</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
              {/* Пацієнт */}
              <div>
                <h4 className="mb-2 font-medium text-blue-600 dark:text-blue-400">
                  👤 Пацієнт
                </h4>
                <div className="space-y-1 text-sm text-gray-800 dark:text-gray-200">
                  <p>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Імя:
                    </strong>{' '}
                    {item.name}
                  </p>
                  <p>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Вік:
                    </strong>{' '}
                    {item.age} років
                  </p>
                  {item.gender && (
                    <p>
                      <strong className="text-gray-900 dark:text-gray-100">
                        Стать:
                      </strong>{' '}
                      {item.gender === 'male' ? 'Чоловік' : 'Жінка'}
                    </p>
                  )}
                  {item.phone && (
                    <p>
                      <strong className="text-gray-900 dark:text-gray-100">
                        Телефон:
                      </strong>{' '}
                      {item.phone}
                    </p>
                  )}
                  {item.height && (
                    <p>
                      <strong className="text-gray-900 dark:text-gray-100">
                        Ріст:
                      </strong>{' '}
                      {item.height} см
                    </p>
                  )}
                  {item.weight && (
                    <p>
                      <strong className="text-gray-900 dark:text-gray-100">
                        Вага:
                      </strong>{' '}
                      {item.weight} кг
                    </p>
                  )}
                  {item.bmi && (
                    <p>
                      <strong className="text-gray-900 dark:text-gray-100">
                        ІМТ:
                      </strong>{' '}
                      {item.bmi.toFixed(1)} кг/м²{' '}
                      <span
                        className={`font-medium ${
                          item.bmi < 18.5
                            ? 'text-blue-600 dark:text-blue-400'
                            : item.bmi < 25
                              ? 'text-green-600 dark:text-green-400'
                              : item.bmi < 30
                                ? 'text-orange-600 dark:text-orange-400'
                                : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        (
                        {item.bmi < 18.5
                          ? 'Недостатня вага'
                          : item.bmi < 25
                            ? 'Норма'
                            : item.bmi < 30
                              ? 'Надмірна вага'
                              : 'Ожиріння'}
                        )
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Обстеження */}
              <div>
                <h4 className="mb-2 font-medium text-purple-600 dark:text-purple-400">
                  🧪 Обстеження
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.examination_oglyad && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-800 dark:text-purple-200">
                      👨‍⚕️ Огляд
                    </span>
                  )}
                  {item.examination_analyses && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-800 dark:text-purple-200">
                      🩸 Аналізи
                    </span>
                  )}
                  {item.examination_ekg && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-800 dark:text-purple-200">
                      💓 ЕКГ
                    </span>
                  )}
                  {item.examination_xray && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-800 dark:text-purple-200">
                      📷 Рентген
                    </span>
                  )}
                  {item.examination_uzi && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-800 dark:text-purple-200">
                      🔍 УЗД
                    </span>
                  )}
                  {item.examination_kt && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-800 dark:text-purple-200">
                      🏥 КТ
                    </span>
                  )}
                  {item.examination_mrt && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-800 dark:text-purple-200">
                      🧠 МРТ
                    </span>
                  )}
                  {!item.examination_oglyad &&
                    !item.examination_analyses &&
                    !item.examination_ekg &&
                    !item.examination_xray &&
                    !item.examination_uzi &&
                    !item.examination_kt &&
                    !item.examination_mrt && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Обстежень не проводилось
                      </span>
                    )}
                </div>
              </div>

              {/* Скарги */}
              {item.complaints && (
                <div className="lg:col-span-2">
                  <h4 className="mb-2 font-medium text-green-600 dark:text-green-400">
                    📝 Скарги
                  </h4>
                  <p className="rounded bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    {item.complaints}
                  </p>
                </div>
              )}

              {/* Медична історія */}
              <div className="lg:col-span-2">
                <h4 className="mb-2 font-medium text-orange-600 dark:text-orange-400">
                  🩺 Медична історія
                </h4>
                <div className="grid grid-cols-1 gap-2 text-sm text-gray-800 sm:grid-cols-2 lg:grid-cols-3 dark:text-gray-200">
                  <p>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Хронічні хвороби:
                    </strong>{' '}
                    {item.has_chronic_diseases
                      ? item.chronic_diseases || 'Так (не вказано які)'
                      : 'Немає'}
                  </p>
                  <p>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Приймає ліки:
                    </strong>{' '}
                    {item.takes_medications
                      ? item.medications || 'Так (не вказано які)'
                      : 'Немає'}
                  </p>
                  <p>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Алергії:
                    </strong>{' '}
                    {item.has_allergies
                      ? item.allergies || 'Так (не вказано які)'
                      : 'Немає'}
                  </p>
                  {item.pain_scale !== null && (
                    <p className="sm:col-span-2 lg:col-span-1">
                      <strong className="text-gray-900 dark:text-gray-100">
                        Рівень болю:
                      </strong>{' '}
                      <span
                        className={`font-medium ${
                          item.pain_scale === 0
                            ? 'text-green-600 dark:text-green-400'
                            : item.pain_scale <= 3
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : item.pain_scale <= 6
                                ? 'text-orange-600 dark:text-orange-400'
                                : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {item.pain_scale}/10
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Коментарі */}
              {item.additional_comments && (
                <div className="lg:col-span-2">
                  <h4 className="mb-2 font-medium text-gray-600 dark:text-gray-400">
                    💬 Коментарі
                  </h4>
                  <p className="rounded bg-gray-50 p-3 text-sm text-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
                    {item.additional_comments}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center sm:p-8 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              Консультацій поки що немає
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Перейдіть на{' '}
              <a
                href="/form"
                className="text-blue-600 underline dark:text-blue-400"
              >
                сторінку форми
              </a>{' '}
              щоб створити першу консультацію
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
