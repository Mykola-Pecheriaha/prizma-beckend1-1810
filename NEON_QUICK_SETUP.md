# ⚡ ШВИДКЕ ПІДКЛЮЧЕННЯ Neon до Vercel

## 🎯 **Мета:** Підключити Neon PostgreSQL до prizma-beckend1-1810.vercel.app

---

## 📋 **ЧЕК-ЛИСТ (10 хвилин):**

### ☐ **1. Отримати connection string з Neon**

- Neon Dashboard → ваша база → Connection Details
- Скопіювати `postgresql://...` рядок

### ☐ **2. Додати змінні на Vercel**

- Vercel → prizma-beckend1-1810 → Settings → Environment Variables
- Додати 3 змінні (див. нижче)

### ☐ **3. Редеплой**

- Deployments → Redeploy (без кешу)

### ☐ **4. Тест**

- Форма: зберегти дані
- Адмін: переглянути результат

---

## 🔧 **ЗМІННІ ДЛЯ VERCEL:**

```
POSTGRES_PRISMA_URL
[ваш-neon-url]?sslmode=require&pgbouncer=true&connect_timeout=15

POSTGRES_URL_NON_POOLING
[ваш-neon-url]?sslmode=require

DATABASE_URL
[ваш-neon-url]?sslmode=require
```

**Замініть `[ваш-neon-url]` на реальний connection string з Neon**

---

## ✅ **ПЕРЕВІРКА УСПІХУ:**

1. **Форма працює**: `/form` → заповнити → зберегти ✓
2. **Дані показуються**: `/admin` → консультації видимі ✓
3. **API відповідає**: `/api/consultations` → JSON дані ✓

**Якщо всі 3 пункти працюють = Neon підключено! 🎉**

---

## 🌐 **ВАШІ ПОСИЛАННЯ:**

- **Сайт**: https://prizma-beckend1-1810.vercel.app
- **Форма**: https://prizma-beckend1-1810.vercel.app/form
- **Адмін**: https://prizma-beckend1-1810.vercel.app/admin
- **API**: https://prizma-beckend1-1810.vercel.app/api/consultations

**Почніть підключення зараз! 🚀**
