#!/usr/bin/env node

/**
 * Database Setup Script
 * 
 * This script sets up the database tables using Prisma.
 * Run this after your Supabase database is active and accessible.
 * 
 * Usage:
 *   node scripts/setup-database.js
 *   or
 *   npm run db:setup
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Setting up database...\n');

try {
  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully\n');

  // Push schema to database
  console.log('🗃️  Pushing schema to database...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('✅ Database schema pushed successfully\n');

  // Optional: Run migrations if you prefer migrations over db push
  // console.log('🔄 Running database migrations...');
  // execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  // console.log('✅ Database migrations completed successfully\n');

  console.log('🎉 Database setup completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Test your application locally: npm run dev');
  console.log('2. Deploy to Vercel with the environment variables set');
  console.log('3. Run this script again on Vercel if needed');

} catch (error) {
  console.error('❌ Database setup failed:');
  console.error(error.message);
  console.log('\nTroubleshooting:');
  console.log('1. Make sure your Supabase database is active (not paused)');
  console.log('2. Verify your DATABASE_URL is correct in .env.local');
  console.log('3. Check your internet connection');
  console.log('4. Ensure you have the correct database permissions');
  process.exit(1);
}
