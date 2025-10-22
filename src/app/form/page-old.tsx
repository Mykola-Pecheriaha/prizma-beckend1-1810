'use client'
import { useState } from 'react'

// Загальні стилі для полів введення
const inputClassName =
  'w-full rounded border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-400'
const labelClassName =
  'mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'

export default function ConsultationForm() {
  const [form, setForm] = useState({
    // Пацієнт
    name: '',
    age: '',
    gender: '',
    phone: '',
    height: '', // ріст в см
    weight: '', // вага в кг

    // Скарги
    complaints: '',

    // Обстеження
    examination_oglyad: false,
    examination_analyses: false,
    examination_ekg: false,
    examination_xray: false,
    examination_uzi: false,
    examination_kt: false,
    examination_mrt: false,

    // Медична історія
    has_chronic_diseases: '',
    chronic_diseases: '',
    takes_medications: '',
    medications: '',
    pain_scale: '',
    has_allergies: '',
    allergies: '',

    // Коментарі
    additional_comments: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Функція для розрахунку ІМТ
  const calculateBMI = (height: string, weight: string): number | null => {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (h > 0 && w > 0) {
      // ІМТ = вага(кг) / ріст(м)²
      return w / ((h / 100) * (h / 100))
    }
    return null
  }

  // Функція для інтерпретації ІМТ
  const getBMICategory = (bmi: number): { text: string; color: string } => {
    if (bmi < 18.5)
      return {
        text: 'Недостатня вага',
        color: 'text-blue-600 dark:text-blue-400',
      }
    if (bmi < 25)
      return {
        text: 'Нормальна вага',
        color: 'text-green-600 dark:text-green-400',
      }
    if (bmi < 30)
      return {
        text: 'Надмірна вага',
        color: 'text-orange-600 dark:text-orange-400',
      }
    return { text: 'Ожиріння', color: 'text-red-600' }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setForm({ ...form, [name]: checked })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const resetForm = () => {
    setForm({
      name: '',
      age: '',
      gender: '',
      phone: '',
      height: '',
      weight: '',
      complaints: '',
      examination_oglyad: false,
      examination_analyses: false,
      examination_ekg: false,
      examination_xray: false,
      examination_uzi: false,
      examination_kt: false,
      examination_mrt: false,
      has_chronic_diseases: '',
      chronic_diseases: '',
      takes_medications: '',
      medications: '',
      pain_scale: '',
      has_allergies: '',
      allergies: '',
      additional_comments: '',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSuccess(true)
        resetForm()
      } else {
        console.error('Error submitting form')
      }
    } catch (error) {
      console.error('Network error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      {/* Заголовок форми */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-100">
          🩺 Медична консультація
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Заповніть форму для отримання медичної консультації
        </p>
      </div>

      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-900/30">
        <h2 className="mb-2 text-lg font-semibold text-blue-800 dark:text-blue-300">
          📋 Форма консультації
        </h2>
        <p className="text-blue-700 dark:text-blue-300">
          Будь ласка, заповніть всі необхідні поля. Поля позначені зірочкою (*)
          є обов&apos;язковими.
        </p>
      </div>

      {success && (
        <div className="mb-6 rounded border border-green-500 bg-green-50 p-4 text-green-700 dark:border-green-400 dark:bg-green-900/30 dark:text-green-300">
          ✅ Дані успішно збережені!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        {/* 👤 Пацієнт */}
        <section className="rounded-lg border border-gray-200 p-4 sm:p-6 dark:border-gray-700 dark:bg-gray-800/50">
          <h2 className="mb-4 text-lg font-semibold text-blue-600 sm:text-xl dark:text-blue-400">
            👤 Інформація про пацієнта
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 md:col-span-1">
              <label className={labelClassName}>Ім&apos;я *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Введіть повне ім'я"
                required
              />
            </div>

            <div>
              <label className={labelClassName}>Вік *</label>
              <input
                type="number"
                name="age"
                min="1"
                max="120"
                value={form.age}
                onChange={handleChange}
                className={inputClassName}
                placeholder="Введіть вік"
                required
              />
            </div>

            <div>
              <label className={labelClassName}>Стать</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="">Оберіть</option>
                <option value="male">Чоловік</option>
                <option value="female">Жінка</option>
              </select>
            </div>

            <div>
              <label className={labelClassName}>Телефон</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+380..."
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>Ріст (см)</label>
              <input
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
                min="50"
                max="250"
                placeholder="170"
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>Вага (кг)</label>
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                min="20"
                max="300"
                step="0.1"
                placeholder="70"
                className={inputClassName}
              />
            </div>
          </div>

          {/* ІМТ Калькулятор */}
          {form.height && form.weight && (
            <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
              <h3 className="mb-2 font-medium text-blue-800 dark:text-blue-300">
                📊 Індекс маси тіла (ІМТ)
              </h3>
              {(() => {
                const bmi = calculateBMI(form.height, form.weight)
                if (bmi) {
                  const category = getBMICategory(bmi)
                  return (
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-blue-900 dark:text-blue-200">
                        ІМТ: {bmi.toFixed(1)} кг/м²
                      </p>
                      <p className={`font-medium ${category.color}`}>
                        {category.text}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Розрахунок: {form.weight}кг ÷ ({form.height}см ÷ 100)² ={' '}
                        {bmi.toFixed(1)}
                      </p>
                    </div>
                  )
                }
                return null
              })()}
            </div>
          )}
        </section>

        {/* 📝 Скарги */}
        <section className="rounded-lg border border-gray-200 p-4 sm:p-6 dark:border-gray-700 dark:bg-gray-800/50">
          <h2 className="mb-4 text-xl font-semibold text-green-600 dark:text-green-400">
            📝 Скарги пацієнта
          </h2>

          <div>
            <label className={labelClassName}>Опишіть скарги</label>
            <textarea
              name="complaints"
              value={form.complaints}
              onChange={handleChange}
              rows={4}
              className={`${inputClassName} focus:border-green-500 dark:focus:border-green-400`}
              placeholder="Детально опишіть симптоми та скарги..."
            />
          </div>
        </section>

        {/* 🧪 Обстеження */}
        <section className="rounded-lg border border-gray-200 p-4 sm:p-6 dark:border-gray-700 dark:bg-gray-800/50">
          <h2 className="mb-4 text-xl font-semibold text-purple-600 dark:text-purple-400">
            🧪 Які маєте обстеження
          </h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {[
              { name: 'examination_oglyad', label: '👨‍⚕️ Огляд' },
              { name: 'examination_analyses', label: '🩸 Аналізи' },
              { name: 'examination_ekg', label: '💓 ЕКГ' },
              { name: 'examination_xray', label: '📷 Рентген' },
              { name: 'examination_uzi', label: '🔍 УЗД' },
              { name: 'examination_kt', label: '🏥 КТ' },
              { name: 'examination_mrt', label: '🧠 МРТ' },
            ].map((exam) => (
              <label
                key={exam.name}
                className="flex cursor-pointer items-center space-x-2 rounded-lg border border-purple-200 p-3 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/30"
              >
                <input
                  type="checkbox"
                  name={exam.name}
                  checked={form[exam.name as keyof typeof form] as boolean}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-purple-400"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {exam.label}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* 🩺 Медична історія */}
        <section className="rounded-lg border border-gray-200 p-4 sm:p-6 dark:border-gray-700 dark:bg-gray-800/50">
          <h2 className="mb-4 text-xl font-semibold text-orange-600 dark:text-orange-400">
            🩺 Медична історія
          </h2>

          <div className="space-y-4">
            {/* Хронічні хвороби */}
            <div>
              <label className={labelClassName}>Чи є хронічні хвороби?</label>
              <div className="mb-2 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="has_chronic_diseases"
                    value="yes"
                    checked={form.has_chronic_diseases === 'yes'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 dark:text-orange-400"
                  />
                  Так
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="has_chronic_diseases"
                    value="no"
                    checked={form.has_chronic_diseases === 'no'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 dark:text-orange-400"
                  />
                  Ні
                </label>
              </div>

              {form.has_chronic_diseases === 'yes' && (
                <input
                  type="text"
                  name="chronic_diseases"
                  value={form.chronic_diseases}
                  onChange={handleChange}
                  placeholder="Перерахуйте хронічні хвороби"
                  className={`${inputClassName} focus:border-orange-500 dark:focus:border-orange-400`}
                />
              )}
            </div>

            {/* Ліки */}
            <div>
              <label className={labelClassName}>
                Чи приймає ліки постійно?
              </label>
              <div className="mb-2 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="takes_medications"
                    value="yes"
                    checked={form.takes_medications === 'yes'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 dark:text-orange-400"
                  />
                  Так
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="takes_medications"
                    value="no"
                    checked={form.takes_medications === 'no'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 dark:text-orange-400"
                  />
                  Ні
                </label>
              </div>

              {form.takes_medications === 'yes' && (
                <input
                  type="text"
                  name="medications"
                  value={form.medications}
                  onChange={handleChange}
                  placeholder="Перерахуйте ліки та дозування"
                  className={`${inputClassName} focus:border-orange-500 dark:focus:border-orange-400`}
                />
              )}
            </div>

            {/* Шкала болю */}
            <div>
              <label className={labelClassName}>
                Рівень болю (0-10): {form.pain_scale || 0}
              </label>
              <input
                type="range"
                name="pain_scale"
                value={form.pain_scale || 0}
                onChange={handleChange}
                min="0"
                max="10"
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
              />
              <div className="mt-1 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Немає болю (0)</span>
                <span>Нестерпний біль (10)</span>
              </div>
            </div>

            {/* Алергія */}
            <div>
              <label className={labelClassName}>Алергія</label>
              <div className="mb-2 flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="has_allergies"
                    value="yes"
                    checked={form.has_allergies === 'yes'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 dark:text-orange-400"
                  />
                  Так
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="has_allergies"
                    value="no"
                    checked={form.has_allergies === 'no'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 dark:text-orange-400"
                  />
                  Ні
                </label>
              </div>

              {form.has_allergies === 'yes' && (
                <input
                  type="text"
                  name="allergies"
                  value={form.allergies}
                  onChange={handleChange}
                  placeholder="Перерахуйте алергії"
                  className={`${inputClassName} focus:border-orange-500 dark:focus:border-orange-400`}
                />
              )}
            </div>
          </div>
        </section>

        {/* 💬 Коментарі */}
        <section className="rounded-lg border border-gray-200 p-4 sm:p-6 dark:border-gray-700 dark:bg-gray-800/50">
          <h2 className="mb-4 text-xl font-semibold text-gray-600 dark:text-gray-400">
            💬 Додаткові коментарі
          </h2>

          <div>
            <label className={labelClassName}>Додаткові замітки</label>
            <textarea
              name="additional_comments"
              value={form.additional_comments}
              onChange={handleChange}
              rows={3}
              className={`${inputClassName} focus:border-gray-500 dark:focus:border-gray-400`}
              placeholder="Будь-які додаткові коментарі або спостереження..."
            />
          </div>
        </section>

        {/* Кнопка відправки */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {loading ? 'Збереження...' : 'Надіслати консультацію'}
          </button>
        </div>
      </form>
    </div>
  )
}
