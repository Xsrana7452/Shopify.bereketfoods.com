@echo off
title Shopify Bereket Foods - Local Development Server
cd /d "%~dp0"

echo ===================================================
echo   Shopify Bereket Foods - Local Dev Server
echo ===================================================
echo.

:: Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] Dependencies not found. Running 'npm install'...
    echo Please wait, this may take a minute...
    call npm install
    echo.
)

echo [INFO] Starting Next.js development server...
echo [INFO] Opening browser in 5 seconds...
echo.

:: Launch browser after a brief delay so Next.js has time to start
start /b "" powershell -Command "Start-Sleep -Seconds 5; Start-Process 'http://localhost:3000'"

:: Run dev server
call npm run dev

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Failed to start server with 'npm run dev'.
    echo Trying 'npx next dev'...
    call npx next dev
)

echo.
echo Server stopped. Press any key to exit.
pause
