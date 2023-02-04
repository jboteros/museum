module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: [],
  setupFilesAfterEnv: [
    '<rootDir>/jest-config/jest.setup.ts',
    '@testing-library/jest-native/extend-expect',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-native|@react-navigation|@notifee|react-native-snap-carousel)',
  ],
};
