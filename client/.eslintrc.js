module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    ecmaVersion: 2020,
    requireConfigFile: false,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/'],
  plugins: ['react', 'import', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
