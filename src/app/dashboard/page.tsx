'use client';

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="pt-16">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>
      <div className="bg-white rounded-lg shadow mt-6">
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/dashboard/websites/new"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100"
          >
            <svg className="w-6 h-6 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"></path>
            </svg>
            <span className="text-blue-800 font-medium">Add Website</span>
          </Link>
          
          <Link 
            href="/dashboard/audits/new"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100"
          >
            <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"></path>
            </svg>
            <span className="text-green-800 font-medium">New Audit</span>
          </Link>
          
          <Link 
            href="/dashboard/scheduled-scans/new"
            className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100"
          >
            <svg className="w-6 h-6 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"></path>
            </svg>
            <span className="text-purple-800 font-medium">Schedule Scan</span>
          </Link>
        </div>
      </div>
      
      
    </div>
  );
} 