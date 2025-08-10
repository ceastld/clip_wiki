#!/usr/bin/env node

/**
 * Test script to verify deployment configurations
 * This script tests both Vercel and GitHub Pages configurations
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing deployment configurations...\n');

// Test 1: Check if vercel.json exists
console.log('1. Checking Vercel configuration...');
if (fs.existsSync(path.join(__dirname, '../vercel.json'))) {
  console.log('   ✅ vercel.json found');
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../vercel.json'), 'utf8'));
  if (vercelConfig.buildCommand && vercelConfig.outputDirectory) {
    console.log('   ✅ Vercel build configuration is valid');
  } else {
    console.log('   ❌ Vercel build configuration is missing');
  }
} else {
  console.log('   ❌ vercel.json not found');
}

// Test 2: Check if GitHub Actions workflow exists
console.log('\n2. Checking GitHub Actions configuration...');
const workflowPath = path.join(__dirname, '../../.github/workflows/deploy.yml');
if (fs.existsSync(workflowPath)) {
  console.log('   ✅ GitHub Actions workflow found');
  const workflowContent = fs.readFileSync(workflowPath, 'utf8');
  if (workflowContent.includes('GITHUB_PAGES') && workflowContent.includes('deploy-pages')) {
    console.log('   ✅ GitHub Pages deployment configuration is valid');
  } else {
    console.log('   ❌ GitHub Pages deployment configuration is missing');
  }
} else {
  console.log('   ❌ GitHub Actions workflow not found');
}

// Test 3: Check Docusaurus configuration
console.log('\n3. Checking Docusaurus configuration...');
const configPath = path.join(__dirname, '../docusaurus.config.ts');
if (fs.existsSync(configPath)) {
  console.log('   ✅ docusaurus.config.ts found');
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  if (configContent.includes('isVercel') && configContent.includes('isGitHubPages')) {
    console.log('   ✅ Platform detection logic found');
  } else {
    console.log('   ❌ Platform detection logic missing');
  }
  
  if (configContent.includes('clip-wiki.vercel.app') && configContent.includes('ceastld.github.io')) {
    console.log('   ✅ Both deployment URLs configured');
  } else {
    console.log('   ❌ Deployment URLs not properly configured');
  }
} else {
  console.log('   ❌ docusaurus.config.ts not found');
}

// Test 4: Check package.json scripts
console.log('\n4. Checking package.json scripts...');
const packagePath = path.join(__dirname, '../package.json');
if (fs.existsSync(packagePath)) {
  console.log('   ✅ package.json found');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  if (packageJson.scripts && packageJson.scripts.build) {
    console.log('   ✅ Build script found');
  } else {
    console.log('   ❌ Build script missing');
  }
  
  if (packageJson.engines && packageJson.engines.node) {
    console.log('   ✅ Node.js version requirement specified');
  } else {
    console.log('   ❌ Node.js version requirement missing');
  }
} else {
  console.log('   ❌ package.json not found');
}

console.log('\n🎉 Deployment configuration test completed!');
console.log('\nNext steps:');
console.log('1. Push your changes to GitHub');
console.log('2. Both Vercel and GitHub Pages will automatically deploy');
console.log('3. Check the deployment status in your respective platforms');
