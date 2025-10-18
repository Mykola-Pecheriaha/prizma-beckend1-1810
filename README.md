# Next.js + TypeScript + Turbopack + Tailwind CSS v4.0 Project

Современное Next.js приложение с самыми новыми технологиями для быстрой разработки.

## 🚀 Технологии

- **[Next.js 15.5.6](https://nextjs.org/)** - React framework с App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Типизированный JavaScript
- **[Turbopack](https://turbo.build/pack)** - Быстрый бандлер для разработки
- **[Tailwind CSS v4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Yarn](https://yarnpkg.com/)** - Быстрый пакетный менеджер
- **[Prettier](https://prettier.io/)** - Форматирование кода
- **[ESLint](https://eslint.org/)** - Линтер для качества кода
- **[Prisma](https://prisma.io/)** - ORM и работа с базой данных
- **[SQLite](https://sqlite.org/)** - Локальная база данных

## 📁 Структура проекта

```
src/
├── app/           # App Router страницы и layouts
├── components/    # Переиспользуемые React компоненты
├── lib/          # Утилиты и конфигурации
└── styles/       # Глобальные стили и Tailwind imports
```

## 🛠 Установка и запуск

Сначала установите зависимости и запустите development сервер:

```bash
yarn install
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере для просмотра результата.

## 📝 Доступные команды

- `yarn dev` - Запуск development сервера с Turbopack
- `yarn build` - Сборка для production
- `yarn start` - Запуск production сервера
- `yarn lint` - Проверка кода с ESLint
- `yarn format` - Форматирование кода с Prettier
- `yarn db:generate` - Генерация Prisma клиента
- `yarn db:push` - Синхронизация схемы с БД
- `yarn db:studio` - Открыть Prisma Studio

## 🎨 Особенности

### Turbopack

Проект настроен для использования Turbopack - нового сверхбыстрого бандлера от команды Vercel.

### Tailwind CSS v4.0

Использует самую новую версию Tailwind CSS с улучшенной производительностью.

### TypeScript

Полная поддержка TypeScript для безопасности типов и лучшего DX.

### App Router

Использует новый App Router для лучшей производительности и developer experience.

### Система консультаций

- **Форма (/form)** - Интерфейс для заполнения консультационной формы
- **Админ-панель (/admin)** - Просмотр всех заполненных форм в виде таблицы
- **API (/api/consultations)** - REST API для сохранения и получения данных
- **База данных** - SQLite с Prisma ORM для хранения консультаций

## 🔧 Конфигурация

- **Next.js**: `next.config.ts`
- **TypeScript**: `tsconfig.json`
- **Tailwind**: `tailwind.config.ts`
- **Prettier**: `.prettierrc`
- **ESLint**: `eslint.config.mjs`
- **Prisma**: `prisma/schema.prisma`

## 📖 Полезные ссылки

- [Next.js Documentation](https://nextjs.org/docs)
- [Turbopack Documentation](https://turbo.build/pack/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
