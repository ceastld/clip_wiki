# Deploy script for Clip Wiki (PowerShell version)
# This script helps with the deployment process

Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Please run this script from the website directory." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Build the project
Write-Host "🔨 Building the project..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
    Write-Host "🌐 Your site is ready for deployment on Vercel" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Push your changes to GitHub" -ForegroundColor White
    Write-Host "2. Vercel will automatically deploy your site" -ForegroundColor White
    Write-Host "3. Visit https://clip-wiki.vercel.app to see your site" -ForegroundColor White
} else {
    Write-Host "❌ Build failed. Please check the error messages above." -ForegroundColor Red
    exit 1
}
