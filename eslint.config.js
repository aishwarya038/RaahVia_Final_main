const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");

// This helper allows us to use the older "expo" config format in the new Flat Config system
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  // 1. Apply the standard Javascript recommended rules
  js.configs.recommended,

  // 2. Pull in the Expo-specific configuration
  ...compat.extends("eslint-config-expo"),

  // 3. Your custom overrides
  {
    rules: {
      "no-unused-vars": "warn",        // Warns instead of erroring for unused variables
      "react/react-in-jsx-scope": "off", // Not needed in modern React/Expo
      "react-native/no-inline-styles": "off", // Allows you to use style={{...}}
    },
    // Ensure ESLint knows we are using React/React Native
    languageOptions: {
      globals: {
        __dirname: "readonly",
        process: "readonly",
      },
    },
  },
  
  // 4. Ignore specific folders
  {
    ignores: [
      "node_modules/",
      ".expo/",
      "dist/",
      "babel.config.js",
      "metro.config.js"
    ],
  }
];