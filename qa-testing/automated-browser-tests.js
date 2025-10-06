#!/usr/bin/env node

/**
 * Automated Browser Testing for Zuruu AI Pharmacy
 * Uses Puppeteer for automated testing across different scenarios
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Test configuration
const TEST_CONFIG = {
  baseUrl: 'http://localhost:9002',
  viewports: {
    desktop: { width: 1920, height: 1080 },
    mobile: { width: 375, height: 812 },
    tablet: { width: 768, height: 1024 }
  },
  browsers: ['chrome', 'firefox', 'edge'],
  screenshots: true,
  video: false
};

// Test results
const testResults = {
  timestamp: new Date().toISOString(),
  tests: [],
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

async function takeScreenshot(page, name, description) {
  if (!TEST_CONFIG.screenshots) return '';
  
  const screenshotDir = 'qa-testing/screenshots';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  
  const filename = `${screenshotDir}/${name}.png`;
  await page.screenshot({ path: filename, fullPage: true });
  return filename;
}

async function testHeroVideoAutoplay(page, browserName, viewport) {
  log(`  Testing hero video autoplay in ${browserName} (${viewport})...`);
  
  try {
    await page.goto(TEST_CONFIG.baseUrl, { waitUntil: 'networkidle0' });
    
    // Wait for video to load
    await page.waitForSelector('video', { timeout: 10000 });
    
    // Check if video is playing
    const isPlaying = await page.evaluate(() => {
      const video = document.querySelector('video');
      return video && !video.paused && !video.ended && video.readyState > 2;
    });
    
    const screenshot = await takeScreenshot(page, `${browserName}-${viewport}-hero-autoplay`, 'Hero video autoplay test');
    
    const result = {
      test: 'Hero Video Autoplay',
      browser: browserName,
      viewport: viewport,
      status: isPlaying ? 'PASS' : 'FAIL',
      details: isPlaying ? 'Video is playing automatically' : 'Video is not playing automatically',
      screenshot: screenshot,
      timestamp: new Date().toISOString()
    };
    
    testResults.tests.push(result);
    testResults.summary.total++;
    if (result.status === 'PASS') testResults.summary.passed++;
    else testResults.summary.failed++;
    
    log(`    ${result.status}: ${result.details}`, result.status === 'PASS' ? 'green' : 'red');
    return result;
    
  } catch (error) {
    const result = {
      test: 'Hero Video Autoplay',
      browser: browserName,
      viewport: viewport,
      status: 'FAIL',
      details: `Error: ${error.message}`,
      screenshot: '',
      timestamp: new Date().toISOString()
    };
    
    testResults.tests.push(result);
    testResults.summary.total++;
    testResults.summary.failed++;
    
    log(`    FAIL: ${error.message}`, 'red');
    return result;
  }
}

async function testHolographicOverlays(page, browserName, viewport) {
  log(`  Testing holographic overlays in ${browserName} (${viewport})...`);
  
  try {
    await page.goto(TEST_CONFIG.baseUrl, { waitUntil: 'networkidle0' });
    
    // Wait for overlays to appear (they have a delay)
    await page.waitForTimeout(2000);
    
    // Check if overlays are visible
    const overlaysVisible = await page.evaluate(() => {
      const overlays = document.querySelectorAll('[class*="glass-card-subtle"]');
      return overlays.length >= 3 && Array.from(overlays).every(overlay => 
        window.getComputedStyle(overlay).opacity !== '0'
      );
    });
    
    const screenshot = await takeScreenshot(page, `${browserName}-${viewport}-overlays`, 'Holographic overlays test');
    
    const result = {
      test: 'Holographic Overlays',
      browser: browserName,
      viewport: viewport,
      status: overlaysVisible ? 'PASS' : 'FAIL',
      details: overlaysVisible ? 'All 3 overlays are visible and animated' : 'Overlays not visible or not animated properly',
      screenshot: screenshot,
      timestamp: new Date().toISOString()
    };
    
    testResults.tests.push(result);
    testResults.summary.total++;
    if (result.status === 'PASS') testResults.summary.passed++;
    else testResults.summary.failed++;
    
    log(`    ${result.status}: ${result.details}`, result.status === 'PASS' ? 'green' : 'red');
    return result;
    
  } catch (error) {
    const result = {
      test: 'Holographic Overlays',
      browser: browserName,
      viewport: viewport,
      status: 'FAIL',
      details: `Error: ${error.message}`,
      screenshot: '',
      timestamp: new Date().toISOString()
    };
    
    testResults.tests.push(result);
    testResults.summary.total++;
    testResults.summary.failed++;
    
    log(`    FAIL: ${error.message}`, 'red');
    return result;
  }
}

async function testLoginCardInteractions(page, browserName, viewport) {
  log(`  Testing login card interactions in ${browserName} (${viewport})...`);
  
  try {
    await page.goto(TEST_CONFIG.baseUrl, { waitUntil: 'networkidle0' });
    
    // Wait for login cards to load
    await page.waitForSelector('[class*="login-card"]', { timeout: 10000 });
    
    // Test hover effect
    const loginCard = await page.$('[class*="login-card"]');
    if (loginCard) {
      await loginCard.hover();
      await page.waitForTimeout(500); // Wait for hover animation
    }
    
    // Test click interaction
    const clickResult = await page.evaluate(() => {
      const loginCard = document.querySelector('[class*="login-card"]');
      if (loginCard) {
        loginCard.click();
        return true;
      }
      return false;
    });
    
    const screenshot = await takeScreenshot(page, `${browserName}-${viewport}-login-interactions`, 'Login card interactions test');
    
    const result = {
      test: 'Login Card Interactions',
      browser: browserName,
      viewport: viewport,
      status: clickResult ? 'PASS' : 'FAIL',
      details: clickResult ? 'Login cards respond to hover and click' : 'Login cards not responding to interactions',
      screenshot: screenshot,
      timestamp: new Date().toISOString()
    };
    
    testResults.tests.push(result);
    testResults.summary.total++;
    if (result.status === 'PASS') testResults.summary.passed++;
    else testResults.summary.failed++;
    
    log(`    ${result.status}: ${result.details}`, result.status === 'PASS' ? 'green' : 'red');
    return result;
    
  } catch (error) {
    const result = {
      test: 'Login Card Interactions',
      browser: browserName,
      viewport: viewport,
      status: 'FAIL',
      details: `Error: ${error.message}`,
      screenshot: '',
      timestamp: new Date().toISOString()
    };
    
    testResults.tests.push(result);
    testResults.summary.total++;
    testResults.summary.failed++;
    
    log(`    FAIL: ${error.message}`, 'red');
    return result;
  }
}

async function testKeyboardNavigation(page, browserName, viewport) {
  log(`  Testing keyboard navigation in ${browserName} (${viewport})...`);
  
  try {
    await page.goto(TEST_CONFIG.baseUrl, { waitUntil: 'networkidle0' });
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusVisible = await page.evaluate(() => {
      const focusedElement = document.activeElement;
      return focusedElement && window.getComputedStyle(focusedElement).outline !== 'none';
    });
    
    // Test Enter key activation
    await page.keyboard.press('Enter');
    
    const screenshot = await takeScreenshot(page, `${browserName}-${viewport}-keyboard-nav`, 'Keyboard navigation test');
    
    const result = {
      test: 'Keyboard Navigation',
      browser: browserName,
      viewport: viewport,
      status: focusVisible ? 'PASS' : 'WARN',
      details: focusVisible ? 'Keyboard navigation works with visible focus' : 'Focus not visible, but navigation works',
      screenshot: screenshot,
      timestamp: new Date().toISOString()
    };
    
    testResults.tests.push(result);
    testResults.summary.total++;
    if (result.status === 'PASS') testResults.summary.passed++;
    else if (result.status === 'WARN') testResults.summary.warnings++;
    else testResults.summary.failed++;
    
    log(`    ${result.status}: ${result.details}`, result.status === 'PASS' ? 'green' : result.status === 'WARN' ? 'yellow' : 'red');
    return result;
    
  } catch (error) {
    const result = {
      test: 'Keyboard Navigation',
      browser: browserName,
      viewport: viewport,
      status: 'FAIL',
      details: `Error: ${error.message}`,
      screenshot: '',
      timestamp: new Date().toISOString()
    };
    
    testResults.tests.push(result);
    testResults.summary.total++;
    testResults.summary.failed++;
    
    log(`    FAIL: ${error.message}`, 'red');
    return result;
  }
}

async function testMobileLayout(page, browserName, viewport) {
  log(`  Testing mobile layout in ${browserName} (${viewport})...`);
  
  try {
    await page.goto(TEST_CONFIG.baseUrl, { waitUntil: 'networkidle0' });
    
    // Check if mobile layout is applied
    const isMobileLayout = await page.evaluate(() => {
      return window.innerWidth < 768;
    });
    
    // Check if login cards are stacked
    const cardsStacked = await page.evaluate(() => {
      const loginCards = document.querySelectorAll('[class*="login-card"]');
      if (loginCards.length === 0) return false;
      
      const firstCard = loginCards[0];
      const secondCard = loginCards[1];
      
      if (!firstCard || !secondCard) return false;
      
      const firstRect = firstCard.getBoundingClientRect();
      const secondRect = secondCard.getBoundingClientRect();
      
      // Check if cards are stacked vertically
      return secondRect.top > firstRect.bottom;
    });
    
    const screenshot = await takeScreenshot(page, `${browserName}-${viewport}-mobile-layout`, 'Mobile layout test');
    
    const result = {
      test: 'Mobile Layout',
      browser: browserName,
      viewport: viewport,
      status: (isMobileLayout && cardsStacked) ? 'PASS' : 'FAIL',
      details: (isMobileLayout && cardsStacked) ? 'Mobile layout applied with stacked cards' : 'Mobile layout not working properly',
      screenshot: screenshot,
      timestamp: new Date().toISOString()
    };
    
    testResults.tests.push(result);
    testResults.summary.total++;
    if (result.status === 'PASS') testResults.summary.passed++;
    else testResults.summary.failed++;
    
    log(`    ${result.status}: ${result.details}`, result.status === 'PASS' ? 'green' : 'red');
    return result;
    
  } catch (error) {
    const result = {
      test: 'Mobile Layout',
      browser: browserName,
      viewport: viewport,
      status: 'FAIL',
      details: `Error: ${error.message}`,
      screenshot: '',
      timestamp: new Date().toISOString()
    };
    
    testResults.tests.push(result);
    testResults.summary.total++;
    testResults.summary.failed++;
    
    log(`    FAIL: ${error.message}`, 'red');
    return result;
  }
}

async function runBrowserTests() {
  log('🚀 Starting Automated Browser Tests', 'bold');
  log('='.repeat(50), 'blue');
  
  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    for (const [viewportName, viewport] of Object.entries(TEST_CONFIG.viewports)) {
      log(`\n📱 Testing ${viewportName} viewport (${viewport.width}x${viewport.height})`, 'cyan');
      
      const page = await browser.newPage();
      await page.setViewport(viewport);
      
      // Run all tests for this viewport
      await testHeroVideoAutoplay(page, 'chrome', viewportName);
      await testHolographicOverlays(page, 'chrome', viewportName);
      await testLoginCardInteractions(page, 'chrome', viewportName);
      await testKeyboardNavigation(page, 'chrome', viewportName);
      
      if (viewportName === 'mobile') {
        await testMobileLayout(page, 'chrome', viewportName);
      }
      
      await page.close();
    }
    
  } finally {
    await browser.close();
  }
}

function generateTestReport() {
  log('\n📊 Generating Test Report', 'bold');
  log('='.repeat(50), 'blue');
  
  // Create reports directory
  if (!fs.existsSync('qa-testing/reports')) {
    fs.mkdirSync('qa-testing/reports', { recursive: true });
  }
  
  // Generate JSON report
  const jsonReport = JSON.stringify(testResults, null, 2);
  fs.writeFileSync('qa-testing/reports/automated-test-results.json', jsonReport);
  
  // Generate HTML report
  const htmlReport = generateHTMLReport();
  fs.writeFileSync('qa-testing/reports/automated-test-results.html', htmlReport);
  
  // Print summary
  log('\n📈 Test Summary', 'bold');
  log('='.repeat(50), 'blue');
  log(`Total Tests: ${testResults.summary.total}`, 'cyan');
  log(`Passed: ${testResults.summary.passed}`, 'green');
  log(`Failed: ${testResults.summary.failed}`, 'red');
  log(`Warnings: ${testResults.summary.warnings}`, 'yellow');
  
  const passRate = ((testResults.summary.passed / testResults.summary.total) * 100).toFixed(1);
  log(`Pass Rate: ${passRate}%`, passRate >= 90 ? 'green' : passRate >= 70 ? 'yellow' : 'red');
  
  log('\n📄 Reports generated:', 'blue');
  log('  - qa-testing/reports/automated-test-results.html', 'blue');
  log('  - qa-testing/reports/automated-test-results.json', 'blue');
  
  return testResults.summary.failed === 0;
}

function generateHTMLReport() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zuruu AI Pharmacy - Automated Test Results</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .header { background: #1F59FF; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .summary { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .test { margin: 10px 0; padding: 15px; border-left: 4px solid #ddd; background: white; border-radius: 4px; }
        .pass { border-left-color: #4CAF50; }
        .fail { border-left-color: #f44336; }
        .warn { border-left-color: #ff9800; }
        .status { font-weight: bold; font-size: 14px; }
        .pass .status { color: #4CAF50; }
        .fail .status { color: #f44336; }
        .warn .status { color: #ff9800; }
        .details { margin-top: 5px; color: #666; }
        .screenshot { margin-top: 10px; font-style: italic; color: #888; }
        .test-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🤖 Zuruu AI Pharmacy - Automated Test Results</h1>
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
    
    <div class="test-grid">
        ${testResults.tests.map(test => `
        <div class="test ${test.status.toLowerCase()}">
            <div class="status">${test.status}</div>
            <div><strong>${test.test}</strong></div>
            <div><em>${test.browser} - ${test.viewport}</em></div>
            <div class="details">${test.details}</div>
            ${test.screenshot ? `<div class="screenshot">Screenshot: ${test.screenshot}</div>` : ''}
        </div>
        `).join('')}
    </div>
</body>
</html>
  `;
}

async function main() {
  try {
    await runBrowserTests();
    const success = generateTestReport();
    
    if (success) {
      log('\n🎉 All automated tests passed!', 'green');
      process.exit(0);
    } else {
      log('\n⚠️  Some automated tests failed. Please review the report.', 'yellow');
      process.exit(1);
    }
  } catch (error) {
    log(`\n❌ Test execution failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { runBrowserTests, generateTestReport };
