$ErrorActionPreference = "Stop"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Starting Password Manager" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-File", ".\start-backend.ps1"

Start-Sleep -Seconds 3

Write-Host "Starting Frontend Development Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-File", ".\start-frontend.ps1"

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "   Application Started! ✓" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:8080" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "The application will open automatically in your browser." -ForegroundColor Yellow
Write-Host "Press Ctrl+C in each terminal window to stop the servers." -ForegroundColor Gray
Write-Host ""
