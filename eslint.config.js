import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import stylistic from '@stylistic/eslint-plugin';
import nuxtEslintPlugin from '@nuxt/eslint-plugin';
import storybookEslintPlugin from 'eslint-plugin-storybook';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    plugins: {
      '@stylistic': stylistic,
      '@nuxt': nuxtEslintPlugin,
      storybook: storybookEslintPlugin,
    },
    rules: {
      // General rules
      '@stylistic/indent': [
        'error',
        2,
      ],
      '@stylistic/comma-dangle': [
        'error',
        'always-multiline',
      ],
      '@stylistic/no-extra-semi': [
        'error',
      ],
      '@stylistic/semi': [
        'error',
      ],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: true,
          },
        },
      ],
      '@stylistic/object-property-newline': 'error',
      '@stylistic/object-curly-newline': [
        'error',
        {
          minProperties: 1,
        },
      ],
      '@stylistic/array-element-newline': [
        'error',
        'always',
      ],
      '@stylistic/array-bracket-newline': [
        'error',
        {
          minItems: 1,
        },
      ],
      '@stylistic/function-paren-newline': [
        'error',
        'multiline',
      ],
      '@stylistic/implicit-arrow-linebreak': [
        'error',
        'beside',
      ],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/quote-props': [
        'error',
        'as-needed',
      ],
      '@stylistic/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],
      '@stylistic/space-before-blocks': [
        'error',
        'always',
      ],
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
        },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
      ],

      // Additional vue rules
      'vue/padding-line-between-blocks': [
        'error',
        'always',
      ],
      'vue/define-props-declaration': [
        'error',
        'type-based',
      ],
      'vue/singleline-html-element-content-newline': 0,
      'vue/custom-event-name-casing': [
        'error',
        'camelCase',
      ],
    },
  },
  {
    files: [
      '**/*.{js,mjs,cjs,ts,vue}',
    ],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: [
      '**/*.vue',
    ],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    ignores: [
      '!.storybook',
    ],
  },
];
