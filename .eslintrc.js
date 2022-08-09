module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/extensions': [
      'warn', 'ignorePackages',
    ],
    'brace-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-param-reassign': ['error', { props: false }],
  },
};
