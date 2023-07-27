module.exports = {
  root: true,

  env: {
    es6: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },

  rules: {
    'no-consol': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': 0,
    'prefer-const': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-multiple-empty-lines': ['warn', { max: 2, maxEOF: 2 }]
  },

  extends: 'plugin:vue/essential'
}
