-- =====================================================
-- Ikoha Community Development Database Schema
-- Database Name: "Ikoha Community Development"
-- =====================================================
-- 
-- Instructions:
-- 1. Connect to PostgreSQL
-- 2. Create database: CREATE DATABASE "Ikoha Community Development";
-- 3. Connect to the database: \c "Ikoha Community Development"
-- 4. Run this script: \i create_tables.sql
-- 
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CREATE ENUM TYPES
-- =====================================================

-- User roles
CREATE TYPE user_role AS ENUM ('admin', 'member', 'visitor');

-- Mineral resource categories
CREATE TYPE mineral_category AS ENUM ('metallic', 'non-metallic', 'energy', 'precious');

-- Extraction status
CREATE TYPE extraction_status AS ENUM ('active', 'inactive', 'planned', 'exploration');

-- Project categories
CREATE TYPE project_category AS ENUM ('infrastructure', 'education', 'healthcare', 'water', 'energy', 'other');

-- Project status
CREATE TYPE project_status AS ENUM ('planning', 'in_progress', 'completed', 'on_hold');

-- Business categories
CREATE TYPE business_category AS ENUM ('retail', 'service', 'manufacturing', 'agriculture', 'mining', 'other');

-- News categories
CREATE TYPE news_category AS ENUM ('general', 'development', 'minerals', 'events', 'announcements');

-- Event types
CREATE TYPE event_type AS ENUM ('meeting', 'festival', 'workshop', 'celebration', 'other');

-- Document categories
CREATE TYPE document_category AS ENUM ('legal', 'financial', 'environmental', 'technical', 'reports', 'other');

-- Community info sections
CREATE TYPE community_section AS ENUM ('history', 'demographics', 'culture', 'leadership', 'location');

-- Inquiry types
CREATE TYPE inquiry_type AS ENUM ('general', 'investment', 'partnership', 'media', 'other');

-- Inquiry status
CREATE TYPE inquiry_status AS ENUM ('new', 'in_progress', 'resolved', 'archived');

-- =====================================================
-- TABLE 1: users
-- =====================================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'visitor',
    phone VARCHAR(50),
    address TEXT,
    profile_image_url TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Index for users
CREATE UNIQUE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- =====================================================
-- TABLE 2: mineral_resources
-- =====================================================

CREATE TABLE mineral_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category mineral_category NOT NULL,
    description TEXT NOT NULL,
    location_description VARCHAR(500) NOT NULL,
    coordinates_lat DECIMAL(10, 8),
    coordinates_lng DECIMAL(11, 8),
    estimated_reserves VARCHAR(255),
    extraction_status extraction_status NOT NULL DEFAULT 'exploration',
    mining_company VARCHAR(255),
    license_number VARCHAR(100),
    license_expiry DATE,
    environmental_impact TEXT,
    economic_value VARCHAR(255),
    images JSONB,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for mineral_resources
CREATE INDEX idx_mineral_resources_category ON mineral_resources(category);
CREATE INDEX idx_mineral_resources_extraction_status ON mineral_resources(extraction_status);
CREATE INDEX idx_mineral_resources_created_by ON mineral_resources(created_by);

-- =====================================================
-- TABLE 3: projects
-- =====================================================

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category project_category NOT NULL,
    status project_status NOT NULL DEFAULT 'planning',
    start_date DATE,
    expected_completion_date DATE,
    actual_completion_date DATE,
    budget DECIMAL(15, 2),
    funding_source VARCHAR(255),
    location VARCHAR(500) NOT NULL,
    coordinates_lat DECIMAL(10, 8),
    coordinates_lng DECIMAL(11, 8),
    images JSONB,
    progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    contractor VARCHAR(255),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for projects
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_created_by ON projects(created_by);

-- =====================================================
-- TABLE 4: businesses
-- =====================================================

CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category business_category NOT NULL,
    description TEXT,
    owner_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    address VARCHAR(500) NOT NULL,
    coordinates_lat DECIMAL(10, 8),
    coordinates_lng DECIMAL(11, 8),
    website VARCHAR(255),
    logo_url TEXT,
    images JSONB,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for businesses
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_is_verified ON businesses(is_verified);

-- =====================================================
-- TABLE 5: news
-- =====================================================

CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt VARCHAR(500),
    category news_category NOT NULL,
    featured_image_url TEXT,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    is_published BOOLEAN NOT NULL DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    views_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for news
CREATE UNIQUE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_is_published ON news(is_published);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_author_id ON news(author_id);
CREATE INDEX idx_news_published_at ON news(published_at);

-- =====================================================
-- TABLE 6: events
-- =====================================================

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_type event_type NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    location VARCHAR(500) NOT NULL,
    coordinates_lat DECIMAL(10, 8),
    coordinates_lng DECIMAL(11, 8),
    organizer VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    registration_required BOOLEAN NOT NULL DEFAULT false,
    registration_url VARCHAR(500),
    featured_image_url TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for events
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_is_published ON events(is_published);
CREATE INDEX idx_events_event_type ON events(event_type);

-- =====================================================
-- TABLE 7: documents
-- =====================================================

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category document_category NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size BIGINT,
    is_public BOOLEAN NOT NULL DEFAULT true,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    download_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for documents
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_documents_is_public ON documents(is_public);
CREATE INDEX idx_documents_uploaded_by ON documents(uploaded_by);

-- =====================================================
-- TABLE 8: community_info
-- =====================================================

CREATE TABLE community_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section community_section NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    images JSONB,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for community_info
CREATE INDEX idx_community_info_section ON community_info(section);
CREATE INDEX idx_community_info_is_active ON community_info(is_active);
CREATE INDEX idx_community_info_display_order ON community_info(display_order);

-- =====================================================
-- TABLE 9: contact_inquiries
-- =====================================================

CREATE TABLE contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    inquiry_type inquiry_type NOT NULL DEFAULT 'general',
    status inquiry_status NOT NULL DEFAULT 'new',
    responded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    response_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for contact_inquiries
CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_contact_inquiries_inquiry_type ON contact_inquiries(inquiry_type);
CREATE INDEX idx_contact_inquiries_created_at ON contact_inquiries(created_at);

-- =====================================================
-- CREATE TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mineral_resources_updated_at BEFORE UPDATE ON mineral_resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON businesses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_info_updated_at BEFORE UPDATE ON community_info
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_inquiries_updated_at BEFORE UPDATE ON contact_inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Uncomment to verify tables were created:
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- ORDER BY table_name;

-- Uncomment to see all indexes:
-- SELECT tablename, indexname FROM pg_indexes 
-- WHERE schemaname = 'public' 
-- ORDER BY tablename, indexname;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
