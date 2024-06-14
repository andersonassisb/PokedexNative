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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import BookmarksScreen from '../screens/bookmarks.screen';

const Tab = createBottomTabNavigator();

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

  const StackNavigator = () => {
    return (
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
    );
  };

  const BookmarksStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Bookmark"
        screenOptions={{
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen
          name="Bookmark"
          component={BookmarksScreen}
          options={{
            title: 'Bookmarks',
            ...headerProps,
          }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Pokémons"
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName = 'list';

            if (route.name === 'Pokémons') {
              iconName = 'list';
            } else if (route.name === 'Bookmarks') {
              iconName = 'bookmark';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.brand.primary,
          tabBarInactiveTintColor: colors.brand.softGray,
          tabBarStyle: {
            backgroundColor: colors.brand.secondary,
          },
          headerShown: false,
        })}>
        <Tab.Screen name="Pokémons" component={StackNavigator} />
        <Tab.Screen name="Bookmarks" component={BookmarksStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
