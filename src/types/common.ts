/** Shared base types used across all domains */

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
}

export interface SEOMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
