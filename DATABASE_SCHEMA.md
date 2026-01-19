# Database Schema Design

## Database Name
**"Ikoha Community Development"**

> **Note**: Since the database name contains spaces, use quotes when creating it: `CREATE DATABASE "Ikoha Community Development";`
> See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed setup instructions.

## Entity Relationship Overview

### Core Entities
1. Users
2. Mineral Resources
3. Projects
4. Businesses
5. News & Events
6. Documents
7. Community Info

---

## Detailed Schema

### 1. Users Table
```sql
users
├── id (UUID, Primary Key)
├── email (String, Unique, Required)
├── password_hash (String, Required)
├── full_name (String, Required)
├── role (Enum: 'admin', 'member', 'visitor', Default: 'visitor')
├── phone (String, Optional)
├── address (String, Optional)
├── profile_image_url (String, Optional)
├── is_verified (Boolean, Default: false)
├── created_at (Timestamp)
├── updated_at (Timestamp)
└── last_login (Timestamp, Optional)
```

### 2. Mineral Resources Table
```sql
mineral_resources
├── id (UUID, Primary Key)
├── name (String, Required) -- e.g., "Limestone", "Gold", "Crude Oil"
├── category (Enum: 'metallic', 'non-metallic', 'energy', 'precious', Required)
├── description (Text, Required)
├── location_description (String, Required)
├── coordinates_lat (Decimal, Optional)
├── coordinates_lng (Decimal, Optional)
├── estimated_reserves (String, Optional) -- e.g., "500,000 tons"
├── extraction_status (Enum: 'active', 'inactive', 'planned', 'exploration', Default: 'exploration')
├── mining_company (String, Optional)
├── license_number (String, Optional)
├── license_expiry (Date, Optional)
├── environmental_impact (Text, Optional)
├── economic_value (String, Optional)
├── images (JSON Array of URLs, Optional)
├── created_by (UUID, Foreign Key -> users.id)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### 3. Projects Table
```sql
projects
├── id (UUID, Primary Key)
├── title (String, Required)
├── description (Text, Required)
├── category (Enum: 'infrastructure', 'education', 'healthcare', 'water', 'energy', 'other', Required)
├── status (Enum: 'planning', 'in_progress', 'completed', 'on_hold', Default: 'planning')
├── start_date (Date, Optional)
├── expected_completion_date (Date, Optional)
├── actual_completion_date (Date, Optional)
├── budget (Decimal, Optional)
├── funding_source (String, Optional)
├── location (String, Required)
├── coordinates_lat (Decimal, Optional)
├── coordinates_lng (Decimal, Optional)
├── images (JSON Array of URLs, Optional)
├── progress_percentage (Integer, Default: 0)
├── contractor (String, Optional)
├── created_by (UUID, Foreign Key -> users.id)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### 4. Businesses Table
```sql
businesses
├── id (UUID, Primary Key)
├── name (String, Required)
├── category (Enum: 'retail', 'service', 'manufacturing', 'agriculture', 'mining', 'other', Required)
├── description (Text, Optional)
├── owner_name (String, Required)
├── email (String, Optional)
├── phone (String, Required)
├── address (String, Required)
├── coordinates_lat (Decimal, Optional)
├── coordinates_lng (Decimal, Optional)
├── website (String, Optional)
├── logo_url (String, Optional)
├── images (JSON Array of URLs, Optional)
├── is_verified (Boolean, Default: false)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### 5. News Table
```sql
news
├── id (UUID, Primary Key)
├── title (String, Required)
├── slug (String, Unique, Required) -- URL-friendly version
├── content (Text, Required)
├── excerpt (String, Optional) -- Short summary
├── category (Enum: 'general', 'development', 'minerals', 'events', 'announcements', Required)
├── featured_image_url (String, Optional)
├── author_id (UUID, Foreign Key -> users.id)
├── is_published (Boolean, Default: false)
├── published_at (Timestamp, Optional)
├── views_count (Integer, Default: 0)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### 6. Events Table
```sql
events
├── id (UUID, Primary Key)
├── title (String, Required)
├── description (Text, Required)
├── event_type (Enum: 'meeting', 'festival', 'workshop', 'celebration', 'other', Required)
├── start_date (Timestamp, Required)
├── end_date (Timestamp, Optional)
├── location (String, Required)
├── coordinates_lat (Decimal, Optional)
├── coordinates_lng (Decimal, Optional)
├── organizer (String, Optional)
├── contact_email (String, Optional)
├── contact_phone (String, Optional)
├── registration_required (Boolean, Default: false)
├── registration_url (String, Optional)
├── featured_image_url (String, Optional)
├── is_published (Boolean, Default: false)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### 7. Documents Table
```sql
documents
├── id (UUID, Primary Key)
├── title (String, Required)
├── description (Text, Optional)
├── category (Enum: 'legal', 'financial', 'environmental', 'technical', 'reports', 'other', Required)
├── file_url (String, Required)
├── file_type (String, Required) -- e.g., 'pdf', 'docx', 'xlsx'
├── file_size (Integer, Optional) -- in bytes
├── is_public (Boolean, Default: true)
├── uploaded_by (UUID, Foreign Key -> users.id)
├── download_count (Integer, Default: 0)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### 8. Community Info Table
```sql
community_info
├── id (UUID, Primary Key)
├── section (Enum: 'history', 'demographics', 'culture', 'leadership', 'location', Required)
├── title (String, Required)
├── content (Text, Required)
├── images (JSON Array of URLs, Optional)
├── display_order (Integer, Default: 0)
├── is_active (Boolean, Default: true)
├── updated_by (UUID, Foreign Key -> users.id)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

### 9. Contact Inquiries Table
```sql
contact_inquiries
├── id (UUID, Primary Key)
├── name (String, Required)
├── email (String, Required)
├── phone (String, Optional)
├── subject (String, Required)
├── message (Text, Required)
├── inquiry_type (Enum: 'general', 'investment', 'partnership', 'media', 'other', Default: 'general')
├── status (Enum: 'new', 'in_progress', 'resolved', 'archived', Default: 'new')
├── responded_by (UUID, Foreign Key -> users.id, Optional)
├── response_notes (Text, Optional)
├── created_at (Timestamp)
└── updated_at (Timestamp)
```

## Relationships

- **Users** → **Mineral Resources** (One-to-Many: created_by)
- **Users** → **Projects** (One-to-Many: created_by)
- **Users** → **News** (One-to-Many: author_id)
- **Users** → **Documents** (One-to-Many: uploaded_by)
- **Users** → **Community Info** (One-to-Many: updated_by)
- **Users** → **Contact Inquiries** (One-to-Many: responded_by)

## Indexes

- `users.email` (Unique Index)
- `mineral_resources.category` (Index for filtering)
- `mineral_resources.extraction_status` (Index for filtering)
- `projects.status` (Index for filtering)
- `news.slug` (Unique Index)
- `news.is_published` (Index for filtering)
- `events.start_date` (Index for sorting)
- `documents.category` (Index for filtering)

## Notes

- All tables include `created_at` and `updated_at` timestamps
- UUIDs are recommended for better security and distributed systems
- Consider adding soft delete functionality (deleted_at column)
- For production, add proper constraints and validation
- Consider adding audit logs for sensitive operations
