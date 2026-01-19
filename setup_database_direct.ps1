# Ikoha Community Development - Direct Database Setup
# Non-interactive version - uses default postgres user

$ErrorActionPreference = "Continue"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ikoha Community Development" -ForegroundColor Green
Write-Host "Database Setup (Direct)" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# PostgreSQL paths
$psqlPath = "C:\Program Files\PostgreSQL\17\bin\psql.exe"
$dbName = "Ikoha Community Development"
$sqlFile = "create_tables.sql"
$dbUser = "postgres"

# Check if psql exists
if (-not (Test-Path $psqlPath)) {
    Write-Host "ERROR: PostgreSQL not found at $psqlPath" -ForegroundColor Red
    exit 1
}

# Check if SQL file exists
if (-not (Test-Path $sqlFile)) {
    Write-Host "ERROR: SQL file '$sqlFile' not found!" -ForegroundColor Red
    exit 1
}

Write-Host "PostgreSQL: $psqlPath" -ForegroundColor Green
Write-Host "Database: $dbName" -ForegroundColor Green
Write-Host "SQL File: $sqlFile" -ForegroundColor Green
Write-Host ""

# Try to connect and create database
Write-Host "Step 1: Creating database (if it doesn't exist)..." -ForegroundColor Cyan

# Try without password first (trust authentication)
$createDb = & $psqlPath -U $dbUser -d postgres -c "CREATE DATABASE `"$dbName`";" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database created or already exists." -ForegroundColor Green
} else {
    if ($createDb -match "already exists") {
        Write-Host "Database already exists, continuing..." -ForegroundColor Yellow
    } else {
        Write-Host "Note: You may need to provide a password." -ForegroundColor Yellow
        Write-Host "Please run manually:" -ForegroundColor Yellow
        Write-Host "  psql -U postgres -c `"CREATE DATABASE `"$dbName`";`"" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Or set PGPASSWORD environment variable:" -ForegroundColor Yellow
        Write-Host "  `$env:PGPASSWORD = 'your_password'" -ForegroundColor Cyan
        Write-Host "  psql -U postgres -c `"CREATE DATABASE `"$dbName`";`"" -ForegroundColor Cyan
        Write-Host ""
    }
}

Write-Host ""
Write-Host "Step 2: Running table creation script..." -ForegroundColor Cyan
Write-Host ""

$sqlFilePath = (Resolve-Path $sqlFile).Path
$runScript = & $psqlPath -U $dbUser -d "`"$dbName`"" -f $sqlFilePath 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "SUCCESS! Database setup completed!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    
    # Verify tables
    Write-Host "Verifying tables..." -ForegroundColor Cyan
    $tableList = & $psqlPath -U $dbUser -d "`"$dbName`"" -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name;" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host $tableList
        Write-Host ""
        Write-Host "Database setup complete!" -ForegroundColor Green
    }
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "Setup requires authentication" -ForegroundColor Yellow
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run manually with password:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Set password and run:" -ForegroundColor Cyan
    Write-Host "  `$env:PGPASSWORD = 'your_password'" -ForegroundColor White
    Write-Host "  .\setup_database_direct.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Run SQL directly:" -ForegroundColor Cyan
    Write-Host "  psql -U postgres -d `"$dbName`" -f create_tables.sql" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 3: Use interactive script:" -ForegroundColor Cyan
    Write-Host "  .\setup_database.ps1" -ForegroundColor White
    Write-Host ""
    Write-Host "Error output:" -ForegroundColor Red
    Write-Host $runScript -ForegroundColor Red
}
