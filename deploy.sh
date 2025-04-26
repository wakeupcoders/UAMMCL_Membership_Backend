#!/bin/bash

# Set the path to your Node.js project
PROJECT_DIR="./"

# Navigate to the project directory
cd $PROJECT_DIR

# Pull the latest code from GitHub
git pull  # Change branch if needed

# Install dependencies
npm install

# Build the project (if needed)
#npm run build  # Uncomment if your project requires building

# Restart the Node.js application with PM2
pm2 restart index || pm2 start index.js

# Save PM2 process list
#pm2 save

# Restart NGINX (optional, in case of config changes)
sudo systemctl restart nginx