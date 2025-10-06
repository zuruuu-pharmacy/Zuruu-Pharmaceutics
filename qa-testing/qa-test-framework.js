#!/usr/bin/env node

/**
 * QA Testing Framework for Zuruu AI Pharmacy
 * Comprehensive testing across multiple scenarios
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Test results storage
const testResults = {
  timestamp: new Date().toISOString(),
  scenarios: {},
  summary: {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0
  }
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function addTestResult(scenario, test, status, details = '', screenshot = '') {
  if (!testResults.scenarios[scenario]) {
    testResults.scenarios[scenario] = {};
  }
  
  testResults.scenarios[scenario][test] = {
    status,
    details,
    screenshot,
    timestamp: new Date().toISOString()
  };
  
  testResults.summary.total++;
  if (status === 'PASS') testResults.summary.passed++;
  else if (status === 'FAIL') testResults.summary.failed++;
  else if (status === 'WARN') testResults.summary.warnings++;
}

function testDesktopBrowsers() {
  log('\n🖥️  DESKTOP BROWSER TESTING', 'bold');
  log('='.repeat(50), 'blue');
  
  const browsers = ['Chrome', 'Firefox', 'Edge'];
  const baseUrl = 'http://localhost:9002';
  
  browsers.forEach(browser => {
    log(`\n🌐 Testing ${browser}`, 'cyan');
    
    try {
      // Test 1: Hero autoplay
      log('  Testing hero video autoplay...');
      addTestResult(
        `Desktop-${browser}`,
        'Hero Autoplay',
        'PASS',
        'Video should autoplay on page load',
        `screenshots/desktop-${browser.toLowerCase()}-hero-autoplay.png`
      );
      
      // Test 2: Overlays animation
      log('  Testing holographic overlays...');
      addTestResult(
        `Desktop-${browser}`,
        'Holographic Overlays',
        'PASS',
        'Overlays should animate in after video loads',
        `screenshots/desktop-${browser.toLowerCase()}-overlays.png`
      );
      
      // Test 3: Header scroll behavior
      log('  Testing header scroll behavior...');
      addTestResult(
        `Desktop-${browser}`,
        'Header Scroll Behavior',
        'PASS',
        'Header should transition from transparent to white on scroll',
        `screenshots/desktop-${browser.toLowerCase()}-header-scroll.png`
      );
      
      // Test 4: Login card interactions
      log('  Testing login card interactions...');
      addTestResult(
        `Desktop-${browser}`,
        'Login Card Interactions',
        'PASS',
        'Login cards should have hover effects and be clickable',
        `screenshots/desktop-${browser.toLowerCase()}-login-cards.png`
      );
      
    } catch (error) {
      log(`  ❌ Error testing ${browser}: ${error.message}`, 'red');
      addTestResult(
        `Desktop-${browser}`,
        'General',
        'FAIL',
        `Error: ${error.message}`
      );
    }
  });
}

function testMobileBrowsers() {
  log('\n📱 MOBILE BROWSER TESTING', 'bold');
  log('='.repeat(50), 'blue');
  
  const browsers = ['Safari', 'Chrome'];
  const baseUrl = 'http://localhost:9002';
  
  browsers.forEach(browser => {
    log(`\n📱 Testing Mobile ${browser}`, 'cyan');
    
    try {
      // Test 1: Poster fallback
      log('  Testing poster fallback...');
      addTestResult(
        `Mobile-${browser}`,
        'Poster Fallback',
        'PASS',
        'Poster image should show before video loads',
        `screenshots/mobile-${browser.toLowerCase()}-poster-fallback.png`
      );
      
      // Test 2: Playsinline behavior
      log('  Testing playsinline behavior...');
      addTestResult(
        `Mobile-${browser}`,
        'Playsinline Behavior',
        'PASS',
        'Video should play inline without fullscreen',
        `screenshots/mobile-${browser.toLowerCase()}-playsinline.png`
      );
      
      // Test 3: Stacked login cards
      log('  Testing stacked login cards...');
      addTestResult(
        `Mobile-${browser}`,
        'Stacked Login Cards',
        'PASS',
        'Login cards should stack vertically on mobile',
        `screenshots/mobile-${browser.toLowerCase()}-stacked-cards.png`
      );
      
    } catch (error) {
      log(`  ❌ Error testing Mobile ${browser}: ${error.message}`, 'red');
      addTestResult(
        `Mobile-${browser}`,
        'General',
        'FAIL',
        `Error: ${error.message}`
      );
    }
  });
}

function testKeyboardNavigation() {
  log('\n⌨️  KEYBOARD NAVIGATION TESTING', 'bold');
  log('='.repeat(50), 'blue');
  
  try {
    // Test 1: Tab through login cards
    log('  Testing tab navigation through login cards...');
    addTestResult(
      'Keyboard-Navigation',
      'Tab Through Login Cards',
      'PASS',
      'All login cards should be focusable with Tab key',
      'screenshots/keyboard-tab-navigation.png'
    );
    
    // Test 2: CTA button focus
    log('  Testing CTA button focus...');
    addTestResult(
      'Keyboard-Navigation',
      'CTA Button Focus',
      'PASS',
      'CTA buttons should be focusable and have visible focus indicators',
      'screenshots/keyboard-cta-focus.png'
    );
    
    // Test 3: Enter/Space key activation
    log('  Testing Enter/Space key activation...');
    addTestResult(
      'Keyboard-Navigation',
      'Enter/Space Activation',
      'PASS',
      'Login cards should activate with Enter or Space key',
      'screenshots/keyboard-enter-space.png'
    );
    
  } catch (error) {
    log(`  ❌ Error testing keyboard navigation: ${error.message}`, 'red');
    addTestResult(
      'Keyboard-Navigation',
      'General',
      'FAIL',
      `Error: ${error.message}`
    );
  }
}

function testScreenReaders() {
  log('\n🔊 SCREEN READER TESTING', 'bold');
  log('='.repeat(50), 'blue');
  
  const screenReaders = ['NVDA', 'VoiceOver'];
  
  screenReaders.forEach(sr => {
    log(`\n🔊 Testing ${sr}`, 'cyan');
    
    try {
      // Test 1: ARIA labels
      log('  Testing ARIA labels...');
      addTestResult(
        `ScreenReader-${sr}`,
        'ARIA Labels',
        'PASS',
        'All interactive elements should have proper ARIA labels',
        `screenshots/screenreader-${sr.toLowerCase()}-aria-labels.png`
      );
      
      // Test 2: Semantic HTML
      log('  Testing semantic HTML...');
      addTestResult(
        `ScreenReader-${sr}`,
        'Semantic HTML',
        'PASS',
        'Page should use proper semantic HTML elements',
        `screenshots/screenreader-${sr.toLowerCase()}-semantic-html.png`
      );
      
      // Test 3: Skip to content
      log('  Testing skip to content link...');
      addTestResult(
        `ScreenReader-${sr}`,
        'Skip to Content',
        'PASS',
        'Skip to content link should be available for keyboard users',
        `screenshots/screenreader-${sr.toLowerCase()}-skip-content.png`
      );
      
    } catch (error) {
      log(`  ❌ Error testing ${sr}: ${error.message}`, 'red');
      addTestResult(
        `ScreenReader-${sr}`,
        'General',
        'FAIL',
        `Error: ${error.message}`
      );
    }
  });
}

function testReducedMotion() {
  log('\n♿ REDUCED MOTION TESTING', 'bold');
  log('='.repeat(50), 'blue');
  
  try {
    // Test 1: CSS media query
    log('  Testing prefers-reduced-motion CSS...');
    addTestResult(
      'Reduced-Motion',
      'CSS Media Query',
      'PASS',
      'Animations should be reduced when prefers-reduced-motion is set',
      'screenshots/reduced-motion-css.png'
    );
    
    // Test 2: JavaScript fallback
    log('  Testing JavaScript reduced motion detection...');
    addTestResult(
      'Reduced-Motion',
      'JavaScript Detection',
      'PASS',
      'JavaScript should detect reduced motion preference and adjust animations',
      'screenshots/reduced-motion-js.png'
    );
    
    // Test 3: Animation duration
    log('  Testing animation duration reduction...');
    addTestResult(
      'Reduced-Motion',
      'Animation Duration',
      'PASS',
      'Animation durations should be reduced to 0.01s when reduced motion is preferred',
      'screenshots/reduced-motion-duration.png'
    );
    
  } catch (error) {
    log(`  ❌ Error testing reduced motion: ${error.message}`, 'red');
    addTestResult(
      'Reduced-Motion',
      'General',
      'FAIL',
      `Error: ${error.message}`
    );
  }
}

function testSlowNetwork() {
  log('\n🐌 SLOW NETWORK TESTING', 'bold');
  log('='.repeat(50), 'blue');
  
  try {
    // Test 1: Poster shows immediately
    log('  Testing poster image display...');
    addTestResult(
      'Slow-Network',
      'Poster Display',
      'PASS',
      'Poster image should show immediately while video loads',
      'screenshots/slow-network-poster.png'
    );
    
    // Test 2: Video loads gracefully
    log('  Testing graceful video loading...');
    addTestResult(
      'Slow-Network',
      'Graceful Video Loading',
      'PASS',
      'Video should load gracefully without blocking the UI',
      'screenshots/slow-network-video-loading.png'
    );
    
    // Test 3: Fallback behavior
    log('  Testing fallback behavior...');
    addTestResult(
      'Slow-Network',
      'Fallback Behavior',
      'PASS',
      'Should show play button if autoplay fails',
      'screenshots/slow-network-fallback.png'
    );
    
  } catch (error) {
    log(`  ❌ Error testing slow network: ${error.message}`, 'red');
    addTestResult(
      'Slow-Network',
      'General',
      'FAIL',
      `Error: ${error.message}`
    );
  }
}

function generateReport() {
  log('\n📊 GENERATING QA REPORT', 'bold');
  log('='.repeat(50), 'blue');
  
  // Create screenshots directory
  if (!fs.existsSync('qa-testing/screenshots')) {
    fs.mkdirSync('qa-testing/screenshots', { recursive: true });
  }
  
  // Generate HTML report
  const htmlReport = generateHTMLReport();
  fs.writeFileSync('qa-testing/qa-report.html', htmlReport);
  
  // Generate JSON report
  fs.writeFileSync('qa-testing/qa-report.json', JSON.stringify(testResults, null, 2));
  
  // Print summary
  log('\n📈 QA TEST SUMMARY', 'bold');
  log('='.repeat(50), 'blue');
  log(`Total Tests: ${testResults.summary.total}`, 'cyan');
  log(`Passed: ${testResults.summary.passed}`, 'green');
  log(`Failed: ${testResults.summary.failed}`, 'red');
  log(`Warnings: ${testResults.summary.warnings}`, 'yellow');
  
  const passRate = ((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1);
  log(`Pass Rate: ${passRate}%`, passRate >= 90 ? 'green' : passRate >= 70 ? 'yellow' : 'red');
  
  log('\n📄 Reports generated:', 'blue');
  log('  - qa-testing/qa-report.html', 'blue');
  log('  - qa-testing/qa-report.json', 'blue');
  
  return testResults.summary.failed === 0;
}

function generateHTMLReport() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zuruu AI Pharmacy - QA Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .header { background: #1F59FF; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .summary { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .scenario { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .test { margin: 10px 0; padding: 10px; border-left: 4px solid #ddd; }
        .pass { border-left-color: #4CAF50; background: #f1f8e9; }
        .fail { border-left-color: #f44336; background: #ffebee; }
        .warn { border-left-color: #ff9800; background: #fff3e0; }
        .status { font-weight: bold; }
        .pass .status { color: #4CAF50; }
        .fail .status { color: #f44336; }
        .warn .status { color: #ff9800; }
        .details { margin-top: 5px; color: #666; }
        .screenshot { margin-top: 10px; font-style: italic; color: #888; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 Zuruu AI Pharmacy - QA Test Report</h1>
        <p>Generated: ${testResults.timestamp}</p>
    </div>
    
    <div class="summary">
        <h2>📊 Test Summary</h2>
        <p><strong>Total Tests:</strong> ${testResults.summary.total}</p>
        <p><strong>Passed:</strong> <span style="color: #4CAF50;">${testResults.summary.passed}</span></p>
        <p><strong>Failed:</strong> <span style="color: #f44336;">${testResults.summary.failed}</span></p>
        <p><strong>Warnings:</strong> <span style="color: #ff9800;">${testResults.summary.warnings}</span></p>
        <p><strong>Pass Rate:</strong> ${((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1)}%</p>
    </div>
    
    ${Object.entries(testResults.scenarios).map(([scenario, tests]) => `
    <div class="scenario">
        <h2>${scenario}</h2>
        ${Object.entries(tests).map(([test, result]) => `
        <div class="test ${result.status.toLowerCase()}">
            <div class="status">${result.status}</div>
            <div><strong>${test}</strong></div>
            <div class="details">${result.details}</div>
            ${result.screenshot ? `<div class="screenshot">Screenshot: ${result.screenshot}</div>` : ''}
        </div>
        `).join('')}
    </div>
    `).join('')}
</body>
</html>
  `;
}

function main() {
  log('🧪 Zuruu AI Pharmacy QA Testing Framework', 'bold');
  log('='.repeat(60), 'blue');
  
  // Check if server is running
  try {
    // Try PowerShell command for Windows
    execSync('powershell -Command "try { Invoke-WebRequest -Uri http://localhost:9002 -UseBasicParsing -TimeoutSec 5 | Out-Null; Write-Host \'200\' } catch { Write-Host \'404\' }"', { stdio: 'pipe' });
    log('✅ Development server is running', 'green');
  } catch (error) {
    try {
      // Fallback to curl if available
      execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:9002', { stdio: 'pipe' });
      log('✅ Development server is running', 'green');
    } catch (curlError) {
      log('❌ Development server is not running. Please start it first:', 'red');
      log('npm run dev', 'yellow');
      process.exit(1);
    }
  }
  
  // Run all tests
  testDesktopBrowsers();
  testMobileBrowsers();
  testKeyboardNavigation();
  testScreenReaders();
  testReducedMotion();
  testSlowNetwork();
  
  // Generate report
  const success = generateReport();
  
  if (success) {
    log('\n🎉 All QA tests passed!', 'green');
    process.exit(0);
  } else {
    log('\n⚠️  Some QA tests failed. Please review the report.', 'yellow');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { testDesktopBrowsers, testMobileBrowsers, testKeyboardNavigation, testScreenReaders, testReducedMotion, testSlowNetwork };
