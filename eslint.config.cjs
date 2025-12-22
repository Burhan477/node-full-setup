const tseslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const prettierPlugin = require("eslint-plugin-prettier");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "eslint.config.cjs",
    ],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "script", // CommonJS backend
        ecmaVersion: "latest",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      /* Prettier */
      "prettier/prettier": "error",

      /* TypeScript */
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      /* Imports */
      "import/no-unresolved": "off",
      "import/extensions": "off",

      /* Node */
      "no-console": "off",
    },
  },
];
