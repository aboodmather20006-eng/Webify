@echo off
set "PATH=%USERPROFILE%\.local\node;%PATH%"
cd /d "%~dp0"
npm run dev
