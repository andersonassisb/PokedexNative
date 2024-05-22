import {persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import store from '../store/store';

jest.mock('redux-persist', () => {
  const originalModule = jest.requireActual('redux-persist');
  return {
    ...originalModule,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

describe('Store Tests', () => {
  afterAll(async () => {
    await AsyncStorage.clear();
    persistStore(store).purge();
  });

  it('should create store without errors', () => {
    expect(store).toBeTruthy();
  });
});
