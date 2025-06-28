#!/bin/bash

# Smart Code Formatter for OCreate
# This script combines Prettier (for modern JS compatibility) with custom bracket formatting

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Load NVM if available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo -e "${BLUE}OCreate Smart Code Formatter${NC}"
echo "========================================"
echo -e "${YELLOW}Phase 1: Prettier (Modern JS compatibility)${NC}"
echo -e "${YELLOW}Phase 2: Custom Bracket Alignment${NC}"
echo "========================================"

# Check if node/npm is available
if ! command -v npm &> /dev/null; then
    echo -e "${RED}ERROR: npm not found. Please ensure Node.js is installed.${NC}"
    exit 1
fi

# Check if dependencies are installed
if ! npm list prettier &> /dev/null || ! npm list glob &> /dev/null; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# Function to format files with smart two-phase approach
smart_format_files() {
    local pattern="baseFileBackupFromAtServer/*.js"

    echo -e "${YELLOW}Phase 1: Running Prettier for modern JS compatibility...${NC}"

    # First, use Prettier to handle modern JS syntax correctly
    if npx prettier --write "$pattern" --ignore-path .prettierignore; then
        echo -e "${GREEN}OK - Phase 1 complete: Modern JS syntax preserved${NC}"
    else
        echo -e "${RED}ERROR - Phase 1 failed: Error with Prettier${NC}"
        return 1
    fi

    echo ""
    echo -e "${YELLOW}Phase 2: Applying custom bracket alignment...${NC}"

    # Then apply custom bracket formatting that preserves the modern JS
    if node bracket-formatter.js "$pattern"; then
        echo -e "${GREEN}OK - Phase 2 complete: Vertical brackets applied${NC}"
    else
        echo -e "${RED}ERROR - Phase 2 failed: Error with bracket formatter${NC}"
        return 1
    fi

    # Also format JSON files with Prettier only (no custom brackets needed)
    if ls *.json &> /dev/null 2>&1; then
        echo -e "${YELLOW}Formatting JSON files...${NC}"
        npx prettier --write "*.json" --ignore-path .prettierignore
    fi

    # Format Markdown files with Prettier only
    if ls *.md &> /dev/null 2>&1; then
        echo -e "${YELLOW}Formatting Markdown files...${NC}"
        npx prettier --write "*.md" --ignore-path .prettierignore
    fi
}

# Function to check formatting
check_formatting() {
    echo -e "${YELLOW}Checking code formatting...${NC}"

    # Check with Prettier first
    if npx prettier --check "baseFileBackupFromAtServer/*.js" --ignore-path .prettierignore; then
        echo -e "${GREEN}OK - Prettier check passed${NC}"
    else
        echo -e "${YELLOW}WARNING - Files need Prettier formatting${NC}"
    fi

    echo -e "${BLUE}INFO - Custom bracket alignment check not available in dry-run mode${NC}"
    echo -e "${BLUE}INFO - Run 'smart-format.sh' to apply both formatting phases${NC}"
}

# Function to show help
show_help() {
    echo "Smart Code Formatter for OCreate"
    echo ""
    echo "This tool uses a two-phase approach:"
    echo "  1. Prettier: Handles modern JavaScript syntax (yield, async/await, etc.)"
    echo "  2. Custom: Applies vertical bracket alignment while preserving syntax"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  format, fix    Apply smart formatting (default)"
    echo "  check          Check if files need formatting"
    echo "  help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0              # Smart format all files"
    echo "  $0 format       # Smart format all files"
    echo "  $0 check        # Check formatting status"
    echo ""
    echo "Features:"
    echo "  + Preserves modern JavaScript syntax (yield, async/await)"
    echo "  + Vertical bracket alignment for readability"
    echo "  + Consistent indentation and spacing"
    echo "  + Skips minified and backup files"
}

# Parse command line arguments
case "${1:-format}" in
    "format" | "fix")
        smart_format_files
        ;;
    "check")
        check_formatting
        ;;
    "help" | "--help" | "-h")
        show_help
        ;;
    *)
        echo -e "${RED}ERROR - Unknown command: $1${NC}"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Smart formatting complete!${NC}"
echo -e "${BLUE}Your code now has vertical brackets AND modern JS compatibility!${NC}"
