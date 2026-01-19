# Database Setup Guide

## Database Name
**"Ikoha Community Development"**

## Important Notes

### Database Names with Spaces
Since your database name contains spaces, you'll need to:
- **Quote the database name** in SQL commands
- **URL-encode spaces** in connection strings (use `%20` or `+`)

## PostgreSQL Setup

### 1. Create the Database

**Using psql:**
```sql
CREATE DATABASE "Ikoha Community Development";
```

**Using createdb command:**
```bash
createdb "Ikoha Community Development"
```

### 2. Connection String Format

For connection strings, spaces should be URL-encoded:

```bash
# Format: postgresql://username:password@host:port/database_name
# Spaces become %20 or +
DATABASE_URL="postgresql://user:password@localhost:5432/Ikoha%20Community%20Development"
```

**OR** use the database name in quotes (some drivers support this):
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/\"Ikoha Community Development\""
```

### 3. Using pgAdmin or GUI Tools
- When creating the database, simply type: `Ikoha Community Development`
- The GUI will handle quoting automatically

## SQLite Setup (Alternative)

If using SQLite for development, the filename can have spaces:

```bash
DATABASE_URL="sqlite:./Ikoha Community Development.db"
```

## Environment Variable

Add to your `.env.local`:

```bash
# PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/Ikoha%20Community%20Development"

# OR SQLite
DATABASE_URL="sqlite:./Ikoha Community Development.db"
```

## Testing the Connection

### Using psql:
```bash
psql "Ikoha Community Development"
```

### Using Node.js/TypeScript:
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Or explicitly:
  // database: 'Ikoha Community Development'
});
```

## Common Issues

1. **"Database does not exist"**
   - Ensure the database name is exactly: `Ikoha Community Development`
   - Check that quotes are used in SQL commands

2. **Connection string errors**
   - URL-encode spaces as `%20`
   - Some ORMs may require different formatting

3. **Permission errors**
   - Ensure your database user has CREATE DATABASE privileges
   - Check user permissions for the database

## Recommended: Use Underscores (Alternative)

If you encounter issues with spaces, consider using underscores:
- Database name: `Ikoha_Community_Development`
- This avoids quoting issues in most tools

But if you prefer to keep the exact name "Ikoha Community Development", the above instructions will work.
