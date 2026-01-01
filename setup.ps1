$ErrorActionPreference = "Stop"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Password Manager - Setup Script" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

function Test-CommandExists {
    param($command)
    $null = Get-Command $command -ErrorAction SilentlyContinue
    return $?
}

function Get-JavaVersion {
    try {
        $output = java -version 2>&1
        if ($output -match "version `"(\d+)") {
            return [int]$matches[1]
        }
    } catch {}
    return 0
}

function Get-NodeVersion {
    try {
        $output = node --version
        if ($output -match "v(\d+)") {
            return [int]$matches[1]
        }
    } catch {}
    return 0
}

Write-Host "Checking system requirements..." -ForegroundColor Yellow
Write-Host ""

$javaInstalled = Test-CommandExists "java"
$nodeInstalled = Test-CommandExists "node"
$npmInstalled = Test-CommandExists "npm"
$mavenInstalled = Test-CommandExists "mvn"
$gitInstalled = Test-CommandExists "git"

Write-Host "Status Check:" -ForegroundColor Green
Write-Host "  [$(if($javaInstalled){'✓'}else{'✗'})] Java JDK 17+" -ForegroundColor $(if($javaInstalled){'Green'}else{'Red'})
if ($javaInstalled) {
    $javaVer = Get-JavaVersion
    Write-Host "      Version: $javaVer" -ForegroundColor Gray
}
Write-Host "  [$(if($nodeInstalled){'✓'}else{'✗'})] Node.js 18+" -ForegroundColor $(if($nodeInstalled){'Green'}else{'Red'})
if ($nodeInstalled) {
    $nodeVer = Get-NodeVersion
    Write-Host "      Version: $nodeVer" -ForegroundColor Gray
}
Write-Host "  [$(if($npmInstalled){'✓'}else{'✗'})] npm" -ForegroundColor $(if($npmInstalled){'Green'}else{'Red'})
Write-Host "  [$(if($mavenInstalled){'✓'}else{'✗'})] Maven" -ForegroundColor $(if($mavenInstalled){'Green'}else{'Red'})
Write-Host "  [$(if($gitInstalled){'✓'}else{'✗'})] Git" -ForegroundColor $(if($gitInstalled){'Green'}else{'Red'})
Write-Host ""

$missingTools = @()
if (-not $javaInstalled) { $missingTools += "Java JDK 17" }
if (-not $nodeInstalled -or -not $npmInstalled) { $missingTools += "Node.js & npm" }
if (-not $mavenInstalled) { $missingTools += "Maven" }
if (-not $gitInstalled) { $missingTools += "Git" }

if ($missingTools.Count -gt 0) {
    Write-Host "Missing tools detected: $($missingTools -join ', ')" -ForegroundColor Red
    Write-Host ""
    Write-Host "Would you like to install missing tools automatically? (Y/N)" -ForegroundColor Yellow
    $response = Read-Host
    
    if ($response -eq 'Y' -or $response -eq 'y') {
        Write-Host ""
        Write-Host "Installing missing tools using Chocolatey..." -ForegroundColor Cyan
        
        if (-not (Test-CommandExists "choco")) {
            Write-Host "Installing Chocolatey package manager..." -ForegroundColor Yellow
            Set-ExecutionPolicy Bypass -Scope Process -Force
            [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
            Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
            
            $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        }
        
        if (-not $javaInstalled) {
            Write-Host "Installing Java JDK 17..." -ForegroundColor Yellow
            choco install openjdk17 -y
        }
        
        if (-not $nodeInstalled -or -not $npmInstalled) {
            Write-Host "Installing Node.js & npm..." -ForegroundColor Yellow
            choco install nodejs -y
        }
        
        if (-not $mavenInstalled) {
            Write-Host "Installing Maven..." -ForegroundColor Yellow
            choco install maven -y
        }
        
        if (-not $gitInstalled) {
            Write-Host "Installing Git..." -ForegroundColor Yellow
            choco install git -y
        }
        
        Write-Host ""
        Write-Host "Installation complete! Please restart your terminal and run this script again." -ForegroundColor Green
        exit 0
    } else {
        Write-Host ""
        Write-Host "Please install the following tools manually:" -ForegroundColor Yellow
        if (-not $javaInstalled) { Write-Host "  - Java JDK 17+: https://adoptium.net/" }
        if (-not $nodeInstalled) { Write-Host "  - Node.js 18+: https://nodejs.org/" }
        if (-not $mavenInstalled) { Write-Host "  - Maven: https://maven.apache.org/download.cgi" }
        if (-not $gitInstalled) { Write-Host "  - Git: https://git-scm.com/download/win" }
        Write-Host ""
        exit 1
    }
}

Write-Host "All required tools are installed! ✓" -ForegroundColor Green
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host ""

Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location "frontend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install frontend dependencies!" -ForegroundColor Red
    exit 1
}
Set-Location ".."

Write-Host ""
Write-Host "Building backend..." -ForegroundColor Cyan
Set-Location "backend"
mvn clean install -DskipTests
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to build backend!" -ForegroundColor Red
    exit 1
}
Set-Location ".."

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "   Setup completed successfully! ✓" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host "  1. Run: .\start.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Or start services individually:" -ForegroundColor Yellow
Write-Host "  Backend:  .\start-backend.ps1" -ForegroundColor White
Write-Host "  Frontend: .\start-frontend.ps1" -ForegroundColor White
Write-Host ""
