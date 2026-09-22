@echo off
title RAM & SHYAM QUALITY BIRIYANI - Web Server Launcher
color 0E

echo =========================================================================
echo       RAM ^& SHYAM QUALITY BIRIYANI - RESTAURANT WEBSITE LAUNCHER
echo =========================================================================
echo.
echo Starting Backend API Server (Port 5000)...
echo Starting Frontend Web Application (Port 5173)...
echo.

cd /d "%~dp0"

start "RAM & SHYAM - Backend API (Port 5000)" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul

start "RAM & SHYAM - Frontend Web (Port 5173)" cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo Opening Website in your default browser...
start http://localhost:5173/menu

echo.
echo =========================================================================
echo   [ACTIVE] Website is now running!
echo   Menu Link: http://localhost:5173/menu
echo   Home Link: http://localhost:5173
echo.
echo   Keep the two server terminal windows open while browsing.
echo   To stop the website anytime, simply close those terminal windows.
echo =========================================================================
echo.
pause
