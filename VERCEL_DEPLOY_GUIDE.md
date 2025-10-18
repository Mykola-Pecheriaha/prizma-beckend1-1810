# 🚀 Деплой на Vercel - Покроковий гайд

## 📋 **Підготовка до деплою**

✅ **Код готовий**: GitHub репозіторій налаштовано  
✅ **Build тестований**: `yarn build` працює  
✅ **Vercel config**: створено `vercel.json`  

---

## 🔗 **Крок 1: Авторизація на Vercel**

1. 🌐 **Перейдіть на**: https://vercel.com
2. 🔑 **Увійдіть через GitHub** (рекомендовано)
3. ✅ **Дозвольте доступ** до ваших репозиторіїв

---

## 📦 **Крок 2: Імпорт проекту**

### 🎯 **На Vercel Dashboard:**
1. 🔵 **Натисніть**: "Add New..." → "Project"
2. 🔍 **Знайдіть репозіторій**: `prizma-beckend1-1810`
3. 📁 **Натисніть**: "Import" біля назви репозіторію

### ⚙️ **Налаштування проекту:**
```
📋 Project Name: prizma-beckend1-1810
🏗️ Framework Preset: Next.js
📂 Root Directory: ./
🔨 Build Command: yarn build
📤 Output Directory: .next
💻 Install Command: yarn install
```

---

## 🛠️ **Крок 3: Environment Variables (Якщо потрібно)**

Якщо у вашому проекті є `.env` файли:

```env
# Приклад змінних (додайте у Vercel Dashboard)
DATABASE_URL=your_database_url
NEXT_PUBLIC_API_URL=your_api_url
```

### 📝 **Як додати в Vercel:**
1. ⚙️ У налаштуваннях проекту → "Environment Variables"
2. ➕ Додайте кожну змінну окремо
3. 🎯 Оберіть середовище: Production, Preview, Development

---

## 🚀 **Крок 4: Запуск деплою**

1. 🔵 **Натисніть**: "Deploy"
2. ⏳ **Очікуйте**: 2-3 хвилини збірки
3. ✅ **Готово**: отримаєте URL вашого сайту

---

## 🌐 **Очікуваний результат:**

### 📱 **Ваш сайт буде доступний за адресою:**
```
https://prizma-beckend1-1810-[hash].vercel.app
```

### 🎯 **Функціонал що працюватиме:**
✅ **Головна сторінка** (`/`)  
✅ **Форма консультації** (`/form`)  
✅ **Адмін панель** (`/admin`)  
✅ **API ендпоінти** (`/api/consultations`)  
✅ **База даних** (SQLite через Prisma)  

---

## 🔄 **Автоматичний деплой**

🎉 **Бонус**: Кожен push у GitHub автоматично оновлює сайт!

```bash
# Зробіть зміни в коді
git add .
git commit -m "feat: нова функція"
git push origin main

# Vercel автоматично перебудує та оновить сайт!
```

---

## 🛠️ **Корисні команди Vercel CLI (опціонально)**

```bash
# Встановити Vercel CLI
npm install -g vercel

# Деплой з командного рядка
vercel

# Деплой у production
vercel --prod

# Переглянути логи
vercel logs
```

---

## 🎯 **Що робити після деплою:**

1. 🔗 **Скопіюйте URL** вашого сайту
2. 📱 **Протестуйте** всі сторінки
3. 📊 **Перевірте** роботу форми та API
4. 🎉 **Поділіться** посиланням з командою!

---

## 📞 **Підтримка:**

Якщо виникають проблеми:
- 📚 **Vercel Docs**: https://vercel.com/docs
- 🐛 **Логи збірки**: у Vercel Dashboard
- 🔧 **GitHub Issues**: перевірте інтеграцію

**Успішного деплою! 🚀**