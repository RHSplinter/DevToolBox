// @ts-check
import js from "@eslint/js";
import plugin from "@typescript-eslint/eslint-plugin";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";
import tsParser from "@typescript-eslint/parser";
import templateParser from "@angular-eslint/template-parser";

export default [
  {
    ignores: ["projects/**/*", "node_modules/**/*", "dist/**/*", "coverage/**/*"]
  },
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
      "@typescript-eslint": plugin,
      "@angular-eslint": angular
    },
    rules: {
      ...js.configs.recommended.rules,
      ...plugin.configs.recommended.rules,
      ...angular.configs.recommended.rules,
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
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: templateParser
    },
    plugins: {
      "@angular-eslint/template": angularTemplate
    },
    rules: {
      ...angularTemplate.configs.recommended.rules,
      ...angularTemplate.configs.accessibility.rules
    }
  }
];

