@echo off
echo ========================================================
echo         🚀 Launching Capify.ai Video SaaS
echo ========================================================
echo.

start "Capify Python Backend API" cmd /k "cd /d e:\captions\capify\backend && python -m uvicorn server:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 3 /nobreak >nul

start "Capify Next.js Web Studio" cmd /k "cd /d e:\captions\capify\frontend && npm run dev"

echo.
echo ========================================================
echo  ✅ Backend running at:  http://localhost:8000
echo  ✅ Web Studio running: http://localhost:3000
echo ========================================================
echo.
pause
