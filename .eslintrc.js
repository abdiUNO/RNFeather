module.exports = {
  parser: "babel-eslint",
  env: {
    es6: true,
    "react-native/react-native": true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all"
  ],
  plugins: [
    "react",
    "react-native",
    "flowtype",
    "jsx-a11y",
    "import",
    "prettier"
  ],
  rules: {
    "prettier/prettier": "error",
    "react/sort-comp": ["off"],
    "react/prefer-stateless-function": ["off"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-undef": ["error"],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"]
  }
}
