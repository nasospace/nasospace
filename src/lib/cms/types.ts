/**
 * Raw CMS row types — these mirror the database columns exactly.
 * Never export these to UI components. Use mapping functions instead.
 */

export interface CmsExperienceRow {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  tags: string[];
  date: string | null;
  location: string | null;
  price: number;
  currency: string;
  capacity: number;
  difficulty: string;
  cover_image_src: string;
  cover_image_alt: string;
  gallery: Array<{ src: string; alt: string }>;
  featured: boolean;
  published: boolean;
}

export interface CmsWorkshopRow {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  tags: string[];
  date: string | null;
  location: string | null;
  price: number;
  currency: string;
  capacity: number;
  duration: string;
  skill_level: string;
  materials_included: boolean;
  cover_image_src: string;
  cover_image_alt: string;
  gallery: Array<{ src: string; alt: string }>;
  featured: boolean;
  published: boolean;
}

export interface CmsBlogPostRow {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publish_date: string | null;
  reading_time: string;
  cover_image_src: string;
  cover_image_alt: string;
  featured: boolean;
  author_name: string | null;
  linked_experience_slug: string | null;
  linked_workshop_slug: string | null;
  linked_portfolio_slug: string | null;
  published: boolean;
}

export interface CmsFaqItemRow {
  id: string;
  created_at: string;
  group_id: string;
  group_label: string;
  group_emoji: string;
  question: string;
  answer: string;
  sort_order: number;
  published: boolean;
}

export interface CmsSiteSettingRow {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export interface CmsProductRow {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  tags: string[];
  price: number;
  currency: string;
  stock_status: string;
  featured: boolean;
  limited_edition: boolean;
  cover_image_src: string;
  cover_image_alt: string;
  gallery: Array<{ src: string; alt: string }>;
  sizes: string[] | null;
  colors: string[] | null;
  linked_experience_slug: string | null;
  linked_workshop_slug: string | null;
  linked_portfolio_slug: string | null;
  published: boolean;
}
