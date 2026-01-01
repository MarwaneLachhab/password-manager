#!/bin/bash

echo "Starting Backend Server..."
echo ""

cd backend

if [ ! -f "target/backend-1.0-SNAPSHOT.jar" ]; then
    echo "Backend JAR not found. Building..."
    mvn clean install -DskipTests
fi

echo "Backend server running on http://localhost:8080"
echo "Press Ctrl+C to stop the server"
echo ""

java -jar target/backend-1.0-SNAPSHOT.jar
