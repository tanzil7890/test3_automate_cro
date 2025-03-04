'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    setPreviewUrl(null);
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      // Check if the response includes a preview URL (for development)
      if (data.previewUrl) {
        setPreviewUrl(data.previewUrl);
      }
      
      setSuccessMessage('Password reset instructions have been sent to your email');
      setFormSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        {formSubmitted ? (
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;ve sent a password reset link to <strong>{email}</strong>.
              Please check your inbox and spam folder.
            </p>
            
            {previewUrl && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-700 mb-2">
                  <strong>Development Mode:</strong> View your test email here:
                </p>
                <a 
                  href={previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  {previewUrl}
                </a>
                <p className="text-xs text-blue-600 mt-2">
                  This link will only appear in development mode
                </p>
              </div>
            )}
            
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Didn&apos;t receive an email?
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-2 text-blue-600 hover:text-blue-500 font-medium"
              >
                Try again
              </button>
            </div>
            <div className="mt-6">
              <Link href="/login" className="text-blue-600 hover:text-blue-500 text-sm">
                Back to login
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Reset your password
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
            </div>
            
            {error && (
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            {successMessage && (
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            )}
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error ? ' ' : undefined} // To reserve space but not show duplicate error
                  fullWidth
                  className="text-black"
                />
              </div>

              <div>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  fullWidth
                  size="lg"
                >
                  Send reset link
                </Button>
              </div>
              
              <div className="text-center">
                <Link href="/login" className="text-blue-600 hover:text-blue-500 text-sm">
                  Back to login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
} 