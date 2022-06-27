module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8 },
  ignorePatterns: ['node_modules/*', '.next/*', 'out/*', 'public/*', '!.prettierrc.js'],
  extends: ['eslint:recommended', 'next'],
  plugins: ['eslint-plugin-import-helpers'],
  overrides: [
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: { react: { version: 'detect' } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'import-helpers/order-imports': [
          'error',
          {
            alphabetize: {
              ignoreCase: false,
              order: 'asc',
            },
            groups: ['/^react/', 'module', ['parent', 'sibling', 'index']],
            newlinesBetween: 'always',
          },
        ],
      },
    },
  ],
};
