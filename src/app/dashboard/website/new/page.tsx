'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { createWebsite } from '@/lib/services/websiteService';

export default function NewWebsitePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [pageType, setPageType] = useState('landing');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (!name.trim()) {
      setError('Website name is required');
      return;
    }

    if (!url.trim()) {
      setError('URL is required');
      return;
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setIsSubmitting(true);

    try {
      await createWebsite({
        name,
        url,
        pageType,
      });

      // Redirect to websites list
      router.push('/dashboard/website');
    } catch {
      setError('Failed to create website. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/dashboard/website" className="flex items-center text-sm text-blue-600 hover:text-blue-500">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to websites
        </Link>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className='text-black'>Add New Website</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-500">
                Website Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium text-gray-500">
                Website URL
              </label>
              <input
                id="url"
                type="url"
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-black"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground text-gray-400 ">
                Include http:// or https:// in the URL
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="pageType" className="text-sm font-medium text-gray-500">
                Page Type
              </label>
              <select
                id="pageType"
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-black"
                value={pageType}
                onChange={(e) => setPageType(e.target.value)}
              >
                <option value="landing">Landing Page</option>
                <option value="product">Product Page</option>
                <option value="subpage">Sub Page</option>
              </select>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/website')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Website'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
