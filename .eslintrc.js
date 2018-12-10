module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "standard",
    "standard-react",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "env": {
    "es6": true
  },
  "plugins": [
    "react",
    "flowtype"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "space-before-function-paren": 0,
    "react/jsx-boolean-value": 0,
    "comma-dangle": ["error", "always-multiline"],
    "flowtype/space-after-type-colon": [
      2,
      "always"
    ]
  },
  "settings": {
    "react": {
      "createClass": "createReactClass",
      "pragma": "React",
      "version": require('./package.json').dependencies.react,
      "version": require('./package.json').devDependencies['flow-bin'],
    },
    "propWrapperFunctions": [
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
        {"property": "myFavoriteWrapper"}
    ]
  },
  "globals": {
    "setTimeout": false,
    "Promise": false,
    "clearTimeout": false,
    "test": false,
    "expect": false,
    "__DEV__": false,
    "Map": false,
    "alert": false,
    "React$Node": false,
    "babelHelpers": false,
    "FormData": false,
    "console": false,
    "require": false,
    "module": false,
    "React": false,
    "process": false,
    "it": false,
  },
}
