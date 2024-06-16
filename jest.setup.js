import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

import {cleanup} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
}));

// Limpar o AsyncStorage após cada teste
afterEach(async () => {
  await AsyncStorage.clear();
  cleanup();
});

jest.mock('react-native-splash-screen', () => ({
  show: jest.fn().mockImplementation(() => {
    console.log('show splash screen');
  }),
  hide: jest.fn().mockImplementation(() => {
    console.log('hide splash screen');
  }),
}));
