# 🎯 ТОЧНИЙ СПОСІБ НАЛАШТУВАННЯ БАЗИ ДАНИХ

**УВАГА**: CLI має проблеми. Використовуйте Dashboard!

## ✅ КРОК 1: Відкрийте Dashboard

```
https://vercel.com/dashboard
```

## ✅ КРОК 2: Оберіть проект

- Знайдіть `prizma-beckend1-1810`
- Натисніть на нього

## ✅ КРОК 3: Створіть базу

1. Перейдіть на вкладку **Storage**
2. Натисніть **Create Database**
3. Оберіть **Postgres**
4. Введіть назву: `medical-consultations`
5. Оберіть регіон: **Washington D.C. (iad1)**
6. Натисніть **Create**

## ✅ КРОК 4: Підключіть до проекту

1. База автоматично підключиться
2. Натисніть **Connect Project**
3. Оберіть `prizma-beckend1-1810`
4. Натисніть **Connect**

## ✅ КРОК 5: Передеплойте

```bash
cd /home/artem/project/prizma-beckend1-1810
npx vercel deploy --prod
```

## 🎉 ГОТОВО!

- ✅ Форма: https://prizma-beckend1-1810.vercel.app/form
- ✅ Адмін: https://prizma-beckend1-1810.vercel.app/admin

---

**💡 АЛЬТЕРНАТИВНИЙ СПОСІБ ЧЕРЕЗ ОДИН КЛІК:**

Просто натисніть цю кнопку в Dashboard:
`Deploy` → `Redeploy` → з новою базою

База автоматично підключиться!
