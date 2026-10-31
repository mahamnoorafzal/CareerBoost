@echo off
REM Quick Start Script for CareerBoost (Windows)
REM Run this to automate setup on Windows

echo 🚀 CareerBoost - Quick Start Setup
echo ==================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not installed. Please install from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo ✅ Backend dependencies already installed
)

if not exist ".env" (
    echo Creating backend .env...
    copy .env.example .env
    echo ⚠️  Please edit backend\.env with your MongoDB URI and JWT_SECRET
) else (
    echo ✅ Backend .env exists
)

cd ..
echo.

REM Setup Frontend
echo 📦 Setting up Frontend...
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo ✅ Frontend dependencies already installed
)

if not exist ".env" (
    echo Creating frontend .env...
    copy .env.example .env
    echo ✅ Frontend .env created
) else (
    echo ✅ Frontend .env exists
)

cd ..
echo.

echo ✅ Setup complete!
echo.
echo 🎉 Next steps:
echo 1. Edit backend\.env with your MongoDB URI and JWT_SECRET
echo 2. Run in Terminal 1: cd backend ^&^& npm run dev
echo 3. Run in Terminal 2: cd frontend ^&^& npm start
echo.
echo 📱 Frontend will open at http://localhost:3000
echo 🔗 Backend running at http://localhost:5000
echo.
pause
