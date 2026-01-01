#!/bin/bash

echo "============================================"
echo "   Starting Password Manager"
echo "============================================"
echo ""

echo "Starting Backend Server..."
./start-backend.sh &
BACKEND_PID=$!

sleep 3

echo "Starting Frontend Development Server..."
./start-frontend.sh &
FRONTEND_PID=$!

echo ""
echo "============================================"
echo "   Application Started! ✓"
echo "============================================"
echo ""
echo "Backend:  http://localhost:8080"
echo "Frontend: http://localhost:3000"
echo ""
echo "The application will open automatically in your browser."
echo "Press Ctrl+C to stop the servers."
echo ""

wait $BACKEND_PID $FRONTEND_PID
