-- =========================================================================
-- SUPABASE DATABASE UPDATE: WHATSAPP NUMBER & DISPLAY TEXT
-- =========================================================================
-- This script updates the WhatsApp API links and display texts inside the
-- JSONB 'pageContent' fields for both courses and services tables.
-- Run these queries in the Supabase Dashboard SQL Editor (https://supabase.com).

-- -------------------------------------------------------------------------
-- 1. UPDATE ALL COURSES
-- -------------------------------------------------------------------------
-- This query updates all courses to have:
--   - contactWhatsappText = '+593 98 129 6179'
--   - contactWhatsapp = The correct API link with the number 593981296179 and a generic text.

UPDATE public.courses
SET "pageContent" = jsonb_set(
  jsonb_set(
    "pageContent",
    '{contactWhatsappText}',
    '"+593 98 129 6179"'
  ),
  '{contactWhatsapp}',
  '"https://api.whatsapp.com/send?phone=593981296179&text=Hola!%20Deseo%20conocer%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20Cursos%20Avanzados%20en%20Poligraf%C3%ADa."'
);

-- -------------------------------------------------------------------------
-- 2. UPDATE SPECIFIC COURSE (OPTIONAL / EXAMPLE)
-- -------------------------------------------------------------------------
-- If you only want to update a single course (e.g. 'sistema-calificacion-ess-m'),
-- use this query:
--
-- UPDATE public.courses
-- SET "pageContent" = jsonb_set(
--   jsonb_set(
--     "pageContent",
--     '{contactWhatsappText}',
--     '"+593 98 129 6179"'
--   ),
--   '{contactWhatsapp}',
--   '"https://api.whatsapp.com/send?phone=593981296179&text=Hola!%20Deseo%20conocer%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20Cursos%20Avanzados%20en%20Poligraf%C3%ADa."'
-- )
-- WHERE id = 'sistema-calificacion-ess-m';


-- -------------------------------------------------------------------------
-- 3. UPDATE ALL SERVICES
-- -------------------------------------------------------------------------
-- This query updates all services (such as 'pruebas-poligraficas', 'vetting', etc.)
-- to have the same WhatsApp display configuration:

UPDATE public.services
SET "pageContent" = jsonb_set(
  jsonb_set(
    "pageContent",
    '{contactWhatsappText}',
    '"+593 98 129 6179"'
  ),
  '{contactWhatsapp}',
  '"https://api.whatsapp.com/send?phone=593981296179&text=%C2%A1Hola!+Quiero+conocer+m%C3%A1s+sobre+los+servicios+de+One+True"'
);
