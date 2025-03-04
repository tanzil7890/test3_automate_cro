import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendEmail, createPasswordResetEmailHtml } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      // For security, don't reveal that the email doesn't exist
      return NextResponse.json(
        { message: 'If your email exists in our system, you will receive a password reset link shortly' },
        { status: 200 }
      );
    }
    
    // Generate a reset token and expiration date (24 hours from now)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    // Save the reset token to the database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: resetToken,
        resetTokenExpiry: resetTokenExpiry,
      },
    });
    
    // Create the reset URL
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password/${resetToken}`;
    
    // Try to send the password reset email
    const emailTemplate = createPasswordResetEmailHtml(user.name || '', resetUrl);
    const emailResult = await sendEmail({
      to: user.email,
      subject: 'Password Reset Request - Outhad CRO',
      html: emailTemplate,
    });
    
    // Save the reset token and link to the console for testing even if email fails
    console.log(`Reset token for ${user.email}: ${resetToken}`);
    console.log(`Reset link: ${resetUrl}`);
    
    // Log the email sending result
    if (emailResult.success) {
      console.log(`Reset email sent successfully to ${user.email}`);
      
      // For development, include the preview URL in the response
      if (process.env.NODE_ENV !== 'production' && 'previewUrl' in emailResult) {
        return NextResponse.json({
          message: 'If your email exists in our system, you will receive a password reset link shortly',
          previewUrl: emailResult.previewUrl,
          note: 'This preview URL is only shown in development mode'
        }, { status: 200 });
      }
    } else {
      // Email failed, but we don't need to tell the user - we logged the reset link for testing
      console.error('Failed to send reset email:', emailResult.error);
    }
    
    return NextResponse.json(
      { message: 'If your email exists in our system, you will receive a password reset link shortly' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing password reset request:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 