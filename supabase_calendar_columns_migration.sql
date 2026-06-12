-- ========================================================
-- ADD MISSING COLUMNS TO CALENDAR INTAKES TABLE IN SUPABASE
-- ========================================================
-- This script ensures all required columns are present in the calendar_intakes table.
-- Please run this SQL script inside your Supabase Dashboard SQL Editor (https://supabase.com).

ALTER TABLE public.calendar_intakes ADD COLUMN IF NOT EXISTS "brochureFileName" TEXT;
ALTER TABLE public.calendar_intakes ADD COLUMN IF NOT EXISTS "buttonType" TEXT DEFAULT 'default';
ALTER TABLE public.calendar_intakes ADD COLUMN IF NOT EXISTS "brochureSize" TEXT;
