# 🚀 Як створити новий GitHub репозіторій для проекту

## 📋 Кроки для створення репозіторія:

### 1. 🌐 Створіть репозіторій на GitHub:
1. Перейдіть на [github.com](https://github.com)
2. Натисніть кнопку **"New repository"** (зелена кнопка)
3. Заповніть форму:
   - **Repository name**: `prizma-consultation-system` (або ваша назва)
   - **Description**: `Медична система консультацій з Next.js + TypeScript + Prisma`
   - **Visibility**: Public або Private (на ваш вибір)
   - ❌ **НЕ** ставте галочки на:
     - "Add a README file"
     - "Add .gitignore"
     - "Choose a license"
4. Натисніть **"Create repository"**

### 2. 📤 Підключіть локальний репозіторій до GitHub:

После створення репозіторія на GitHub, виконайте наступні команди у терміналі:

\`\`\`bash
# Додайте remote origin (замініть YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/prizma-consultation-system.git

# Перевірте, що remote додався
git remote -v

# Запушіть код на GitHub
git push -u origin main
\`\`\`

### 3. ✅ Перевірте результат:
- Оновіть сторінку репозіторія на GitHub
- Ваш код має з'явитися у репозіторії
- README.md відобразиться на головній сторінці

---

## 🔧 Альтернативний спосіб (якщо потрібно змінити remote):

Якщо у вас вже є remote origin, спочатку видаліть його:

\`\`\`bash
# Видалити поточний remote
git remote remove origin

# Додати новий remote
git remote add origin https://github.com/YOUR_USERNAME/NEW_REPO_NAME.git

# Запушити
git push -u origin main
\`\`\`

---

## 📋 Поточний стан проекту:

✅ **Готово до публікації:**
- Всі файли додані до Git
- Зроблено commit з описом функціональності
- Код відформатований та перевірений

🎯 **Залишається тільки:**
1. Створити репозіторій на GitHub
2. Додати remote origin
3. Запушити код

---

## 🔄 Команди для перевірки:

\`\`\`bash
# Перевірити стан Git
git status

# Подивитися історію commits
git log --oneline

# Перевірити remote connections
git remote -v
\`\`\`