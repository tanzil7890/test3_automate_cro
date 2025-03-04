import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create a test user
    const hashedPassword = await hashPassword('password123');
    
    const user = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        name: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
      },
    });
    
    console.log('Database setup completed successfully');
    console.log('Created test user:', user.email);
  } catch (error) {
    console.error('Error setting up the database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 