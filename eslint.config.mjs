import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin'

export default withNuxt({
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    indent: ['error', 2],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-undef': 'off',
    'no-constant-condition': 'off',
    'curly': ['error', 'all'],
    'max-len': ['error', {
      code: 120,
      tabWidth: 2,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    'semi': ['error', 'never'],

    '@typescript-eslint/no-unused-expressions': 'off',

    'vue/no-irregular-whitespace': 'warn',
    'vue/max-attributes-per-line': ['error', {
      multiline: { max: 1 },
      singleline: { max: 1 }
    }],
    'vue/html-indent': ['error', 2]
  }
})
