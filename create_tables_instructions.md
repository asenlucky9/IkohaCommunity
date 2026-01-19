# SQL Table Creation Instructions

## Quick Start

### Option 1: Using psql Command Line

1. **Connect to PostgreSQL:**
   ```bash
   psql -U postgres
   ```

2. **Create the database:**
   ```sql
   CREATE DATABASE "Ikoha Community Development";
   ```

3. **Connect to the database:**
   ```sql
   \c "Ikoha Community Development"
   ```

4. **Run the SQL script:**
   ```sql
   \i create_tables.sql
   ```
   
   Or if you're in a different directory:
   ```sql
   \i 'C:\Users\king\OneDrive\Desktop\Ikoha Community Development\create_tables.sql'
   ```

### Option 2: Using pgAdmin

1. Open pgAdmin
2. Right-click on "Databases" → Create → Database
3. Name: `Ikoha Community Development`
4. Click "Save"
5. Right-click on the new database → Query Tool
6. Open `create_tables.sql` file
7. Click "Execute" (F5)

### Option 3: Using Command Line (Windows PowerShell)

```powershell
# Set your PostgreSQL password (if needed)
$env:PGPASSWORD = "your_password"

# Create database
psql -U postgres -c 'CREATE DATABASE "Ikoha Community Development";'

# Run the SQL file
psql -U postgres -d "Ikoha Community Development" -f create_tables.sql
```

## What the Script Creates

### Tables (9 total):
1. ✅ **users** - User accounts and authentication
2. ✅ **mineral_resources** - Mineral inventory
3. ✅ **projects** - Development projects
4. ✅ **businesses** - Business directory
5. ✅ **news** - News articles
6. ✅ **events** - Community events
7. ✅ **documents** - Document library
8. ✅ **community_info** - Community information sections
9. ✅ **contact_inquiries** - Contact form submissions

### Features:
- ✅ UUID primary keys (auto-generated)
- ✅ Foreign key relationships
- ✅ Indexes for performance
- ✅ ENUM types for data integrity
- ✅ Automatic `updated_at` triggers
- ✅ Default values
- ✅ Constraints and validations

## Verify Installation

After running the script, verify tables were created:

```sql
-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Count tables (should return 9)
SELECT COUNT(*) 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';

-- View table structure
\d users
\d mineral_resources
-- etc.
```

## Troubleshooting

### Error: "extension uuid-ossp does not exist"
**Solution:** Install the extension manually:
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Error: "database does not exist"
**Solution:** Create the database first:
```sql
CREATE DATABASE "Ikoha Community Development";
```

### Error: "permission denied"
**Solution:** Ensure you're using a user with CREATE privileges, or use the postgres superuser.

### Error: "relation already exists"
**Solution:** Tables already exist. To recreate:
```sql
-- Drop all tables (WARNING: This deletes all data!)
DROP TABLE IF EXISTS contact_inquiries CASCADE;
DROP TABLE IF EXISTS community_info CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS businesses CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS mineral_resources CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Then drop ENUM types
DROP TYPE IF EXISTS inquiry_status CASCADE;
DROP TYPE IF EXISTS inquiry_type CASCADE;
DROP TYPE IF EXISTS community_section CASCADE;
DROP TYPE IF EXISTS document_category CASCADE;
DROP TYPE IF EXISTS event_type CASCADE;
DROP TYPE IF EXISTS news_category CASCADE;
DROP TYPE IF EXISTS business_category CASCADE;
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS project_category CASCADE;
DROP TYPE IF EXISTS extraction_status CASCADE;
DROP TYPE IF EXISTS mineral_category CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- Then run create_tables.sql again
```

## Next Steps

After creating the tables:

1. **Set up your connection string** in `.env.local`:
   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/Ikoha%20Community%20Development"
   ```

2. **Create your first admin user** (optional):
   ```sql
   INSERT INTO users (email, password_hash, full_name, role, is_verified)
   VALUES ('admin@ikoha.com', 'hashed_password_here', 'Admin User', 'admin', true);
   ```

3. **Start building your application** using the database schema!

## Notes

- All timestamps use `TIMESTAMP WITH TIME ZONE` for proper timezone handling
- UUIDs are auto-generated using `uuid_generate_v4()`
- The `updated_at` column is automatically updated via triggers
- JSONB is used for image arrays (more efficient than JSON)
- All foreign keys use `ON DELETE SET NULL` to preserve data integrity
