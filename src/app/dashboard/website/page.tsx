'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Edit, ExternalLink, Trash2, MoreVertical, PlusCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchWebsites, deleteWebsite, Website } from '@/lib/services/websiteService';
import { formatDistanceToNow } from 'date-fns';

// Component to show loading state
const WebsitesTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Page Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Scanned</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(5).fill(null).map((_, index) => (
          <TableRow key={index}>
            <TableCell><Skeleton className="h-5 w-32" /></TableCell>
            <TableCell><Skeleton className="h-5 w-48" /></TableCell>
            <TableCell><Skeleton className="h-5 w-24" /></TableCell>
            <TableCell><Skeleton className="h-5 w-20" /></TableCell>
            <TableCell><Skeleton className="h-5 w-36" /></TableCell>
            <TableCell><Skeleton className="h-8 w-8" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// Component for website actions menu
const WebsiteActions = ({ website }: { website: Website }) => {
  const router = useRouter();
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this website? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteWebsite(website.id);
      // Refresh the page to show updated list
      router.refresh();
    } catch (err) {
      console.error('Error deleting website:', err);
      alert('Failed to delete website. Please try again.');
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 text-black">
          <span className="sr-only text-black">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link className='text-black' href={`/dashboard/website/${website.id}`}>
            <Edit className="mr-2 h-4 w-4 text-black" /> Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a className='text-black' href={website.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4 text-black" /> Visit Site
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive text-black" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4 text-black" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Status badge component
const StatusBadge = ({ status }: { status: Website['status'] }) => {
  const variants = {
    pending: 'bg-yellow-100 text-yellow-800',
    active: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };

  const variant = variants[status] || variants.pending;

  return (
    <Badge variant="outline" className={variant}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

// Page type badge component
const PageTypeBadge = ({ type }: { type: Website['pageType'] }) => {
  const variants = {
    landing: 'bg-blue-100 text-blue-800',
    product: 'bg-purple-100 text-purple-800',
    sub: 'bg-gray-100 text-gray-800',
  };

  const variant = variants[type] || variants.sub;
  
  const labels = {
    landing: 'Landing Page',
    product: 'Product Page',
    sub: 'Sub Page',
  };

  return (
    <Badge variant="outline" className={variant}>
      {labels[type] || type}
    </Badge>
  );
};

// Websites Table Component
const WebsitesTable = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWebsites() {
      try {
        setLoading(true);
        const data = await fetchWebsites();
        setWebsites(data);
        setError(null);
      } catch (err) {
        setError('Failed to load websites');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadWebsites();
  }, []);

  if (loading) {
    return <WebsitesTableSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        <p>{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (websites.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-gray-200 rounded-lg bg-muted/50">
        <h3 className="text-lg font-medium mb-2 text-black">No websites found</h3>
        <p className="text-muted-foreground mb-4 text-black">
          You haven&apos;t added any websites yet. Get started by adding your first website.
        </p>
        <Button asChild>
          <Link href="/dashboard/website/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Website
          </Link>
        </Button>
      </div>
    );
  }

  return (

    <Table className='bg-white shadow-md rounded-lg overflow-hidden min-w-full divide-y divide-gray-200'>

      <TableHeader className='bg-gray-50'>
        <TableRow>
          <TableHead className='text-black'>Name</TableHead>
          <TableHead className='text-black'>URL</TableHead>
          <TableHead className='text-black'>Page Type</TableHead>
          <TableHead className='text-black'>Status</TableHead>
          <TableHead className='text-black'>Last Scanned</TableHead>
          <TableHead className="text-right text-black">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {websites.map((website) => (
          <TableRow key={website.id}>
            <TableCell className="font-medium text-black">{website.name}</TableCell>
            <TableCell className="max-w-xs truncate">
              <a 
                href={website.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {new URL(website.url).hostname}
              </a>
            </TableCell>
            <TableCell>
              <PageTypeBadge type={website.pageType} />
            </TableCell>
            <TableCell>
              <StatusBadge status={website.status} />
            </TableCell>
            <TableCell className='text-black'>
              {website.lastScannedAt 
                ? formatDistanceToNow(new Date(website.lastScannedAt), { addSuffix: true }) 
                : 'Never'}
            </TableCell>
            <TableCell className="text-right text-black">
              <WebsiteActions website={website} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// Main Page Component
export default function WebsitesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-black font-bold tracking-tight">Websites</h1>
        {/* <Button asChild> */}
          <Link href="/dashboard/website/new"
           className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <PlusCircle className="mr-2 h-4 w-4 " /> Add Website
          </Link>
        {/* </Button> */}
      </div>
      
      <Card>
       {/*  <CardHeader>
          <CardTitle style={{color: 'black'}}>Manage Your Websites</CardTitle>
        </CardHeader> */}
        {/* <CardContent> */}
          <WebsitesTable />
        {/* </CardContent> */}
      </Card>
    </div>
  );
} 