import nodemailer from 'nodemailer';

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Create a reusable transporter
const createTransporter = async () => {
  // For development/testing, create a fresh Ethereal account
  if (process.env.NODE_ENV !== 'production') {
    // Create a test account on-the-fly
    try {
      const testAccount = await nodemailer.createTestAccount();
      console.log('Created new Ethereal test account:');
      console.log(`- Email: ${testAccount.user}`);
      console.log(`- Password: ${testAccount.pass}`);
      console.log('- Service: Ethereal Email (https://ethereal.email)');
      
      return {
        transporter: nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        }),
        isEthereal: true
      };
    } catch (error) {
      console.error('Failed to create Ethereal test account:', error);
      // Fall back to a simulated transport that just logs messages
      return {
        transporter: {
          sendMail: async (mailOptions: nodemailer.SendMailOptions) => {
            console.log('=== EMAIL WOULD BE SENT (SIMULATED) ===');
            console.log(`To: ${mailOptions.to}`);
            console.log(`Subject: ${mailOptions.subject}`);
            console.log(`Body: ${typeof mailOptions.html === 'string' ? mailOptions.html.substring(0, 200) + '...' : '[HTML Content]'}`);
            console.log('=======================================');
            return { messageId: 'simulated-email-' + Date.now() };
          }
        },
        isEthereal: false
      };
    }
  }

  // For production, use your actual email provider
  return {
    transporter: nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT) || 587,
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    }),
    isEthereal: false
  };
};

export const sendEmail = async ({ to, subject, html }: SendEmailOptions) => {
  try {
    const { transporter, isEthereal } = await createTransporter();

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Outhad CRO" <no-reply@outhadcro.com>',
      to,
      subject,
      html,
    });

    console.log(`Email sent: ${info.messageId}`);
    
    // If using Ethereal for testing, log the preview URL
    if (isEthereal) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('\n===== TEST EMAIL SENT =====');
      console.log(`📧 Email sent to: ${to}`);
      console.log(`📋 Subject: ${subject}`);
      console.log(`🔗 VIEW EMAIL HERE: ${previewUrl}`);
      console.log('============================\n');
      
      return { 
        success: true, 
        messageId: info.messageId,
        previewUrl
      };
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

// Template for password reset email
export const createPasswordResetEmailHtml = (name: string, resetUrl: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .container {
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
        }
        .header {
          background-color: #3B82F6;
          color: white;
          padding: 10px 20px;
          border-radius: 5px 5px 0 0;
          margin-top: 20px;
        }
        .button {
          display: inline-block;
          background-color: #3B82F6;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Password Reset Request</h2>
        </div>
        <div style="padding: 20px;">
          <p>Hello ${name || 'there'},</p>
          <p>We received a request to reset your password for your Outhad CRO account. Click the button below to reset your password:</p>
          
          <div style="text-align: center;">
            <a class="button" href="${resetUrl}">Reset Your Password</a>
          </div>
          
          <p>This password reset link will expire in 24 hours. If you didn't request a password reset, you can safely ignore this email.</p>
          
          <p>Best regards,<br>The Outhad CRO Team</p>
        </div>
        <div class="footer">
          <p>If you're having trouble clicking the password reset button, copy and paste the following URL into your web browser:</p>
          <p style="word-break: break-all;">${resetUrl}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}; 