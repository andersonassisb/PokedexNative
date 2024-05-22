import React, { useCallback } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import { capitalize } from 'lodash';
import { dispatch } from '../store/store';
import { useGetAllPokemons } from '../hooks';
import { Loading } from '../components/loading';
import { MinimalLink } from '../services/types';
import { useNavigation } from '@react-navigation/native';
import { incrementOffset } from '../services/middlewares';
import { HomeScreenNavigationProp } from '../navigation/types';

interface Props {
  testID?: string;
}

const HomeScreen: React.FC<Props> = ({ testID = 'HomeScreen' }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { data, isError, isLoading } = useGetAllPokemons();

  const renderItem = useCallback<ListRenderItem<MinimalLink>>(
    ({ item, index }) => {
      const onPress = () => {
        navigation.navigate('Details', {
          title: capitalize(item.name),
          name: item.name,
        });
      };
      return (
        <TouchableOpacity
          style={styles.pokemonCard}
          testID={`${testID}-pokemon-${index}`}
          onPress={onPress}
        >
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      );
    },
    [],
  );

  const loadMore = () => {
    dispatch(incrementOffset());
  };

  const renderFooter = () => {
    if (isLoading) {
      return <Loading />;
    }
    return null;
  };

  const ListEmptyComponent = () => {
    if (isLoading) {
      return <Loading />;
    }
    if (isError) {
      return <Text>Something went wrong</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container} testID={testID}>
      <FlatList
        data={data}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        testID={`${testID}-list-pokemons`}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(_, index) => String(index)}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pokemonCard: {
    padding: 24,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
  },
  text: {
    textTransform: 'capitalize',
  },
});
