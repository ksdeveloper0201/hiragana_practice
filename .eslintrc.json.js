export default [
  {
    extends: [
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
      'prettier/prettier': ['error'],
    },
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
  },
];
