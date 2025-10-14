const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Define the structure of a gallery item using TypeScript
export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string; // This will be the URL to the image
  category: 'MURAL' | 'POTTERY';
}

// Function to fetch all gallery items from the backend
export const fetchGalleryItems = async (): Promise<GalleryItem[]> => {
  const response = await fetch(`${API_BASE_URL}/gallery/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch gallery items');
  }
  
  return response.json();
};
