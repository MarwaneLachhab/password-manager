Write-Host "Starting Frontend Development Server..." -ForegroundColor Cyan
Write-Host ""

Set-Location "frontend"

if (-not (Test-Path "node_modules")) {
    Write-Host "Node modules not found. Installing..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to install dependencies!" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Frontend server running on http://localhost:3000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

npm start
