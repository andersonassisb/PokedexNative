import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
  TextInput,
  StyleSheet,
  ListRenderItem,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';
import {useTheme} from '../global/styles/context';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  testID?: string;
}

const HomeScreen: React.FC<Props> = ({testID = 'HomeScreen'}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [search, setSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState<IResult[]>();

  const {colors} = useTheme();
  const {width} = useWindowDimensions();

  const {data, isError, isLoading, loadPokemons} = useGetAllPokemons();

  const onFilterPokemons = useCallback(
    (text: string) => {
      const filtered = data.filter(pokemon =>
        pokemon.name.includes(text.toLowerCase().trim()),
      );
      setFilteredData(filtered);
    },
    [data],
  );

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

  const isEnabledLoadMore = useMemo(() => {
    if (search && !filteredData?.length) return false;
    if (!data.length) return false;
    return true;
  }, [search, filteredData, data]);

  const loadMore = () => {
    if (!isEnabledLoadMore) return;
    dispatch(incrementOffset());
  };

  useEffect(() => {
    onFilterPokemons(search);
  }, [search, onFilterPokemons]);

  const renderFooter = () => {
    if (!isEnabledLoadMore) return null;
    if (isLoading) {
      return <Loading />;
    }
    return null;
  };

  const renderSearchInput = () => {
    return (
      <View style={styles.search}>
        <View
          style={[
            styles.inputContainer,
            {
              borderWidth: 1,
              width: width - 32,
              borderColor: colors.brand.primary,
            },
          ]}>
          <Icon
            size={18}
            name="search"
            style={styles.searchIcon}
            color={colors.brand.primary}
          />
          <TextInput
            value={search}
            style={[
              styles.input,
              {
                color: colors.brand.primary,
              },
            ]}
            placeholder="Pokémon"
            onChangeText={setSearch}
            underlineColorAndroid="transparent"
            placeholderTextColor={colors.brand.softGray}
          />
        </View>
      </View>
    );
  };

  const ListEmptyComponent = () => {
    if (isError) {
      return <Text>Something went wrong</Text>;
    }
    return <Text>No results found</Text>;
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.brand.secondary}]}
      testID={testID}>
      {renderSearchInput()}
      <FlatList
        numColumns={2}
        style={styles.list}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        data={search ? filteredData : data}
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
    marginBottom: 16,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  search: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    margin: 16,
    padding: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    padding: 8,
  },
  input: {
    flex: 1,
    padding: 8,
  },
});
