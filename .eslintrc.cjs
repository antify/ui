module.exports = {
  root: true,
  extends: [
    '@nuxt/eslint-config',
    'plugin:storybook/recommended'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.mts', '*.cts', '*.vue'],
      rules: {
        quotes: ['warn', 'single', {
          avoidEscape: true
        }],
        'prefer-promise-reject-errors': 'error',
        'no-extra-semi': 0,
        'semi': [2, 'always'],
        'vue/html-self-closing': 0,
        'vue/singleline-html-element-content-newline': 0,
        'vue/component-name-in-template-casing': ['error', 'PascalCase', {
          'registeredComponentsOnly': false
        }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ]
};
