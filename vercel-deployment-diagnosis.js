#!/usr/bin/env node

/**
 * VERCEL DEPLOYMENT DIAGNOSIS AND SETUP
 * =====================================
 * 
 * Diagnoses why deployments aren't happening and provides setup instructions
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 VERCEL DEPLOYMENT DIAGNOSIS');
console.log('==============================\n');

function checkDeploymentSetup() {
  const checks = [];
  
  // Check 1: Vercel configuration files
  const vercelJsonExists = fs.existsSync('./vercel.json');
  checks.push({
    name: 'vercel.json Configuration',
    status: vercelJsonExists ? 'FOUND' : 'MISSING',
    details: vercelJsonExists ? 'Configuration file exists' : 'No vercel.json found'
  });
  
  // Check 2: .vercel directory (indicates project is linked)
  const vercelDirExists = fs.existsSync('./.vercel');
  checks.push({
    name: 'Vercel Project Link',
    status: vercelDirExists ? 'LINKED' : 'NOT_LINKED',
    details: vercelDirExists ? 'Project is linked to Vercel' : 'Project not linked to Vercel - CRITICAL ISSUE'
  });
  
  // Check 3: Package.json build scripts
  let packageJson = {};
  try {
    packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  } catch (e) {
    packageJson = {};
  }
  
  const hasValidScripts = packageJson.scripts && 
                          packageJson.scripts.build && 
                          packageJson.scripts.start;
  checks.push({
    name: 'Build Scripts',
    status: hasValidScripts ? 'VALID' : 'INVALID',
    details: hasValidScripts ? 'build and start scripts configured' : 'Missing required build/start scripts'
  });
  
  // Check 4: Next.js configuration
  const nextConfigExists = fs.existsSync('./next.config.js');
  checks.push({
    name: 'Next.js Configuration',
    status: nextConfigExists ? 'FOUND' : 'MISSING',
    details: nextConfigExists ? 'next.config.js exists' : 'No next.config.js found'
  });
  
  return checks;
}

function generateSetupInstructions(checks) {
  console.log('📋 DEPLOYMENT SETUP ANALYSIS:');
  console.log('==============================');
  
  let criticalIssues = 0;
  
  checks.forEach(check => {
    const icon = check.status.includes('FOUND') || check.status.includes('VALID') || check.status.includes('LINKED') ? '✅' : '❌';
    console.log(`${icon} ${check.name}: ${check.status}`);
    console.log(`   ${check.details}`);
    
    if (check.status.includes('NOT_LINKED') || check.status.includes('MISSING') || check.status.includes('INVALID')) {
      criticalIssues++;
    }
  });
  
  console.log('\n🚨 CRITICAL ISSUE IDENTIFIED:');
  console.log('==============================');
  
  if (criticalIssues > 0) {
    console.log('❌ VERCEL DEPLOYMENT NOT CONFIGURED');
    console.log('   This repository is not connected to Vercel for automatic deployment');
    console.log('   Git pushes are only updating GitHub, not triggering Vercel builds\n');
    
    console.log('🔧 IMMEDIATE DEPLOYMENT SETUP REQUIRED:');
    console.log('========================================');
    
    console.log('\n📱 OPTION 1: Vercel CLI Setup (Recommended)');
    console.log('   1. Install Vercel CLI: npm i -g vercel');
    console.log('   2. Login to Vercel: vercel login');
    console.log('   3. Link project: vercel --prod');
    console.log('   4. Follow prompts to connect repository');
    console.log('   5. Configure environment variables in Vercel dashboard');
    
    console.log('\n🌐 OPTION 2: Vercel Dashboard Setup');
    console.log('   1. Go to https://vercel.com/dashboard');
    console.log('   2. Click "New Project"');
    console.log('   3. Import from GitHub: ncpr100/KHESED-TEK-SYSTEMS-MARKETING-');
    console.log('   4. Configure build settings:');
    console.log('      - Framework: Next.js');
    console.log('      - Build Command: npm run build');
    console.log('      - Output Directory: .next');
    console.log('   5. Add environment variables from .env.vercel.template');
    
    console.log('\n⚡ URGENT ENVIRONMENT VARIABLES NEEDED:');
    console.log('   RESEND_API_KEY=re_xxxxx');
    console.log('   CONTACT_EMAIL_LATAM=contacto@khesedtek.com');
    console.log('   CONTACT_EMAIL_USA=contact@khesedtek.com');
    console.log('   CONTACT_EMAIL_GLOBAL=global@khesedtek.com');
    console.log('   GMAIL_USER=your-gmail@gmail.com');
    console.log('   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx');
    
  } else {
    console.log('✅ CONFIGURATION APPEARS VALID');
    console.log('   Check Vercel dashboard for deployment errors');
  }
}

function main() {
  const checks = checkDeploymentSetup();
  generateSetupInstructions(checks);
  
  console.log('\n🎯 NEXT STEPS:');
  console.log('===============');
  console.log('1. Set up Vercel deployment using one of the options above');
  console.log('2. Configure environment variables');
  console.log('3. Trigger deployment: git push origin main');
  console.log('4. Verify deployment in Vercel dashboard');
  console.log('5. Test form functionality on live site\n');
  
  console.log('🚨 PROTOCOL VIOLATION RESOLUTION BLOCKED UNTIL DEPLOYMENT SETUP COMPLETE');
}

main();