@echo off
echo Deploying all 4 repositories to Cloudflare...
powershell -ExecutionPolicy Bypass -File "%~dp0deploy_all.ps1"
pause
