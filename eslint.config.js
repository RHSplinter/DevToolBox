// @ts-check
import js from "@eslint/js";
import plugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import angular from "angular-eslint";

const withFiles = (configs, files) => configs.map((config) => ({ ...config, files }));

export default [
  {
    ignores: ["projects/**/*", "node_modules/**/*", "dist/**/*", "coverage/**/*"]
  },
  ...withFiles(angular.configs.tsRecommended, ["**/*.ts"]),
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.spec.json"],
        createDefaultProgram: true
      },
      globals: {
        // Jasmine globals
        describe: "readonly",
        it: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        expect: "readonly",
        spyOn: "readonly",
        jasmine: "readonly",
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        location: "readonly",
        customElements: "readonly",
        // Global functions
        console: "readonly",
        btoa: "readonly",
        atob: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": plugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...plugin.configs.recommended.rules,
      // The v22 migration adds an explicit `ChangeDetectionStrategy.Eager` to every
      // component to preserve the pre-v22 default behavior. Adopting OnPush across the
      // app is a behavioral change that is out of scope for the version upgrade.
      "@angular-eslint/prefer-on-push-component-change-detection": "off",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case"
        }
      ]
    }
  },
  ...withFiles(angular.configs.templateRecommended, ["**/*.html"]),
  ...withFiles(angular.configs.templateAccessibility, ["**/*.html"])
];

