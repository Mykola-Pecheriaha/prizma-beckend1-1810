# � ШВИДКЕ ВИПРАВЛЕННЯ для Vercel

## ❌ **Помилка що виникає:**

```
Помилка: Змінна середовища не знайдена: POSTGRES_URL_NON_POOLING
```

## ✅ **ШВИДКЕ РІШЕННЯ:**

### 🎯 **Крок 1: Додайте змінну на Vercel**

1. **Перейдіть**: Vercel Dashboard → ваш проект
2. **Відкрийте**: Settings → Environment Variables
3. **Додайте нову змінну**:
   - **Name**: `DATABASE_URL`
   - **Value**: `file:./dev.db`
   - **Environments**: ✅ Production ✅ Preview ✅ Development

### 🔄 **Крок 2: Очистіть кеш та передеплойте**

1. **Settings** → **Functions** → **Clear All Cache**
2. **Deployments** → найостанніший деплой → **Re-deploy**

### ⚡ **Крок 3: Якщо не допомогло**

Видаліть проект на Vercel та створіть заново:

1. **Settings** → **General** → **Delete Project**
2. **Dashboard** → **Add New** → **Import** ваш GitHub репозіторій
3. **Deploy** з правильними змінними

---

## � **Альтернативне рішення - використати PostgreSQL:**

### 1. **Створіть Vercel Postgres:**

- Dashboard → Storage → Create Database → Postgres

### 2. **Оновіть схему на PostgreSQL:**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

### 3. **Запустіть міграцію:**

```bash
npx prisma db push
```

---

## 🎯 **Найпростіше рішення - SQLite:**

**Просто додайте `DATABASE_URL = file:./dev.db` в Environment Variables на Vercel!**

**Має працювати за 2-3 хвилини! ⚡**
