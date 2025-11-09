#!/bin/bash

# Security validation script to check for exposed secrets and hardcoded credentials
# This script should be run before commits and in CI/CD pipelines

set -e

echo "🔍 Checking for potential secrets and hardcoded credentials..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track if any issues are found
ISSUES_FOUND=0

# Function to report issues
report_issue() {
    echo -e "${RED}❌ SECURITY ISSUE:${NC} $1"
    ISSUES_FOUND=1
}

# Function to report warnings
report_warning() {
    echo -e "${YELLOW}⚠️  WARNING:${NC} $1"
}

# Function to report success
report_success() {
    echo -e "${GREEN}✅${NC} $1"
}

# Check for hardcoded localhost URLs (excluding this script and node_modules)
echo "Checking for hardcoded localhost URLs..."
LOCALHOST_MATCHES=$(grep -r "localhost" --exclude-dir=node_modules --exclude-dir=.git --exclude="check-secrets.sh" . || true)
if [ ! -z "$LOCALHOST_MATCHES" ]; then
    report_warning "Found localhost references (review if these should be configurable):"
    echo "$LOCALHOST_MATCHES"
else
    report_success "No hardcoded localhost URLs found"
fi

# Check for common secret patterns
echo "Checking for common secret patterns..."

# API Keys
API_KEY_MATCHES=$(grep -r -i "api[_-]key\s*=\s*['\"][^'\"]*['\"]" --exclude-dir=node_modules --exclude-dir=.git --exclude="check-secrets.sh" . || true)
if [ ! -z "$API_KEY_MATCHES" ]; then
    report_issue "Found potential hardcoded API keys:"
    echo "$API_KEY_MATCHES"
fi

# AWS Access Keys
AWS_KEY_MATCHES=$(grep -r "AKIA[0-9A-Z]{16}" --exclude-dir=node_modules --exclude-dir=.git . || true)
if [ ! -z "$AWS_KEY_MATCHES" ]; then
    report_issue "Found potential AWS access keys:"
    echo "$AWS_KEY_MATCHES"
fi

# Private keys
PRIVATE_KEY_MATCHES=$(grep -r "BEGIN.*PRIVATE.*KEY" --exclude-dir=node_modules --exclude-dir=.git . || true)
if [ ! -z "$PRIVATE_KEY_MATCHES" ]; then
    report_issue "Found potential private keys:"
    echo "$PRIVATE_KEY_MATCHES"
fi

# Database URLs
DB_URL_MATCHES=$(grep -r -E "(postgres|mysql|mongodb)://[^/]*:[^@]*@" --exclude-dir=node_modules --exclude-dir=.git . || true)
if [ ! -z "$DB_URL_MATCHES" ]; then
    report_issue "Found potential database URLs with credentials:"
    echo "$DB_URL_MATCHES"
fi

# JWT tokens (basic pattern)
JWT_MATCHES=$(grep -r -E "eyJ[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*\.[A-Za-z0-9_-]*" --exclude-dir=node_modules --exclude-dir=.git . || true)
if [ ! -z "$JWT_MATCHES" ]; then
    report_warning "Found potential JWT tokens (review if these are examples/tests):"
    echo "$JWT_MATCHES"
fi

# Check for hardcoded passwords
PASSWORD_MATCHES=$(grep -r -i "password\s*=\s*['\"][^'\"]*['\"]" --exclude-dir=node_modules --exclude-dir=.git --exclude="check-secrets.sh" . || true)
if [ ! -z "$PASSWORD_MATCHES" ]; then
    # Filter out obvious non-secrets (like form labels, types, etc.)
    FILTERED_MATCHES=$(echo "$PASSWORD_MATCHES" | grep -v -E "(password.*type|password.*label|password.*placeholder)" || true)
    if [ ! -z "$FILTERED_MATCHES" ]; then
        report_issue "Found potential hardcoded passwords:"
        echo "$FILTERED_MATCHES"
    fi
fi

# Check that .env files are properly gitignored
echo "Checking .env file handling..."
if [ -f ".gitignore" ]; then
    if grep -q "\.env" .gitignore; then
        report_success ".env files are properly gitignored"
    else
        report_issue ".env files are not gitignored"
    fi
else
    report_warning "No .gitignore file found"
fi

# Check for any .env files that might be accidentally committed
ENV_FILES=$(find . -name ".env*" -not -path "./node_modules/*" -not -path "./.git/*" || true)
if [ ! -z "$ENV_FILES" ]; then
    report_warning "Found .env files in repository (ensure they don't contain real secrets):"
    echo "$ENV_FILES"
fi

# Summary
echo ""
echo "🔍 Security check complete!"
if [ $ISSUES_FOUND -eq 0 ]; then
    echo -e "${GREEN}✅ No critical security issues found${NC}"
    exit 0
else
    echo -e "${RED}❌ Security issues detected - please review and fix before committing${NC}"
    exit 1
fi