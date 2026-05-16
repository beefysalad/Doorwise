import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const rootDir = dirname(fileURLToPath(import.meta.url))

/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: resolve(rootDir, "packages/ui/src/styles/globals.css"),
  tailwindFunctions: ["cn", "cva"],
  semi: false,
  singleQuote: false,
  trailingComma: "es5",
  printWidth: 80,
  tabWidth: 2,
  endOfLine: "lf",
  overrides: [
    {
      files: ["apps/api/**/*.{ts,tsx,js,jsx,mjs,cjs}"],
      options: {
        semi: true,
        singleQuote: true,
        trailingComma: "all",
      },
    },
  ],
}

export default config
