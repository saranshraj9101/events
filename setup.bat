@echo off
echo ========================================
echo Bennett University Events Setup
echo ========================================
echo.

echo Installing dependencies...
npm install

echo.
echo Installing server dependencies...
cd server
npm install
cd ..

echo.
echo Installing client dependencies...
cd client
npm install
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo 1. Make sure MongoDB is running
echo 2. Run: npm run dev
echo.
echo The app will be available at:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:5000
echo.
pause