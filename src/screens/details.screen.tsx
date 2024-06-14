import {Text, View, StyleSheet, useWindowDimensions} from 'react-native';
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

  const translateY = useSharedValue(height / 3);

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

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View
          style={[
            styles.topContent,
            {
              backgroundColor: colors.brand.secondary,
            },
          ]}>
          <View style={styles.spriteContainer}>
            <Text style={styles.text}>Conteúdo Estático</Text>
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
            <View style={styles.infoContainer}></View>
            <Text style={styles.text}>Card Deslizante</Text>
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
    marginVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slidingView: {
    width: '100%',
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
    marginVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});
