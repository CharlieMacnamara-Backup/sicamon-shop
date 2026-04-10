import { createRequire } from "module";
const require = createRequire(import.meta.url);

/**
 * Sicamon Hardened Flat Config [Next.js 16 LTS Native - FINAL]
 * Hardened for robust "app-wide" code audit without circular structure bugs.
 */

const nextConfigArr = require("eslint-config-next");
const nextTypeScriptConfigArr = require("eslint-config-next/typescript");

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  // 1. Core Next.js Best Practices
  ...nextConfigArr,

  // 2. Sicamon Hardened App-Wide Rules
  {
    name: "sicamon/hardened-rules",
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    rules: {
      // Enhanced Branding & Performance
      "@next/next/no-img-element": "error",
      "@next/next/no-html-link-for-pages": "error",
      
      // Resource Hygiene & Clean Code
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      
      // Ensure specific Sicamon naming conventions if needed
    }
  },

  // 3. TypeScript Hardening
  ...nextTypeScriptConfigArr,
  {
     files: ["**/*.ts", "**/*.tsx"],
     rules: {
        "@typescript-eslint/no-explicit-any": "off"
     }
  },

  // 4. Global Exclusions (Only audit OUR code)
  {
    ignores: [
      ".next/**",
      ".vercel/**",
      "node_modules/**",
      "out/**",
      "public/**",
      "scripts/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
