module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // TypeScript
    '@typescript-eslint/no-explicit-any': 'on', 
    
   
    'no-console': 'error', 
    'no-unused-vars': 'error', 
  },
};
