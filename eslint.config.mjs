import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'next/core-web-vitals', 'next/typescript'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      // TypeScript-specific rules
      '@typescript-eslint/no-explicit-any': 'off', // Discourage `any` usage, warn instead of off
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off', // No enforced return types

      // React rules
      'react/react-in-jsx-scope': 'off', // Not required in Next.js
      'react/prop-types': 'off', // Not needed with TypeScript
      'react/jsx-no-useless-fragment': 'warn', // Avoid unnecessary fragments
      'react/jsx-key': 'error', // Enforce keys in lists
      'react/no-array-index-key': 'warn', // Discourage using array indices as keys

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error', // Enforce React Hooks rules
      'react-hooks/exhaustive-deps': 'error', // Suggest correct dependencies for hooks

      // Accessibility rules
      'jsx-a11y/alt-text': 'warn', // Enforce alt text for images
      'jsx-a11y/anchor-is-valid': [
        'warn',
        {
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      'jsx-a11y/no-autofocus': 'warn', // Discourage autofocus

      // Import rules
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // External dependencies
            'internal', // Internal modules
            'parent', // Parent imports
            'sibling', // Sibling imports
            'index', // Index imports
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
      'import/no-unresolved': 'error', // Ensure imports are valid
      'import/no-anonymous-default-export': [
        'warn',
        { allowArrowFunction: true },
      ], // Discourage anonymous default exports
    },
  }),
];

export default eslintConfig;
