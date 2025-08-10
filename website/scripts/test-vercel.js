#!/usr/bin/env node

/**
 * Test script specifically for Vercel deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Vercel deployment configuration...\n');

// Test 1: Check vercel.json
console.log('1. Checking vercel.json...');
const vercelPath = path.join(__dirname, '../vercel.json');
if (fs.existsSync(vercelPath)) {
  console.log('   ✅ vercel.json found');
  const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  
  if (vercelConfig.buildCommand === 'npm run build') {
    console.log('   ✅ Build command is correct');
  } else {
    console.log('   ❌ Build command is incorrect');
  }
  
  if (vercelConfig.outputDirectory === 'build') {
    console.log('   ✅ Output directory is correct');
  } else {
    console.log('   ❌ Output directory is incorrect');
  }
  
  if (vercelConfig.env && vercelConfig.env.VERCEL === '1') {
    console.log('   ✅ Vercel environment variable is set');
  } else {
    console.log('   ❌ Vercel environment variable is missing');
  }
} else {
  console.log('   ❌ vercel.json not found');
}

// Test 2: Check Docusaurus config for Vercel
console.log('\n2. Checking Docusaurus configuration for Vercel...');
const configPath = path.join(__dirname, '../docusaurus.config.ts');
if (fs.existsSync(configPath)) {
  console.log('   ✅ docusaurus.config.ts found');
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  if (configContent.includes('clip-wiki.vercel.app')) {
    console.log('   ✅ Vercel URL is configured');
  } else {
    console.log('   ❌ Vercel URL is missing');
  }
  
  if (configContent.includes("baseUrl: isVercel ? '/' : '/clip_wiki/'")) {
    console.log('   ✅ Base URL logic is correct');
  } else {
    console.log('   ❌ Base URL logic is incorrect');
  }
} else {
  console.log('   ❌ docusaurus.config.ts not found');
}

// Test 3: Check build output
console.log('\n3. Checking build output...');
const buildPath = path.join(__dirname, '../build');
if (fs.existsSync(buildPath)) {
  console.log('   ✅ Build directory exists');
  
  const indexPath = path.join(buildPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('   ✅ index.html exists');
    
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    if (indexContent.includes('clip-wiki.vercel.app')) {
      console.log('   ✅ index.html contains correct Vercel URL');
    } else {
      console.log('   ❌ index.html does not contain Vercel URL');
    }
  } else {
    console.log('   ❌ index.html not found');
  }
} else {
  console.log('   ❌ Build directory not found - run npm run build:vercel first');
}

console.log('\n🎉 Vercel deployment test completed!');
console.log('\nNext steps:');
console.log('1. Push your changes to GitHub');
console.log('2. Connect your repository to Vercel');
console.log('3. Deploy and test your site');
