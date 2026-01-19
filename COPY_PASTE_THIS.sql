-- =====================================================
-- COPY ALL OF THIS AND PASTE INTO SSMS QUERY WINDOW
-- Then click Execute (F5)
-- =====================================================

USE [Ikoha Community Development];
GO

-- =====================================================
-- TABLE 1: users
-- =====================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[users] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [email] NVARCHAR(255) NOT NULL UNIQUE,
    [password_hash] NVARCHAR(255) NOT NULL,
    [full_name] NVARCHAR(255) NOT NULL,
    [role] NVARCHAR(50) NOT NULL DEFAULT 'visitor' 
        CHECK ([role] IN ('admin', 'member', 'visitor')),
    [phone] NVARCHAR(50) NULL,
    [address] NVARCHAR(MAX) NULL,
    [profile_image_url] NVARCHAR(MAX) NULL,
    [is_verified] BIT NOT NULL DEFAULT 0,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [last_login] DATETIME2 NULL
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_users_email')
    CREATE UNIQUE INDEX idx_users_email ON [dbo].[users]([email]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_users_role')
    CREATE INDEX idx_users_role ON [dbo].[users]([role]);
GO

-- =====================================================
-- TABLE 2: mineral_resources
-- =====================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[mineral_resources]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[mineral_resources] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [name] NVARCHAR(255) NOT NULL,
    [category] NVARCHAR(50) NOT NULL 
        CHECK ([category] IN ('metallic', 'non-metallic', 'energy', 'precious')),
    [description] NVARCHAR(MAX) NOT NULL,
    [location_description] NVARCHAR(500) NOT NULL,
    [coordinates_lat] DECIMAL(10, 8) NULL,
    [coordinates_lng] DECIMAL(11, 8) NULL,
    [estimated_reserves] NVARCHAR(255) NULL,
    [extraction_status] NVARCHAR(50) NOT NULL DEFAULT 'exploration'
        CHECK ([extraction_status] IN ('active', 'inactive', 'planned', 'exploration')),
    [mining_company] NVARCHAR(255) NULL,
    [license_number] NVARCHAR(100) NULL,
    [license_expiry] DATE NULL,
    [environmental_impact] NVARCHAR(MAX) NULL,
    [economic_value] NVARCHAR(255) NULL,
    [images] NVARCHAR(MAX) NULL,
    [created_by] UNIQUEIDENTIFIER NULL,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY ([created_by]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_mineral_resources_category')
    CREATE INDEX idx_mineral_resources_category ON [dbo].[mineral_resources]([category]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_mineral_resources_extraction_status')
    CREATE INDEX idx_mineral_resources_extraction_status ON [dbo].[mineral_resources]([extraction_status]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_mineral_resources_created_by')
    CREATE INDEX idx_mineral_resources_created_by ON [dbo].[mineral_resources]([created_by]);
GO

-- =====================================================
-- TABLE 3: projects
-- =====================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[projects]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[projects] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [title] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(MAX) NOT NULL,
    [category] NVARCHAR(50) NOT NULL
        CHECK ([category] IN ('infrastructure', 'education', 'healthcare', 'water', 'energy', 'other')),
    [status] NVARCHAR(50) NOT NULL DEFAULT 'planning'
        CHECK ([status] IN ('planning', 'in_progress', 'completed', 'on_hold')),
    [start_date] DATE NULL,
    [expected_completion_date] DATE NULL,
    [actual_completion_date] DATE NULL,
    [budget] DECIMAL(15, 2) NULL,
    [funding_source] NVARCHAR(255) NULL,
    [location] NVARCHAR(500) NOT NULL,
    [coordinates_lat] DECIMAL(10, 8) NULL,
    [coordinates_lng] DECIMAL(11, 8) NULL,
    [images] NVARCHAR(MAX) NULL,
    [progress_percentage] INT NOT NULL DEFAULT 0
        CHECK ([progress_percentage] >= 0 AND [progress_percentage] <= 100),
    [contractor] NVARCHAR(255) NULL,
    [created_by] UNIQUEIDENTIFIER NULL,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY ([created_by]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_projects_status')
    CREATE INDEX idx_projects_status ON [dbo].[projects]([status]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_projects_category')
    CREATE INDEX idx_projects_category ON [dbo].[projects]([category]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_projects_created_by')
    CREATE INDEX idx_projects_created_by ON [dbo].[projects]([created_by]);
GO

-- =====================================================
-- TABLE 4: businesses
-- =====================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[businesses]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[businesses] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [name] NVARCHAR(255) NOT NULL,
    [category] NVARCHAR(50) NOT NULL
        CHECK ([category] IN ('retail', 'service', 'manufacturing', 'agriculture', 'mining', 'other')),
    [description] NVARCHAR(MAX) NULL,
    [owner_name] NVARCHAR(255) NOT NULL,
    [email] NVARCHAR(255) NULL,
    [phone] NVARCHAR(50) NOT NULL,
    [address] NVARCHAR(500) NOT NULL,
    [coordinates_lat] DECIMAL(10, 8) NULL,
    [coordinates_lng] DECIMAL(11, 8) NULL,
    [website] NVARCHAR(255) NULL,
    [logo_url] NVARCHAR(MAX) NULL,
    [images] NVARCHAR(MAX) NULL,
    [is_verified] BIT NOT NULL DEFAULT 0,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE()
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_businesses_category')
    CREATE INDEX idx_businesses_category ON [dbo].[businesses]([category]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_businesses_is_verified')
    CREATE INDEX idx_businesses_is_verified ON [dbo].[businesses]([is_verified]);
GO

-- =====================================================
-- TABLE 5: news
-- =====================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[news]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[news] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [title] NVARCHAR(255) NOT NULL,
    [slug] NVARCHAR(255) NOT NULL UNIQUE,
    [content] NVARCHAR(MAX) NOT NULL,
    [excerpt] NVARCHAR(500) NULL,
    [category] NVARCHAR(50) NOT NULL
        CHECK ([category] IN ('general', 'development', 'minerals', 'events', 'announcements')),
    [featured_image_url] NVARCHAR(MAX) NULL,
    [author_id] UNIQUEIDENTIFIER NULL,
    [is_published] BIT NOT NULL DEFAULT 0,
    [published_at] DATETIME2 NULL,
    [views_count] INT NOT NULL DEFAULT 0,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY ([author_id]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_news_slug')
    CREATE UNIQUE INDEX idx_news_slug ON [dbo].[news]([slug]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_news_is_published')
    CREATE INDEX idx_news_is_published ON [dbo].[news]([is_published]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_news_category')
    CREATE INDEX idx_news_category ON [dbo].[news]([category]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_news_author_id')
    CREATE INDEX idx_news_author_id ON [dbo].[news]([author_id]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_news_published_at')
    CREATE INDEX idx_news_published_at ON [dbo].[news]([published_at]);
GO

-- =====================================================
-- TABLE 6: events
-- =====================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[events]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[events] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [title] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(MAX) NOT NULL,
    [event_type] NVARCHAR(50) NOT NULL
        CHECK ([event_type] IN ('meeting', 'festival', 'workshop', 'celebration', 'other')),
    [start_date] DATETIME2 NOT NULL,
    [end_date] DATETIME2 NULL,
    [location] NVARCHAR(500) NOT NULL,
    [coordinates_lat] DECIMAL(10, 8) NULL,
    [coordinates_lng] DECIMAL(11, 8) NULL,
    [organizer] NVARCHAR(255) NULL,
    [contact_email] NVARCHAR(255) NULL,
    [contact_phone] NVARCHAR(50) NULL,
    [registration_required] BIT NOT NULL DEFAULT 0,
    [registration_url] NVARCHAR(500) NULL,
    [featured_image_url] NVARCHAR(MAX) NULL,
    [is_published] BIT NOT NULL DEFAULT 0,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE()
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_events_start_date')
    CREATE INDEX idx_events_start_date ON [dbo].[events]([start_date]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_events_is_published')
    CREATE INDEX idx_events_is_published ON [dbo].[events]([is_published]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_events_event_type')
    CREATE INDEX idx_events_event_type ON [dbo].[events]([event_type]);
GO

-- =====================================================
-- TABLE 7: documents
-- =====================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[documents]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[documents] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [title] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(MAX) NULL,
    [category] NVARCHAR(50) NOT NULL
        CHECK ([category] IN ('legal', 'financial', 'environmental', 'technical', 'reports', 'other')),
    [file_url] NVARCHAR(MAX) NOT NULL,
    [file_type] NVARCHAR(50) NOT NULL,
    [file_size] BIGINT NULL,
    [is_public] BIT NOT NULL DEFAULT 1,
    [uploaded_by] UNIQUEIDENTIFIER NULL,
    [download_count] INT NOT NULL DEFAULT 0,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY ([uploaded_by]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_documents_category')
    CREATE INDEX idx_documents_category ON [dbo].[documents]([category]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_documents_is_public')
    CREATE INDEX idx_documents_is_public ON [dbo].[documents]([is_public]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_documents_uploaded_by')
    CREATE INDEX idx_documents_uploaded_by ON [dbo].[documents]([uploaded_by]);
GO

-- =====================================================
-- TABLE 8: community_info
-- =====================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[community_info]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[community_info] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [section] NVARCHAR(50) NOT NULL
        CHECK ([section] IN ('history', 'demographics', 'culture', 'leadership', 'location')),
    [title] NVARCHAR(255) NOT NULL,
    [content] NVARCHAR(MAX) NOT NULL,
    [images] NVARCHAR(MAX) NULL,
    [display_order] INT NOT NULL DEFAULT 0,
    [is_active] BIT NOT NULL DEFAULT 1,
    [updated_by] UNIQUEIDENTIFIER NULL,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY ([updated_by]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_community_info_section')
    CREATE INDEX idx_community_info_section ON [dbo].[community_info]([section]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_community_info_is_active')
    CREATE INDEX idx_community_info_is_active ON [dbo].[community_info]([is_active]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_community_info_display_order')
    CREATE INDEX idx_community_info_display_order ON [dbo].[community_info]([display_order]);
GO

-- =====================================================
-- TABLE 9: contact_inquiries
-- =====================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[contact_inquiries]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[contact_inquiries] (
    [id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    [name] NVARCHAR(255) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [phone] NVARCHAR(50) NULL,
    [subject] NVARCHAR(255) NOT NULL,
    [message] NVARCHAR(MAX) NOT NULL,
    [inquiry_type] NVARCHAR(50) NOT NULL DEFAULT 'general'
        CHECK ([inquiry_type] IN ('general', 'investment', 'partnership', 'media', 'other')),
    [status] NVARCHAR(50) NOT NULL DEFAULT 'new'
        CHECK ([status] IN ('new', 'in_progress', 'resolved', 'archived')),
    [responded_by] UNIQUEIDENTIFIER NULL,
    [response_notes] NVARCHAR(MAX) NULL,
    [created_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY ([responded_by]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL
);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_contact_inquiries_status')
    CREATE INDEX idx_contact_inquiries_status ON [dbo].[contact_inquiries]([status]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_contact_inquiries_inquiry_type')
    CREATE INDEX idx_contact_inquiries_inquiry_type ON [dbo].[contact_inquiries]([inquiry_type]);
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_contact_inquiries_created_at')
    CREATE INDEX idx_contact_inquiries_created_at ON [dbo].[contact_inquiries]([created_at]);
GO

-- =====================================================
-- CREATE TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Trigger for users
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_users_updated_at')
    DROP TRIGGER trg_users_updated_at;
GO

CREATE TRIGGER trg_users_updated_at
ON [dbo].[users]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[users]
    SET [updated_at] = GETDATE()
    FROM [dbo].[users] u
    INNER JOIN inserted i ON u.[id] = i.[id];
END;
GO

-- Trigger for mineral_resources
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_mineral_resources_updated_at')
    DROP TRIGGER trg_mineral_resources_updated_at;
GO

CREATE TRIGGER trg_mineral_resources_updated_at
ON [dbo].[mineral_resources]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[mineral_resources]
    SET [updated_at] = GETDATE()
    FROM [dbo].[mineral_resources] m
    INNER JOIN inserted i ON m.[id] = i.[id];
END;
GO

-- Trigger for projects
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_projects_updated_at')
    DROP TRIGGER trg_projects_updated_at;
GO

CREATE TRIGGER trg_projects_updated_at
ON [dbo].[projects]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[projects]
    SET [updated_at] = GETDATE()
    FROM [dbo].[projects] p
    INNER JOIN inserted i ON p.[id] = i.[id];
END;
GO

-- Trigger for businesses
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_businesses_updated_at')
    DROP TRIGGER trg_businesses_updated_at;
GO

CREATE TRIGGER trg_businesses_updated_at
ON [dbo].[businesses]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[businesses]
    SET [updated_at] = GETDATE()
    FROM [dbo].[businesses] b
    INNER JOIN inserted i ON b.[id] = i.[id];
END;
GO

-- Trigger for news
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_news_updated_at')
    DROP TRIGGER trg_news_updated_at;
GO

CREATE TRIGGER trg_news_updated_at
ON [dbo].[news]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[news]
    SET [updated_at] = GETDATE()
    FROM [dbo].[news] n
    INNER JOIN inserted i ON n.[id] = i.[id];
END;
GO

-- Trigger for events
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_events_updated_at')
    DROP TRIGGER trg_events_updated_at;
GO

CREATE TRIGGER trg_events_updated_at
ON [dbo].[events]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[events]
    SET [updated_at] = GETDATE()
    FROM [dbo].[events] e
    INNER JOIN inserted i ON e.[id] = i.[id];
END;
GO

-- Trigger for documents
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_documents_updated_at')
    DROP TRIGGER trg_documents_updated_at;
GO

CREATE TRIGGER trg_documents_updated_at
ON [dbo].[documents]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[documents]
    SET [updated_at] = GETDATE()
    FROM [dbo].[documents] d
    INNER JOIN inserted i ON d.[id] = i.[id];
END;
GO

-- Trigger for community_info
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_community_info_updated_at')
    DROP TRIGGER trg_community_info_updated_at;
GO

CREATE TRIGGER trg_community_info_updated_at
ON [dbo].[community_info]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[community_info]
    SET [updated_at] = GETDATE()
    FROM [dbo].[community_info] c
    INNER JOIN inserted i ON c.[id] = i.[id];
END;
GO

-- Trigger for contact_inquiries
IF EXISTS (SELECT * FROM sys.triggers WHERE name = 'trg_contact_inquiries_updated_at')
    DROP TRIGGER trg_contact_inquiries_updated_at;
GO

CREATE TRIGGER trg_contact_inquiries_updated_at
ON [dbo].[contact_inquiries]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[contact_inquiries]
    SET [updated_at] = GETDATE()
    FROM [dbo].[contact_inquiries] c
    INNER JOIN inserted i ON c.[id] = i.[id];
END;
GO

-- =====================================================
-- VERIFICATION
-- =====================================================

PRINT '========================================';
PRINT 'Database Setup Complete!';
PRINT '========================================';
PRINT '';

DECLARE @TableCount INT;
SELECT @TableCount = COUNT(*)
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'dbo' AND TABLE_TYPE = 'BASE TABLE';

PRINT 'Total Tables Created: ' + CAST(@TableCount AS NVARCHAR(10));
PRINT '';

PRINT 'Tables:';
SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'dbo' AND TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
PRINT '';

PRINT 'All tables, indexes, and triggers have been created successfully!';
PRINT '========================================';
