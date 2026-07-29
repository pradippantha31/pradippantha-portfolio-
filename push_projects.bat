@echo off
echo Pushing all 4 repositories to GitHub...
powershell -ExecutionPolicy Bypass -File "%~dp0push_projects.ps1"
pause
