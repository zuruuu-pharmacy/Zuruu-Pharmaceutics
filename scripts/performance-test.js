#!/usr/bin/env node

/**
 * Performance Testing Script for Zuruu AI Pharmacy
 * Tests Core Web Vitals and performance metrics
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Performance targets
const TARGETS = {
  lcp: 2500, // 2.5 seconds
  fid: 100,  // 100 milliseconds
  cls: 0.1,  // 0.1 score
  performance: 90, // 90 score
  accessibility: 95 // 95 score
};

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

function checkTarget(metric, value, target) {
  if (value <= target) {
    log(`✅ ${metric}: ${value} (Target: ${target})`, 'green');
    return true;
  } else {
    log(`❌ ${metric}: ${value} (Target: ${target})`, 'red');
    return false;
  }
}

function runLighthouse(url) {
  try {
    log('🔍 Running Lighthouse audit...', 'blue');
    
    const command = `npx lighthouse ${url} --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless" --quiet`;
    execSync(command, { stdio: 'pipe' });
    
    const report = JSON.parse(fs.readFileSync('./lighthouse-report.json', 'utf8'));
    return report;
  } catch (error) {
    log('❌ Failed to run Lighthouse audit', 'red');
    log(error.message, 'red');
    return null;
  }
}

function analyzePerformance(report) {
  if (!report) return false;
  
  const audits = report.audits;
  const categories = report.categories;
  
  log('\n📊 Performance Analysis:', 'bold');
  log('='.repeat(50), 'blue');
  
  // Core Web Vitals
  const lcp = audits['largest-contentful-paint']?.numericValue || 0;
  const fid = audits['max-potential-fid']?.numericValue || 0;
  const cls = audits['cumulative-layout-shift']?.numericValue || 0;
  
  // Performance scores
  const performanceScore = Math.round(categories.performance.score * 100);
  const accessibilityScore = Math.round(categories.accessibility.score * 100);
  
  log('\n🎯 Core Web Vitals:', 'bold');
  const lcpPass = checkTarget('LCP', lcp, TARGETS.lcp);
  const fidPass = checkTarget('FID', fid, TARGETS.fid);
  const clsPass = checkTarget('CLS', cls, TARGETS.cls);
  
  log('\n📈 Lighthouse Scores:', 'bold');
  const perfPass = checkTarget('Performance', performanceScore, TARGETS.performance);
  const a11yPass = checkTarget('Accessibility', accessibilityScore, TARGETS.accessibility);
  
  // Additional metrics
  log('\n📋 Additional Metrics:', 'bold');
  const fcp = audits['first-contentful-paint']?.numericValue || 0;
  const ttfb = audits['server-response-time']?.numericValue || 0;
  const si = audits['speed-index']?.numericValue || 0;
  
  log(`First Contentful Paint: ${fcp.toFixed(0)}ms`);
  log(`Time to First Byte: ${ttfb.toFixed(0)}ms`);
  log(`Speed Index: ${si.toFixed(0)}ms`);
  
  // Bundle analysis
  log('\n📦 Bundle Analysis:', 'bold');
  const totalByteWeight = audits['total-byte-weight']?.numericValue || 0;
  const unusedCss = audits['unused-css-rules']?.numericValue || 0;
  const unusedJs = audits['unused-javascript']?.numericValue || 0;
  
  log(`Total Byte Weight: ${(totalByteWeight / 1024).toFixed(2)}KB`);
  log(`Unused CSS: ${(unusedCss / 1024).toFixed(2)}KB`);
  log(`Unused JavaScript: ${(unusedJs / 1024).toFixed(2)}KB`);
  
  // Recommendations
  log('\n💡 Recommendations:', 'bold');
  if (lcp > TARGETS.lcp) {
    log('• Optimize LCP: Consider lazy loading, image optimization, or CDN', 'yellow');
  }
  if (fid > TARGETS.fid) {
    log('• Optimize FID: Reduce JavaScript execution time, use code splitting', 'yellow');
  }
  if (cls > TARGETS.cls) {
    log('• Optimize CLS: Add size attributes to images, avoid layout shifts', 'yellow');
  }
  if (performanceScore < TARGETS.performance) {
    log('• Improve Performance: Optimize images, minify CSS/JS, use compression', 'yellow');
  }
  
  const allPassed = lcpPass && fidPass && clsPass && perfPass && a11yPass;
  
  if (allPassed) {
    log('\n🎉 All performance targets met!', 'green');
  } else {
    log('\n⚠️  Some performance targets need improvement', 'yellow');
  }
  
  return allPassed;
}

function generateReport(report, passed) {
  const timestamp = new Date().toISOString();
  const reportData = {
    timestamp,
    passed,
    targets: TARGETS,
    metrics: {
      lcp: report.audits['largest-contentful-paint']?.numericValue || 0,
      fid: report.audits['max-potential-fid']?.numericValue || 0,
      cls: report.audits['cumulative-layout-shift']?.numericValue || 0,
      performance: Math.round(report.categories.performance.score * 100),
      accessibility: Math.round(report.categories.accessibility.score * 100)
    },
    recommendations: []
  };
  
  // Add recommendations based on results
  if (reportData.metrics.lcp > TARGETS.lcp) {
    reportData.recommendations.push('Optimize Largest Contentful Paint');
  }
  if (reportData.metrics.fid > TARGETS.fid) {
    reportData.recommendations.push('Optimize First Input Delay');
  }
  if (reportData.metrics.cls > TARGETS.cls) {
    reportData.recommendations.push('Optimize Cumulative Layout Shift');
  }
  
  fs.writeFileSync('./performance-report.json', JSON.stringify(reportData, null, 2));
  log('\n📄 Performance report saved to performance-report.json', 'blue');
}

function main() {
  const url = process.argv[2] || 'http://localhost:9002';
  
  log('🚀 Zuruu AI Pharmacy Performance Test', 'bold');
  log('='.repeat(50), 'blue');
  log(`Testing URL: ${url}`, 'blue');
  
  // Check if server is running
  try {
    execSync(`curl -s -o /dev/null -w "%{http_code}" ${url}`, { stdio: 'pipe' });
  } catch (error) {
    log('❌ Server is not running. Please start the development server first:', 'red');
    log('npm run dev', 'yellow');
    process.exit(1);
  }
  
  // Run Lighthouse audit
  const report = runLighthouse(url);
  if (!report) {
    process.exit(1);
  }
  
  // Analyze performance
  const passed = analyzePerformance(report);
  
  // Generate report
  generateReport(report, passed);
  
  // Clean up
  if (fs.existsSync('./lighthouse-report.json')) {
    fs.unlinkSync('./lighthouse-report.json');
  }
  
  process.exit(passed ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { runLighthouse, analyzePerformance, TARGETS };
