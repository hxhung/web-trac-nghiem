@echo off
setlocal EnableDelayedExpansion
title GitHub Ultimate Uploader Lite v1.0
color 0A

:: ===========================================================
:: GITHUB ULTIMATE UPLOADER LITE
:: Single BAT File
:: ===========================================================

cd /d "%~dp0"

:: Enable ANSI (Windows 10+)
for /f %%a in ('echo prompt $E^|cmd') do set "ESC=%%a"

:MENU
cls
call :LOADINFO

echo.
echo ================================================================
echo                 GITHUB ULTIMATE UPLOADER
echo ================================================================
echo.
echo   Project      : %PROJECT%
echo   Branch       : %BRANCH%
echo   Git User     : %GITUSER%
echo   Repository   : %REPO%
echo.
echo   Modified     : %MODIFIED%
echo   Added        : %ADDED%
echo   Deleted      : %DELETED%
echo.
echo ================================================================
echo.
echo   [1] Upload (Add + Commit + Push)
echo   [2] Pull
echo   [3] Status
echo   [4] History
echo   [5] Rollback Last Commit
echo   [6] Open Repository
echo   [7] Open Actions
echo   [8] Open Commits
echo   [9] Refresh
echo   [0] Exit
echo.
set /p CHOICE=Select :

if "%CHOICE%"=="1" goto UPLOAD
if "%CHOICE%"=="2" goto PULL
if "%CHOICE%"=="3" goto STATUS
if "%CHOICE%"=="4" goto HISTORY
if "%CHOICE%"=="5" goto ROLLBACK
if "%CHOICE%"=="6" goto OPENREPO
if "%CHOICE%"=="7" goto OPENACTIONS
if "%CHOICE%"=="8" goto OPENCOMMITS
if "%CHOICE%"=="9" goto MENU
if "%CHOICE%"=="0" exit

goto MENU

:: ===========================================================

:LOADINFO

for %%i in (.) do set PROJECT=%%~nxi

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo.
    echo This folder is not a Git Repository.
    pause
    exit
)

for /f %%i in ('git branch --show-current') do set BRANCH=%%i

for /f "delims=" %%i in ('git config user.name') do set GITUSER=%%i

for /f "delims=" %%i in ('git remote get-url origin') do set REPO=%%i

set REPO=%REPO:.git=%

echo %REPO%|find "git@" >nul
if not errorlevel 1 (
set REPO=%REPO:git@github.com:=https://github.com/%
set REPO=%REPO::=/%
)

set MODIFIED=0
set ADDED=0
set DELETED=0

for /f %%i in ('git diff --name-only ^| find /c /v ""') do set MODIFIED=%%i
for /f %%i in ('git ls-files --others --exclude-standard ^| find /c /v ""') do set ADDED=%%i
for /f %%i in ('git ls-files --deleted ^| find /c /v ""') do set DELETED=%%i

exit /b

:: ===========================================================

:STATUS

cls

git status

echo.
pause
goto MENU

:: ===========================================================

:HISTORY

cls

git log --oneline --graph --decorate -20

echo.
pause
goto MENU

:: ===========================================================

:PULL

cls

echo.
echo Pulling...
echo.

git pull

echo.
pause
goto MENU

:: ===========================================================

:ROLLBACK

cls

echo.
echo WARNING
echo.

set /p ANS=Rollback last commit (Y/N) ?

if /I "%ANS%"=="Y" (

git reset --soft HEAD~1

echo.

echo Rollback Complete.

)

pause

goto MENU

:: ===========================================================

:UPLOAD

cls

echo.

echo Checking Changes...

git add .

git diff --cached --quiet

if not errorlevel 1 (

echo.
echo No Changes Found.
pause
goto MENU

)

echo.

set /p MSG=Commit Message :

if "%MSG%"=="" (

set MSG=Update %date% %time%

)

echo.

call :BAR

echo.

git commit -m "%MSG%"

if errorlevel 1 (

echo.

echo Commit Failed.

pause

goto MENU

)

echo.

call :BAR

echo.

git push

if errorlevel 1 (

echo.

echo Push Failed.

pause

goto MENU

)

echo.

echo Upload Success.

echo.

echo -------------------------------------->>upload.log
echo %date% %time%>>upload.log
echo Branch : %BRANCH%>>upload.log
echo Commit : %MSG%>>upload.log
echo Repo   : %REPO%>>upload.log
echo SUCCESS>>upload.log

echo.

start "" "%REPO%"

pause

goto MENU

:: ===========================================================

:OPENREPO

start "" "%REPO%"

goto MENU

:: ===========================================================

:OPENCOMMITS

start "" "%REPO%/commits/%BRANCH%"

goto MENU

:: ===========================================================

:OPENACTIONS

start "" "%REPO%/actions"

goto MENU

:: ===========================================================

:BAR

<nul set /p =[
ping localhost -n 2 >nul

<nul set /p =#
ping localhost -n 2 >nul

<nul set /p =#
ping localhost -n 2 >nul

<nul set /p =#
ping localhost -n 2 >nul

<nul set /p =#
ping localhost -n 2 >nul

<nul set /p =#
ping localhost -n 2 >nul

<nul set /p =#
ping localhost -n 2 >nul

<nul set /p =#
ping localhost -n 2 >nul

<nul set /p =#
ping localhost -n 2 >nul

<nul set /p =#
ping localhost -n 2 >nul

echo ]

exit /b