-- ========================================================
-- ADD BROCHURE SIZE COLUMN TO CALENDAR INTAKES TABLE
-- ========================================================
-- This migration adds the "brochureSize" column to store
-- the file size of the brochure PDF.
--
-- Run this query in the Supabase Dashboard SQL Editor (https://supabase.com).

ALTER TABLE public.calendar_intakes ADD COLUMN IF NOT EXISTS "brochureSize" TEXT;
