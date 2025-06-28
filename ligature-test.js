// Ligature Test File
// This file tests that Zed shows raw characters instead of fancy glyphs

// Equality and comparison operators that often become ligatures:
const a = 1;
const b = 2;

// These should show as raw characters, not glyphs:
if (a === b) {
  console.log("triple equals");
}

if (a !== b) {
  console.log("not equal");
}

if (a <= b) {
  console.log("less than or equal");
}

if (a >= b) {
  console.log("greater than or equal");
}

// Arrow functions and fat arrows:
const arrow1 = () => {
  return "arrow function";
};

const arrow2 = x => x * 2;

// Fat arrow in comments should also be raw:
// This is a fat arrow: =>
// This is a comparison: ===
// This is not equal: !==
// This is less/equal: <=
// This is greater/equal: >=

// Object property access:
const obj = {
  prop: "value",
};

// These should all show as raw characters in Zed editor:
// === !== <= >= => -> :: .. ... && || !! ?? ?. ?.

console.log(
  "If you see fancy symbols instead of === or =>, ligatures are still enabled"
);
console.log(
  "If you see the raw characters === and =>, ligatures are disabled correctly"
);
