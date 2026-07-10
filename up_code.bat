@echo off
echo ===================================================
echo   AUTOMATIC GIT DEPLOYMENT TOOL
echo ===================================================
echo.

REM Change directory to script location
cd "%~dp0"

REM Check for .git folder
if not exist ".git" (
    echo [ERROR] This script must be placed in the Git repository root directory
    echo Example: place inside web-trac-nghiem-main or thi-truc-tuyen-main.
    echo.
    pause
    exit /b
)

echo [1/3] Adding modified files (git add)...
git add .
echo OK.
echo.

REM Enter commit message
set commit_msg=Update exam
set /p commit_msg="Enter commit message (Press Enter for default: 'Update exam'): "
echo.

echo [2/3] Committing changes (git commit)...
git commit -m "%commit_msg%"
echo.

echo [3/3] Pushing to GitHub (git push --force)...
git push origin main --force
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed! Please check your network or GitHub permissions.
) else (
    echo.
    echo [SUCCESS] Synchronized with GitHub Pages!
    echo Please wait about 1 minute for the website to update.
)
echo.
pause
