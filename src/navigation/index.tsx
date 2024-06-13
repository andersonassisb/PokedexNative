import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  StackNavigationOptions,
  createStackNavigator,
} from '@react-navigation/stack';

import {RootStackParamList} from './types';
import HomeScreen from '../screens/home.screen';
import DetailsScreen from '../screens/details.screen';

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  const headerProps = {
    headerTintColor: '#394069',
    headerShadowVisible: true,
    headerTitleStyle: {
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: '#faf7e1',
    },
  } as StackNavigationOptions;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Pokédex',
            ...headerProps,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({route}) => ({
            title: route.params?.title ?? 'Detalhes',
            ...headerProps,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
