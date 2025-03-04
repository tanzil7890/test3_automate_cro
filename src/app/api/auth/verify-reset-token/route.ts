import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { message: 'Token is required' },
        { status: 400 }
      );
    }
    
    // Find user with the token and check if it's still valid
    const user = await prisma.user.findFirst({
      where: {
        resetToken: {
          equals: token
        },
        resetTokenExpiry: {
          gt: new Date() // Token expiry is greater than current time
        }
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Token is valid' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error verifying reset token:', error);
    return NextResponse.json(
      { message: 'An error occurred while verifying the token' },
      { status: 500 }
    );
  }
} 