# 🚨 ЕКСТРЕНЕ ВИПРАВЛЕННЯ - DATABASE_URL не знайдена

## ❌ **Помилка:**

```
помилка: Змінна середовища не знайдена: DATABASE_URL
```

## ⚡ **ШВИДКЕ РІШЕННЯ:**

### **1. На Vercel Dashboard:**

1. 🌐 **Перейдіть**: Project Settings → Environment Variables
2. ➕ **Додайте**:
   - **Name**: `DATABASE_URL`
   - **Value**: `file:./dev.db`
   - **Environments**: ✅ Production ✅ Preview ✅ Development

### **2. Після додавання змінної:**

- **Clear Build Cache**
- **Re-deploy** без кешу

---

## 🛠️ **ЯКЩО НЕ ДОПОМАГАЄ - Альтернативні рішення:**

### **Варіант A: Хардкодена схема**

```bash
# На вашому комп'ютері:
cp prisma/schema-emergency.prisma prisma/schema.prisma
git add . && git commit -m "fix: use hardcoded database URL for Vercel"
git push origin main
```

### **Варіант B: Recreate проект на Vercel**

1. **Delete проект** на Vercel
2. **Import заново** з GitHub
3. **Додайте змінну** `DATABASE_URL = file:./dev.db` ОДРАЗУ при створенні

### **Варіант C: PostgreSQL (найнадійніше)**

1. **Vercel Dashboard** → **Storage** → **Create Database** → **Postgres**
2. **Copy Environment Variables** з бази в проект
3. **Оновіть schema.prisma**:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

---

## 📝 **ОНОВЛЕНІ ФАЙЛИ:**

✅ **package.json** - додано fallback в vercel-build  
✅ **vercel.json** - додано env з DATABASE_URL  
✅ **.env.production** - production змінні  
✅ **schema-emergency.prisma** - резервна схема

---

## 🎯 **РЕКОМЕНДАЦІЯ:**

**Спробуйте спочатку додати змінну на Vercel. Якщо не допоможе через 10 хвилин - використайте Варіант C (PostgreSQL).**

**PostgreSQL - найнадійніше рішення для production! 🚀**
