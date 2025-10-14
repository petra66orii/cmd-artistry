const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Define the structure of a gallery item using TypeScript
export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string; // This will be the URL to the image
  category: 'MURAL' | 'POTTERY';
}

// Function to fetch gallery items. Can now filter by category.
export const fetchGalleryItems = async (category: string = 'all'): Promise<GalleryItem[]> => {
  let url = `${API_BASE_URL}/gallery/`;
  if (category !== 'all') {
    // This matches the backend user story to filter via query parameter
    url += `?category=${category}`;
  }
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch gallery items');
  }
  
  return response.json();
};

