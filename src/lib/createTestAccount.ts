import nodemailer from 'nodemailer';

export const createTestAccount = async () => {
  try {
    // Create a test account
    const testAccount = await nodemailer.createTestAccount();
    
    console.log('Test Email Account Created:');
    console.log(`Email: ${testAccount.user}`);
    console.log(`Password: ${testAccount.pass}`);
    console.log('\nAdd these to your .env file as:');
    console.log(`EMAIL_USER=${testAccount.user}`);
    console.log(`EMAIL_PASSWORD=${testAccount.pass}`);
    
    return testAccount;
  } catch (error) {
    console.error('Error creating test account:', error);
    return null;
  }
};

// You can run this script directly to generate credentials
if (require.main === module) {
  createTestAccount();
} 