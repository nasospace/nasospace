

## NASO Sprint 0 — Implementation Plan

### Summary
Build the full project foundation: folder structure, design tokens, app shell, routing, config, env parser, and integration stubs. All content stays lightweight. Header is a simple branded placeholder. `src/features/ai/` included. Feature modules are structured to support future mapping layers.

### Files to Create/Modify

**1. Install Framer Motion** (dependency addition)

**2. Design Tokens & Theme** — `src/index.css` + `tailwind.config.ts`
- NASO brand colors as CSS variables (naso-black, naso-blue, naso-green, naso-purple, naso-lilac, naso-white)
- Custom font setup (Inter + a display/heading font via Google Fonts in `index.html`)
- Adjusted radius, transitions for retro-premium feel

**3. Folder Structure** — Create all directories with `index.ts` barrel files:
- `src/app/layout/` — RootLayout, Header, Footer
- `src/app/routes.tsx`, `src/app/providers.tsx`
- `src/features/` — home, experiences, workshops, services, portfolio, blog, shop, inquiries, account, ai (each with placeholder `index.ts`)
- `src/components/shared/`
- `src/lib/` — cms, commerce, db, auth, ai, seo, analytics, env.ts
- `src/server/` — actions, services, queries, validators
- `src/config/` — site.ts, routes.ts
- `src/types/` — common.ts, domains.ts
- `src/assets/` — NASO logo

**4. Environment Parser** — `src/lib/env.ts`
- Zod-based, type-safe, reads `import.meta.env`

**5. Config Files**
- `src/config/site.ts` — site name, description, nav items, social links
- `src/config/routes.ts` — route path constants for all domains

**6. Integration Stubs** — Each `src/lib/{module}/index.ts` exports typed interfaces and no-op placeholders

**7. App Shell**
- `RootLayout` — wraps Header + Outlet + Footer
- `Header` — logo + minimal branded nav links (Home, Experiences, Blog, Shop) styled with brand tokens; placeholder only
- `Footer` — minimal branded footer with copyright
- Routes setup via React Router using config constants

**8. Home Page Shell** — Simple branded landing showing design system works (logo, heading, brand colors, no marketing content)

**9. Shared Types** — `types/common.ts` (BaseEntity, Image, SEOMeta), `types/domains.ts` (Experience, Workshop, BlogPost, Product stubs)

**10. Feature Module Structure** — Each feature folder gets:
```
features/{domain}/
├── index.ts          # Public exports
├── components/       # UI components for this domain
├── mappers/          # Future: vendor → domain data transforms
├── types.ts          # Domain-specific types
```

~40 files total, mostly lightweight stubs and structure.

