#!/bin/bash

# Change to the directory where the script is located
cd "$(dirname "$0")"

# Function to check if a command exists
command_exists () {
    type "$1" &> /dev/null ;
}

# Check for required commands
if ! command_exists json-server ; then
    echo "Error: json-server is not installed. Please install it with 'npm install -g json-server'."
    exit 1
fi

if ! command_exists npm ; then
    echo "Error: npm is not installed. Please install Node.js and npm."
    exit 1
fi

# Kill existing processes (optional)
echo "Stopping any existing servers..."
killall json-server 2>/dev/null
killall node 2>/dev/null

# Start the mock API server
echo "Starting JSON Server on port 3001..."
json-server --watch db.json --port 3001 &

# Wait for JSON Server to start
sleep 2

# Start the React development server
echo "Starting React development server..."
npm start &

# Wait for React server to start
sleep 5

# Open the application in the default browser
echo "Opening http://localhost:3000 in your browser..."
open http://localhost:3000

echo "Development environment setup complete!"

# Keep the terminal window open
read -p "Press Enter to exit..."
