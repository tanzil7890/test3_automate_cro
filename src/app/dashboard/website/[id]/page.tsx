'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchWebsiteById, updateWebsite, deleteWebsite, Website } from '@/lib/services/websiteService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, ExternalLink } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function WebsiteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [website, setWebsite] = useState<Website | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [pageType, setPageType] = useState<'landing' | 'product' | 'sub'>('landing');
  const [formChanged, setFormChanged] = useState(false);

  useEffect(() => {
    async function loadWebsite() {
      try {
        setIsLoading(true);
        const data = await fetchWebsiteById(id);
        setWebsite(data);
        
        // Set form values
        setName(data.name);
        setUrl(data.url);
        setPageType(data.pageType);
        
        setError(null);
      } catch (err) {
        console.error(`Error fetching website with ID ${id}:`, err);
        setError('Failed to load website details.');
      } finally {
        setIsLoading(false);
      }
    }

    loadWebsite();
  }, [id]);

  // Check if form values have changed
  useEffect(() => {
    if (website) {
      setFormChanged(
        name !== website.name || 
        url !== website.url || 
        pageType !== website.pageType
      );
    }
  }, [name, url, pageType, website]);

  // Function to validate URL format
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
    
    if (!formChanged) return;
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Validate form
      if (!name.trim()) {
        setError('Website name is required');
        setIsSubmitting(false);
        return;
      }
      
      if (!isValidUrl(url)) {
        setError('Please enter a valid URL');
        setIsSubmitting(false);
        return;
      }
      
      const updatedWebsite = await updateWebsite(id, { name, url, pageType });
      setWebsite(updatedWebsite);
      setFormChanged(false);
      
      // Show success message
      alert('Website updated successfully');
    } catch (err) {
      console.error('Error updating website:', err);
      setError('Failed to update website. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this website? This action cannot be undone.')) {
      return;
    }
    
    try {
      setIsDeleting(true);
      await deleteWebsite(id);
      router.push('/dashboard/website');
    } catch (err) {
      console.error('Error deleting website:', err);
      setError('Failed to delete website. Please try again.');
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !website) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 text-red-600 p-4 rounded-md">
            <p>{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => router.push('/dashboard/website')}>
              Return to Websites
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!website) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-amber-50 text-amber-600 p-4 rounded-md">
            <p>Website not found.</p>
            <Button variant="outline" className="mt-4" onClick={() => router.push('/dashboard/website')}>
              Return to Websites
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link 
          href="/dashboard/website"
          className="inline-flex items-center font-medium text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to websites
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-black">{website.name}</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? 'Deleting...' : 'Delete Website'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a href={website.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Website
            </a>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Website Info Panel */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className='text-black'>Website Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 text-black">Status</p>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    website.status === 'active' ? 'bg-green-100 text-green-800' :
                    website.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {website.status.charAt(0).toUpperCase() + website.status.slice(1)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Page Type</p>
                <p className="mt-1 text-sm text-black">{website.pageType === 'landing' ? 'Landing Page' : website.pageType === 'product' ? 'Product Page' : 'Sub Page'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Scanned</p>
                <p className="mt-1 text-sm text-black">{website.lastScannedAt ? new Date(website.lastScannedAt).toLocaleString() : 'Never'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Created</p>
                <p className="mt-1 text-sm text-black">{new Date(website.createdAt).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Edit Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className='text-black'>Edit Website</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-500">Website Name</label>
                  <input
                    id="name"
                    className="px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                    placeholder="My Awesome Site"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="url" className="block text-sm font-medium text-gray-500">Website URL</label>
                  <input
                    id="url"
                    className="text-black px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-500">Page Type</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="landing"
                        type="radio"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        value="landing"
                        checked={pageType === 'landing'}
                        onChange={() => setPageType('landing')}
                      />
                      <label htmlFor="landing" className="ml-3 block text-sm font-normal text-gray-500">
                        Landing Page
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="product"
                        type="radio"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        value="product"
                        checked={pageType === 'product'}
                        onChange={() => setPageType('product')}
                      />
                      <label htmlFor="product" className="ml-3 block text-sm font-normal text-gray-500">
                        Product Page
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="sub"
                        type="radio"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        value="sub"
                        checked={pageType === 'sub'}
                        onChange={() => setPageType('sub')}
                      />
                      <label htmlFor="sub" className="ml-3 block text-sm font-normal text-gray-500">
                        Sub Page
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !formChanged}
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
