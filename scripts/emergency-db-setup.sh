#!/bin/bash
# Emergency database setup script for Vercel

echo "🚨 ЕКСТРЕНИЙ SETUP БАЗИ ДАНИХ"
echo "================================="

# Check if schema exists
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Schema файл не знайдено!"
    exit 1
fi

echo "📋 Поточна схема:"
head -15 prisma/schema.prisma

echo ""
echo "🔧 Генерування Prisma клієнта..."
npx prisma generate

echo ""
echo "✅ Готово! Тепер:"
echo "1. Створіть Postgres базу на Vercel"
echo "2. Підключіть до проекту prizma-beckend1-1810"
echo "3. Редеплойте без кешу"
echo ""
echo "🌐 Ваш сайт: https://prizma-beckend1-1810.vercel.app"
echo "📋 Детальні інструкції: GUARANTEED_DATABASE_SETUP.md"