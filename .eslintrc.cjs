module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "@nuxtjs/eslint-config-typescript",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  ignorePatterns: [".nuxt/*", "node_modules/*", "old/*"],
  rules: {
    quotes: ["error", "double"],
    semi: 0,
    indent: ["error", 2],
    "vue/multi-word-component-names": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/html-self-closing": 0,
    "space-before-function-paren": 0,
    "arrow-parens": 0,
    "comma-dangle": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "no-multi-spaces": ["error"],
  },
};
