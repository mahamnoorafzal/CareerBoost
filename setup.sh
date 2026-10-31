#!/bin/bash
# Quick Start Script for CareerBoost
# Run this to automate setup on Unix/Mac

echo "🚀 CareerBoost - Quick Start Setup"
echo "=================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not installed. Please install from https://nodejs.org/"
    exit 1
fi
echo "✅ Node.js found: $(node --version)"

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found. Use MongoDB Atlas or install locally"
fi
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "✅ Backend dependencies already installed"
fi

if [ ! -f ".env" ]; then
    echo "Creating backend .env..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your MongoDB URI and JWT_SECRET"
else
    echo "✅ Backend .env exists"
fi

cd ..
echo ""

# Setup Frontend
echo "📦 Setting up Frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

if [ ! -f ".env" ]; then
    echo "Creating frontend .env..."
    cp .env.example .env
    echo "✅ Frontend .env created"
else
    echo "✅ Frontend .env exists"
fi

cd ..
echo ""

echo "✅ Setup complete!"
echo ""
echo "🎉 Next steps:"
echo "1. Edit backend/.env with your MongoDB URI and JWT_SECRET"
echo "2. Run in Terminal 1: cd backend && npm run dev"
echo "3. Run in Terminal 2: cd frontend && npm start"
echo ""
echo "📱 Frontend will open at http://localhost:3000"
echo "🔗 Backend running at http://localhost:5000"
