import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';

import store from './src/store/store';
import StackNavigator from './src/navigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar />
      <StackNavigator />
    </Provider>
  );
};

export default App;
