

# Fix: Category Filters, Portfolio Images, Date Picker, and Inquiry Destination

## Issues Found

1. **Category filters (Experiences + Workshops)**: The grid containers use `whileInView="visible"` with `viewport={{ once: true }}`. After the first render, the container is permanently in `visible` state. When filters change, new cards mount but the parent stagger animation has already completed — so cards either appear without animation or stay in `hidden` state depending on timing. Fix: pass the active filter as a `key` on the grid wrapper so it remounts and re-animates when the filter changes.

2. **Portfolio images**: All 8 portfolio items use `"/placeholder.svg"` for `coverImage.src` and gallery images. This is expected from mock data — there are no real images yet. I'll add Unsplash placeholder images (via `picsum.photos` or specific Unsplash URLs) to make the portfolio feel alive.

3. **Inquiry date field**: Currently a plain text input with placeholder "e.g. April 20, 2026". User wants a proper date picker. I'll replace it with a Popover + Calendar (Shadcn pattern) that stores the selected date as a formatted string.

4. **Where inquiries are sent**: Currently a mock `setTimeout` — goes nowhere. I'll add a clear comment and a toast notification explaining this is a demo, and note that it's ready for backend integration. (No backend exists yet to wire to.)

## Changes

### 1. `src/features/experiences/components/ExperienceGrid.tsx`
- Add `key` based on a new `filterKey` prop (or just accept it) so the grid remounts on filter change
- Actually simpler: change `whileInView` to `animate` so it always animates, and use `key` at the page level

### 2. `src/pages/Experiences.tsx`
- Pass `key={active}` to `ExperienceGrid` so it remounts when filter changes

### 3. `src/pages/Workshops.tsx`
- Pass `key={active}` to `WorkshopGrid` so it remounts when filter changes

### 4. `src/pages/Portfolio.tsx`
- Pass `key={active}` to `PortfolioGrid` so it remounts when filter changes

### 5. `src/features/portfolio/data.ts`
- Replace all `/placeholder.svg` with Unsplash URLs for atmospheric Cairo/creative imagery

### 6. `src/features/inquiries/components/InquiryForm.tsx`
- Replace the "Preferred Date" text `Field` with a Popover + Calendar date picker
- Store selected date as formatted string in form state
- Add a toast on successful submission clarifying it's a demo

### 7. `src/features/experiences/data.ts` + `src/features/workshops/data.ts`
- Replace `/placeholder.svg` with Unsplash placeholder images for experiences and workshops too (since the user noticed the pattern)

## Scope
- 7 files modified
- No new files
- No architectural changes

