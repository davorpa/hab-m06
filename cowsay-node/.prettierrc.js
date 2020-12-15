// prettier.config.js or .prettierrc.js
/* eslint-disable strict */
module.exports = {
  // The line length where Prettier will try wrap.
  // https://prettier.io/docs/en/options.html#print-width
  printWidth: 120,

  // Number of spaces per indentation level.
  // https://prettier.io/docs/en/options.html#tab-width
  tabWidth: 2,

  // Indent with tabs instead of spaces.
  // https://prettier.io/docs/en/options.html#tabs
  useTabs: false,

  // Print semicolons.
  // https://prettier.io/docs/en/options.html#semicolons
  semi: true,

  // Use single quotes instead of double quotes.
  // https://prettier.io/docs/en/options.html#quotes
  singleQuote: false,

  // Change when properties in objects are quoted.
  // https://prettier.io/docs/en/options.html#quote-props
  // - "as-needed": Only add quotes around object properties where required.
  // - "consistent": If at least one property in an object requires quotes, quote all properties.
  // - "preserve": Respect the input use of quotes in object properties.
  quoteProps: "consistent",

  // Use single quotes instead of double quotes in JSX.
  // https://prettier.io/docs/en/options.html#jsx-quotes
  jsxSingleQuote: false,

  // Print trailing commas wherever possible when multi-line.
  // https://prettier.io/docs/en/options.html#trailing-commas
  // - "all": Trailing commas wherever possible (including function arguments).
  // - "es5": Trailing commas where valid in ES5 (objects, arrays, etc.). Default.
  // - "none": No trailing commas.
  trailingComma: "es5",

  // Print spaces between brackets in object literals.
  // https://prettier.io/docs/en/options.html#bracket-spacing
  bracketSpacing: true,

  // Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements).
  // https://prettier.io/docs/en/options.html#jsx-brackets
  jsxBracketSameLine: false,

  // Include parentheses around a sole arrow function parameter.
  // https://prettier.io/docs/en/options.html#arrow-function-parentheses
  // - "always": Always include parens. Example: `(x) => x`
  // - "avoid": Omit parens when possible. Example: `x => x`
  arrowParens: "always",

  // Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted.
  // https://prettier.io/docs/en/options.html#require-pragma
  requirePragma: false,

  // Insert @format pragma into file's first docblock comment.
  // https://prettier.io/docs/en/options.html#insert-pragma
  insertPragma: false,

  // https://prettier.io/docs/en/options.html#prose-wrap
  // - "always": Wrap prose if it exceeds the print width.
  // - "preserve": Wrap prose as-is. Default
  // - "never": Do not wrap prose.
  proseWrap: "preserve",

  // Specify the global whitespace sensitivity for HTML files
  // https://prettier.io/docs/en/options.html#html-whitespace-sensitivity
  // - "css": Respect the default value of CSS display property. Default.
  // - "strict": Whitespaces are considered sensitive.
  // - "ignore": Whitespaces are considered insensitive.
  htmlWhitespaceSensitivity: "css",

  // Whether or not to indent the code inside <script> and <style> tags in Vue files
  // https://prettier.io/docs/en/options.html#vue-files-script-and-style-tags-indentation
  vueIndentScriptAndStyle: true,

  // https://prettier.io/docs/en/options.html#end-of-line
  // - "lf": Line Feed only (\n), common on Linux and macOS as well as inside git repos. Default.
  // - "crlf": Carriage Return + Line Feed characters (\r\n), common on Windows
  // - "cr": Carriage Return character only (\r), used very rarely
  // - "auto": Maintain existing line endings (mixed values within one file are normalised by looking at what’s used after the first line)
  endOfLine: "lf",

  // Control whether Prettier formats quoted code embedded in the file.
  // https://prettier.io/docs/en/options.html#embedded-language-formatting
  // - "auto": Format embedded code if Prettier can automatically identify it. Default.
  // - "off": Never automatically format embedded code.
  embeddedLanguageFormatting: "auto",
};
