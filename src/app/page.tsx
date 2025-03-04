import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to the Authentication Demo</h1>
        <p className="text-lg mb-10 max-w-md mx-auto">
          This project demonstrates authentication using Next.js, PostgreSQL, and Prisma.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/signup" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>
          <Link 
            href="/login" 
            className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

