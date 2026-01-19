# How to Run Database Setup

## Quick Setup Instructions

Since PostgreSQL requires authentication, please follow these steps:

### Method 1: Using pgAdmin (Easiest - GUI)

1. **Open pgAdmin** (usually in Start Menu)

2. **Connect to PostgreSQL Server**
   - Enter your PostgreSQL password when prompted

3. **Create the Database**
   - Right-click on "Databases" → Create → Database
   - Name: `Ikoha Community Development`
   - Click "Save"

4. **Run the SQL Script**
   - Right-click on "Ikoha Community Development" database → Query Tool
   - Click "Open File" (or File → Open)
   - Select `create_tables.sql`
   - Click "Execute" (F5) or press F5

5. **Verify**
   - You should see "Success" message
   - Expand the database → Schemas → public → Tables
   - You should see 9 tables

### Method 2: Using Command Line (psql)

1. **Open PowerShell** in the project directory

2. **Set your PostgreSQL password** (replace with your actual password):
   ```powershell
   $env:PGPASSWORD = "your_postgres_password"
   ```

3. **Create the database**:
   ```powershell
   & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -c "CREATE DATABASE `"Ikoha Community Development`";"
   ```

4. **Run the table creation script**:
   ```powershell
   & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d "`"Ikoha Community Development`"" -f create_tables.sql
   ```

5. **Verify tables were created**:
   ```powershell
   & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d "`"Ikoha Community Development`"" -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"
   ```

### Method 3: Interactive psql Session

1. **Open PowerShell** and connect:
   ```powershell
   & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres
   ```

2. **Enter your password** when prompted

3. **Create database**:
   ```sql
   CREATE DATABASE "Ikoha Community Development";
   ```

4. **Connect to the database**:
   ```sql
   \c "Ikoha Community Development"
   ```

5. **Run the script**:
   ```sql
   \i create_tables.sql
   ```
   
   Or with full path:
   ```sql
   \i 'C:\Users\king\OneDrive\Desktop\Ikoha Community Development\create_tables.sql'
   ```

6. **Verify**:
   ```sql
   \dt
   ```
   
   Should show 9 tables.

## Troubleshooting

### "Connection refused" Error
- **Check if PostgreSQL service is running:**
  ```powershell
  Get-Service postgresql-x64-17
  ```
  
- **Start the service if needed:**
  ```powershell
  Start-Service postgresql-x64-17
  ```

### "Password authentication failed"
- Make sure you're using the correct PostgreSQL password
- If you forgot the password, you may need to reset it in pgAdmin or PostgreSQL configuration

### "Database already exists"
- The database already exists, which is fine
- You can proceed to run the table creation script
- If you want to recreate, drop it first:
  ```sql
  DROP DATABASE "Ikoha Community Development";
  ```

### "Permission denied"
- Make sure you're using the `postgres` superuser account
- Or use an account with CREATE DATABASE privileges

## After Setup

Once tables are created, update your `.env.local` file:

```bash
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/Ikoha%20Community%20Development"
```

Replace `your_password` with your actual PostgreSQL password.

## Verify Installation

Run this query to see all tables:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

Expected output (9 tables):
- businesses
- community_info
- contact_inquiries
- documents
- events
- mineral_resources
- news
- projects
- users
