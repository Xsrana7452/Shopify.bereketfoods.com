@echo off
title Push to GitHub - Shopify Bereket Foods
cd /d "%~dp0"

echo ===================================================
echo   Pushing Code to GitHub Repository
echo   https://github.com/Xsrana7452/Shopify.bereketfoods.com.git
echo ===================================================
echo.

:: Initialize git if not initialized
if not exist ".git\" (
    echo [INFO] Initializing Git repository...
    git init
    git branch -M main
)

:: Configure Git Identity to prevent "Author identity unknown" error
echo [INFO] Setting Git identity...
git config user.email "Xsrana7452@users.noreply.github.com"
git config user.name "Xsrana7452"

:: Set remote URL
echo [INFO] Setting remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/Xsrana7452/Shopify.bereketfoods.com.git

:: Ensure branch is main
git branch -M main

:: Add files
echo [INFO] Staging all files...
git add .

:: Commit changes
echo [INFO] Committing changes...
git commit -m "Update Bereket Foods Shopify Next.js website: full product sync, brand ranges, hero video background, and mobile responsiveness"

:: Push to GitHub
echo [INFO] Pushing to main branch on GitHub...
git push -u origin main

if %ERRORLEVEL% neq 0 (
    echo.
    echo [NOTE] Retry push with force if needed...
    git push -u origin main --force
)

echo.
echo ===================================================
echo   Finished! Check your repository on GitHub.
echo ===================================================
pause
