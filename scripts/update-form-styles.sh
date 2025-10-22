#!/bin/bash
# Швидке оновлення стилів у формі для темної теми

cd /home/artem/project/prizma-beckend1-1810/src/app/form

# Backup original
cp page.tsx page.tsx.backup

# Update styles
sed -i 's/text-gray-700/text-gray-700 dark:text-gray-300/g' page.tsx
sed -i 's/w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none/w-full rounded border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-400/g' page.tsx
sed -i 's/rounded-lg border border-gray-200 p-6/rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:bg-gray-800\/50 sm:p-6/g' page.tsx
sed -i 's/text-blue-600/text-blue-600 dark:text-blue-400/g' page.tsx
sed -i 's/text-purple-600/text-purple-600 dark:text-purple-400/g' page.tsx
sed -i 's/text-green-600/text-green-600 dark:text-green-400/g' page.tsx
sed -i 's/text-orange-600/text-orange-600 dark:text-orange-400/g' page.tsx
sed -i 's/bg-blue-50/bg-blue-50 dark:bg-blue-900\/30/g' page.tsx
sed -i 's/text-gray-600/text-gray-600 dark:text-gray-400/g' page.tsx
sed -i 's/bg-blue-600/bg-blue-600 dark:bg-blue-500/g' page.tsx
sed -i 's/hover:bg-blue-700/hover:bg-blue-700 dark:hover:bg-blue-600/g' page.tsx

echo "✅ Стилі оновлено для темної теми!"