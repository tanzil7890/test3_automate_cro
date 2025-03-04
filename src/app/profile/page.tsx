'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data: session } = useSession();

  return (
    <div className="pt-16">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-medium text-gray-900 mb-4">
          Welcome, {session?.user?.name || 'User'}!
        </h2>
        <p className="text-gray-600">
          This is your dashboard where you can manage your projects and settings.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
            <div className="font-medium text-gray-500">Name</div>
            <div className="md:col-span-2 font-medium">{session?.user?.name || 'Not provided'}</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200 pb-4">
            <div className="font-medium text-gray-500">Email</div>
            <div className="md:col-span-2">{session?.user?.email || 'Not provided'}</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium text-gray-500">User ID</div>
            <div className="md:col-span-2 font-mono text-sm">{session?.user?.id || 'Not available'}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Edit Profile
        </button>
        <button className="px-6 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ProfilePage; 