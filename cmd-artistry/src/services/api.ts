/// <reference types="vite/client" />

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

// --- SHARED TYPES ---

interface WagtailImageRendition {
  url: string;
  full_url: string;
  width: number;
  height: number;
  alt: string;
}

interface WagtailApiResponse<T> {
  meta: { total_count: number };
  items: T[];
}

// --- GALLERY ---

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  category: "MURAL" | "POTTERY" | "SIGN";
  image_url: string | null;
  image__title: string;
}

interface WagtailGalleryItem {
  id: number;
  title: string;
  description?: string;
  category?: "MURAL" | "POTTERY" | "SIGN";
  image_url?: WagtailImageRendition;
  image_alt_text?: string;
  meta: {
    type: string;
    detail_url: string;
    html_url: string;
    slug: string;
    first_published_at: string;
  };
}

export const fetchGalleryItems = async (
  category: string = "all"
): Promise<GalleryItem[]> => {
  const url =
    `${API_BASE_URL}/v2/pages/?` +
    `type=gallery.GalleryItemPage` +
    `&fields=description,category,image_url,image_alt_text`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch gallery items");
  }

  const data: WagtailApiResponse<WagtailGalleryItem> = await response.json();

  return data.items.map((item) => {
    const r = item.image_url;

    // Construct absolute URL if needed
    const imageUrl =
      r?.full_url ||
      (r?.url ? `http://127.0.0.1:8000${r.url}` : null);

    return {
      id: item.id,
      title: item.title,
      description: item.description || "",
      category: item.category || "MURAL",
      image_url: imageUrl,
      image__title: item.image_alt_text || item.title,
    };
  });
};


// --- SERVICES ---

export interface Service {
  id: number;
  title: string;
  slug: string;
  summary: string;
  detailed_description: string;
  image_url: string | null;
  image__title: string;
}

interface WagtailServiceItem {
  id: number;
  title: string;
  summary?: string;
  detailed_description?: string;
  image_url?: WagtailImageRendition; 
  image_alt_text?: string;
  meta: {
    slug: string;
  };
}

export const fetchServices = async (): Promise<Service[]> => {
  const url = 
    `${API_BASE_URL}/v2/pages/?` +
    `type=services.ServicePage` + 
    `&fields=summary,detailed_description,image_url,image_alt_text,slug`;
    
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  
  const data: WagtailApiResponse<WagtailServiceItem> = await response.json();
  
  return data.items.map((item) => {
    const r = item.image_url;
    const imageUrl = r?.full_url || (r?.url ? `http://127.0.0.1:8000${r.url}` : null);

    return {
      id: item.id,
      title: item.title,
      slug: item.meta.slug,
      summary: item.summary || "",
      detailed_description: item.detailed_description || "",
      image_url: imageUrl,
      image__title: item.image_alt_text || item.title,
    };
  });
};

export const fetchServiceBySlug = async (slug: string): Promise<Service> => {
  const url = 
    `${API_BASE_URL}/v2/pages/?` + 
    `type=services.ServicePage&slug=${slug}` +
    `&fields=summary,detailed_description,image_url,image_alt_text,slug`;
    
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch service: ${slug}`);
  }

  const data: WagtailApiResponse<WagtailServiceItem> = await response.json();
  if (data.items.length === 0) {
    throw new Error(`Service not found: ${slug}`);
  }
  
  const item = data.items[0];
  const r = item.image_url;
  const imageUrl = r?.full_url || (r?.url ? `http://127.0.0.1:8000${r.url}` : null);

  return {
    id: item.id,
    title: item.title,
    slug: item.meta.slug,
    summary: item.summary || "",
    detailed_description: item.detailed_description || "",
    image_url: imageUrl,
    image__title: item.image_alt_text || item.title,
  };
};


// --- TESTIMONIALS ---

export interface Testimonial {
  id: number;
  quote: string;
  author_name: string;
  company_or_title: string;
}

export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const url = `${API_BASE_URL}/v2/testimonials/`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch testimonials');
  }

  const data: WagtailApiResponse<Testimonial> = await response.json();
  return data.items;
};


// --- CONTACT FORM ---

export const getCsrfToken = async (): Promise<string> => {
  const url = `${API_BASE_URL}/contact/get-csrf-token/`;
  try {
    const response = await fetch(url, { 
      credentials: 'include' 
    });
    if (!response.ok) {
      throw new Error('Failed to get CSRF token');
    }
    const data = await response.json();
    return data.csrfToken; 
  } catch (error) {
    console.error("CSRF Token Error:", error);
    throw new Error('Could not get CSRF token');
  }
};

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  service: string;
  message: string;
}

export const submitContactForm = async (formData: ContactFormData, csrfToken: string): Promise<any> => {
  const url = `${API_BASE_URL}/contact/`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify(formData),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to send message');
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