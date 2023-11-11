module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "google",
    "plugin:react/recommended",
  ],
  "overrides": [
    {
      "env": {
        "node": true,
      },
      "files": [
        ".eslintrc.{js,cjs}",
      ],
      "parserOptions": {
        "sourceType": "script",
      },
    },
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "plugins": [
    "react",
  ],
  "rules": {
    "quotes": [2, "double", {"avoidEscape": true}],
    "require-jsdoc": 0,
    "linebreak-style": 0,
    "react/prop-types": 0,
  },
};
