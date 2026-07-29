# Script to push main portfolio and 3 standalone projects to GitHub

$Root = if ($PSScriptRoot) { $PSScriptRoot } else { Get-Location }

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " Pushing Repositories to GitHub...      " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Main Portfolio Repo
Write-Host "`n[1/4] Pushing Main Portfolio..." -ForegroundColor Yellow
cd "$Root"
if (-not (git remote get-url origin 2>$null)) {
    git remote add origin https://github.com/pradippantha31/pradippantha-portfolio-.git
}
git branch -M main
git push -u origin main --force

# 2. Expense Tracking App Repo
Write-Host "`n[2/4] Pushing Expense Tracking App Repo..." -ForegroundColor Yellow
cd "$Root/projects_standalone/expense-tracking-app"
if (-not (git remote get-url origin 2>$null)) {
    git remote add origin https://github.com/pradippantha31/expense-tracking-app.git
}
git branch -M main
git push -u origin main --force

# 3. Task Sprint Workspace Repo
Write-Host "`n[3/4] Pushing Task & Sprint Workspace Repo..." -ForegroundColor Yellow
cd "$Root/projects_standalone/task-sprint-workspace"
if (-not (git remote get-url origin 2>$null)) {
    git remote add origin https://github.com/pradippantha31/task-sprint-workspace.git
}
git branch -M main
git push -u origin main --force

# 4. AI Developer Suite Repo
Write-Host "`n[4/4] Pushing AI Developer Suite Repo..." -ForegroundColor Yellow
cd "$Root/projects_standalone/ai-developer-suite"
if (-not (git remote get-url origin 2>$null)) {
    git remote add origin https://github.com/pradippantha31/ai-developer-suite.git
}
git branch -M main
git push -u origin main --force

cd "$Root"
Write-Host "`n=========================================" -ForegroundColor Green
Write-Host " All 4 Repositories Pushed Successfully! " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
