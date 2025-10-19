# Database Setup Guide / Інструкція з налаштування бази даних

## 🎯 Overview / Огляд

This project uses **Prisma ORM** with **PostgreSQL** for production and supports local development. The database connection is centralized using a singleton pattern for optimal performance.

Цей проект використовує **Prisma ORM** з **PostgreSQL** для продакшну та підтримує локальну розробку. З'єднання з базою даних централізоване за допомогою патерну singleton для оптимальної продуктивності.

---

## 📋 Quick Start / Швидкий старт

### For Local Development / Для локальної розробки

1. **Copy environment template / Скопіюйте шаблон середовища:**
   ```bash
   cp .env.example .env
   ```

2. **Update .env with your database URL / Оновіть .env вашим URL бази даних:**
   ```env
   POSTGRES_PRISMA_URL="postgresql://user:password@localhost:5432/mydb"
   POSTGRES_URL_NON_POOLING="postgresql://user:password@localhost:5432/mydb"
   ```

3. **Generate Prisma Client / Згенеруйте Prisma Client:**
   ```bash
   yarn db:generate
   ```

4. **Push schema to database / Відправте схему до бази даних:**
   ```bash
   yarn db:push
   ```

5. **Start development server / Запустіть сервер розробки:**
   ```bash
   yarn dev
   ```

---

## 🚀 Production Deployment (Vercel) / Продакшн деплой (Vercel)

### Step 1: Create PostgreSQL Database / Крок 1: Створіть PostgreSQL базу даних

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** → **Create Database**
3. Select **Postgres** (powered by Neon)
4. Configure:
   - **Database Name:** `medical-consultations` (or your preferred name)
   - **Region:** Select closest to your users
5. Click **Create**

**Ukrainian / Українською:**
1. Відкрийте [Vercel Dashboard](https://vercel.com/dashboard)
2. Перейдіть до **Storage** → **Create Database**
3. Оберіть **Postgres** (на базі Neon)
4. Налаштуйте:
   - **Назва бази:** `medical-consultations` (або інша назва)
   - **Регіон:** Оберіть найближчий до користувачів
5. Натисніть **Create**

### Step 2: Connect Database to Project / Крок 2: Підключіть базу до проекту

1. In your new database, go to **Settings** tab
2. Scroll to **Connected Projects**
3. Click **Connect Project**
4. Select your project (`prizma-beckend1-1810`)
5. Click **Connect**

**Ukrainian / Українською:**
1. У новій базі даних перейдіть на вкладку **Settings**
2. Прокрутіть до **Connected Projects**
3. Натисніть **Connect Project**
4. Оберіть свій проект (`prizma-beckend1-1810`)
5. Натисніть **Connect**

### Step 3: Verify Environment Variables / Крок 3: Перевірте змінні середовища

Vercel will automatically add these environment variables to your project:
- ✅ `POSTGRES_PRISMA_URL`
- ✅ `POSTGRES_URL_NON_POOLING`

**Vercel автоматично додасть ці змінні середовища до вашого проекту:**
- ✅ `POSTGRES_PRISMA_URL`
- ✅ `POSTGRES_URL_NON_POOLING`

### Step 4: Redeploy / Крок 4: Передеплойте

1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger deployment

**Ukrainian / Українською:**
1. Перейдіть на вкладку **Deployments**
2. Натисніть **Redeploy** на останньому деплої
3. Або зробіть новий коміт для запуску деплою

---

## 🔧 Database Architecture / Архітектура бази даних

### Centralized Connection / Централізоване з'єднання

The project uses a singleton pattern for database connections to prevent connection pool exhaustion:

```typescript
// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Usage in API Routes / Використання в API routes

```typescript
import { prisma } from '@/lib/db'

export async function GET() {
  const data = await prisma.consultation.findMany()
  return NextResponse.json(data)
}
```

---

## 📊 Database Schema / Схема бази даних

### Consultation Model / Модель Consultation

The main model stores medical consultation data:

```prisma
model Consultation {
  id                   Int      @id @default(autoincrement())
  name                 String
  age                  Int
  gender               String?
  phone                String?
  height               Float?
  weight               Float?
  bmi                  Float?
  complaints           String?
  examination_oglyad   Boolean  @default(false)
  examination_xray     Boolean  @default(false)
  examination_uzi      Boolean  @default(false)
  examination_kt       Boolean  @default(false)
  examination_mrt      Boolean  @default(false)
  has_chronic_diseases Boolean  @default(false)
  chronic_diseases     String?
  takes_medications    Boolean  @default(false)
  medications          String?
  pain_scale           Int?
  additional_comments  String?
  createdAt            DateTime @default(now())
}
```

---

## 🛠 Available Commands / Доступні команди

```bash
# Generate Prisma Client / Згенерувати Prisma Client
yarn db:generate

# Push schema to database / Відправити схему до бази даних
yarn db:push

# Open Prisma Studio (database GUI) / Відкрити Prisma Studio (GUI бази даних)
yarn db:studio

# Build with database setup / Збірка з налаштуванням бази даних
yarn build
```

---

## 🔍 Troubleshooting / Усунення проблем

### Problem: "Environment variable not found: POSTGRES_PRISMA_URL"
**Solution:**
1. Copy `.env.example` to `.env`
2. Fill in your database connection strings
3. Restart development server

**Рішення:**
1. Скопіюйте `.env.example` в `.env`
2. Заповніть рядки підключення до бази даних
3. Перезапустіть сервер розробки

### Problem: "Cannot reach database server"
**Solution:**
1. Check database is running
2. Verify connection string is correct
3. Check firewall/network settings
4. For Vercel: Ensure database is connected to project

**Рішення:**
1. Перевірте, що база даних запущена
2. Перевірте правильність рядка підключення
3. Перевірте налаштування фаєрволу/мережі
4. Для Vercel: Переконайтеся, що база підключена до проекту

### Problem: "Too many database connections"
**Solution:**
This should not happen with the centralized connection pattern. If it does:
1. Restart your development server
2. Check for multiple PrismaClient instances
3. Ensure you're importing from `@/lib/db`

**Рішення:**
Це не повинно траплятися з централізованим патерном підключення. Якщо траплається:
1. Перезапустіть сервер розробки
2. Перевірте наявність кількох екземплярів PrismaClient
3. Переконайтеся, що імпортуєте з `@/lib/db`

---

## 📚 Additional Resources / Додаткові ресурси

- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Next.js Database Guide](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Neon PostgreSQL](https://neon.tech/docs)

---

## 🔐 Security Best Practices / Найкращі практики безпеки

1. **Never commit `.env` files** / Ніколи не комітьте `.env` файли
2. **Use environment variables for credentials** / Використовуйте змінні середовища для облікових даних
3. **Rotate database passwords regularly** / Регулярно змінюйте паролі бази даних
4. **Use connection pooling** (handled by Prisma) / Використовуйте пул з'єднань (обробляється Prisma)
5. **Enable SSL for production databases** / Увімкніть SSL для продакшн баз даних

---

## ✅ Verification / Перевірка

To verify your database connection is working:

```bash
# Check Prisma can connect
yarn db:push

# View data in Prisma Studio
yarn db:studio

# Test API endpoint
curl http://localhost:3000/api/consultations
```

**Щоб перевірити, що підключення до бази даних працює:**

```bash
# Перевірте, що Prisma може підключитися
yarn db:push

# Переглянути дані в Prisma Studio
yarn db:studio

# Протестувати API endpoint
curl http://localhost:3000/api/consultations
```
