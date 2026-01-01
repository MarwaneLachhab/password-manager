Write-Host "Starting Backend Server..." -ForegroundColor Cyan
Write-Host ""

Set-Location "backend"

if (-not (Test-Path "target/backend-1.0-SNAPSHOT.jar")) {
    Write-Host "Backend JAR not found. Building..." -ForegroundColor Yellow
    mvn clean install -DskipTests
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Failed to build backend!" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Backend server running on http://localhost:8080" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

java -jar target/backend-1.0-SNAPSHOT.jar
