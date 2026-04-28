-- Ensure no two cms_experiences share the same journey slot.
-- Partial unique index: only enforces uniqueness when slot_number IS NOT NULL.
CREATE UNIQUE INDEX IF NOT EXISTS cms_experiences_slot_number_unique
  ON public.cms_experiences (slot_number)
  WHERE slot_number IS NOT NULL;