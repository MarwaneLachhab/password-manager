#!/bin/bash

# Check if running on Windows (Git Bash/MSYS/Cygwin)
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    echo "Detected Windows environment. Launching PowerShell script..."
    powershell.exe -ExecutionPolicy Bypass -File "./start-frontend.ps1"
    exit $?
fi

echo "Starting Frontend Development Server..."
echo ""

cd frontend

if [ ! -d "node_modules" ]; then
    echo "Node modules not found. Installing..."
    npm install
fi

echo "Frontend server running on http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

npm start
