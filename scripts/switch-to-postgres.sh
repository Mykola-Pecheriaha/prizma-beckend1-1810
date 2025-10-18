#!/bin/bash
# Switch to PostgreSQL schema for Vercel deployment

echo "🐘 Switching to PostgreSQL schema for Vercel..."

# Backup current schema
cp prisma/schema.prisma prisma/schema-sqlite-backup.prisma
echo "✅ SQLite schema backed up to schema-sqlite-backup.prisma"

# Switch to PostgreSQL schema
cp prisma/schema-postgres.prisma prisma/schema.prisma
echo "✅ PostgreSQL schema activated"

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

echo ""
echo "🎉 Ready for PostgreSQL deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Create Vercel Postgres Database in dashboard"
echo "2. Copy environment variables to project settings"
echo "3. git add . && git commit -m 'feat: switch to PostgreSQL'"
echo "4. git push origin main"
echo ""
echo "🚀 Vercel will automatically deploy with PostgreSQL!"