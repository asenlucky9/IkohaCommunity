# Run Table Creation Script - Quick Guide

## ✅ Database Created: "Ikoha Community Development"

Now you need to run the table creation script. Choose one method:

---

## Method 1: pgAdmin (Easiest - Recommended)

1. **Open pgAdmin**

2. **Connect to your PostgreSQL server** (if not already connected)
   - Enter your password when prompted

3. **Expand the database tree:**
   - Servers → PostgreSQL 17 → Databases → **Ikoha Community Development**

4. **Open Query Tool:**
   - Right-click on "Ikoha Community Development" → **Query Tool**

5. **Open the SQL file:**
   - Click the folder icon (Open File) or File → Open
   - Navigate to: `C:\Users\king\OneDrive\Desktop\Ikoha Community Development`
   - Select `create_tables.sql`
   - Click Open

6. **Execute the script:**
   - Click the Execute button (▶) or press **F5**
   - Wait for completion

7. **Verify:**
   - Expand: Databases → Ikoha Community Development → Schemas → public → Tables
   - You should see **9 tables**:
     - businesses
     - community_info
     - contact_inquiries
     - documents
     - events
     - mineral_resources
     - news
     - projects
     - users

---

## Method 2: Command Line (psql)

1. **Open PowerShell** in the project directory

2. **Set your PostgreSQL password:**
   ```powershell
   $env:PGPASSWORD = "your_postgres_password"
   ```

3. **Run the SQL script:**
   ```powershell
   & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d "`"Ikoha Community Development`"" -f create_tables.sql
   ```

4. **Verify tables:**
   ```powershell
   & "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d "`"Ikoha Community Development`"" -c "\dt"
   ```

---

## Method 3: Copy-Paste SQL (Alternative)

If you prefer, you can copy the entire contents of `create_tables.sql` and paste it into pgAdmin Query Tool, then execute.

---

## Expected Result

After running the script, you should see:
- ✅ Success messages
- ✅ 9 tables created
- ✅ All indexes created
- ✅ Triggers created

## Troubleshooting

**If you see "relation already exists":**
- Some tables might already exist
- You can either:
  - Drop existing tables and rerun
  - Or continue (the script uses IF NOT EXISTS where possible)

**If you see permission errors:**
- Make sure you're connected as the `postgres` user or a user with CREATE privileges

---

## Next Steps After Tables Are Created

1. **Update `.env.local`:**
   ```bash
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/Ikoha%20Community%20Development"
   ```

2. **Start building your Next.js application!**

---

**The SQL script is ready at:** `create_tables.sql`
