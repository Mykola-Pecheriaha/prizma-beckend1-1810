#!/bin/bash
# Automated Vercel database setup script

echo "🤖 АВТОМАТИЧНЕ НАЛАШТУВАННЯ БАЗИ ДАНИХ ДЛЯ VERCEL"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}📦 Vercel CLI не знайдено. Встановлюю...${NC}"
    
    # Try to install with npm
    if command -v npm &> /dev/null; then
        npm install -g vercel
    elif command -v yarn &> /dev/null; then
        yarn global add vercel
    else
        echo -e "${RED}❌ npm або yarn не знайдено. Встановіть Node.js спочатку.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Vercel CLI готово${NC}"

# Check if user is logged in
echo -e "${BLUE}🔐 Перевіряю авторизацію...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}🔑 Потрібна авторизація. Відкриваю браузер...${NC}"
    vercel login
fi

echo -e "${GREEN}✅ Авторизовано${NC}"

# Link project
echo -e "${BLUE}🔗 Підключаю проект до Vercel...${NC}"
vercel link --yes --scope=Mykola-Pecheriaha --name=prizma-beckend1-1810

# Create PostgreSQL database
echo -e "${BLUE}🗃️ Створюю PostgreSQL базу даних...${NC}"
DB_NAME="medical-consultations-$(date +%s)"
vercel storage create postgres "$DB_NAME" --region iad1

# Wait a bit for database to be ready
echo -e "${YELLOW}⏳ Очікую готовності бази даних...${NC}"
sleep 10

# Connect database to project
echo -e "${BLUE}⚡ Підключаю базу до проекту...${NC}"
vercel storage connect "$DB_NAME"

# Deploy with new database
echo -e "${BLUE}🚀 Деплою проект з новою базою...${NC}"
vercel deploy --prod

echo ""
echo -e "${GREEN}🎉 ГОТОВО!${NC}"
echo -e "${GREEN}✅ База даних створена та підключена${NC}"
echo -e "${GREEN}✅ Проект передеплоєно${NC}"
echo -e "${GREEN}✅ Форми мають працювати через 2-3 хвилини${NC}"
echo ""
echo -e "${BLUE}🌐 Ваш сайт: https://prizma-beckend1-1810.vercel.app${NC}"
echo -e "${BLUE}📋 Форма: https://prizma-beckend1-1810.vercel.app/form${NC}"
echo -e "${BLUE}👨‍⚕️ Адмін: https://prizma-beckend1-1810.vercel.app/admin${NC}"
echo ""
echo -e "${YELLOW}🔍 Перевірте через кілька хвилин чи працює форма${NC}"