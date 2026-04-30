import type { ExperienceDetail } from "./types";

/**
 * Mock experiences — kept only as a thin fallback for dev/local rendering.
 * Production data comes from the CMS (cms_experiences table).
 * All NASO experiences are workshop-style creative sessions.
 */
export const MOCK_EXPERIENCES: ExperienceDetail[] = [];

/** Find a single experience by its URL slug */
export function getExperienceBySlug(slug: string): ExperienceDetail | undefined {
  return MOCK_EXPERIENCES.find((e) => e.slug === slug);
}

/** Get related experiences (same category first, then random fill) */
export function getRelatedExperiences(
  current: ExperienceDetail,
  limit = 3
): ExperienceDetail[] {
  const sameCategory = MOCK_EXPERIENCES.filter(
    (e) => e.category === current.category && e.id !== current.id
  );
  const others = MOCK_EXPERIENCES.filter(
    (e) => e.category !== current.category && e.id !== current.id
  );
  return [...sameCategory, ...others].slice(0, limit);
}
