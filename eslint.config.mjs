import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const configs = Array.isArray(nextCoreWebVitals) ? nextCoreWebVitals : [nextCoreWebVitals];

const config = [
  ...configs,
  {
    rules: {
      // Apostrophes/quotes in copy render fine; escaping them hurts readability.
      "react/no-unescaped-entities": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "e2e/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
];

export default config;
