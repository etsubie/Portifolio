-- ╔══════════════════════════════════════════════════════════════╗
-- ║  Portfolio – Supabase Schema                                ║
-- ║  Run this in Supabase SQL Editor (Dashboard → SQL Editor)   ║
-- ╚══════════════════════════════════════════════════════════════╝

-- ────────────────────────────────────────────────
-- 1. Tables
-- ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS projects (
  id              TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  description     TEXT DEFAULT '',
  long_description TEXT DEFAULT '',
  image           TEXT DEFAULT '',
  tags            TEXT[] DEFAULT '{}',
  demo_link       TEXT DEFAULT '',
  code_link       TEXT DEFAULT '',
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skill_categories (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  color_scheme TEXT DEFAULT 'blue',
  skills       TEXT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS site_settings (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ────────────────────────────────────────────────
-- 2. Row Level Security
-- ────────────────────────────────────────────────

ALTER TABLE projects         ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings    ENABLE ROW LEVEL SECURITY;

-- Public read (anyone can view the portfolio)
CREATE POLICY "public_read_projects"  ON projects         FOR SELECT USING (true);
CREATE POLICY "public_read_skills"    ON skill_categories FOR SELECT USING (true);
CREATE POLICY "public_read_settings"  ON site_settings    FOR SELECT USING (true);

-- Authenticated write (only logged-in admin can modify)
CREATE POLICY "auth_insert_projects"  ON projects         FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_projects"  ON projects         FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_delete_projects"  ON projects         FOR DELETE TO authenticated USING (true);

CREATE POLICY "auth_insert_skills"    ON skill_categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_skills"    ON skill_categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_delete_skills"    ON skill_categories FOR DELETE TO authenticated USING (true);

CREATE POLICY "auth_insert_settings"  ON site_settings    FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_update_settings"  ON site_settings    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "auth_delete_settings"  ON site_settings    FOR DELETE TO authenticated USING (true);

-- ────────────────────────────────────────────────
-- 3. Seed data (default portfolio content)
-- ────────────────────────────────────────────────

-- Projects
INSERT INTO projects (id, title, description, long_description, image, tags, demo_link, code_link, created_at, updated_at) VALUES
(
  'proj-music-app',
  'Music App',
  'A sleek music streaming app with playlist creation, track searching, and personalized recommendations.',
  'A full-featured music streaming application that allows users to create and manage playlists, search for tracks, and get personalized recommendations. Built with a React frontend and Node.js/Express backend, with MongoDB handling data persistence for user profiles and playlists.',
  'https://images.pexels.com/photos/2746187/pexels-photo-2746187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ARRAY['React', 'Node.js', 'Express', 'MongoDB'],
  'https://songweb-app.netlify.app/',
  'https://github.com/etsubie/SongApp',
  '2024-06-01T00:00:00.000Z',
  '2024-06-01T00:00:00.000Z'
),
(
  'proj-memories-app',
  'Memories App',
  'A social platform to capture and share memorable moments with friends and family.',
  'A social media-style application for capturing and sharing memorable moments. Features include image uploads, comments, likes, and location tagging. Built with React and styled-components for a polished UI, with an Express/MongoDB backend handling authentication and data management.',
  'https://images.pexels.com/photos/3772511/pexels-photo-3772511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ARRAY['React', 'styled-components', 'Express', 'MongoDB'],
  '',
  'https://github.com/etsubie/SocialMediaApp',
  '2024-08-01T00:00:00.000Z',
  '2024-08-01T00:00:00.000Z'
),
(
  'proj-event-app',
  'Event Management App',
  'A full-stack solution for creating, booking, and managing events with ticket sales and analytics.',
  'A comprehensive event management platform that enables users to create, book, and manage events. Features include ticket sales, event analytics, attendee management, and a responsive dashboard. Built with Laravel on the backend and React with Tailwind CSS on the frontend, using MySQL for data storage.',
  'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ARRAY['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
  '',
  'https://github.com/etsubie/EventApp-frontend',
  '2024-10-01T00:00:00.000Z',
  '2024-10-01T00:00:00.000Z'
)
ON CONFLICT (id) DO NOTHING;

-- Skill categories
INSERT INTO skill_categories (id, name, color_scheme, skills) VALUES
('cat-frontend', 'Frontend',       'blue',    ARRAY['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML/CSS', 'styled-components']),
('cat-backend',  'Backend',        'purple',  ARRAY['Node.js', 'Express.js', 'Laravel', 'PHP', 'RESTful APIs']),
('cat-database', 'Database',       'emerald', ARRAY['MongoDB', 'MySQL', 'PostgreSQL']),
('cat-tools',    'Tools & DevOps', 'orange',  ARRAY['Git/GitHub', 'VS Code', 'Postman', 'Jira', 'Slack', 'Figma'])
ON CONFLICT (id) DO NOTHING;

-- Site settings (hero, about, contact stored as JSONB)
INSERT INTO site_settings (key, value) VALUES
(
  'hero',
  '{
    "name": "Etsub",
    "badge": "Available for freelance work",
    "roles": ["Web Applications", "Beautiful UIs", "Scalable Backends", "Digital Experiences"],
    "description": "A passionate Software Engineer specializing in building intuitive, responsive, and scalable applications with modern technologies.",
    "stats": [
      { "value": "1+", "label": "Years Experience" },
      { "value": "5+", "label": "Projects Built" },
      { "value": "10+", "label": "Technologies" }
    ]
  }'::jsonb
),
(
  'about',
  $$
  {
    "paragraphs": [
      "I'm a dedicated Software Engineer and frontend developer based in Addis Ababa, Ethiopia, with a passion for creating elegant solutions to complex problems. With experience in both startup and tech company environments, I bring a well-rounded perspective to every project I work on.",
      "My approach combines technical expertise with creative problem-solving to build intuitive, responsive, and scalable applications. I'm committed to writing clean, maintainable code and continuously learning new technologies to stay at the forefront of web development."
    ],
    "experiences": [
      {
        "id": "exp-1",
        "title": "Frontend Developer",
        "company": "Amplitude Ventures AS",
        "period": "Feb 2025 - Present",
        "description": "Contributing to modern web solutions with a focus on performance, usability, and clean architecture using React and TypeScript.",
        "isCurrent": true
      }
    ]
  }
  $$::jsonb
)
,
(
  'contact',
  '{
    "email": "etsubyetwale@gmail.com",
    "phone": "+251 931 050 654",
    "location": "Addis Ababa, Ethiopia",
    "socials": [
      { "id": "soc-1", "name": "GitHub",   "url": "https://github.com/etsubie",                            "platform": "github" },
      { "id": "soc-2", "name": "LinkedIn", "url": "https://linkedin.com/in/etsubie",   "platform": "linkedin" }
    ]
  }'::jsonb
)
ON CONFLICT (key) DO NOTHING;

-- ════════════════════════════════════════════════
-- Storage bucket for uploaded images
-- ════════════════════════════════════════════════

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read
CREATE POLICY "Public read portfolio images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

-- Authenticated upload
CREATE POLICY "Auth upload portfolio images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- Authenticated update
CREATE POLICY "Auth update portfolio images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- Authenticated delete
CREATE POLICY "Auth delete portfolio images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- ────────────────────────────────────────────────
-- Seed: services + footer settings
-- ────────────────────────────────────────────────

INSERT INTO site_settings (key, value, updated_at)
VALUES (
  'services',
  '[
    {"id":"svc-1","icon":"Code2","title":"Frontend Development","description":"Building modern, responsive user interfaces with React and TypeScript that deliver exceptional user experiences across all devices."},
    {"id":"svc-2","icon":"Server","title":"Backend Development","description":"Developing robust server-side applications and RESTful APIs using Laravel, Node.js, and Express for reliable, scalable systems."},
    {"id":"svc-3","icon":"Layers","title":"Full-Stack Solutions","description":"End-to-end application development from concept to deployment, combining frontend and backend expertise for complete solutions."}
  ]'::jsonb,
  NOW()
)
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value, updated_at)
VALUES (
  'footer',
  '{"text":"Built with","authorName":"Etsub"}'::jsonb,
  NOW()
)
ON CONFLICT (key) DO NOTHING;

-- ────────────────────────────────────────────────
-- Done! Now go to Authentication → Users and create
-- an admin user with email + password.
-- ────────────────────────────────────────────────
