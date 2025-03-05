export interface Website {
  id: string;
  name: string;
  url: string;
  pageType: 'landing' | 'product' | 'sub';
  status: 'pending' | 'active' | 'error';
  lastScannedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewWebsite {
  name: string;
  url: string;
  pageType: string;
}

// Fetch all websites for the current user
export async function fetchWebsites(): Promise<Website[]> {
  try {
    const response = await fetch('/api/websites', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch websites');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching websites:', error);
    throw error;
  }
}

// Create a new website
export async function createWebsite(website: NewWebsite): Promise<Website> {
  try {
    const response = await fetch('/api/websites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(website),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create website');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating website:', error);
    throw error;
  }
}

// Fetch a single website by ID
export async function fetchWebsiteById(id: string): Promise<Website> {
  try {
    const response = await fetch(`/api/websites/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch website');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching website with ID ${id}:`, error);
    throw error;
  }
}

// Update a website
export async function updateWebsite(id: string, updates: Partial<Website>): Promise<Website> {
  try {
    const response = await fetch(`/api/websites/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update website');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating website with ID ${id}:`, error);
    throw error;
  }
}

// Delete a website
export async function deleteWebsite(id: string): Promise<void> {
  try {
    const response = await fetch(`/api/websites/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete website');
    }
  } catch (error) {
    console.error(`Error deleting website with ID ${id}:`, error);
    throw error;
  }
} 