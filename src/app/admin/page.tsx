import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
  examination_xray: boolean
  examination_uzi: boolean
  examination_kt: boolean
  examination_mrt: boolean
  has_chronic_diseases: boolean
  chronic_diseases: string | null
  takes_medications: boolean
  medications: string | null
  pain_scale: number | null
  additional_comments: string | null
  createdAt: Date
}

export default async function AdminPage() {
  let data: ConsultationItem[] = []
  let error: string | null = null

  try {
    data = await prisma.consultation.findMany({
    orderBy: { createdAt: 'desc' },
  })
  } catch (e) {
    console.error('Database connection error:', e)
    error = 'Не вдалося підключитися до бази даних. Перевірте налаштування PostgreSQL на Vercel.'
  }

  // Show error message if database connection failed
  if (error) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-red-600">Помилка підключення</h1>
          <p className="text-gray-600 mt-4">{error}</p>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800">Що робити:</h3>
            <ol className="mt-2 text-yellow-700 list-decimal list-inside space-y-1">
              <li>Створіть PostgreSQL базу даних у Vercel Dashboard</li>
              <li>Підключіть базу до проекту</li>
              <li>Перевірте Environment Variables</li>
              <li>Редеплойте проект</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Адмін-панель</h1>
        <p className="text-gray-600">Всього консультацій: {data.length}</p>
      </div>

      <div className="space-y-6">
        {data.map((item: ConsultationItem) => (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            {/* Заголовок */}
            <div className="mb-4 flex items-center justify-between border-b pb-2">
              <h3 className="text-lg font-semibold">
                Консультація #{item.id} - {item.name}
              </h3>
              <span className="text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleString('uk-UA')}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Пацієнт */}
              <div>
                <h4 className="mb-2 font-medium text-blue-600">👤 Пацієнт</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Імя:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Вік:</strong> {item.age} років
                  </p>
                  {item.gender && (
                    <p>
                      <strong>Стать:</strong>{' '}
                      {item.gender === 'male' ? 'Чоловік' : 'Жінка'}
                    </p>
                  )}
                  {item.phone && (
                    <p>
                      <strong>Телефон:</strong> {item.phone}
                    </p>
                  )}
                  {item.height && (
                    <p>
                      <strong>Ріст:</strong> {item.height} см
                    </p>
                  )}
                  {item.weight && (
                    <p>
                      <strong>Вага:</strong> {item.weight} кг
                    </p>
                  )}
                  {item.bmi && (
                    <p>
                      <strong>ІМТ:</strong> {item.bmi.toFixed(1)} кг/м²{' '}
                      <span
                        className={`font-medium ${
                          item.bmi < 18.5
                            ? 'text-blue-600'
                            : item.bmi < 25
                              ? 'text-green-600'
                              : item.bmi < 30
                                ? 'text-orange-600'
                                : 'text-red-600'
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
                <h4 className="mb-2 font-medium text-purple-600">
                  🧪 Обстеження
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.examination_oglyad && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs">
                      Огляд
                    </span>
                  )}
                  {item.examination_xray && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs">
                      Рентген
                    </span>
                  )}
                  {item.examination_uzi && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs">
                      УЗД
                    </span>
                  )}
                  {item.examination_kt && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs">
                      КТ
                    </span>
                  )}
                  {item.examination_mrt && (
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs">
                      МРТ
                    </span>
                  )}
                  {!item.examination_oglyad &&
                    !item.examination_xray &&
                    !item.examination_uzi &&
                    !item.examination_kt &&
                    !item.examination_mrt && (
                      <span className="text-xs text-gray-500">
                        Обстежень не проводилось
                      </span>
                    )}
                </div>
              </div>

              {/* Скарги */}
              {item.complaints && (
                <div className="lg:col-span-2">
                  <h4 className="mb-2 font-medium text-green-600">📝 Скарги</h4>
                  <p className="rounded bg-green-50 p-3 text-sm text-gray-700">
                    {item.complaints}
                  </p>
                </div>
              )}

              {/* Медична історія */}
              <div className="lg:col-span-2">
                <h4 className="mb-2 font-medium text-orange-600">
                  🩺 Медична історія
                </h4>
                <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                  <p>
                    <strong>Хронічні хвороби:</strong>{' '}
                    {item.has_chronic_diseases
                      ? item.chronic_diseases || 'Так (не вказано які)'
                      : 'Немає'}
                  </p>
                  <p>
                    <strong>Приймає ліки:</strong>{' '}
                    {item.takes_medications
                      ? item.medications || 'Так (не вказано які)'
                      : 'Немає'}
                  </p>
                  {item.pain_scale !== null && (
                    <p>
                      <strong>Рівень болю:</strong> {item.pain_scale}/10
                    </p>
                  )}
                </div>
              </div>

              {/* Коментарі */}
              {item.additional_comments && (
                <div className="lg:col-span-2">
                  <h4 className="mb-2 font-medium text-gray-600">
                    💬 Коментарі
                  </h4>
                  <p className="rounded bg-gray-50 p-3 text-sm text-gray-700">
                    {item.additional_comments}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-600">Консультацій поки що немає</p>
            <p className="mt-2 text-sm text-gray-500">
              Перейдіть на{' '}
              <a href="/form" className="text-blue-600 underline">
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
