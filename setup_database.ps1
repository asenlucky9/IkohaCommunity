# Ikoha Community Development - Database Setup Script
# This script creates the database and runs the table creation SQL

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ikoha Community Development" -ForegroundColor Green
Write-Host "Database Setup Script" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# PostgreSQL paths
$psqlPath = "C:\Program Files\PostgreSQL\17\bin\psql.exe"
$dbName = "Ikoha Community Development"
$sqlFile = "create_tables.sql"

# Check if psql exists
if (-not (Test-Path $psqlPath)) {
    Write-Host "ERROR: PostgreSQL not found at $psqlPath" -ForegroundColor Red
    Write-Host "Please ensure PostgreSQL 17 is installed." -ForegroundColor Yellow
    exit 1
}

Write-Host "PostgreSQL found: $psqlPath" -ForegroundColor Green
Write-Host ""

# Get database credentials
Write-Host "Enter PostgreSQL connection details:" -ForegroundColor Yellow
$dbUser = Read-Host "Username (default: postgres)"
if ([string]::IsNullOrWhiteSpace($dbUser)) {
    $dbUser = "postgres"
}

$dbPassword = Read-Host "Password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPassword)
$dbPasswordPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

Write-Host ""
Write-Host "Step 1: Checking if database exists..." -ForegroundColor Cyan

# Set password as environment variable
$env:PGPASSWORD = $dbPasswordPlain

# Check if database exists
$dbExists = & $psqlPath -U $dbUser -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$dbName'" 2>&1

if ($dbExists -eq "1") {
    Write-Host "Database '$dbName' already exists." -ForegroundColor Yellow
    $recreate = Read-Host "Do you want to drop and recreate it? (y/N)"
    if ($recreate -eq "y" -or $recreate -eq "Y") {
        Write-Host "Dropping existing database..." -ForegroundColor Yellow
        & $psqlPath -U $dbUser -d postgres -c "DROP DATABASE IF EXISTS `"$dbName`";" 2>&1 | Out-Null
        Write-Host "Database dropped." -ForegroundColor Green
    } else {
        Write-Host "Using existing database." -ForegroundColor Green
    }
}

# Create database if it doesn't exist
if ($dbExists -ne "1" -or $recreate -eq "y" -or $recreate -eq "Y") {
    Write-Host ""
    Write-Host "Step 2: Creating database '$dbName'..." -ForegroundColor Cyan
    $createResult = & $psqlPath -U $dbUser -d postgres -c "CREATE DATABASE `"$dbName`";" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Database created successfully!" -ForegroundColor Green
    } else {
        if ($createResult -match "already exists") {
            Write-Host "Database already exists, continuing..." -ForegroundColor Yellow
        } else {
            Write-Host "Error creating database: $createResult" -ForegroundColor Red
            exit 1
        }
    }
}

# Check if SQL file exists
if (-not (Test-Path $sqlFile)) {
    Write-Host ""
    Write-Host "ERROR: SQL file '$sqlFile' not found!" -ForegroundColor Red
    Write-Host "Please ensure create_tables.sql is in the current directory." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Step 3: Running table creation script..." -ForegroundColor Cyan
Write-Host "This may take a few moments..." -ForegroundColor Yellow
Write-Host ""

# Get full path to SQL file
$sqlFilePath = (Resolve-Path $sqlFile).Path

# Run the SQL script
$scriptResult = & $psqlPath -U $dbUser -d "`"$dbName`"" -f $sqlFilePath 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCCESS! Database setup completed!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "All tables have been created successfully." -ForegroundColor Green
    Write-Host ""
    Write-Host "Verifying tables..." -ForegroundColor Cyan
    
    # Verify tables
    $tableCount = & $psqlPath -U $dbUser -d "`"$dbName`"" -tAc "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';" 2>&1
    
    if ($tableCount -eq "9") {
        Write-Host "All 9 tables created successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Tables created:" -ForegroundColor Cyan
        & $psqlPath -U $dbUser -d "`"$dbName`"" -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name;" 2>&1
    } else {
        Write-Host "Warning: Expected 9 tables, found $tableCount" -ForegroundColor Yellow
    }
    
} else {
    Write-Host ""
    Write-Host "ERROR: Failed to run SQL script" -ForegroundColor Red
    Write-Host "Error details:" -ForegroundColor Red
    Write-Host $scriptResult -ForegroundColor Red
    exit 1
}

# Clear password from environment
Remove-Item Env:\PGPASSWORD

Write-Host ""
Write-Host "Database setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Connection string for .env.local:" -ForegroundColor Cyan
$connectionString = "DATABASE_URL=`"postgresql://$dbUser`:***@localhost:5432/Ikoha%20Community%20Development`""
Write-Host $connectionString -ForegroundColor Yellow
Write-Host ""
