module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: ["react", "prettier"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "linebreak-style": 0, // temp fix(not working)
    "react/react-in-jsx-scope": "off", // React auto imports React
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/prop-types": "off",
    "consistent-return": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-console": "off",
    // "prettier/prettier": ["error"], // temp fix
  },
};
