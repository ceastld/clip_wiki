#!/bin/bash

# Deploy script for Clip Wiki
# This script helps with the deployment process

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the website directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "🌐 Your site is ready for deployment on Vercel"
    echo ""
    echo "Next steps:"
    echo "1. Push your changes to GitHub"
    echo "2. Vercel will automatically deploy your site"
    echo "3. Visit https://clip-wiki.vercel.app to see your site"
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi
