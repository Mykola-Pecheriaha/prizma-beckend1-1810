#!/bin/bash
# ПРОСТИЙ СКРИПТ НАЛАШТУВАННЯ - VERSIJA 2.0

echo "🎯 АВТОМАТИЧНЕ НАЛАШТУВАННЯ - VERCEL + DATABASE"
echo "==============================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Step 1: Update Vercel CLI
echo -e "${YELLOW}📦 Оновлюю Vercel CLI до останньої версії...${NC}"
yarn add vercel@latest

# Step 2: Login to Vercel
echo -e "${BLUE}🔐 Авторизація в Vercel...${NC}"
npx vercel login

# Step 3: Link project
echo -e "${BLUE}🔗 Підключаю проект...${NC}"
npx vercel link

# Step 4: Create database
echo -e "${BLUE}🗃️ Створюю PostgreSQL базу...${NC}"
echo "Вам потрібно буде вибрати:"
echo "1. Team: mykola-pecheriaha"
echo "2. Database name: medical-consultations"
echo "3. Region: Washington D.C., USA (iad1)"

npx vercel storage create postgres

# Step 5: Connect database
echo -e "${BLUE}⚡ Підключаю базу до проекту...${NC}"
npx vercel env pull .env.local

# Step 6: Deploy
echo -e "${BLUE}🚀 Деплою з базою даних...${NC}"
npx vercel deploy --prod

echo ""
echo -e "${GREEN}🎉 НАЛАШТУВАННЯ ЗАВЕРШЕНО!${NC}"
echo ""
echo "🌐 Ваш сайт: https://prizma-beckend1-1810.vercel.app"
echo "📋 Форма: https://prizma-beckend1-1810.vercel.app/form"
echo "👨‍⚕️ Адмін: https://prizma-beckend1-1810.vercel.app/admin"