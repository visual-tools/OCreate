#!/usr/bin/env node

/**
 * Smart Bracket Formatter for OCreate
 *
 * This script applies vertical bracket alignment to JavaScript files
 * while preserving modern JavaScript syntax and proper indentation.
 *
 * Usage: node bracket-formatter.js <file-pattern>
 * Example: node bracket-formatter.js "baseFileBackupFromAtServer/*.js"
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

class SmartBracketFormatter {
  constructor() {
    // Keywords and patterns that should NEVER be modified
    this.preservePatterns = [
      /yield\s+/,
      /await\s+/,
      /return\s+/,
      /throw\s+/,
      /export\s+/,
      /import\s+/,
      /=>\s*{/,
      /\?\s*{/,
      /:\s*{/,
      /,\s*{/,
      /\[\s*{/,
      /\(\s*{/,
      /`.*{.*`/,
      /\/.*{.*\//,
      /\/\*.*\*\//,
      /\/\/.*/,
    ];

    // Function-like patterns that can have brackets moved
    this.functionPatterns = [
      /^(\s*)(function\*\s+\w+\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)(function\*\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)(function\s+\w+\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)(function\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)(\w+\s*=\s*function\*\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)(\w+\s*=\s*function\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)([.\w]+\s*=\s*function\*\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)([.\w]+\s*=\s*function\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)(if\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)(else\s+if\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)(else)\s*{(.*)$/,
      /^(\s*)(for\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)(while\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)(do)\s*{(.*)$/,
      /^(\s*)(switch\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)(try)\s*{(.*)$/,
      /^(\s*)(catch\s*\([^)]*\))\s*{(.*)$/,
      /^(\s*)(finally)\s*{(.*)$/,
    ];

    // Multi-line control structure starters
    this.multiLineStarters = [
      /^(\s*)(if\s*\()/,
      /^(\s*)(else\s+if\s*\()/,
      /^(\s*)(for\s*\()/,
      /^(\s*)(while\s*\()/,
      /^(\s*)(switch\s*\()/,
      /^(\s*)(catch\s*\()/,
    ];
  }

  shouldPreserveLine(line) {
    // Check if line contains patterns that should never be modified
    return this.preservePatterns.some(pattern => pattern.test(line));
  }

  formatSingleLine(line) {
    // Don't modify lines that should be preserved
    if (this.shouldPreserveLine(line)) {
      return [line];
    }

    // Don't modify empty lines or comments
    const trimmed = line.trim();
    if (
      !trimmed ||
      trimmed.startsWith("//") ||
      trimmed.startsWith("/*") ||
      trimmed.startsWith("*")
    ) {
      return [line];
    }

    // Don't modify single-line constructs
    if (trimmed.includes("{") && trimmed.includes("}")) {
      return [line];
    }

    // Check if this line matches a function-like pattern
    for (const pattern of this.functionPatterns) {
      const match = line.match(pattern);
      if (match) {
        const [, indent, declaration, after] = match;

        // Only move bracket if there's content after the opening brace
        if (after && after.trim()) {
          return [
            indent + declaration,
            indent + "{",
            indent + "  " + after.trim(),
          ];
        } else {
          return [indent + declaration, indent + "{"];
        }
      }
    }

    return [line];
  }

  isMultiLineControlStart(line) {
    return this.multiLineStarters.some(pattern => pattern.test(line));
  }

  findMatchingBrace(lines, startIndex) {
    let braceCount = 0;
    let foundOpenBrace = false;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];

      for (const char of line) {
        if (char === "{") {
          braceCount++;
          foundOpenBrace = true;
        } else if (char === "}") {
          braceCount--;
          if (foundOpenBrace && braceCount === 0) {
            return i;
          }
        }
      }
    }

    return -1;
  }

  formatMultiLineControl(lines, startIndex) {
    // Find the opening brace
    let braceLineIndex = -1;
    let braceCharIndex = -1;

    for (let i = startIndex; i < lines.length; i++) {
      const braceIndex = lines[i].indexOf("{");
      if (braceIndex !== -1) {
        braceLineIndex = i;
        braceCharIndex = braceIndex;
        break;
      }

      // If we've gone too far without finding a brace, give up
      if (i - startIndex > 10) {
        return null;
      }
    }

    if (braceLineIndex === -1) {
      return null;
    }

    // Get the indent from the first line
    const firstLine = lines[startIndex];
    const indent = firstLine.match(/^(\s*)/)[1];

    // Extract the part before the brace
    const beforeBrace = [];
    for (let i = startIndex; i <= braceLineIndex; i++) {
      if (i === braceLineIndex) {
        const lineBeforeBrace = lines[i].substring(0, braceCharIndex).trim();
        if (lineBeforeBrace) {
          beforeBrace.push(indent + lineBeforeBrace);
        }
      } else {
        beforeBrace.push(lines[i]);
      }
    }

    // Check if there's content after the brace on the same line
    const afterBrace = lines[braceLineIndex]
      .substring(braceCharIndex + 1)
      .trim();

    const result = {
      linesToReplace: braceLineIndex - startIndex + 1,
      newLines: [...beforeBrace, indent + "{"],
    };

    if (afterBrace) {
      result.newLines.push(indent + "  " + afterBrace);
    }

    return result;
  }

  format(content) {
    const lines = content.split("\n");
    const result = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Check for multi-line control structures
      if (this.isMultiLineControlStart(line)) {
        const multiLineResult = this.formatMultiLineControl(lines, i);

        if (multiLineResult) {
          result.push(...multiLineResult.newLines);
          i += multiLineResult.linesToReplace;
          continue;
        }
      }

      // Handle single-line formatting
      const formattedLines = this.formatSingleLine(line);
      result.push(...formattedLines);
      i++;
    }

    return result.join("\n");
  }

  formatFile(filePath) {
    try {
      console.log(`Processing: ${filePath}`);

      const content = fs.readFileSync(filePath, "utf8");
      const formatted = this.format(content);

      // Only write if content actually changed
      if (content !== formatted) {
        fs.writeFileSync(filePath, formatted, "utf8");
        console.log(`OK - Updated: ${filePath}`);
        return true;
      } else {
        console.log(`No changes: ${filePath}`);
        return false;
      }
    } catch (error) {
      console.error(`ERROR processing ${filePath}:`, error.message);
      return false;
    }
  }

  formatFiles(pattern) {
    try {
      const files = glob.sync(pattern, {
        ignore: ["node_modules/**", "**/*.min.js", "**/*.bak*"],
      });

      if (files.length === 0) {
        console.log("No files found matching pattern:", pattern);
        return;
      }

      console.log(`Found ${files.length} files to process`);
      let changedCount = 0;

      files.forEach(file => {
        if (this.formatFile(file)) {
          changedCount++;
        }
      });

      console.log(
        `Processing complete! ${changedCount}/${files.length} files updated.`
      );
    } catch (error) {
      console.error("ERROR:", error.message);
    }
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage: node bracket-formatter.js <file-pattern>");
    console.log(
      'Example: node bracket-formatter.js "baseFileBackupFromAtServer/*.js"'
    );
    process.exit(1);
  }

  const formatter = new SmartBracketFormatter();
  const pattern = args[0];

  console.log("Smart Bracket Formatter for OCreate");
  console.log("===================================");
  console.log("Preserves modern JS syntax (yield, async/await, etc.)");
  console.log("Applies vertical brackets only where safe");
  console.log("");

  formatter.formatFiles(pattern);
}

module.exports = SmartBracketFormatter;
