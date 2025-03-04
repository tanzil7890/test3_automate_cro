"use client";

import Link from 'next/link';
import { useState } from 'react';
import Logo from '../Logo';

export default function DashboardNavbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // User would be fetched from an authentication context in a real app
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full z-20 top-0 left-0">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center">
            <div className="h-8 w-auto mr-3">
              <Logo />
            </div>
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Outhad CRO
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          <div className="flex items-center ml-3">
            <button
              type="button"
              className="flex text-sm bg-gray-100 rounded-full focus:ring-4 focus:ring-gray-300"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-expanded={isProfileOpen}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-10 h-10 rounded-full"
                src={user.avatarUrl}
                alt="User avatar"
              />
            </button>
            {/* Dropdown menu */}
            {isProfileOpen && (
              <div className="absolute top-12 right-4 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900">{user.name}</span>
                  <span className="block text-sm font-medium text-gray-500 truncate">
                    {user.email}
                  </span>
                </div>
                <ul className="py-1" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        // Handle logout logic here
                        console.log('Logout clicked');
                      }}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 