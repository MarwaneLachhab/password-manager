# 🚀 Complete Setup Guide

This guide will help you set up the Password Manager application from scratch.

## 📋 Step-by-Step Installation

### Step 1: Clone the Repository

Open PowerShell and run:

```powershell
git clone <your-repository-url>
cd password-manager
```

### Step 2: Run Automated Setup

Execute the setup script:

```powershell
.\setup.ps1
```

**What this script does:**
1. ✅ Checks if Java JDK 17+ is installed
2. ✅ Checks if Node.js 18+ is installed
3. ✅ Checks if Maven is installed
4. ✅ Checks if Git is installed
5. ✅ Offers to install missing tools automatically
6. ✅ Installs frontend dependencies (npm packages)
7. ✅ Builds backend (Maven)
8. ✅ Prepares application for launch

### Step 3: Start the Application

```powershell
.\start.ps1
```

This will:
- Start the backend server on http://localhost:8080
- Start the frontend server on http://localhost:3000
- Open your default browser automatically

## 🛠️ Manual Installation (If Automatic Fails)

### Install Java JDK 17

1. Download from: https://adoptium.net/temurin/releases/
2. Choose:
   - Version: 17 (LTS)
   - Operating System: Windows
   - Architecture: x64
3. Run installer
4. Verify installation:
   ```powershell
   java -version
   ```
   Should show: `openjdk version "17.x.x"`

### Install Node.js

1. Download from: https://nodejs.org/
2. Choose LTS version (18.x or higher)
3. Run installer (includes npm)
4. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

### Install Maven

1. Download from: https://maven.apache.org/download.cgi
2. Extract to: `C:\Program Files\Apache\Maven`
3. Add to PATH:
   - Open System Properties → Environment Variables
   - Add to Path: `C:\Program Files\Apache\Maven\bin`
4. Verify installation:
   ```powershell
   mvn --version
   ```

### Install Git

1. Download from: https://git-scm.com/download/win
2. Run installer with default options
3. Verify installation:
   ```powershell
   git --version
   ```

### Install Dependencies Manually

**Backend:**
```powershell
cd backend
mvn clean install -DskipTests
cd ..
```

**Frontend:**
```powershell
cd frontend
npm install
cd ..
```

## 🎯 Starting the Application

### Option 1: Start Everything (Recommended)

```powershell
.\start.ps1
```

Two PowerShell windows will open:
- One for the backend server
- One for the frontend server

### Option 2: Start Individually

**Terminal 1 - Backend:**
```powershell
.\start-backend.ps1
```

**Terminal 2 - Frontend:**
```powershell
.\start-frontend.ps1
```

### Option 3: Manual Start

**Backend:**
```powershell
cd backend
java -jar target/backend-1.0-SNAPSHOT.jar
```

**Frontend:**
```powershell
cd frontend
npm start
```

## 🌐 Accessing the Application

Once both servers are running:

1. Open your browser
2. Navigate to: http://localhost:3000
3. You'll see the login/register screen

### First Time Use

1. Click **"Create one now"**
2. Enter your email (e.g., user@example.com)
3. Create a master password (minimum 6 characters)
4. Click **"✨ Create Account"**
5. You'll be logged in automatically

## 🔧 Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
server.port=8080
spring.datasource.url=jdbc:sqlite:passwords.db
```

### Frontend Configuration

Edit `frontend/package.json` proxy:

```json
"proxy": "http://localhost:8080"
```

## 🔍 Verifying Installation

### Check Backend

Open: http://localhost:8080/api/passwords

Expected: `401 Unauthorized` (this is correct - it means backend is running)

### Check Frontend

Open: http://localhost:3000

Expected: Login/Register screen appears

## 🐛 Common Issues

### Issue: "java is not recognized"

**Solution:**
- Java is not installed or not in PATH
- Run `.\setup.ps1` to install automatically
- Or install manually from https://adoptium.net/

### Issue: "node is not recognized"

**Solution:**
- Node.js is not installed or not in PATH
- Run `.\setup.ps1` to install automatically
- Or install manually from https://nodejs.org/

### Issue: "Port 8080 is already in use"

**Solution:**
```powershell
netstat -ano | findstr :8080
taskkill /PID <process-id> /F
```

### Issue: "Port 3000 is already in use"

**Solution:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <process-id> /F
```

### Issue: Windows Hello not working

**Solution:**
- Ensure you're using Chrome or Edge
- Set up Windows Hello in Windows Settings
- Check if biometric hardware is available

### Issue: Backend won't build

**Solution:**
```powershell
cd backend
mvn clean install -U -DskipTests
```

### Issue: Frontend won't start

**Solution:**
```powershell
cd frontend
rm -r node_modules
npm cache clean --force
npm install
```

## 📱 Using the Application

### Register Account

1. Email: your.email@example.com
2. Master Password: yourSecurePassword123
3. Click "Create Account"

### Add Password

1. Click "➕ Add New Password"
2. Fill in details:
   - Title: GitHub
   - Username: yourusername
   - Password: (click 🎲 Generate or enter manually)
   - Website: https://github.com
3. Click "Save"

### View Password

1. Find the password card
2. Click 👁️ eye icon next to password field
3. Windows Hello dialog appears
4. Authenticate (fingerprint/face/PIN)
5. Password is revealed

### Copy Password

1. Click 📋 copy icon next to password
2. Windows Hello authentication (if not already authenticated)
3. Password copied to clipboard

## 🔄 Updating the Application

```powershell
git pull origin main
.\setup.ps1
.\start.ps1
```

## 🛑 Stopping the Application

Press `Ctrl+C` in each PowerShell window running the servers.

Or close the PowerShell windows.

## 📊 System Requirements

**Minimum:**
- Windows 10 or later
- 4 GB RAM
- 500 MB free disk space
- Internet connection (for initial setup)

**Recommended:**
- Windows 11
- 8 GB RAM
- Biometric device (fingerprint reader or Windows Hello camera)
- Modern browser (Chrome/Edge)

## 📞 Getting Help

If you encounter issues:

1. Check this guide thoroughly
2. Review the main README.md
3. Check the troubleshooting section
4. Create an issue on GitHub with:
   - Error message
   - Steps to reproduce
   - Your system info (OS, Java version, Node version)

---

Happy password managing! 🔐
