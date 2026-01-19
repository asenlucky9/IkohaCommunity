# SQL Server Setup Instructions

## ✅ You're Using SQL Server (Not PostgreSQL)

I've created a **SQL Server version** of the table creation script: `create_tables_SQLSERVER.sql`

## 🚀 How to Run in SQL Server Management Studio (SSMS)

### Method 1: Using SSMS Query Window

1. **Open SQL Server Management Studio (SSMS)**

2. **Connect to your SQL Server instance**
   - Server name: Usually `localhost` or `.\SQLEXPRESS` or your server name
   - Authentication: Windows Authentication or SQL Server Authentication
   - Click Connect

3. **Select your database:**
   - In the Object Explorer, expand "Databases"
   - Right-click on **"Ikoha Community Development"** → **New Query**
   - OR: Click "New Query" and then select the database from the dropdown

4. **Open the SQL Server script:**
   - File → Open → File
   - Navigate to: `C:\Users\king\OneDrive\Desktop\Ikoha Community Development`
   - Select: **`create_tables_SQLSERVER.sql`**
   - Click Open

5. **Execute the script:**
   - Click **Execute** (▶) or press **F5**
   - Wait for completion

6. **Verify:**
   - In Object Explorer, expand: Databases → Ikoha Community Development → Tables
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

### Method 2: Copy-Paste Method

1. Open SSMS and connect to your server
2. Select "Ikoha Community Development" database
3. Click "New Query"
4. Open `create_tables_SQLSERVER.sql` in Notepad
5. Copy all the content (Ctrl+A, Ctrl+C)
6. Paste into SSMS query window (Ctrl+V)
7. Click Execute (F5)

## 📋 What Will Be Created

✅ **9 Tables** with all relationships
✅ **Indexes** for performance
✅ **Triggers** for automatic timestamp updates
✅ **CHECK constraints** (instead of ENUMs - SQL Server doesn't have ENUMs)
✅ **Foreign Keys** for data integrity

## ⚠️ Important Notes

- **Use `create_tables_SQLSERVER.sql`** (NOT `create_tables.sql`)
- The SQL Server version uses:
  - `UNIQUEIDENTIFIER` instead of UUID
  - `NVARCHAR` instead of VARCHAR
  - `DATETIME2` instead of TIMESTAMP
  - `BIT` instead of BOOLEAN
  - CHECK constraints instead of ENUM types

## 🔍 Verify After Running

Run this query in SSMS:

```sql
USE [Ikoha Community Development];
GO

SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'dbo' AND TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
```

Should return 9 tables.

## 🔗 Connection String for Next.js

For SQL Server, your connection string will be different:

```bash
# SQL Server connection string format
DATABASE_URL="sqlserver://localhost:1433;database=Ikoha Community Development;user=sa;password=your_password;trustServerCertificate=true"
```

Or if using a connection library like `mssql` or `tedious`:

```javascript
{
  server: 'localhost',
  database: 'Ikoha Community Development',
  user: 'sa',
  password: 'your_password',
  options: {
    trustServerCertificate: true
  }
}
```

## ✅ Next Steps

After tables are created:
1. Update your `.env.local` with SQL Server connection string
2. Install SQL Server driver for Node.js: `npm install mssql` or `npm install tedious`
3. Start building your Next.js application!
