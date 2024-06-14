import React, {useMemo} from 'react';
import {IResult} from 'src/services/types';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {useTheme} from '../global/styles/context';

interface Props {
  data: IResult;
  testID?: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    height: 210,
    elevation: 3,
    borderRadius: 16,
    marginVertical: 24,
    marginHorizontal: 16,
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    color: '#1c2352',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  image: {
    top: -35,
    left: 25,
    width: 160,
    height: 160,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  infoContainer: {
    top: 136,
    flexWrap: 'wrap',
    position: 'absolute',
    marginHorizontal: 16,
  },
});

const PokemonCard: React.FC<Props> = ({
  testID = 'PokemonCard',
  onPress,
  data: pokemon,
}) => {
  const {width} = useWindowDimensions();
  const cardWidth = useMemo(() => width / 2 - 32, [width]);

  const {colors} = useTheme();

  const data = useMemo(() => pokemon.data, [pokemon]);

  if (!data) return null;

  const renderContent = () => {
    return (
      <>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{uri: data.front_default}}
        />
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.text,
              {color: colors.brand.secondary},
            ]}>{`#${pokemon.data.id}`}</Text>
          <Text style={[styles.text, {marginVertical: 8}]}>{pokemon.name}</Text>
        </View>
      </>
    );
  };

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      style={[
        styles.container,
        {width: cardWidth},
        {
          backgroundColor: colors.backgroundCard[data.types[0].type.name],
        },
      ]}>
      {renderContent()}
    </TouchableOpacity>
  );
};

export default PokemonCard;
