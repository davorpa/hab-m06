// .eslintrc.js
module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  ignorePatterns: [
    // Sometimes you have files that should not be formatted: auto-generated source files, saved snapshots, etc.
    // You can list file masks to ignore in this file .prettierignore.
    // For example, to ignore all JavaScript files in snapshots folders use:
    // do not run Prettier against JavaScript files in "snapshots/" folders
    // "**/snapshots/*.js",
  ],
  plugins: [
    // Integrate ESLint+Prettier
    "prettier",
  ],
  extends: [
    // Use airbnb rules as linter
    "airbnb-base",
    // Integrate ESLint+Prettier
    "plugin:prettier/recommended",
  ],
  rules: {
    // Integrate ESLint+Prettier
    "prettier/prettier": "error",
  },
};
