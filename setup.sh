#!/bin/bash

set -e

echo "============================================"
echo "   Password Manager - Setup Script"
echo "============================================"
echo ""

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

get_java_version() {
    if command_exists java; then
        java -version 2>&1 | grep -oP 'version "\K\d+' | head -1
    else
        echo "0"
    fi
}

get_node_version() {
    if command_exists node; then
        node --version | grep -oP 'v\K\d+' | head -1
    else
        echo "0"
    fi
}

echo "Checking system requirements..."
echo ""

JAVA_INSTALLED=$(command_exists java && echo "true" || echo "false")
NODE_INSTALLED=$(command_exists node && echo "true" || echo "false")
NPM_INSTALLED=$(command_exists npm && echo "true" || echo "false")
MAVEN_INSTALLED=$(command_exists mvn && echo "true" || echo "false")
GIT_INSTALLED=$(command_exists git && echo "true" || echo "false")

echo "Status Check:"
[[ "$JAVA_INSTALLED" == "true" ]] && echo "  [✓] Java JDK 17+" || echo "  [✗] Java JDK 17+"
if [[ "$JAVA_INSTALLED" == "true" ]]; then
    echo "      Version: $(get_java_version)"
fi
[[ "$NODE_INSTALLED" == "true" ]] && echo "  [✓] Node.js 18+" || echo "  [✗] Node.js 18+"
if [[ "$NODE_INSTALLED" == "true" ]]; then
    echo "      Version: $(get_node_version)"
fi
[[ "$NPM_INSTALLED" == "true" ]] && echo "  [✓] npm" || echo "  [✗] npm"
[[ "$MAVEN_INSTALLED" == "true" ]] && echo "  [✓] Maven" || echo "  [✗] Maven"
[[ "$GIT_INSTALLED" == "true" ]] && echo "  [✓] Git" || echo "  [✗] Git"
echo ""

MISSING_TOOLS=()
[[ "$JAVA_INSTALLED" == "false" ]] && MISSING_TOOLS+=("Java JDK 17")
[[ "$NODE_INSTALLED" == "false" || "$NPM_INSTALLED" == "false" ]] && MISSING_TOOLS+=("Node.js & npm")
[[ "$MAVEN_INSTALLED" == "false" ]] && MISSING_TOOLS+=("Maven")
[[ "$GIT_INSTALLED" == "false" ]] && MISSING_TOOLS+=("Git")

if [[ ${#MISSING_TOOLS[@]} -gt 0 ]]; then
    echo "Missing tools detected: ${MISSING_TOOLS[*]}"
    echo ""
    echo "Please install the following tools manually:"
    [[ "$JAVA_INSTALLED" == "false" ]] && echo "  - Java JDK 17+: https://adoptium.net/"
    [[ "$NODE_INSTALLED" == "false" ]] && echo "  - Node.js 18+: https://nodejs.org/"
    [[ "$MAVEN_INSTALLED" == "false" ]] && echo "  - Maven: https://maven.apache.org/download.cgi"
    [[ "$GIT_INSTALLED" == "false" ]] && echo "  - Git: https://git-scm.com/download"
    echo ""
    exit 1
fi

echo "All required tools are installed! ✓"
echo ""
echo "Installing dependencies..."
echo ""

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "Building backend..."
cd backend
mvn clean install -DskipTests
cd ..

echo ""
echo "============================================"
echo "   Setup completed successfully! ✓"
echo "============================================"
echo ""
echo "To start the application:"
echo "  Run: ./start.sh"
echo ""
echo "Or start services individually:"
echo "  Backend:  ./start-backend.sh"
echo "  Frontend: ./start-frontend.sh"
echo ""
