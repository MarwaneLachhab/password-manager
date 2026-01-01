# 🔐 Password Manager

A secure, modern password manager with Windows Hello authentication, built with Java Spring Boot and React.

## ✨ Features

- 🔒 **Windows Hello Integration** - Biometric authentication (fingerprint, face, PIN) for each password
- 👤 **Multi-User Support** - Create accounts with email and master password
- 💾 **Local Storage** - All passwords stored securely on your device
- 🔍 **Smart Search** - Quickly find passwords by title, username, or URL
- 🎨 **Modern UI** - Clean, Microsoft-inspired design
- 📋 **One-Click Copy** - Copy passwords, usernames, and URLs
- 🔐 **Per-Password Protection** - Each password requires individual Windows Hello authentication
- ⚙️ **Account Settings** - Manage preferences and auto-save options
- 🌐 **URL Management** - Store website links with your passwords

## 🛡️ Security Features

- **Windows Hello Authentication**: Each password is individually protected with biometric authentication
- **Session-Based Access**: Authentication persists only for the current session
- **Master Password**: Account-level protection with email and password
- **Local-Only Storage**: All data stays on your device using localStorage
- **No Cloud Sync**: Complete privacy with no external servers

## 🚀 Quick Start

### Prerequisites Check

Run the setup script to check and install required tools:

```powershell
.\setup.ps1
```

This will check for:
- ✅ Java JDK 17 or higher
- ✅ Node.js 18 or higher
- ✅ npm (comes with Node.js)
- ✅ Maven
- ✅ Git

If any tools are missing, the script will offer to install them automatically using Chocolatey.

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd password-manager
   ```

2. **Run setup script**
   ```powershell
   .\setup.ps1
   ```
   This will:
   - Install all dependencies
   - Build the backend
   - Set up the frontend
   - Prepare the application for launch

3. **Start the application**
   ```powershell
   .\start.ps1
   ```
   This will start both backend and frontend servers.

### Manual Installation (Alternative)

If you prefer to install tools manually:

1. **Install Java JDK 17+**
   - Download from: https://adoptium.net/
   - Verify: `java -version`

2. **Install Node.js 18+**
   - Download from: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

3. **Install Maven**
   - Download from: https://maven.apache.org/download.cgi
   - Verify: `mvn --version`

4. **Install Git**
   - Download from: https://git-scm.com/download/win
   - Verify: `git --version`

Then run the setup and start scripts.

## 📁 Project Structure

```
password-manager/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/       # Java source files
│   │       └── resources/  # Configuration files
│   └── pom.xml             # Maven dependencies
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   └── App.js         # Main app component
│   └── package.json       # npm dependencies
│
├── setup.ps1              # Setup and dependency installer
├── start.ps1              # Start both servers
├── start-backend.ps1      # Start backend only
├── start-frontend.ps1     # Start frontend only
└── README.md              # This file
```

## 🎮 Usage

### First Time Setup

1. Run the application: `.\start.ps1`
2. Open browser at: http://localhost:3000
3. Click **"Create one now"** to register
4. Enter your email and master password (min 6 characters)
5. Set up Windows Hello when prompted

### Adding Passwords

1. Click **"➕ Add New Password"**
2. Fill in the form:
   - **Title**: Name for the password (e.g., "GitHub", "Gmail")
   - **Username/Email**: Your login username or email
   - **Password**: Your password (or use 🎲 Generate)
   - **Website URL**: Optional website link
   - **Notes**: Optional additional information
3. Click **"💾 Save"**

### Viewing Passwords

1. Click the **👁️ eye icon** next to any password
2. **Windows Hello prompt** will appear
3. Authenticate with fingerprint, face, or PIN
4. Password is revealed
5. Click **🙈 hide icon** to hide again (no re-authentication needed)

### Copying Passwords

1. Click the **📋 copy icon** next to any field
2. For passwords: Windows Hello authentication required (if not already authenticated)
3. For URLs/usernames: Copy immediately
4. Confirmation alert appears

### Search

Use the search bar to find passwords by:
- Password title (e.g., "GitHub")
- Username or email
- Website URL

### Account Settings

1. Click **"⚙️ Settings"** in the header
2. Manage:
   - Email address
   - Auto-save preferences
   - Account information
   - Delete account option

## 🔧 Development

### Backend Development

```powershell
cd backend
mvn spring-boot:run
```
Backend runs on: http://localhost:8080

### Frontend Development

```powershell
cd frontend
npm start
```
Frontend runs on: http://localhost:3000

### Building for Production

**Backend:**
```powershell
cd backend
mvn clean package
```
JAR file created in: `backend/target/backend-1.0-SNAPSHOT.jar`

**Frontend:**
```powershell
cd frontend
npm run build
```
Build files created in: `frontend/build/`

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `.\setup.ps1` | Check and install dependencies, build project |
| `.\start.ps1` | Start both backend and frontend |
| `.\start-backend.ps1` | Start backend server only |
| `.\start-frontend.ps1` | Start frontend server only |

## 🌐 API Endpoints

The backend provides REST APIs (currently not used with localStorage approach):

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/passwords` - Get all passwords
- `POST /api/passwords` - Create new password
- `PUT /api/passwords/{id}` - Update password
- `DELETE /api/passwords/{id}` - Delete password

## 🔒 Browser Compatibility

Windows Hello (WebAuthn) is supported in:
- ✅ Microsoft Edge
- ✅ Google Chrome
- ✅ Firefox
- ⚠️ Safari (limited support)

## 📝 Technology Stack

**Backend:**
- Java 17
- Spring Boot 3.2.5
- Spring Security
- Spring Data JPA
- SQLite Database
- Hibernate

**Frontend:**
- React 19
- Modern JavaScript (ES6+)
- CSS3 with Gradients
- WebAuthn API (Windows Hello)
- LocalStorage API

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Important Notes

- **Windows Only**: Windows Hello requires Windows 10 or later
- **Browser Support**: Use Chrome or Edge for best experience
- **Local Data**: All passwords are stored locally in browser localStorage
- **No Backup**: Data is not synced to cloud, backup manually if needed
- **Production Use**: For production, consider adding encryption and secure backend storage

## 🐛 Troubleshooting

**Issue: Windows Hello not working**
- Ensure Windows Hello is set up in Windows Settings
- Use Chrome or Edge browser
- Check if your device supports biometric authentication

**Issue: Backend won't start**
- Check if Java 17+ is installed: `java -version`
- Ensure port 8080 is not in use
- Check backend logs for errors

**Issue: Frontend won't start**
- Check if Node.js is installed: `node --version`
- Delete `node_modules` folder and run `npm install`
- Ensure port 3000 is not in use

**Issue: Can't access application**
- Ensure both servers are running
- Try accessing: http://localhost:3000
- Clear browser cache and cookies

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review existing issues on GitHub
3. Create a new issue with detailed description

---

Made with ❤️ using Spring Boot and React
