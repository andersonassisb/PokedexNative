import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {useGetPokemonByNameQuery} from '../hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  DetailsScreenRouteProp,
  DetailsScreenNavigationProp,
} from '../navigation/types';
import {useTheme} from '../global/styles/context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {capitalize} from 'lodash';

interface Props {
  testID?: string;
}

const DetailsScreen: React.FC<Props> = ({testID = 'DetailsScreen'}) => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const route = useRoute<DetailsScreenRouteProp>();

  const {colors} = useTheme();
  const {height} = useWindowDimensions();

  const {title = 'Detalhes', name = ''} = useMemo(
    () => route.params ?? {},
    [route.params],
  );

  const {data} = useGetPokemonByNameQuery(name);

  const translateY = useSharedValue(height / 2);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      translateY.value = translateY.value;
    })
    .onUpdate(event => {
      const newTranslateY = translateY.value + event.y;
      translateY.value = Math.max(0, Math.min(height / 2, newTranslateY));
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  useEffect(() => {
    navigation.setOptions({title});
  }, [navigation, title]);

  if (!data) return null;

  const renderTypes = () => {
    return (
      <View style={styles.typeContainer}>
        <Text style={[styles.typeLabel, {color: colors.brand.primary}]}>
          Types:{' '}
        </Text>
        {data.types.map((t, index) => (
          <View
            key={index}
            style={[styles.type, {borderColor: colors.brand.primary}]}>
            <Text style={[styles.typeText, {color: colors.brand.primary}]}>
              {capitalize(t.type.name)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container} testID={testID}>
        <View
          style={[
            styles.topContent,
            {
              backgroundColor: colors.brand.secondary,
            },
          ]}>
          <View style={styles.spriteContainer}>
            <View
              style={[
                styles.imageContainer,
                {
                  backgroundColor:
                    colors.boxType[data.types[0].type.name] ||
                    colors.backgroundCard[data.types[0].type.name],
                },
              ]}>
              <Image
                resizeMode="cover"
                style={styles.image}
                source={{uri: data.sprites.front_default}}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.idText, {color: colors.brand.primary}]}>
                #{data.id}
              </Text>
              <Text style={[styles.weightText, {color: colors.brand.primary}]}>
                Weight: {data.weight}
              </Text>
              {renderTypes()}
            </View>
          </View>
        </View>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.slidingView,
              {
                top: 0,
                height,
                backgroundColor: colors.backgroundCard[data.types[0].type.name],
              },
              animatedStyle,
            ]}>
            <Icon name="chevron-up" size={24} color={colors.brand.secondary} />
            <ScrollView
              style={{marginVertical: 16, paddingBottom: 64}}
              contentContainerStyle={styles.infoContainer}>
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    fontSize: 28,
                    color: 'white',
                    fontWeight: '700',
                    alignSelf: 'center',
                  }}>
                  Base States
                </Text>
                <View
                  style={{
                    width: '100%',
                    marginVertical: 16,
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}>
                  {data.stats.map((stat, index) => (
                    <View
                      key={index}
                      style={{
                        width: '100%',
                        marginVertical: 8,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: colors.brand.primary,
                          fontWeight: '700',
                        }}>
                        {capitalize(stat.stat.name)}:{' '}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          color: colors.brand.primary,
                          fontWeight: '500',
                        }}>
                        {stat.base_stat}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: 28,
                    color: 'white',
                    fontWeight: '700',
                    alignSelf: 'center',
                  }}>
                  Abilities
                </Text>
                <View
                  style={{
                    width: '100%',
                    marginRight: 8,
                    flexWrap: 'wrap',
                    marginVertical: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {data.abilities.map((abilityItem, index) => (
                    <View
                      key={index}
                      style={{
                        marginRight: 8,
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: colors.brand.primary,
                      }}>
                      <Text
                        key={index}
                        style={{
                          padding: 8,
                          fontSize: 18,
                          fontWeight: '700',
                          color: colors.brand.primary,
                        }}>
                        {capitalize(abilityItem.ability.name)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContent: {
    height: '100%',
    alignItems: 'center',
  },
  spriteContainer: {
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 210,
    height: 210,
    padding: 16,
    borderRadius: 105,
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
  },
  image: {
    height: 200,
    width: 200,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slidingView: {
    position: 'absolute',
    alignItems: 'center',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#1f1f1f',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
  },
  infoContainer: {
    flexGrow: 1,
    marginVertical: 16,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 20,
  },
  idText: {
    fontSize: 28,
    marginBottom: 16,
    fontWeight: '900',
  },
  weightText: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: '700',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeLabel: {
    fontSize: 24,
    fontWeight: '700',
  },
  type: {
    padding: 8,
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
