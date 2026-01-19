-- Verification Script for Ikoha Community Development Database
-- Run this after create_tables.sql to verify everything was created correctly

-- Check if database exists
SELECT 'Database Check' AS check_type, 
       current_database() AS database_name;

-- Count tables (should be 9)
SELECT 'Table Count' AS check_type,
       COUNT(*) AS table_count
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';

-- List all tables
SELECT 'Tables List' AS check_type,
       table_name
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check ENUM types
SELECT 'ENUM Types' AS check_type,
       typname AS enum_name
FROM pg_type 
WHERE typtype = 'e'
ORDER BY typname;

-- Check indexes
SELECT 'Indexes' AS check_type,
       tablename,
       indexname
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Check foreign keys
SELECT 'Foreign Keys' AS check_type,
       tc.table_name,
       kcu.column_name,
       ccu.table_name AS foreign_table_name,
       ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
ORDER BY tc.table_name;

-- Summary
SELECT 'Summary' AS check_type,
       (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE') AS total_tables,
       (SELECT COUNT(*) FROM pg_type WHERE typtype = 'e') AS total_enums,
       (SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public') AS total_indexes;
