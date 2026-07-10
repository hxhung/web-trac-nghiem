@echo off
echo ===================================================
echo   INITIALIZE GIT FOR WEB-TRAC-NGHIEM
echo ===================================================
echo.

REM Chuyen thu muc lam viec ve vi tri file bat nay
cd "%~dp0"

echo [1/4] Configuring Git Identity (hxhung)...
git config --global user.email "hxhung@github.com"
git config --global user.name "hxhung"
echo OK.
echo.

if exist ".git" (
    echo [INFO] Git is already initialized in this folder.
    echo Git identity has been updated successfully.
    echo.
    pause
    exit /b
)

echo [2/4] Initializing local Git repository...
git init
echo OK.
echo.

echo [3/4] Linking to GitHub repository...
git remote add origin https://github.com/hxhung/web-trac-nghiem.git
echo OK.
echo.

echo [4/4] Configuring branch...
git checkout -b main
git fetch origin main
echo OK.
echo.

echo ===================================================
echo [SUCCESS] Git configured and linked to GitHub!
echo Now you can run up_code.bat to deploy changes!
echo ===================================================
echo.
pause
