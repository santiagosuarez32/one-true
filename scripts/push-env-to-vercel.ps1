# Script to push all environment variables to Vercel
# Run this ONCE and you'll never need to upload .env again
# This script reads variables dynamically from your local .env file to keep secrets secure.

if (-not (Test-Path ".env")) {
    Write-Host "Error: Local .env file not found in the root folder." -ForegroundColor Red
    Write-Host "Please make sure you have a .env file containing your secrets." -ForegroundColor Yellow
    exit 1
}

Write-Host "Parsing .env file..." -ForegroundColor Cyan
$envVars = @{}
Get-Content ".env" | ForEach-Object {
    $line = $_.Trim()
    # Skip comments and empty lines
    if ($line -and -not $line.StartsWith("#") -and $line.Contains("=")) {
        $parts = $line.Split("=", 2)
        $key = $parts[0].Trim()
        $value = $parts[1].Trim().Trim('"').Trim("'")
        if ($key -and $value) {
            $envVars[$key] = $value
        }
    }
}

if ($envVars.Count -eq 0) {
    Write-Host "No valid environment variables found in .env." -ForegroundColor Red
    exit 1
}

foreach ($key in $envVars.Keys) {
    $value = $envVars[$key]
    
    # Hide secret values from terminal logs
    $displayValue = if ($key -match "KEY|SECRET|PASSWORD|TOKEN") { "********" } else { $value }
    Write-Host "Setting $key to Vercel ($displayValue) ..." -ForegroundColor Cyan
    
    # Remove existing variable (all environments) - ignore errors if doesn't exist
    npx vercel env rm $key production --yes 2>$null
    npx vercel env rm $key preview --yes 2>$null
    npx vercel env rm $key development --yes 2>$null
    
    # Add the variable for each environment individually
    foreach ($env in @("production", "preview", "development")) {
        $value | npx vercel env add $key $env --yes 2>&1 | Out-Null
    }
    
    Write-Host "  OK: $key set for all environments" -ForegroundColor Green
}

Write-Host ""
Write-Host "Done! All environment variables from .env have been pushed to Vercel." -ForegroundColor Green
Write-Host "You can now deploy with 'vercel --prod' without worrying about .env files." -ForegroundColor Green
