module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  parserOptions: {
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: [
    "react",
  ],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "react/react-in-jsx-scope": "off",
  },
};
