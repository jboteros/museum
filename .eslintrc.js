module.exports = {
  root: true,
  extends: '@react-native-community',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react-native/no-inline-styles': 'error',
        'no-unused-vars': 'error',
        'react-native/no-unused-styles': 'warn',
      },
    },
  ],
};
