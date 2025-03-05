import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

// Helper to safely access dynamic params
async function getParam(params: Record<string, string>, key: string): Promise<string> {
  return params?.[key];
}

// GET a single website by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // Don't use params directly, extract ID from the URL path
  const paths = request.nextUrl.pathname.split('/');
  const id = paths[paths.length - 1];

  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'You must be signed in to view this website' },
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
    
    const website = await prisma.website.findUnique({
      where: { id },
    });
    
    if (!website) {
      return NextResponse.json(
        { error: 'Website not found' },
        { status: 404 }
      );
    }
    
    if (website.userId !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to view this website' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(website);
  } catch (error) {
    console.error(`Error fetching website:`, error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the website' },
      { status: 500 }
    );
  }
}

// PATCH to update a website
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // Don't use params directly, extract ID from the URL path
  const paths = request.nextUrl.pathname.split('/');
  const id = paths[paths.length - 1];
  
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'You must be signed in to update this website' },
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
    
    // Get request body
    const { name, url, pageType, status } = await request.json();
    
    // Check if website exists and belongs to user
    const existingWebsite = await prisma.website.findUnique({
      where: { id },
    });
    
    if (!existingWebsite) {
      return NextResponse.json(
        { error: 'Website not found' },
        { status: 404 }
      );
    }
    
    if (existingWebsite.userId !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to update this website' },
        { status: 403 }
      );
    }
    
    // Update website
    const website = await prisma.website.update({
      where: { id },
      data: { 
        name: name !== undefined ? name : undefined,
        url: url !== undefined ? url : undefined,
        pageType: pageType !== undefined ? pageType : undefined,
        status: status !== undefined ? status : undefined,
        updatedAt: new Date(),
      },
    });
    
    return NextResponse.json(website);
  } catch (error) {
    console.error(`Error updating website:`, error);
    return NextResponse.json(
      { error: 'An error occurred while updating the website' },
      { status: 500 }
    );
  }
}

// DELETE a website
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // Don't use params directly, extract ID from the URL path
  const paths = request.nextUrl.pathname.split('/');
  const id = paths[paths.length - 1];
  
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'You must be signed in to delete this website' },
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
    
    // Check if website exists and belongs to user
    const existingWebsite = await prisma.website.findUnique({
      where: { id },
    });
    
    if (!existingWebsite) {
      return NextResponse.json(
        { error: 'Website not found' },
        { status: 404 }
      );
    }
    
    if (existingWebsite.userId !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to delete this website' },
        { status: 403 }
      );
    }
    
    // Delete website
    await prisma.website.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error deleting website:`, error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the website' },
      { status: 500 }
    );
  }
} 