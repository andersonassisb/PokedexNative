import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from './types';
import HomeScreen from '../screens/home.screen';
import DetailsScreen from '../screens/details.screen';

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
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
          options={{title: 'Pokédex'}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({route}) => ({
            title: route.params?.title ?? 'Detalhes',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
