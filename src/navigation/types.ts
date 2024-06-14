import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Details: { title: string; name: string };
  Bookmark: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
export type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;
export type BookmarksScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Bookmark'
>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
export type BookmarksScreenRouteProp = RouteProp<RootStackParamList, 'Bookmark'>;
