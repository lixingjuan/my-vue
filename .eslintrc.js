module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    // "eslint:recommended",
    "plugin:vue/essential"
    // "plugin:@typescript-eslint/eslint-recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 10, // 支持的ECMA版本，10即2019
    // parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ["vue" /* , "@typescript-eslint" */],
  rules: {
    // indent: ["error", "tab"], // 缩进方式，tab, ??这个不知道是不是哪里冲突了
    // "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"], // 引号：双引号
    semi: ["error", "always"], // 行后分号
    "no-unused-vars": "warn", // 定义未使用
    "no-undef": "error", // 未定义使用
    "spaced-comment": 1 // 注释与斜线间必须有空格
  }
};
