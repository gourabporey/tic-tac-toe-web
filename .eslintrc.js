module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
  },

  rules: {
    'semi': ['error', 'always'],
    'quotes': ['warn', 'single'],
    'prefer-const': ['error'],
    'no-use-before-define': ['error'],
    'no-this-before-super': ['error'],
    'complexity': ['error', { max: 3 }],
    'max-statements': ['error', 6],
    'max-params': ['error', { max: 3 }],
    'max-nested-callbacks': ['error', { max: 2 }],
    'no-const-assign': 'error',
    'no-else-return': 'error',
    'object-shorthand': 'error',
    'array-callback-return': ['error', { checkForEach: true }],
    'prefer-destructuring': 'warn',
    'prefer-template': 'warn',
    'no-useless-concat': 'error',
    'func-style': ['error', 'expression'],
    'prefer-rest-params': 'error',
    'for-direction': 'error',
    'no-cond-assign': 'error',
    'id-length': [
      'error',
      { exceptions: ['a', 'b', 'x', 'y', 'z'], min: 3, max: 20 },
    ],
  },
};
