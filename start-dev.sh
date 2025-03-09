#!/bin/bash

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
xdg-open http://localhost:3000 || open http://localhost:3000 || start http://localhost:3000

echo "Development environment setup complete!"
