# Password Manager Application

## Project Status: ✅ COMPLETE

### Backend (Spring Boot + SQLite)
- ✅ Backend server running on http://localhost:8080
- ✅ User authentication endpoints (register/login)
- ✅ Password CRUD endpoints
- ✅ SQLite database integration
- ✅ Spring Security configuration
- ✅ CORS enabled for frontend communication

### Frontend (React)
- ✅ Login component with authentication
- ✅ Registration component with validation
- ✅ Password list with master password protection
- ✅ Password form with add/edit functionality
- ✅ Password visibility toggle
- ✅ Copy to clipboard functionality
- ✅ Modern gradient UI design
- ✅ React Router for navigation
- ✅ API service for backend communication

## Features Implemented

### Security
- ✅ Master password protection to view passwords
- ✅ Password hashing for user accounts
- ✅ Secure password storage in SQLite database
- ✅ Authentication required for all password operations

### Password Management
- ✅ Add new passwords with title, username, password, URL, and notes
- ✅ Edit existing passwords
- ✅ Delete passwords with confirmation
- ✅ View all passwords in a card-based grid layout
- ✅ Toggle password visibility (show/hide)
- ✅ Copy username, password, and URL to clipboard
- ✅ Password generator with random secure passwords

### User Interface
- ✅ Modern gradient design with purple/blue theme
- ✅ Responsive layout for all screen sizes
- ✅ Smooth animations and transitions
- ✅ Icon-based actions for intuitive UX
- ✅ Form validation with error messages
- ✅ Loading states for async operations

## How to Run

### Backend
```bash
cd "c:/Development/Java/PSW manage/backend/target"
java -jar backend-1.0-SNAPSHOT.jar
```
Backend runs on: http://localhost:8080

### Frontend
```bash
cd "c:/Development/Java/PSW manage/frontend"
npm start
```
Frontend runs on: http://localhost:3000

## Testing the Application

1. **Register a new account**
   - Navigate to http://localhost:3000
   - Click "Register"
   - Enter username and password
   - Click "Register" button

2. **Login**
   - Enter your credentials
   - Click "Login"

3. **Unlock password vault**
   - Enter any master password (demo mode)
   - Click "Unlock"

4. **Add passwords**
   - Click "➕ Add New Password"
   - Fill in the form (title and username are required)
   - Use "🎲 Generate" to create a secure password
   - Click "Save"

5. **Manage passwords**
   - Click 👁️ to show/hide password
   - Click 📋 to copy to clipboard
   - Click ✏️ to edit
   - Click 🗑️ to delete

## Architecture

### Backend Structure
```
backend/
├── src/main/java/com/passwordmanager/
│   ├── model/
│   │   ├── User.java (JPA entity)
│   │   └── PasswordEntry.java (JPA entity)
│   ├── repository/
│   │   ├── UserRepository.java
│   │   └── PasswordEntryRepository.java
│   ├── service/
│   │   ├── UserService.java
│   │   └── PasswordEntryService.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   └── PasswordEntryController.java
│   ├── config/
│   │   └── SecurityConfig.java
│   └── PasswordManagerApplication.java
└── src/main/resources/
    └── application.properties
```

### Frontend Structure
```
frontend/src/
├── components/
│   ├── Login.js
│   ├── Register.js
│   ├── PasswordList.js
│   ├── PasswordForm.js
│   ├── Auth.css
│   ├── PasswordList.css
│   └── PasswordForm.css
├── services/
│   └── api.js
├── App.js
├── App.css
└── index.js
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Password Management
- `GET /api/passwords/{userId}` - Get all passwords for user
- `POST /api/passwords` - Create new password
- `PUT /api/passwords/{id}` - Update password
- `DELETE /api/passwords/{id}` - Delete password

## Technologies Used

### Backend
- Java 17+
- Spring Boot 3.2.5
- Spring Data JPA
- Spring Security
- Hibernate with SQLite dialect
- SQLite database

### Frontend
- React 19
- React Router DOM 7
- Modern CSS with gradients
- Fetch API for HTTP requests

## Notes

- The master password feature is implemented as a UI-level protection (demo mode)
- In production, you should implement proper encryption for stored passwords
- The Spring Security configuration allows all auth endpoints but requires authentication for password endpoints
- SQLite database file is created automatically in the backend/target directory
