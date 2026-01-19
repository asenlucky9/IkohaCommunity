# How to Run SQL File in SQL Server Management Studio

## ❌ Common Mistake
**DON'T type the filename in the query window!**
- ❌ Typing `create_tables_SQLSERVER.sql` will give error: "Could not find stored procedure"

## ✅ Correct Method: Open the File First

### Step-by-Step Instructions:

1. **Open SQL Server Management Studio (SSMS)**

2. **Connect to your SQL Server**
   - Enter server name (usually `localhost` or `.\SQLEXPRESS`)
   - Click Connect

3. **Select your database:**
   - In Object Explorer (left panel), expand "Databases"
   - Click on **"Ikoha Community Development"** to select it
   - OR: After opening query window, select it from the database dropdown at the top

4. **Open the SQL file:**
   - Click **File** → **Open** → **File...** (or press Ctrl+O)
   - Navigate to: `C:\Users\king\OneDrive\Desktop\Ikoha Community Development`
   - Select: **`create_tables_SQLSERVER.sql`**
   - Click **Open**

5. **The file content will appear in the query window**

6. **Execute the script:**
   - Click the **Execute** button (▶) in the toolbar
   - OR press **F5**
   - OR press **Ctrl+E**

7. **Wait for completion** - You should see messages like:
   - "Commands completed successfully"
   - Table creation messages

## Alternative Method: Copy-Paste

If opening the file doesn't work:

1. Open `create_tables_SQLSERVER.sql` in **Notepad** or any text editor
2. Select All (Ctrl+A) and Copy (Ctrl+C)
3. In SSMS, click "New Query"
4. Make sure "Ikoha Community Development" database is selected
5. Paste (Ctrl+V) the SQL code
6. Click Execute (F5)

## Using SQLCMD Mode (Advanced)

If you want to include a file from within SQL:

1. Enable SQLCMD mode: **Query** → **SQLCMD Mode**
2. Then you can use:
   ```sql
   :r C:\Users\king\OneDrive\Desktop\Ikoha Community Development\create_tables_SQLSERVER.sql
   GO
   ```

## Verify It Worked

After execution, run this to see your tables:

```sql
USE [Ikoha Community Development];
GO

SELECT TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'dbo' AND TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
```

You should see 9 tables listed.

## Troubleshooting

**If you still get errors:**
- Make sure you're connected to the correct SQL Server instance
- Make sure the "Ikoha Community Development" database is selected
- Check that the file path is correct
- Try the copy-paste method instead
