-- ==========================================
-- SUPABASE DATABASE SCHEMA FOR ONE TRUE CMS
-- ==========================================

-- 1. Create services table
CREATE TABLE IF NOT EXISTS public.services (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    image TEXT NOT NULL,
    cta TEXT NOT NULL,
    href TEXT NOT NULL,
    template TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT false,
    "pageContent" JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    image TEXT NOT NULL,
    href TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT false,
    "pageContent" JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    link TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT false,
    "publishDate" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create podcasts table
CREATE TABLE IF NOT EXISTS public.podcasts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    duration TEXT NOT NULL,
    date TEXT NOT NULL,
    topic TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on all tables to protect data
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies for public read-only access (SELECT)
CREATE POLICY "Allow public read-only access on services" 
    ON public.services FOR SELECT 
    USING (true);

CREATE POLICY "Allow public read-only access on courses" 
    ON public.courses FOR SELECT 
    USING (true);

CREATE POLICY "Allow public read-only access on blogs" 
    ON public.blogs FOR SELECT 
    USING (true);

CREATE POLICY "Allow public read-only access on podcasts" 
    ON public.podcasts FOR SELECT 
    USING (true);

-- 6. Create Policies for write access (INSERT, UPDATE, DELETE) for authenticated users/admins
-- Note: service_role key automatically bypasses RLS, but these policies ensure admin session writes are permitted
CREATE POLICY "Allow authenticated write access on services" 
    ON public.services FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated write access on courses" 
    ON public.courses FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated write access on blogs" 
    ON public.blogs FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated write access on podcasts" 
    ON public.podcasts FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);
