#!/bin/bash
# Prisma cleanup script for Vercel deployment

echo "🧹 Cleaning Prisma cache and regenerating..."

# Remove generated Prisma client
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma/client

# Clear any potential cache
rm -f prisma/dev.db*

# Regenerate Prisma client
npx prisma generate

echo "✅ Prisma client regenerated successfully!"