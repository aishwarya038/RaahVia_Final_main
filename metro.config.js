const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// If you ever want to support importing .svg files as components:
const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  // This ensures your assets are bundled correctly for React 19 / SDK 54
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
};

config.resolver = {
  ...resolver,
  // Tells Metro to treat .svg files as source code, not just static assets
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
};

module.exports = config;