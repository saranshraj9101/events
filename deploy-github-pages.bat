@echo off
echo ===================================
echo Deploying to GitHub Pages
echo ===================================

echo Building frontend for production...
cd client
call npm run build

echo Deploying to GitHub Pages...
call npm run deploy

echo ===================================
echo Deployment completed!
echo ===================================

cd ..
pause