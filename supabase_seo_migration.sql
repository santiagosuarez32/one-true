-- ========================================================
-- SEO AND INDEXATION COLUMNS FOR SERVICES, COURSES, AND BLOGS
-- ========================================================

-- 1. Add SEO columns to services table
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS "seoTitle" TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS "seoDescription" TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS "seoKeywords" TEXT;

-- 2. Add SEO columns to courses table
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS "seoTitle" TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS "seoDescription" TEXT;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS "seoKeywords" TEXT;

-- 3. Add SEO columns to blogs table
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS "seoTitle" TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS "seoDescription" TEXT;
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS "seoKeywords" TEXT;
