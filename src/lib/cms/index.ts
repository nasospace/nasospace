/**
 * CMS Content Access Layer
 *
 * Centralized queries for all CMS-backed content.
 * All Supabase-specific logic lives here — UI components never import supabase directly for content.
 * When the CMS backend changes, only this layer needs updating.
 */

export { cmsExperiences } from "./experiences";
export { cmsWorkshops } from "./workshops";
export { cmsBlogPosts } from "./blog";
export { cmsFaq } from "./faq";
export { cmsSiteSettings } from "./site-settings";
