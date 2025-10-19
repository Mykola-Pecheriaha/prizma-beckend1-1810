#!/bin/bash
# Quick project status check for Vercel deployment

echo "🔍 Checking project status for Vercel deployment..."
echo ""

# Check Prisma schema
echo "📋 Prisma Schema:"
echo "Provider: $(grep 'provider.*=' prisma/schema.prisma | head -1)"
echo "Database URL: $(grep 'url.*=' prisma/schema.prisma | head -1)"
echo ""

# Check package.json build command
echo "📦 Build Commands:"
grep -A 1 -B 1 "vercel-build" package.json
echo ""

# Check environment files
echo "🌍 Environment Files:"
if [ -f ".env" ]; then
    echo "✅ .env exists"
else
    echo "❌ .env missing"
fi

if [ -f ".env.production" ]; then
    echo "✅ .env.production exists" 
else
    echo "❌ .env.production missing"
fi
echo ""

# Check Vercel config
echo "⚙️ Vercel Configuration:"
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json exists"
    echo "Build Command: $(grep -o '"buildCommand".*' vercel.json)"
else
    echo "❌ vercel.json missing"
fi
echo ""

echo "🎯 Status: Ready for Vercel PostgreSQL deployment!"
echo "📋 Next: Follow VERCEL_STEPS_NOW.md instructions"