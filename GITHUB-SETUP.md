# 📤 GitHub Repository Setup Instructions

## Quick Setup - Push to GitHub

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `password-manager` (or any name you prefer)
3. Description: `Secure password manager with Windows Hello authentication`
4. Select: **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Run these in PowerShell:

```powershell
# Navigate to project directory
cd 'C:/Development/Java/PSW manage'

# Add remote repository (replace <username> with your GitHub username)
git remote add origin https://github.com/<username>/password-manager.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Example with Username

If your GitHub username is `johndoe`:

```powershell
git remote add origin https://github.com/johndoe/password-manager.git
git branch -M main
git push -u origin main
```

### Step 3: Verify Upload

1. Go to your repository: `https://github.com/<username>/password-manager`
2. You should see all files including:
   - ✅ README.md
   - ✅ setup.ps1
   - ✅ start.ps1
   - ✅ backend/
   - ✅ frontend/

## 🎉 Share Your Repository

Your repository URL will be:
```
https://github.com/<username>/password-manager
```

Anyone can now clone and use it:

```powershell
git clone https://github.com/<username>/password-manager.git
cd password-manager
.\setup.ps1
```

## 🔐 Authentication

GitHub may ask for credentials:

**Option 1: Personal Access Token (Recommended)**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "Password Manager"
4. Select scopes: `repo` (full control)
5. Click "Generate token"
6. Copy the token
7. Use token as password when pushing

**Option 2: GitHub CLI**
```powershell
# Install GitHub CLI
winget install GitHub.cli

# Authenticate
gh auth login

# Push code
git push -u origin main
```

## 📝 Update Repository Later

After making changes:

```powershell
git add .
git commit -m "Your update message"
git push
```

## 🌟 Make it Look Good

After pushing, add these to your repository:

### Add Topics
On GitHub repository page:
1. Click ⚙️ settings icon next to "About"
2. Add topics: `password-manager`, `windows-hello`, `react`, `spring-boot`, `java`, `security`

### Add Description
Add this description:
```
🔐 Secure password manager with Windows Hello biometric authentication. Built with Java Spring Boot and React. Features per-password protection, multi-user support, and modern UI.
```

### Create Release
1. Go to "Releases" → "Create a new release"
2. Tag: `v1.0.0`
3. Title: `Initial Release - Password Manager v1.0`
4. Description: Copy from README features section
5. Click "Publish release"

## 📊 Repository Structure

Your repository will contain:

```
password-manager/
├── .gitignore              ✅ Ignores node_modules, build files
├── README.md               ✅ Main documentation
├── SETUP-GUIDE.md          ✅ Detailed setup instructions
├── GITHUB-SETUP.md         ✅ This file
├── setup.ps1               ✅ Automated setup script
├── start.ps1               ✅ Start application
├── start-backend.ps1       ✅ Backend launcher
├── start-frontend.ps1      ✅ Frontend launcher
├── backend/                ✅ Java Spring Boot backend
└── frontend/               ✅ React frontend
```

## 🚀 Clone Instructions for Others

Add this to your repository description:

```markdown
## Quick Start

```powershell
# Clone repository
git clone https://github.com/<your-username>/password-manager.git

# Navigate to directory
cd password-manager

# Run automated setup (checks and installs dependencies)
.\setup.ps1

# Start application
.\start.ps1
```

Application will open at: http://localhost:3000
```

---

## ✅ Checklist

Before sharing your repository:

- [ ] Repository created on GitHub
- [ ] Code pushed successfully
- [ ] README.md displays correctly
- [ ] Topics added
- [ ] Description added
- [ ] .gitignore working (no node_modules or build files)
- [ ] Clone link tested
- [ ] Setup script tested on clean machine (optional but recommended)

---

**Your repository is now ready to share! 🎉**

Share the clone command with anyone:
```powershell
git clone https://github.com/<your-username>/password-manager.git
```
