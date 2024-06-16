import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {StatusBar} from 'react-native';
import StackNavigator from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import {ThemeProvider} from './src/global/styles/context';

const App: React.FC = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StatusBar />
        <StackNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
