#!/bin/bash

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
