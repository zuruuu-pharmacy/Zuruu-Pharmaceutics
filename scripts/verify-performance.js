#!/usr/bin/env node

/**
 * Performance Verification Script
 * Quick verification of performance optimizations
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description}: ${filePath}`, 'green');
    return true;
  } else {
    log(`❌ ${description}: ${filePath}`, 'red');
    return false;
  }
}

function checkFileContent(filePath, searchText, description) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(searchText)) {
      log(`✅ ${description}`, 'green');
      return true;
    } else {
      log(`❌ ${description}`, 'yellow');
      return false;
    }
  } else {
    log(`❌ ${description} (file not found)`, 'red');
    return false;
  }
}

function main() {
  log('🚀 Zuruu AI Pharmacy Performance Verification', 'bold');
  log('='.repeat(60), 'blue');
  
  let passed = 0;
  let total = 0;
  
  // Check performance components
  log('\n📦 Performance Components:', 'bold');
  total++; if (checkFileExists('src/components/performance/mobile-optimized-animations.tsx', 'Mobile Optimized Animations')) passed++;
  total++; if (checkFileExists('src/components/performance/performance-monitor.tsx', 'Performance Monitor')) passed++;
  total++; if (checkFileExists('src/config/performance.ts', 'Performance Configuration')) passed++;
  
  // Check updated files
  log('\n🔧 Updated Files:', 'bold');
  total++; if (checkFileContent('src/components/landing/cinematic-hero-video.tsx', 'IntersectionObserver', 'Hero Video Lazy Loading')) passed++;
  total++; if (checkFileContent('next.config.ts', 'Cache-Control', 'Performance Headers')) passed++;
  total++; if (checkFileContent('package.json', 'perf:test', 'Performance Scripts')) passed++;
  
  // Check documentation
  log('\n📚 Documentation:', 'bold');
  total++; if (checkFileExists('PERFORMANCE_OPTIMIZATION_CHECKLIST.md', 'Performance Checklist')) passed++;
  total++; if (checkFileExists('PERFORMANCE_README.md', 'Performance README')) passed++;
  total++; if (checkFileExists('PERFORMANCE_SUMMARY.md', 'Performance Summary')) passed++;
  
  // Check testing scripts
  log('\n🧪 Testing Scripts:', 'bold');
  total++; if (checkFileExists('scripts/performance-test.js', 'Performance Test Script')) passed++;
  total++; if (checkFileExists('scripts/verify-performance.js', 'Verification Script')) passed++;
  
  // Check assets structure
  log('\n🎨 Assets Structure:', 'bold');
  total++; if (checkFileExists('public/assets/hero/poster.jpg', 'Hero Poster Image')) passed++;
  total++; if (checkFileExists('public/assets/icons/login-patient.svg', 'Patient Login Icon')) passed++;
  total++; if (checkFileExists('public/assets/icons/login-pharmacist.svg', 'Pharmacist Login Icon')) passed++;
  total++; if (checkFileExists('public/assets/icons/login-student.svg', 'Student Login Icon')) passed++;
  
  // Summary
  log('\n📊 Verification Summary:', 'bold');
  log('='.repeat(60), 'blue');
  log(`Passed: ${passed}/${total} checks`, passed === total ? 'green' : 'yellow');
  
  if (passed === total) {
    log('\n🎉 All performance optimizations verified successfully!', 'green');
    log('Your Zuruu AI Pharmacy landing page is ready for production!', 'green');
  } else {
    log('\n⚠️  Some optimizations need attention', 'yellow');
    log('Please review the failed checks above', 'yellow');
  }
  
  log('\n🚀 Next Steps:', 'bold');
  log('1. Run: npm run perf:test', 'blue');
  log('2. Run: npm run lighthouse', 'blue');
  log('3. Test on mobile devices', 'blue');
  log('4. Deploy to production!', 'blue');
  
  process.exit(passed === total ? 0 : 1);
}

if (require.main === module) {
  main();
}
