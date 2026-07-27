// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', {
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_'
    }],
    '@typescript-eslint/no-explicit-any': ['error', {
      varsIgnorePattern: 'error',
      argsIgnorePattern: 'error',
      caughtErrorsIgnorePattern: 'error'
    }]
  }
})
