module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true,
  },

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script", // IMPORTANT for CommonJS backend
    project: "./tsconfig.json",
  },

  plugins: [
    "@typescript-eslint",
    "prettier",
    "import",
  ],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended", // MUST be last
  ],

  rules: {
    /* Prettier */
    "prettier/prettier": "error",

    /* TS Rules */
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-explicit-any": "warn",

    /* Node / Import rules */
    "import/no-unresolved": "off", // TS handles this
    "import/extensions": "off",

    /* Style */
    "no-console": "off", // we use winston
  },

  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },

  ignorePatterns: [
    "dist/",
    "node_modules/",
    ".eslintrc.cjs",
  ],
};
