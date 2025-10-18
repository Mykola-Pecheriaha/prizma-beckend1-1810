#!/bin/bash
# Switch back to SQLite schema for local development

echo "🗃️ Switching back to SQLite schema..."

if [ -f "prisma/schema-sqlite-backup.prisma" ]; then
    cp prisma/schema-sqlite-backup.prisma prisma/schema.prisma
    echo "✅ SQLite schema restored from backup"
else
    echo "⚠️ No SQLite backup found, using emergency schema"
    cp prisma/schema-emergency.prisma prisma/schema.prisma
fi

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

# Ensure database exists
echo "🗃️ Setting up local database..."
npx prisma db push

echo ""
echo "✅ Back to SQLite for local development!"
echo "🚀 Run 'yarn dev' to start development server"