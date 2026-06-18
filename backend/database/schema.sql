-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. BASE REFERENCE TABLES
-- ==========================================

-- Countries Table
CREATE TABLE IF NOT EXISTS countries (
    id SERIAL PRIMARY KEY,
    code VARCHAR(2) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone_code VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Funding Types Table
CREATE TABLE IF NOT EXISTS funding_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Official Sources Table
CREATE TABLE IF NOT EXISTS official_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    website_url TEXT NOT NULL,
    last_scraped_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Dynamic RSS Feed Sources Table
CREATE TABLE IF NOT EXISTS rss_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    feed_url TEXT UNIQUE NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_fetched_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. ACADEMIC ENTITIES TABLES
-- ==========================================

-- Universities Table
CREATE TABLE IF NOT EXISTS universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    country_id INTEGER REFERENCES countries(id) ON DELETE RESTRICT,
    website_url TEXT,
    logo_url TEXT,
    description TEXT,
    ranking_global INTEGER,
    ranking_national INTEGER,
    acceptance_rate NUMERIC(5,2),
    average_tuition VARCHAR(100),
    sat_range VARCHAR(50),
    act_range VARCHAR(50),
    student_population INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sponsoring Organizations Table
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    description TEXT,
    website_url TEXT,
    type VARCHAR(50), -- e.g. 'Government', 'NGO', 'Foundation', 'Corporate'
    founded_year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Programs Table
CREATE TABLE IF NOT EXISTS programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    university_id UUID REFERENCES universities(id) ON DELETE CASCADE,
    degree_level VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 3. CORE OPPORTUNITIES TABLE
-- ==========================================

-- Base Opportunities Table
CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE RESTRICT,
    funding_type_id INTEGER REFERENCES funding_types(id) ON DELETE RESTRICT,
    official_source_id UUID REFERENCES official_sources(id) ON DELETE SET NULL,
    official_source_url TEXT NOT NULL,
    application_url TEXT,
    
    university_id UUID REFERENCES universities(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    country_id INTEGER REFERENCES countries(id) ON DELETE SET NULL,
    
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 4. PROGRAM SPECIFIC EXTENSION TABLES (1-to-1)
-- ==========================================

-- Scholarships Specifications
CREATE TABLE IF NOT EXISTS scholarships (
    opportunity_id UUID PRIMARY KEY REFERENCES opportunities(id) ON DELETE CASCADE,
    amount_value VARCHAR(255) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    covers_tuition BOOLEAN DEFAULT FALSE,
    covers_stipend BOOLEAN DEFAULT FALSE,
    covers_travel BOOLEAN DEFAULT FALSE,
    covers_insurance BOOLEAN DEFAULT FALSE
);

-- Internships Specifications
CREATE TABLE IF NOT EXISTS internships (
    opportunity_id UUID PRIMARY KEY REFERENCES opportunities(id) ON DELETE CASCADE,
    stipend_amount VARCHAR(255),
    is_paid BOOLEAN DEFAULT TRUE,
    is_remote BOOLEAN DEFAULT FALSE,
    duration_weeks INTEGER,
    has_coop_credit BOOLEAN DEFAULT FALSE
);

-- Research Grants Specifications
CREATE TABLE IF NOT EXISTS research_grants (
    opportunity_id UUID PRIMARY KEY REFERENCES opportunities(id) ON DELETE CASCADE,
    grant_value VARCHAR(255) NOT NULL,
    research_field VARCHAR(255) NOT NULL,
    project_duration_months INTEGER
);

-- Conferences Specifications
CREATE TABLE IF NOT EXISTS conferences (
    opportunity_id UUID PRIMARY KEY REFERENCES opportunities(id) ON DELETE CASCADE,
    venue_city VARCHAR(255),
    event_start_date DATE,
    event_end_date DATE,
    travel_grant_offered BOOLEAN DEFAULT FALSE,
    registration_fee_waived BOOLEAN DEFAULT FALSE
);

-- Exchange Programs Specifications
CREATE TABLE IF NOT EXISTS exchange_programs (
    opportunity_id UUID PRIMARY KEY REFERENCES opportunities(id) ON DELETE CASCADE,
    semester_duration INTEGER DEFAULT 1,
    partner_agreement_type VARCHAR(100),
    credit_transfer_guaranteed BOOLEAN DEFAULT TRUE
);

-- ==========================================
-- 5. TIMELINES, TARGETS & USER INTERACTION
-- ==========================================

-- Multiple Deadlines support per opportunity
CREATE TABLE IF NOT EXISTS deadlines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    deadline_date TIMESTAMP WITH TIME ZONE NOT NULL,
    description VARCHAR(150),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user', -- 'user' or 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Academic Profiles Table
CREATE TABLE IF NOT EXISTS academic_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    citizenship VARCHAR(10) NOT NULL,
    degree VARCHAR(50) NOT NULL,
    cgpa NUMERIC(3,2) NOT NULL CHECK (cgpa >= 0.0 AND cgpa <= 4.0),
    major VARCHAR(100) NOT NULL,
    ielts NUMERIC(2,1) CHECK (ielts >= 0.0 AND ielts <= 9.0),
    toefl INTEGER CHECK (toefl >= 0 AND toefl <= 120),
    sat_score INTEGER CHECK (sat_score >= 400 AND sat_score <= 1600),
    act_score INTEGER CHECK (act_score >= 1 AND act_score <= 36),
    preferred_countries TEXT[],
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bookmarks & Kanban Status tracking
CREATE TABLE IF NOT EXISTS bookmarks (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'wishlist' CHECK (status IN ('wishlist', 'applied', 'interviewing', 'offer')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, opportunity_id)
);

-- ==========================================
-- 5B. SYSTEM & AUDIT LOGS TABLES
-- ==========================================

-- Activity Logs Table (System & Admin audit logs)
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    log_type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 6. INDEX OPTIMIZATION
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_opportunities_category ON opportunities(category_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_funding ON opportunities(funding_type_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_university ON opportunities(university_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_country ON opportunities(country_id);

CREATE INDEX IF NOT EXISTS idx_opportunities_status ON opportunities(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_deadlines_date ON deadlines(deadline_date) WHERE is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_opportunities_search ON opportunities USING gin(
    to_tsvector('english', title || ' ' || description)
);

-- ==========================================
-- 7. SQL VIEWS
-- ==========================================

-- Combined Opportunities View for easy retrieval
CREATE OR REPLACE VIEW view_opportunities_detail AS
SELECT 
    o.id,
    o.title,
    o.description,
    o.status,
    o.published_at,
    o.created_at,
    o.updated_at,
    o.official_source_url,
    o.application_url,
    c.name as category,
    f.name as funding_type,
    u.name as university,
    co.name as country,
    co.code as country_code,
    -- Scholarship details
    s.amount_value as scholarship_amount,
    s.currency as scholarship_currency,
    s.covers_tuition,
    s.covers_stipend,
    s.covers_travel,
    s.covers_insurance,
    -- Internship details
    i.stipend_amount as internship_stipend,
    i.is_paid as internship_is_paid,
    i.is_remote as internship_is_remote,
    i.duration_weeks as internship_duration,
    -- Research grant details
    r.grant_value as research_grant_value,
    r.research_field,
    r.project_duration_months as research_duration,
    -- Conference details
    conf.venue_city as conference_city,
    conf.event_start_date as conference_start_date,
    conf.event_end_date as conference_end_date,
    conf.travel_grant_offered as conference_travel_grant,
    -- Exchange details
    ep.semester_duration as exchange_semesters,
    ep.credit_transfer_guaranteed as exchange_credit_transfer
FROM opportunities o
JOIN categories c ON o.category_id = c.id
JOIN funding_types f ON o.funding_type_id = f.id
LEFT JOIN universities u ON o.university_id = u.id
LEFT JOIN countries co ON o.country_id = co.id
LEFT JOIN scholarships s ON o.id = s.opportunity_id
LEFT JOIN internships i ON o.id = i.opportunity_id
LEFT JOIN research_grants r ON o.id = r.opportunity_id
LEFT JOIN conferences conf ON o.id = conf.opportunity_id
LEFT JOIN exchange_programs ep ON o.id = ep.opportunity_id;

-- View for Upcoming Deadlines
CREATE OR REPLACE VIEW view_upcoming_deadlines AS
SELECT 
    d.id as deadline_id,
    d.opportunity_id,
    o.title as opportunity_title,
    d.deadline_date,
    d.description as deadline_description
FROM deadlines d
JOIN opportunities o ON d.opportunity_id = o.id
WHERE d.is_active = TRUE AND d.deadline_date >= CURRENT_TIMESTAMP;

-- ==========================================
-- 8. DATABASE FUNCTIONS & TRIGGERS
-- ==========================================

-- Trigger function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to opportunities table
DROP TRIGGER IF EXISTS trg_opportunities_updated_at ON opportunities;
CREATE TRIGGER trg_opportunities_updated_at
BEFORE UPDATE ON opportunities
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Apply updated_at trigger to academic_profiles table
DROP TRIGGER IF EXISTS trg_academic_profiles_updated_at ON academic_profiles;
CREATE TRIGGER trg_academic_profiles_updated_at
BEFORE UPDATE ON academic_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on user-related tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Enable RLS on reference tables (read-only for public, write-only for admins)
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

-- Policies for public catalog access (anonymous read allowed)
DROP POLICY IF EXISTS "Public Read Access for Opportunities" ON opportunities;
CREATE POLICY "Public Read Access for Opportunities" ON opportunities
    FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Public Read Access for Deadlines" ON deadlines;
CREATE POLICY "Public Read Access for Deadlines" ON deadlines
    FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Public Read Access for Countries" ON countries;
CREATE POLICY "Public Read Access for Countries" ON countries
    FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public Read Access for Categories" ON categories;
CREATE POLICY "Public Read Access for Categories" ON categories
    FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public Read Access for Funding Types" ON funding_types;
CREATE POLICY "Public Read Access for Funding Types" ON funding_types
    FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public Read Access for Universities" ON universities;
CREATE POLICY "Public Read Access for Universities" ON universities
    FOR SELECT USING (TRUE);

-- Policies for User Profiles & Bookmarks (restricted to owner)
DROP POLICY IF EXISTS "Users can read their own user data" ON users;
CREATE POLICY "Users can read their own user data" ON users
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own user data" ON users;
CREATE POLICY "Users can update their own user data" ON users
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can read their own academic profile" ON academic_profiles;
CREATE POLICY "Users can read their own academic profile" ON academic_profiles
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own academic profile" ON academic_profiles;
CREATE POLICY "Users can insert their own academic profile" ON academic_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own academic profile" ON academic_profiles;
CREATE POLICY "Users can update their own academic profile" ON academic_profiles
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read their own bookmarks" ON bookmarks;
CREATE POLICY "Users can read their own bookmarks" ON bookmarks
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own bookmarks" ON bookmarks;
CREATE POLICY "Users can insert their own bookmarks" ON bookmarks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own bookmarks" ON bookmarks;
CREATE POLICY "Users can update their own bookmarks" ON bookmarks
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own bookmarks" ON bookmarks;
CREATE POLICY "Users can delete their own bookmarks" ON bookmarks
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for Activity Logs (restricted to admins)
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can select logs" ON activity_logs;
CREATE POLICY "Admins can select logs" ON activity_logs
    FOR SELECT USING (
      EXISTS (
        SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
      )
    );

