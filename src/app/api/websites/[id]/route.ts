import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

// GET a single website by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
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
    
    // Ensure user owns the website
    if (website.userId !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to view this website' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(website);
  } catch (error) {
    console.error(`Error fetching website with ID ${id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the website' },
      { status: 500 }
    );
  }
}

// PATCH to update a website
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
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
    
    const updateData = await request.json();
    const { name, url, pageType } = updateData;
    
    // Validate required fields if provided
    if (name !== undefined && name.trim() === '') {
      return NextResponse.json(
        { error: 'Name cannot be empty' },
        { status: 400 }
      );
    }
    
    if (url !== undefined) {
      try {
        new URL(url);
      } catch {
        return NextResponse.json(
          { error: 'Invalid URL format' },
          { status: 400 }
        );
      }
    }
    
    if (pageType !== undefined && !['landing', 'product', 'sub'].includes(pageType)) {
      return NextResponse.json(
        { error: 'Page type must be one of: landing, product, sub' },
        { status: 400 }
      );
    }
    
    // Update website
    const website = await prisma.website.update({
      where: { id },
      data: { 
        name: name !== undefined ? name : undefined,
        url: url !== undefined ? url : undefined,
        pageType: pageType !== undefined ? pageType : undefined,
      },
    });
    
    return NextResponse.json(website);
  } catch (error) {
    console.error(`Error updating website with ID ${id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while updating the website' },
      { status: 500 }
    );
  }
}

// DELETE a website
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
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
    console.error(`Error deleting website with ID ${id}:`, error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the website' },
      { status: 500 }
    );
  }
} 