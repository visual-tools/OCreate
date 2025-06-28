# Code Formatting Setup for OCreate

This document explains how to format your code properly using a smart two-phase approach (Prettier + custom bracket formatter) for true vertical bracket alignment while preserving modern JavaScript syntax.

## 🎯 Problem Solved

Your code was previously "save-fucked" with inconsistent bracket alignment and chaotic formatting. This setup provides:

- **True vertical bracket alignment** (opening brackets on new lines)
- **Modern JavaScript compatibility** (yield, async/await, arrow functions)
- **Proper indentation** (2 spaces)
- **Clean, readable code structure**
- **Smart two-phase formatting** (Prettier + custom brackets)
- **Automated formatting** on save in Zed
- **Easy command-line formatting tools**

## 🛠️ What's Been Installed

### Configuration Files

- **`.prettierrc`** - Prettier formatting rules for modern JS compatibility
- **`bracket-formatter.js`** - Custom script for vertical bracket alignment
- **`smart-format.sh`** - Two-phase formatting workflow
- **`.prettierignore`** - Files to exclude from formatting
- **`.editorconfig`** - Editor behavior settings
- **`.zed/settings.json`** - Zed editor project settings
- **`package.json`** - Node.js dependencies and scripts

### Two-Phase Formatting Approach

**Phase 1: Prettier (Modern JS Compatibility)**

```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "printWidth": 120,
  "trailingComma": "es5"
}
```

**Phase 2: Custom Bracket Alignment**

- Preserves modern JS syntax (yield, async/await)
- Applies vertical brackets only where safe
- Maintains proper indentation from Phase 1

## How to Use

### 1. Automatic Formatting in Zed

Zed is now configured to:

- Format on save automatically using Prettier (Phase 1)
- Use 2-space indentation
- Show indent guides
- Remove trailing whitespace
- Ensure final newline
- Preserve modern JavaScript syntax

**Note**: Zed applies Phase 1 (Prettier) automatically. For full vertical bracket alignment, run `./smart-format.sh` manually.

### 2. Manual Formatting

#### Smart Format Script (Recommended)

```bash
# Two-phase smart formatting
./smart-format.sh

# Check formatting status
./smart-format.sh check

# Show help
./smart-format.sh help
```

#### Legacy Format Script

```bash
# Single-phase formatting (backup)
./format.sh

# Check if files need formatting
./format.sh check
```

#### NPM Scripts

```bash
# Smart formatting (recommended)
npm run format

# Check formatting status
npm run format-check
```

#### Direct Commands

```bash
# Phase 1: Prettier only
npx prettier --write "baseFileBackupFromAtServer/*.js"

# Phase 2: Custom brackets only
node bracket-formatter.js "baseFileBackupFromAtServer/*.js"

# Full two-phase process
./smart-format.sh
```

## 📁 Files Affected

### Formatted Files

- `baseFileBackupFromAtServer/at_namespaceUtils.js`
- `baseFileBackupFromAtServer/at_stateless_utilities.js`
- `baseFileBackupFromAtServer/at_utilities.js`
- `baseFileBackupFromAtServer/visual.tools.bootstrap.objects.js`
- `baseFileBackupFromAtServer/visual.tools.OCreate.materialDesignComponents.js`

### Ignored Files

- `*.min.js` (minified files)
- `*.bak*` (backup files)
- `node_modules/`

## Before vs After

### Before (Chaotic)

```javascript
ThisEqualsThat.BootstrapObjects = new (function ($) {
  this.create = function (
    listContents,
targetDict = null,
    current = null,
depth = 0,
    parentDict,
  ) {
    if (parentDict === undefined) parentDict = targetDict;
```

### After (Clean with Smart Vertical Brackets)

```javascript
ThisEqualsThat.BootstrapObjects = new (function ($) {
  this.create = function (
    listContents,
    targetDict = null,
    current = null,
    depth = 0,
    parentDict
  ) {
    if (parentDict === undefined) parentDict = targetDict;

    for (item of listContents)
    {
      if (typeof item == "string")
      {
        // Modern JS syntax preserved:
        const result = await someAsyncFunction();
        const value = yield* someGenerator();
        const arrow = () => ({ key: value });
      }
    }
  }
```

## Zed Editor Setup

The `.zed/settings.json` configures:

- **Format on save**: Automatically formats when you save (Phase 1 only)
- **Prettier formatter**: Modern JavaScript compatibility
- **2-space indentation**: Consistent formatting
- **Bracket spacing**: Proper spacing around brackets
- **Indent guides**: Visual guides for code structure
- **Line length**: 120 character wrap guide
- **Trailing whitespace**: Automatically removed

**For full vertical brackets**: Run `./smart-format.sh` after saving in Zed.

### Disabling Font Ligatures (Raw Character Display)

By default, Zed may display ligatures where `===` becomes `≡`, `==>` becomes `⟹`, etc.
To see raw characters instead of fancy glyphs:

- **Already configured in `.zed/settings.json`**:

```json
{
  "buffer_font_features": {
    "calt": false,
    "liga": false,
    "dlig": false,
    "hlig": false,
    "clig": false
  }
}
```

- **Test file**: Open `ligature-test.js` to verify you see `===` and `=>` as raw characters
- **Other editors**: Look for "ligatures", "font features", or "contextual alternates" in settings

## Troubleshooting

### Font Ligatures Still Showing

If you still see fancy glyphs instead of raw characters:

1. **Check font**: Switch to a non-ligature font like Monaco or Menlo
2. **Restart Zed**: Font changes may require restart
3. **Global settings**: Check if global Zed settings override project settings
4. **Font fallback**: Try different fonts from the fallback list

```bash
# Test if ligatures are disabled
cat ligature-test.js
# Should show === and => as raw characters
```

### Node.js/npm Issues

If you get "command not found" errors:

```bash
# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Use Node.js
nvm use node
```

### Smart Formatter Not Working

```bash
# Reinstall dependencies
npm install

# Check installations
npx prettier --version
node bracket-formatter.js --help

# Test phases individually
npx prettier --write "baseFileBackupFromAtServer/*.js"
node bracket-formatter.js "baseFileBackupFromAtServer/*.js"
```

### Zed Not Formatting

1. Check that Zed has the Prettier extension installed
2. Verify `.zed/settings.json` is being loaded
3. Ensure `format_on_save` is set to `"on"`
4. Confirm `formatter` is set to `"prettier"`
5. For vertical brackets, run `./smart-format.sh` manually

## Adding New Files

When you create new JavaScript files:

1. **Place them in the correct directory**
2. **Save the file** (Zed will auto-format)
3. **Or run the format script**: `./format.sh`

## Benefits

- **No more eye strain** from misaligned brackets
- **True vertical bracket alignment** where appropriate
- **Modern JavaScript compatibility** (yield, async/await, arrows)
- **Smart formatting** that doesn't break your code
- **Consistent code style** across all files
- **Faster code reading** with proper structure
- **Two-phase approach** for maximum compatibility
- **Professional appearance** for your codebase

---

**Your code formatting nightmare is now over!**

**Workflow:**

1. Write code in Zed and save (Phase 1: Prettier auto-formats)
2. Run `./smart-format.sh` when you want vertical brackets (Phase 2)
3. Enjoy readable code that doesn't break with modern JavaScript!

**Modern JS structures like `yield`, `async/await`, and arrow functions are fully preserved!**
