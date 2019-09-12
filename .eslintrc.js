module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "no-confusing-arrow": 0,
    "implicit-arrow-linebreak": 0,
    "no-shadow": 0,
    "consistent-return": 0,
    "comma-dangle": 0,
    "padded-blocks": 0,
    "object-curly-newline": 0,
    "no-param-reassign": 0,
    "no-return-assign": 0,
    "no-nested-ternary": 0,
    "no-plusplus": 0,
    "no-console": 0,
    "no-use-before-define": 0
  }
};
