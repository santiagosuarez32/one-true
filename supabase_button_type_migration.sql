-- ========================================================
-- ADD BUTTON TYPE COLUMN TO CALENDAR INTAKES TABLE
-- ========================================================
-- This migration adds the "buttonType" column to allow
-- admins to choose whether a calendar entry button should
-- download a brochure or view course information.
--
-- Run this query in the Supabase Dashboard SQL Editor (https://supabase.com).

ALTER TABLE public.calendar_intakes ADD COLUMN IF NOT EXISTS "buttonType" TEXT DEFAULT 'default';
