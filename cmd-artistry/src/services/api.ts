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

export interface Service {
  id: number;
  title: string;
  slug: string;
  summary: string; 
  detailed_description: string;
  image: string | null;
}

// Function to fetch all services
export const fetchServices = async (): Promise<Service[]> => {
  const url = `${API_BASE_URL}/services/`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }

  return response.json();
};

// Function to fetch a single service by its slug
export const fetchServiceBySlug = async (slug: string): Promise<Service> => {
  const url = `${API_BASE_URL}/services/${slug}/`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch service: ${slug}`);
  }

  return response.json();
};

// Define the structure of the data we'll send
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Function to submit the contact form
export const submitContactForm = async (formData: ContactFormData): Promise<any> => {
  const url = `${API_BASE_URL}/contact/`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    // If the server returns an error, try to parse it as JSON
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to send message');
  }

  return response.json();
};

// Define the structure of a testimonial
export interface Testimonial {
  id: number;
  quote: string;
  author_name: string;
  company_or_title: string;
}

// Function to fetch approved testimonials
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const url = `${API_BASE_URL}/home/testimonials/`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch testimonials');
  }

  return response.json();
};

// Function to subscribe an email to the newsletter
export const subscribeToNewsletter = async (email: string): Promise<any> => {
  const url = `${API_BASE_URL}/home/newsletter/subscribe/`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to subscribe');
  }

  return response.json();
};

