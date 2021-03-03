module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@theme': './src/theme',
          '@appRedux': './src/appRedux',
          '@navigator': './src/navigator',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@locales': './src/locales',
          '@components': './src/components',
          '@constants': './src/constants',
          '@services': './src/services',
        },
      },
    ],
  ],
};
