import React, {useMemo} from 'react';
import {MinimalLink} from 'src/services/types';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {useGetPokemonByNameQuery} from '../hooks';

interface Props {
  testID?: string;
  data: MinimalLink;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    minHeight: 96,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6d99db',
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

const PokemonCard: React.FC<Props> = ({
  testID = 'PokemonCard',
  onPress,
  data: pokemon,
}) => {
  const {width} = useWindowDimensions();
  const cardWidth = useMemo(() => width / 2 - 32, [width]);

  const {data} = useGetPokemonByNameQuery(pokemon.name);

  if (!data) return null;

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      style={[styles.container, {width: cardWidth}]}>
      <Text style={styles.text}>{pokemon.name}</Text>
      <Image
        style={{width: 96, height: 96}}
        resizeMode="center"
        source={{uri: data.sprites.front_default}}
      />
    </TouchableOpacity>
  );
};

export default PokemonCard;
