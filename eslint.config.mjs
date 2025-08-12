// @ts-check

import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.strict, {
  plugins: {
    import: importPlugin,
  },
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
});
