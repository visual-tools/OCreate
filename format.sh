#!/bin/bash

# OCreate Code Formatter Script
# This script formats all JavaScript files in the project using Prettier

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load NVM if available
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo -e "${YELLOW}OCreate Code Formatter${NC}"
echo "=================================="

# Check if node/npm is available
if ! command -v npm &> /dev/null; then
    echo -e "${RED}ERROR: npm not found. Please ensure Node.js is installed.${NC}"
    exit 1
fi

# Check if js-beautify is installed
if ! npm list js-beautify &> /dev/null; then
    echo -e "${YELLOW}Installing Prettier...${NC}"
    npm install
fi

# Function to format files
format_files() {
    echo -e "${YELLOW}Formatting JavaScript files with vertical brackets...${NC}"

    if npx js-beautify baseFileBackupFromAtServer/*.js --replace --config .jsbeautifyrc; then
        echo -e "${GREEN}OK - JavaScript files formatted successfully with vertical brackets!${NC}"
    else
        echo -e "${RED}ERROR - Error formatting JavaScript files${NC}"
        return 1
    fi

    # Also format JSON and other files if they exist
    if ls *.json &> /dev/null; then
        echo -e "${YELLOW}Formatting JSON files...${NC}"
        npx js-beautify *.json --replace --config .jsbeautifyrc
    fi

    if ls *.md &> /dev/null; then
        echo -e "${YELLOW}Formatting Markdown files...${NC}"
        npx prettier --write "*.md" --ignore-path .prettierignore
    fi
}

# Function to check formatting
check_formatting() {
    echo -e "${YELLOW}Checking code formatting...${NC}"

    if npx js-beautify baseFileBackupFromAtServer/*.js --config .jsbeautifyrc --dry-run; then
        echo -e "${GREEN}OK - All files are properly formatted with vertical brackets!${NC}"
    else
        echo -e "${RED}ERROR - Some files need formatting${NC}"
        return 1
    fi
}

# Parse command line arguments
case "${1:-format}" in
    "format" | "fix")
        format_files
        ;;
    "check")
        check_formatting
        ;;
    "help" | "--help" | "-h")
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  format, fix    Format all JavaScript files (default)"
        echo "  check          Check if files are properly formatted"
        echo "  help           Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0              # Format all files"
        echo "  $0 format       # Format all files"
        echo "  $0 check        # Check formatting"
        ;;
    *)
        echo -e "${RED}ERROR - Unknown command: $1${NC}"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac

echo -e "${GREEN}Done!${NC}"
