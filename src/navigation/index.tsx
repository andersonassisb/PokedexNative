import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import HomeScreen from '../screens/home.screen';
import {useTheme} from '../global/styles/context';
import DetailsScreen from '../screens/details.screen';

const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  const {colors} = useTheme();

  const headerProps = {
    headerTitleStyle: {
      fontSize: 20,
    },
    headerShadowVisible: true,
    headerTintColor: colors.brand.primary,
    headerStyle: {
      backgroundColor: colors.brand.secondary,
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
