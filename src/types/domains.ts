import type { BaseEntity, ImageAsset, SEOMeta } from "./common";

/**
 * Domain type stubs.
 * These will be fleshed out as each feature is built.
 * Kept here for cross-feature type sharing.
 */

export interface Experience extends BaseEntity {
  title: string;
  slug: string;
  summary: string;
  coverImage: ImageAsset;
  seo?: SEOMeta;
}

export interface Workshop extends BaseEntity {
  title: string;
  slug: string;
  summary: string;
  coverImage: ImageAsset;
  seo?: SEOMeta;
}

export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: ImageAsset;
  seo?: SEOMeta;
}

export interface Product extends BaseEntity {
  title: string;
  slug: string;
  price: number;
  currency: string;
  coverImage: ImageAsset;
  seo?: SEOMeta;
}
