@echo off
echo ========================================
echo Bennett University Events - Deployment
echo ========================================
echo.

echo Building frontend for production...
cd client
npm run build
cd ..

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Commit and push to GitHub:
echo    git add .
echo    git commit -m "Ready for deployment"
echo    git push origin main
echo.
echo 2. Deploy to your chosen platform:
echo    - Vercel: https://vercel.com
echo    - Railway: https://railway.app
echo    - Render: https://render.com
echo    - Netlify: https://netlify.com
echo.
echo 3. Set up MongoDB Atlas:
echo    - Go to https://mongodb.com/atlas
echo    - Create free cluster
echo    - Get connection string
echo    - Add to environment variables
echo.
pause
