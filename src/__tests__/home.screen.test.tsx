import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/home.screen';

jest.mock('redux-persist', () => {
  const originalModule = jest.requireActual('redux-persist');
  return {
    ...originalModule,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});

const mockStore = configureStore([]);
const store = mockStore({
  pokemons: {
    data: [],
    offset: 0,
    status: 'idle',
  },
});

store.dispatch = jest.fn();

jest.useFakeTimers({
  legacyFakeTimers: true,
});

describe('Home Screen', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the Home screen correctly', async () => {
    render(<HomeScreen />, {
      wrapper: ({ children }) => (
        <NavigationContainer>
          <Provider store={store}>{children}</Provider>
        </NavigationContainer>
      ),
    });
  });
});
