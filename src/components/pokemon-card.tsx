import React, {useMemo} from 'react';
import {IResult} from 'src/services/types';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useTheme} from '../global/styles/context';

interface Props {
  data: IResult;
  testID?: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    elevation: 2,
    borderRadius: 16,
    marginVertical: 24,
    alignItems: 'center',
    marginHorizontal: 16,
    justifyContent: 'center',
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  text: {
    fontSize: 18,
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
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  infoContainer: {
    top: 136,
    position: 'absolute',
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
          <Text style={styles.text}>{pokemon.name}</Text>
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
