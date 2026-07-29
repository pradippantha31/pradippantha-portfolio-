# Script to build and deploy all 4 repositories to Cloudflare

$Root = if ($PSScriptRoot) { $PSScriptRoot } else { Get-Location }

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " Deploying 4 Repositories to Cloudflare  " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Main Portfolio Repo
Write-Host "`n[1/4] Deploying Main Portfolio..." -ForegroundColor Yellow
cd "$Root"
npm run build
npx wrangler deploy

# 2. Expense Tracking App Repo
Write-Host "`n[2/4] Deploying Expense Tracking App..." -ForegroundColor Yellow
cd "$Root/projects_standalone/expense-tracking-app"
npm run build
npx wrangler pages deploy dist --project-name=expense-tracking-app --commit-dirty=true

# 3. Task Sprint Workspace Repo
Write-Host "`n[3/4] Deploying Task & Sprint Workspace..." -ForegroundColor Yellow
cd "$Root/projects_standalone/task-sprint-workspace"
npm run build
npx wrangler pages deploy dist --project-name=task-sprint-workspace --commit-dirty=true

# 4. AI Developer Suite Repo
Write-Host "`n[4/4] Deploying AI Developer Suite..." -ForegroundColor Yellow
cd "$Root/projects_standalone/ai-developer-suite"
npm run build
npx wrangler pages deploy dist --project-name=ai-developer-suite --commit-dirty=true

cd "$Root"
Write-Host "`n=========================================" -ForegroundColor Green
Write-Host " All 4 Projects Deployed to Cloudflare!  " -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
