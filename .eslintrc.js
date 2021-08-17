module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  env: { es6: true, node: true },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      typescript: {
        directory: './',
      },
    },
  },
  ignorePatterns: ['**/*.js'],
  rules: {
    // ts 2.1
    '@typescript-eslint/ban-ts-comment': 'error',
    // ts 2.2
    '@typescript-eslint/consistent-type-assertions': 'error',
    // ts 2.5
    '@typescript-eslint/no-parameter-properties': 'error',
    // ts 2.7
    '@typescript-eslint/no-non-null-assertion': 'warn',
    // ts 2.8
    '@typescript-eslint/triple-slash-reference': 'error',
    // ts 2.9
    '@typescript-eslint/unified-signatures': 'warn',
    // ts 2.10
    '@typescript-eslint/restrict-plus-operands': 'warn',
    // ts 2.11
    '@typescript-eslint/no-explicit-any': 'warn',
    // ts 2.12
    '@typescript-eslint/no-inferrable-types': 'warn',
    // ts 3.1
    '@typescript-eslint/type-annotation-spacing': 'error',
    // ts 3.2
    '@typescript-eslint/ban-types': [
      2,
      {
        types: {
          String: {
            message: 'Use string instead',
            fixWith: 'string',
          },
          Number: {
            message: 'Use number instead',
            fixWith: 'number',
          },
          Boolean: {
            message: 'Use boolean instead',
            fixWith: 'boolean',
          },
          Object: {
            message: 'Use object instead',
            fixWith: 'object',
          },
        },
      },
    ],
    // ts 3.3
    '@typescript-eslint/member-delimiter-style': 'error',
    // ts 3.5
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'variable',
        format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
      },
    ],
    // ts 3.6
    '@typescript-eslint/member-ordering': 'warn',
    'no-shadow': 'error',
    'lines-between-class-members': 'error',
    semi: ['error', 'always'],
    'max-lines-per-function': ['warn', { max: 200 }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
  },
};
