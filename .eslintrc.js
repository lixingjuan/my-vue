module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential"
    // "plugin:@typescript-eslint/eslint-recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 10,
    // parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ["vue" /* , "@typescript-eslint" */]
  // rules: {
  //   indent: ["error", "tab"],
  //   "linebreak-style": ["error", "unix"],
  //   quotes: ["error", "double"],
  //   semi: ["error", "always"]
  // }
};
