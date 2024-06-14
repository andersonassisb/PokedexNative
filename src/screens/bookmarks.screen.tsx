import React, {useCallback, useMemo} from 'react';
import {capitalize} from 'lodash';
import {RootState} from '../store/store';
import {Pokemon} from '../services/types';
import {useNavigation} from '@react-navigation/native';
import {BookmarksScreenNavigationProp} from '../navigation/types';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from '../global/styles/context';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  testID?: string;
}

const BookmarksScreen: React.FC<Props> = ({testID = 'BookmarksScreen'}) => {
  const navigation = useNavigation<BookmarksScreenNavigationProp>();

  const {colors} = useTheme();

  const favorites = useSelector(
    (state: RootState) => state.favoritePokemons.favorites,
  );

  const sortedFavorites = useMemo(
    () => Array.from(favorites).sort((a, b) => a.id - b.id),
    [favorites],
  );

  const renderItem = useCallback<ListRenderItem<Pokemon>>(({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            name: item.name,
            title: capitalize(item.name),
          })
        }
        style={[
          styles.pokemonItem,
          {
            backgroundColor: colors.brand.secondary,
            borderColor: colors.backgroundCard[item.types[0].type.name],
          },
        ]}>
        <Text
          style={[
            styles.text,
            {color: colors.brand.primary, fontWeight: '900'},
          ]}>
          #{item.id}
        </Text>
        <Text style={styles.text}>{capitalize(item.name)}</Text>
        <Icon size={18} name="chevron-right" color={colors.brand.primary} />
      </TouchableOpacity>
    );
  }, []);

  const ListEmptyComponent = () => {
    return <Text>No results found</Text>;
  };

  return (
    <View
      style={[styles.container, {backgroundColor: colors.brand.secondary}]}
      testID={testID}>
      <FlatList
        style={styles.list}
        data={sortedFavorites}
        renderItem={renderItem}
        testID={`${testID}-favorite-pokemons`}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(_, index) => String(index)}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default BookmarksScreen;

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
    paddingVertical: 32,
    alignItems: 'center',
  },
  pokemonItem: {
    padding: 16,
    width: '90%',
    borderWidth: 2,
    borderRadius: 8,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
