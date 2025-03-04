#!/usr/bin/env node

// This script generates test email credentials for development using Ethereal Email
const nodemailer = require('nodemailer');

async function generateTestCredentials() {
  try {
    // Create a test account
    const testAccount = await nodemailer.createTestAccount();
    
    console.log('\n===== Test Email Account Created =====');
    console.log(`Email: ${testAccount.user}`);
    console.log(`Password: ${testAccount.pass}`);
    console.log('\nAdd these to your .env file:');
    console.log(`EMAIL_USER=${testAccount.user}`);
    console.log(`EMAIL_PASSWORD=${testAccount.pass}`);
    console.log('\nThese credentials will let you see the sent emails at https://ethereal.email');
    console.log('=============================================\n');
    
    return testAccount;
  } catch (error) {
    console.error('Error creating test account:', error);
    return null;
  }
}

generateTestCredentials(); 