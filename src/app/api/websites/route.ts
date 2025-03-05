import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

// GET all websites for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'You must be signed in to view websites' },
        { status: 401 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const websites = await prisma.website.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(websites);
  } catch (error) {
    console.error('Error fetching websites:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching websites' },
      { status: 500 }
    );
  }
}

// POST to create a new website
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'You must be signed in to create a website' },
        { status: 401 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const { name, url, pageType } = await request.json();
    
    // Validate required fields
    if (!name || !url || !pageType) {
      return NextResponse.json(
        { error: 'Name, URL, and page type are required' },
        { status: 400 }
      );
    }
    
    // Additional URL validation
    try {
      new URL(url); // Will throw error if invalid URL
    } catch (_) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }
    
    // Validate page type
    if (!['landing', 'product', 'sub'].includes(pageType)) {
      return NextResponse.json(
        { error: 'Page type must be one of: landing, product, sub' },
        { status: 400 }
      );
    }
    
    // Create website
    const website = await prisma.website.create({
      data: {
        name,
        url,
        pageType,
        status: 'pending', // Initial status
        userId: user.id,
      },
    });
    
    return NextResponse.json(website, { status: 201 });
  } catch (error) {
    console.error('Error creating website:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the website' },
      { status: 500 }
    );
  }
} 