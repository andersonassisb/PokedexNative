import React, {useCallback} from 'react';
import {capitalize} from 'lodash';
import {dispatch} from '../store/store';
import {IResult} from '../services/types';
import {useGetAllPokemons} from '../hooks';
import {Loading} from '../components/loading';
import PokemonCard from '../components/pokemon-card';
import {useNavigation} from '@react-navigation/native';
import {incrementOffset} from '../services/middlewares';
import {HomeScreenNavigationProp} from '../navigation/types';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import {useTheme} from '../global/styles/context';

interface Props {
  testID?: string;
}

const HomeScreen: React.FC<Props> = ({testID = 'HomeScreen'}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const {colors} = useTheme();

  const {data, isError, isLoading, loadPokemons} = useGetAllPokemons();

  const renderItem = useCallback<ListRenderItem<IResult>>(({item, index}) => {
    const onPress = () => {
      navigation.navigate('Details', {
        title: capitalize(item.name),
        name: item.name,
      });
    };
    return (
      <PokemonCard
        testID={`${testID}-pokemon-${index}`}
        onPress={onPress}
        data={item}
      />
    );
  }, []);

  const loadMore = () => {
    dispatch(incrementOffset());
  };

  const renderFooter = () => {
    if (!!data.length && isLoading) {
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
    <View
      style={[styles.container, {backgroundColor: colors.brand.secondary}]}
      testID={testID}>
      <FlatList
        data={data}
        numColumns={2}
        style={styles.list}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        testID={`${testID}-list-pokemons`}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadPokemons}
            tintColor={colors.brand.primary}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    marginVertical: 16,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
