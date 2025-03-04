'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

const SettingsPage = () => {
  const { data: session } = useSession();

  return (
    <div className="pt-16">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Account Settings</h1>
      
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {/* Profile Section */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
          <p className="text-sm text-gray-500 mb-4">Update your account&apos;s profile information and email address.</p>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={session?.user?.name || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={session?.user?.email || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
        
        {/* Password Section */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Update Password</h2>
          <p className="text-sm text-gray-500 mb-4">Ensure your account is using a secure password.</p>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                name="current_password"
                id="current_password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div className="sm:col-span-4">
              <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="new_password"
                id="new_password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div className="sm:col-span-4">
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Password
            </button>
          </div>
        </div>
        
        {/* Notifications Section */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h2>
          <p className="text-sm text-gray-500 mb-4">Manage your notification settings.</p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="email_notifications"
                  name="email_notifications"
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="email_notifications" className="font-medium text-gray-700">Email notifications</label>
                <p className="text-gray-500">Receive email notifications for important updates and activities.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 