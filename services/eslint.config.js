import simpleImportSort from "eslint-plugin-simple-import-sort";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";

export default [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      "sort-destructure-keys": sortDestructureKeys,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      quotes: ["warn", "double"],

      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^\\u0000"], // Side effect imports
            ["^@?\\w"], // Packages
            ["^\\."], // Relative imports
            ["^.+\\.?(css)$"], // Style imports
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      "sort-destructure-keys/sort-destructure-keys": [
        "warn",
        {
          caseSensitive: false,
        },
      ],
    },
  },
];
